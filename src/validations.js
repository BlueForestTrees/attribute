import {check, body, param} from 'express-validator/check'
import {objectNoEx, object} from "mongo-registry"
import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "./headers"
import {run} from 'express-blueforest'
import client from "request-promise-native"
import ENV from "./env"

const debug = require('debug')(`api:${ENV.NAME}:validation`)
const grandeur = chain => chain.isIn(grandeursKeys).withMessage("should be Mass, Dens, Long, Tran...")
const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
const number = chain => chain.isNumeric().withMessage("must be a valid number")

const ID = '_id'
const TRUNKID = 'trunkId'
const ATTRIBUTEID = `${ENV.NAME}Id`
const NAME = 'name'
const COLOR = 'color'
const G = 'g'
const BQT = 'bqt'
const grandeursKeys = ["PNOF", "PDF", "DALY", "CTUh", "CTUe", "Ene1", "Ene2", "Dens", "Nomb", "Volu", "Duré", "Mass", "Surf", "Long", "Pri1", "Pri2", "Tran"]

export const validUser = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])
    if (!token || !token.user) {
        throw {code: "bf401"}
    }
    req.user = token.user
    req.user._id = object(req.user._id)
    debug("user %o", req.user)
    return o
})

export const setUserIdIn = field => (o, req) => {
    o[field] = req.user._id
    return o
}

export const validOwner = (col, field = "_id") => run(async (o, req) => {
    let filter = {_id: o[field]}
    const doc = await col.findOne(filter)
    if (doc) {
        if (req.user._id.equals(doc.oid)) {
            debug("valid owner user %o, doc %o", req.user._id, doc._id)
            return o
        } else {
            debug("invalid owner user %o, doc %o", req.user._id, doc._id)
            throw {code: "bf403"}
        }
    } else {
        debug("doc not found user %o, doc %o", req.user._id, doc._id)
        throw {code: "bf404"}
    }
})

export const validBodyG = grandeur(body(G))
export const validBodyBqt = number(body(BQT))
export const validMongoId = field => mongoId(check(field))
export const validId = validMongoId(ID)
export const validBodyId = mongoId(body(ID))
export const validBodyTrunkId = mongoId(body(TRUNKID))
export const validBodyAttributeId = mongoId(body(ATTRIBUTEID))


export const validBodyName = body(NAME).isLength({min: 2}).matches(/^.+/)
export const validBodyColor = body(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
export const optionalValidQ = check('q').optional().exists()

export const validPathId = mongoId(param(ID))
export const validPathTrunkId = mongoId(param(TRUNKID))

const throwBf403 = () => {
    throw {code: "bf403"}
}
export const validTrunkOwner = async o => await client.get(`${ENV.TREE_BASE_URL}/api/tree/${o.trunkId}/owner/${o.oid}`, {json: true}) ? o : throwBf403()
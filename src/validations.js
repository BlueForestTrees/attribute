import {check, body, param} from 'express-validator/check'
import {objectNoEx, object} from "mongo-registry"
import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "./headers"
import {run} from 'express-blueforest'
import client from "request-promise-native"
import ENV from "./env"
import {isNil} from "lodash"

const throwit = ex => {
    throw ex
}
const debug = require('debug')(`api:${ENV.NAME}`)
const grandeur = chain => chain.isIn(grandeursKeys).withMessage("should be Mass, Dens, Long, Tran...")
const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
const number = chain => chain.exists().custom(v => !isNaN(Number.parseFloat(v))).withMessage("must be a valid number").customSanitizer(Number.parseFloat)

const ID = '_id'
const TRUNKID = 'trunkId'
const ATTRIBUTEID = `${ENV.NAME}Id`
const NAME = 'name'
const COLOR = 'color'
const G = 'g'
const BQT = 'bqt'
const grandeursKeys = ["PNOF", "PDF", "DALY", "CTUh", "CTUe", "Ene1", "Ene2", "Dens", "Nomb", "Volu", "Duré", "Mass", "Surf", "Long", "Pri1", "Pri2", "Tran"]


export const optionalValidG = grandeur(check("g").optional())
const defaultPS = 20
export const optionnalPageSize = [
    (req, res, next) => {
        if (isNil(req.params.ps)) {
            req.params.ps = defaultPS
        }
        next()
    },
    check("ps").isInt({
        min: 1,
        max: 200
    }).withMessage(`must be an integer between 1 and 200 (default to ${defaultPS})`).toInt()
]
export const optionalMongoId = field => mongoId(check(field).optional())
export const optionnalAfterIdx = optionalMongoId("aidx")
export const validUser = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])

    !token || !token.user && throwit({code: "bf401"})

    req.user = token.user
    req.user._id = object(req.user._id)

    return o
})

export const setUserIdIn = field => (o, req) => {
    o[field] = req.user._id
    return o
}

export const validOwner = (col, field = "_id") => run(async (o, req) => {
    const doc = await col.findOne({_id: o[field]})
    const validOwner =
        (!doc && "no doc")
        ||
        (req.user._id.equals(doc.oid) && "owner")
        ||
        (req.user.rights && req.user.rights.charAt(0) === 'G' && "god")

    debug('{validOwner:{_id:"%s", oid:"%s", validity:"%s"}}', o[field], req.user._id, validOwner)

    validOwner || throwit({code: "bf403"})

    return o
})

export const validTrunkOwner = async (o, req) => {

    let validTrunkOwner = req.user.rights && req.user.rights.charAt(0) === 'G' && "god"

    try {
        validTrunkOwner = await client.get(`${ENV.TREE_BASE_URL}/api/tree/${o.trunkId}/owner/${req.user._id}`, {json: true}) && "owner"
    } catch (err) {
        validTrunkOwner = err.statusCode === 404 && "no doc" || throwit(err)
    }

    debug('{validTrunkOwner:{_id:"%s", oid:"%s", validity:"%s"}}', o.trunkId, req.user._id, validTrunkOwner)

    return (validTrunkOwner && o) || throwit({code: "bf403"})
}

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

export const validLimit = number(param("limit")).isLength({min: 1, max: 15})
export const validPathId = mongoId(param(ID))
export const validPathBqt = number(param(BQT))
export const validPathTrunkId = mongoId(param(TRUNKID))
export const validOptionalTrunkId = mongoId(check("tid")).optional()
export const validPathAttributeId = mongoId(param("attrId"))
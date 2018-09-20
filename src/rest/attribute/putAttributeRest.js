import {validBodyBqt, validBodyId, validBodyAttributeId, validBodyTrunkId, validOwner, validUser} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import ENV from "./../../env"

const router = Router()
const attributes = col(cols.ATTRIBUTE)
const attributeService = configure(() => attributes)

module.exports = router

router.put(`/api/${ENV.NAME}`,
    validBodyId,
    validBodyTrunkId,
    validBodyAttributeId,
    validBodyBqt,
    validUser,
    validOwner(attributes),
    run(({_id, trunkId, facetId, bqt}) => ({filter: {_id, trunkId, facetId}, item: {bqt}})),
    run(attributeService.filteredUpdate)
)
import {validPathTrunkId} from "../../validations"
import {col} from "mongo-registry"
import configure from "items-service"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {find} from "lodash"
import ENV from "../../env"

const router = Router()
const attributeEntryService = configure(() => col(cols.ATTRIBUTE_ENTRY))

router.get(`/api/${ENV.NAME}Tank/:trunkId`,
    validPathTrunkId,
    run(({trunkId}) => col(cols.ATTRIBUTE_TANK).find({trunkId}, {projection: {impactId: 1, bqt: 1}}).toArray()),
    run(attributeEntryService.append(
        `${ENV.NAME}Id`,
        {name: 1, color: 1, g: 1},
        (attribute, attributeEntry) => ({
            _id: attributeEntry._id,
            name: attributeEntry.name,
            color: attributeEntry.color,
            quantity: {bqt: attribute.bqt, g: attributeEntry.g, eq: attributeEntry.eq},
            type: `${ENV.NAME}Tank`
        })
    ))
)

module.exports = router

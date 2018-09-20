import {validPathTrunkId} from "../../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import ENV from "./../../env"


const router = Router()

module.exports = router

const attributeEntryService = configure(() => col(cols.ATTRIBUTE_ENTRY))

router.get(`/api/${ENV.NAME}/:trunkId`,
    validPathTrunkId,
    run(({trunkId}) => col(cols.ATTRIBUTE).find({trunkId}).toArray()),
    run(attributeEntryService.append(
        `${ENV.NAME}Id`,
        {name: 1, color: 1, g: 1},
        (attribute, attributeEntry) => ({
            _id: attribute._id,
            name: attributeEntry.name,
            color: attributeEntry.color,
            quantity: {bqt: attribute.bqt, g: attributeEntry.g, eq: attributeEntry.eq}
        })
    ))
)
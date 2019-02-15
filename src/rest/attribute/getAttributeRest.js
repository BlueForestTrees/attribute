import {validLimit, validOptionalTrunkId, validPathAttributeId, validPathBqt, validPathTrunkId} from "../../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import ENV from "./../../env"
import {map} from "lodash"


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
            [`${ENV.NAME}Id`]: attributeEntry._id,
            name: attributeEntry.name,
            color: attributeEntry.color,
            quantity: {bqt: attribute.bqt, g: attributeEntry.g, eq: attributeEntry.eq},
            type: ENV.NAME
        })
    ))
)

/**
 * Donne la liste des trunk ID qui porte cet attribut, et la bqt de trunk pour correspondre à la bqt de attr.
 */
router.get(`/api/${ENV.NAME}/equiv/:bqt/:attrId/:limit`,
    validPathBqt,
    validPathAttributeId,
    validLimit,
    validOptionalTrunkId,
    run(({bqt, attrId, trunkId, limit}, req, res) => {
        res.locals.bqt = bqt

        const trunkIdFilter = trunkId ? {trunkId} : {}

        return col(cols.ATTRIBUTE)
            .aggregate(
                [
                    {
                        $match: {
                            [`${ENV.NAME}Id`]: attrId,
                            bqt: bqt === 0 ? 0 : {$ne: 0},
                            ...trunkIdFilter
                        }
                    },
                    {$sample: {size: limit}}
                ]
            ).toArray()
    }),
    run((attributes, req, res) => map(attributes, attr => ({
        _id: attr.trunkId,
        bqt: (res.locals.bqt / attr.bqt) || 0
    })))
)
import {validPathTrunkId} from "../../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()

module.exports = router

const damageService = configure(() => col(cols.DAMAGE))
const damageEntryService = configure(() => col(cols.DAMAGE_ENTRY))

router.get('/api/damage/:trunkId',
    validPathTrunkId,
    run(({trunkId}) => ({trunkId})),
    run(damageService.findMixin({trunkId: 0})),
    run(damageEntryService.append(
        "damageId",
        {name: 1, color: 1, g: 1},
        (damage, damageEntry) => ({
            _id: damage._id,
            damageId: damage.damageId,
            name: damageEntry.name,
            color: damageEntry.color,
            quantity: {bqt: damage.bqt, g: damageEntry.g, eq: damageEntry.eq}
        })
    ))
)
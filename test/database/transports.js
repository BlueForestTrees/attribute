import {withIdBqt, withId, withDbTrunk} from "test-api-express-mongo"
import {cols} from "../../src/collections"
import {co2eDamageEntry} from "./damageEntries"
import {object} from "test-api-express-mongo"

export const bateauTrunkId = object("454503c03e77667641d99990")
export const voitureTrunkId = object("554503c03e77667641d99990")

export const database = {
    [cols.DAMAGE]: [
        {_id: object("054503c03e77667641d99990"), trunkId: bateauTrunkId, damageId: co2eDamageEntry._id, bqt: 2000000},
        {_id: object("054503c03e77667641d99991"), trunkId: voitureTrunkId, damageId: co2eDamageEntry._id, bqt: 5000000},
    ]
}

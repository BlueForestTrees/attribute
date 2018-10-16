import {object, withDbTrunk} from "test-api-express-mongo"
import {cols} from "../../src/collections"
import {co2eDamageEntry} from "./damageEntries"
import ENV from "../../src/env"

export const papierVA = withDbTrunk("papier version A", "111111111111111111111111", 100, "Surf")

const couchePE = {_id:object("333333333333333333333333"),[ENV.NAME]:[{_id: object("a11111111111111111111118"), trunkId: object("333333333333333333333333"), entryId: co2eDamageEntry._id, bqt: 1}]}
const couchePapier = {_id: object("444444444444444444444444"),[ENV.NAME]:[{_id: object("a11111111111111111111119"), trunkId: object("444444444444444444444444"), entryId: co2eDamageEntry._id, bqt: 10}]}
const coucheAdhesif = {_id: object("555555555555555555555555"),[ENV.NAME]: [{_id: object("a11111111111111111111120"), trunkId: object("555555555555555555555555"), entryId: co2eDamageEntry._id, bqt: 100}]}
const coucheAlu = {_id: object("666666666666666666666666"),[ENV.NAME]: [{_id: object("a11111111111111111111121"), trunkId: object("666666666666666666666666"), entryId: co2eDamageEntry._id, bqt: 1000}]}

export const database = {
    [cols.TRUNK]: [couchePE, couchePapier, coucheAdhesif, coucheAlu]
}


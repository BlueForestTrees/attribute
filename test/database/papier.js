import {object, withDbTrunk} from "test-api-express-mongo"
import {cols} from "../../src/collections"
import {co2eDamageEntry} from "./damageEntries"

export const papierVA = withDbTrunk("papier version A", "111111111111111111111111", 100, "Surf")

const couchePEDamages = [{_id: object("a11111111111111111111118"), trunkId: object("333333333333333333333333"), damageId: co2eDamageEntry._id, bqt: 1}]
const couchePapierDamages = [{_id: object("a11111111111111111111119"), trunkId: object("444444444444444444444444"), damageId: co2eDamageEntry._id, bqt: 10}]
const coucheAdhesifDamages = [{_id: object("a11111111111111111111120"), trunkId: object("555555555555555555555555"), damageId: co2eDamageEntry._id, bqt: 100}]
const coucheAluDamages = [{_id: object("a11111111111111111111121"), trunkId: object("666666666666666666666666"), damageId: co2eDamageEntry._id, bqt: 1000}]

export const database = {
    [cols.ATTRIBUTE]: [...couchePEDamages, ...couchePapierDamages, ...coucheAdhesifDamages, ...coucheAluDamages]
}


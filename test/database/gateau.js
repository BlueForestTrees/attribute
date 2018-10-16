import {cols} from "../../src/collections"
import {withDbTrunk} from "test-api-express-mongo"
import {vitBDamageEntry, vitCDamageEntry} from "./damageEntries"
import {object} from "test-api-express-mongo"
import {god} from "./users"
import ENV from "../../src/env"

export const gateauTrunk = withDbTrunk("Gateau au chocolat", "5a6a03c03e77667641d2d2c3", 200, "Mass")
export const bleTrunk = withDbTrunk("blé", "5a6a03c03e77667641d2d2c0", 1000, "Mass")
export const farineTrunk = withDbTrunk("Farine", "5a6a03c03e77667641d2d2c1", 100, "Mass")

gateauTrunk[ENV.NAME] = [
    {_id: object("aaaaaaa03e77667641d2d210"), trunkId: gateauTrunk._id, entryId: vitCDamageEntry._id, bqt: 10},
    {_id: object("aaaaaaa03e77667641d2d211"), trunkId: gateauTrunk._id, entryId: vitBDamageEntry._id, bqt: 0.1},
]

export const bleDamages = [
    {_id: object("aaaaaaa03e77667641d2d2c0"), oid: god._id, trunkId: bleTrunk._id, entryId: vitCDamageEntry._id, bqt: 6},
    {_id: object("aaaaaaa03e77667641d2d2c1"), trunkId: bleTrunk._id, entryId: vitBDamageEntry._id, bqt: 0.15}
]
bleTrunk[ENV.NAME] = bleDamages

export const database = {
    [cols.TRUNK]: [gateauTrunk, bleTrunk]
}
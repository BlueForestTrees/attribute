import {cols} from "../../src/collections"
import {object} from "test-api-express-mongo"
import {co2eDamageEntry, vitBDamageEntry, vitCDamageEntry, prixDamageEntry} from "./damageEntries"

export const aid = object("aaaaaaaaaaaaaaaaaaaaaaaa")
const bid = object("bbbbbbbbbbbbbbbbbbbbbbbb")

const aDamages = [
    {_id: object("fafa0026aaaaaaaaaaaaaaaa"), trunkId: aid, damageId: prixDamageEntry._id, bqt: 100},
    {_id: object("fafa0027aaaaaaaaaaaaaaaa"), trunkId: aid, damageId: vitCDamageEntry._id, bqt: 100},
    {_id: object("fafa0028aaaaaaaaaaaaaaaa"), trunkId: aid, damageId: vitBDamageEntry._id, bqt: 100},
    {_id: object("fafa0029aaaaaaaaaaaaaaaa"), trunkId: aid, damageId: co2eDamageEntry._id, bqt: 100},
]
const bDamages = [
    {_id: object("fafa0030aaaaaaaaaaaaaaaa"), trunkId: bid, damageId: prixDamageEntry._id, bqt: 40},
    {_id: object("fafa0031aaaaaaaaaaaaaaaa"), trunkId: bid, damageId: vitCDamageEntry._id, bqt: 6},
    {_id: object("fafa0032aaaaaaaaaaaaaaaa"), trunkId: bid, damageId: vitBDamageEntry._id, bqt: 0.06},
    {_id: object("fafa0033aaaaaaaaaaaaaaaa"), trunkId: bid, damageId: co2eDamageEntry._id, bqt: 0.08},
]

export const database = {
    [cols.DAMAGE]: [...aDamages, ...bDamages]
}
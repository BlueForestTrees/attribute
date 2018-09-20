import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {bleDamages, bleTrunk, farineTrunk} from "../database/gateau"
import {vitBDamageEntry, vitCDamageEntry} from "../database/damageEntries"

describe('GET Damages', function () {

    beforeEach(init(api, ENV, cols))

    it('get damages', withTest({
        req: {
            url: `/api/tree/damage/${bleTrunk._id}`
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: bleDamages[0]._id},
                {path: "$[0].damageId", value: bleDamages[0].damageId},
                {path: "$[0].color", value: vitCDamageEntry.color},
                {path: "$[1]._id", value: bleDamages[1]._id},
                {path: "$[1].damageId", value: bleDamages[1].damageId},
                {path: "$[1].name", value: vitBDamageEntry.name},
                {path: "$[1].quantity.bqt", value: 0.15},
                {path: "$[1].quantity.g", value: vitBDamageEntry.g},
                {path: "$[1].quantity.eq", value: vitBDamageEntry.eq},
            ]
        }
    }))

    it('empty damages', withTest({
        req: {
            url: `/api/tree/damage/${farineTrunk._id}`
        },
        res: {
            body: []
        }
    }))


})
import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"

import {papierVA} from "../database/papier"
import {co2eDamageEntry, vitBDamageEntry, vitCDamageEntry} from "../database/damageEntries"
import {gateauTrunk} from "../database/gateau"

describe('GET DamageTank', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('damage tank papier A', withTest({
            req: {
                url: `/api/${ENV.NAME}Tank/${papierVA._id}`
            },
            res: {
                bodypath: [
                    {path: "$[0]._id", value: co2eDamageEntry._id},
                    {path: "$[0].name", value: co2eDamageEntry.name},
                    {path: "$[0].quantity.bqt", value: 21107},
                    {path: "$[0].quantity.g", value: co2eDamageEntry.g},
                ]
            }
        }
    ))
    
    it('damage tank gateau', withTest({
        req: {
            url: `/api/${ENV.NAME}Tank/${gateauTrunk._id}`,
        },
        res: {
            bodypath: [
                {path: "$[0]._id", value: vitCDamageEntry._id},
                {path: "$[0].name", value: vitCDamageEntry.name},
                {path: "$[0].quantity.bqt", value: 10},
                {path: "$[0].quantity.g", value: vitCDamageEntry.g},
                
                {path: "$[1]._id", value: vitBDamageEntry._id},
                {path: "$[1].name", value: vitBDamageEntry.name},
                {path: "$[1].quantity.bqt", value: 0.1},
                {path: "$[1].quantity.g", value: vitBDamageEntry.g},
                {path: "$[1].quantity.eq", value: vitBDamageEntry.eq},
            ]
        }
    }))

})


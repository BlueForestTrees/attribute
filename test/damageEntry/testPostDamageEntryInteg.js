import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"

import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {co2eDamageEntry} from "../database/damageEntries"
import {withError} from "test-api-express-mongo"


const badDamageEntry = {_id: createStringObjectId() + "984"}
const damageEntry = {_id: createObjectId(),name: "nomNewDamageEntry",g: "Dens",color: "#FFFFFF"}

describe('POST DamageEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('post new damage entry', withTest({
        req: {
            url: `/api/damageEntry`,
            method: "POST",
            body: damageEntry
        },
        db: {
            expected: {
                colname: cols.ATTRIBUTE_ENTRY,
                doc: damageEntry
            }
        }
    }))

    it('post existing damage entry', withTest({
        req: {
            method: "POST",
            url: "/api/damageEntry",
            body: co2eDamageEntry
        }, res: {
            code: 400,
            body: withError(1,"L'élément existe déjà")
        }
    }))

    it('refuse to create a bad damage entry', withTest({
        req: {
            url: "/api/damageEntry",
            method: "POST",
            body: badDamageEntry
        },
        res: {
            code: 400,
            bodypath: [
                {path: "$.errors.g.msg", value: "should be Mass, Dens, Long, Tran..."},
                {path: "$.errors.name.msg", value: "Invalid value"},
                {path: "$.errors.color.msg", value: "Invalid value"},
                {path: "$.errors._id.msg", value: "invalid mongo id"},
            ]
        },
        db: {
            expected: {
                colname: cols.ATTRIBUTE_ENTRY,
                missingDoc: badDamageEntry
            }
        }
    }))

})

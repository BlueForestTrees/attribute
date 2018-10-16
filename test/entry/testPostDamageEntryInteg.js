import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"

import {createStringObjectId, createObjectId} from "test-api-express-mongo"
import {co2eDamageEntry} from "../database/damageEntries"
import {withError} from "test-api-express-mongo"


const badDamageEntry = {_id: createStringObjectId() + "984"}
const damageEntry = {_id: createObjectId(),name: "nomNewDamageEntry",g: "Dens",color: "#FFFFFF"}

describe('POST AttrEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('post new attr entry', withTest({
        req: {
            url: `/api/${ENV.NAME}Entry`,
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

    it('post existing attr entry', withTest({
        req: {
            method: "POST",
            url: `/api/${ENV.NAME}Entry`,
            body: co2eDamageEntry
        }, res: {
            code: 400,
            body: withError(1,"allready exists")
        }
    }))

    it('refuse to create a bad attr entry', withTest({
        req: {
            url: `/api/${ENV.NAME}Entry`,
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

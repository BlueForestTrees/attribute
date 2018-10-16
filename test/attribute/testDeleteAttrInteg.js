import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {bleDamages, bleTrunk} from "../database/gateau"
import {oneDeletionOk} from "test-api-express-mongo"
import {authGod, authSimple} from "../database/users"

describe('DELETE attr', function () {

    beforeEach(init(api, ENV, cols))

    it('delete attr no auth', withTest({
        req: {
            url: `/api/${ENV.NAME}/${bleTrunk._id}/${bleDamages[0]._id}`,
            method: "DELETE"
        },
        res: {
            code: 401
        }
    }))

    it('delete attr bad auth', withTest({
        req: {
            url: `/api/${ENV.NAME}/${bleTrunk._id}/${bleDamages[0]._id}`,
            method: "DELETE",
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete attr', withTest({
        req: {
            url: `/api/${ENV.NAME}/${bleTrunk._id}/${bleDamages[0]._id}`,
            method: "DELETE",
            headers: authGod
        },
        res: {
            bodypath: [
                {path: "$.ok", value: 1},
                {path: "$.nModified", value: 1}
            ]
        },
        db: {
            expected: {
                colname: cols.TRUNK,
                doc: {
                    _id: bleTrunk._id,
                    bodypath: [
                        {path: `$.${ENV.NAME}.length`, value: 1},
                    ]
                }
            }
        }
    }))

})
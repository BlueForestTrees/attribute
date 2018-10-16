import api from "../../src"
import ENV from "../../src/env"
import {init, withTest} from "test-api-express-mongo"
import {cols} from "../../src/collections"
import {bleDamages} from "../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {authGod, authSimple} from "../database/users"

describe('PUT Attr', function () {


    beforeEach(init(api, ENV, cols))

    it('put attr', withTest({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4},
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
                    _id: bleDamages[0].trunkId,
                    bodypath: [
                        {path: `$.${ENV.NAME}[0].bqt`, value: 24},
                    ]
                }
            }
        }
    }))

    it('put attr no auth', withTest({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4}
        },
        res: {
            code: 401
        }
    }))

    it('put attr bad auth', withTest({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4},
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

})
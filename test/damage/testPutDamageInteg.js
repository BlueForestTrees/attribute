import api from "../../src"
import ENV from "../../src/env"
import {init, withTest} from "test-api-express-mongo"
import {cols} from "../../src/collections"
import {bleDamages} from "../database/gateau"
import {oneModifiedResponse} from "test-api-express-mongo"
import {authGod, authSimple} from "../database/users"

describe('PUT Damage', function () {

    beforeEach(init(api, ENV, cols))

    it('put damage', withTest({
        req: {
            url: `/api/tree/damage`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4},
            headers: authGod
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.DAMAGE,
                doc: {...bleDamages[0], bqt: bleDamages[0].bqt * 4}
            }
        }
    }))

    it('put damage no auth', withTest({
        req: {
            url: `/api/tree/damage`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4}
        },
        res: {
            code: 401
        }
    }))

    it('put damage bad auth', withTest({
        req: {
            url: `/api/tree/damage`,
            method: "PUT",
            body: {...bleDamages[0], bqt: bleDamages[0].bqt * 4},
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

})
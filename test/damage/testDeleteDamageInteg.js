import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {bleDamages} from "../database/gateau"
import {oneDeletionOk} from "test-api-express-mongo"
import {authGod, authSimple} from "../database/users"

describe('DELETE Damage', function () {

    beforeEach(init(api, ENV, cols))

    it('delete damage no auth', withTest({
        req: {
            url: `/api/damage/${bleDamages[0]._id}`,
            method: "DELETE"
        },
        res: {
            code: 401
        }
    }))

    it('delete damage bad auth', withTest({
        req: {
            url: `/api/damage/${bleDamages[0]._id}`,
            method: "DELETE",
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('delete damage', withTest({
        req: {
            url: `/api/damage/${bleDamages[0]._id}`,
            method: "DELETE",
            headers: authGod
        },
        res: {
            body: oneDeletionOk
        },
        db: {
            expected: {
                colname: cols.DAMAGE,
                missingDoc: {
                    _id: bleDamages[0]._id
                }
            }
        }
    }))

})
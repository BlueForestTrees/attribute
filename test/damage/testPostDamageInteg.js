import {assertDb} from "test-api-express-mongo"
import {init, request, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {prixDamageEntry} from "../database/damageEntries"
import {farineTrunk} from "../database/gateau"
import {oneResponse} from "test-api-express-mongo"
import {createObjectId} from "test-api-express-mongo"
import {authGod, authSimple, god} from "../database/users"

describe('POST Damage', function () {

    beforeEach(init(api, ENV, cols))

    const damage = {_id: createObjectId(), trunkId: farineTrunk._id, damageId: prixDamageEntry._id, bqt: 4}
    const damage2 = {_id: createObjectId(), trunkId: farineTrunk._id, damageId: prixDamageEntry._id, bqt: 4}

    let postDamageReq = damage => ({
        req: {
            url: `/api/tree/damage`,
            method: "POST",
            body: damage,
            headers: authGod
        },
        res: {
            body: oneResponse
        }
    })

    it('post damage no auth', withTest({
        req: {
            url: `/api/tree/damage`,
            method: "POST",
            body: damage
        },
        res: {
            code: 401
        }
    }))

    it('post damage bad auth', withTest({
        req: {
            url: `/api/tree/damage`,
            method: "POST",
            body: damage,
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it('post damage', withTest({
        ...postDamageReq(damage),
        db: {
            expected: {
                colname: cols.DAMAGE,
                doc: {...damage, oid:god._id}
            }
        }
    }))

    it('post two damages', withTest([
        postDamageReq(damage),
        postDamageReq(damage2),
        {
            db: {
                expected: {
                    list: [{
                        colname: cols.DAMAGE,
                        doc: {...damage, oid:god._id}
                    }, {
                        colname: cols.DAMAGE,
                        doc: {...damage2, oid:god._id}
                    }]
                }
            }
        }
    ]))

})
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

describe('POST Attr', function () {

    beforeEach(init(api, ENV, cols))

    const damage = {_id: createObjectId(), trunkId: farineTrunk._id, entryId: prixDamageEntry._id, bqt: 4}
    const damage2 = {_id: createObjectId(), trunkId: farineTrunk._id, entryId: prixDamageEntry._id, bqt: 4}

    let postAttReq = damage => ({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "POST",
            body: damage,
            headers: authGod
        },
        res: {
            bodypath: [
                {path: "$.ok", value: 1},
                {path: "$.upserted.length", value: 1}
            ]
        }
    })

    it('post attr no auth', withTest({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "POST",
            body: damage
        },
        res: {
            code: 401
        }
    }))

    it('post attr bad auth', withTest({
        req: {
            url: `/api/${ENV.NAME}`,
            method: "POST",
            body: damage,
            headers: authSimple
        },
        res: {
            code: 403
        }
    }))

    it(`post attr`, withTest({
        ...postAttReq(damage),
        db: {
            expected: {
                colname: cols.TRUNK,
                doc: {_id: damage.trunkId, [ENV.NAME]: [{...damage, oid: god._id}]}
            }
        }
    }))

    it('post two attr', withTest([
        {req: postAttReq(damage).req},
        {req: postAttReq(damage2).req},
        {
            db: {
                expected: {
                    colname: cols.TRUNK,
                    doc: {_id: damage.trunkId, [ENV.NAME]: [{...damage, oid: god._id}, {...damage2, oid: god._id}]}
                }
            }
        }
    ]))

})
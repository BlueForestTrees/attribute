import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {prixDamageEntry} from "../database/damageEntries"

describe('GET Damages entries', function () {

    beforeEach(init(api, ENV, cols))

    it(
        'search damage entry', withTest({
        req: {
            url: "/api/damageEntry?q=IP"
        },
        res: {
            body: [
                {
                    "_id": prixDamageEntry._id,
                    "name": "IPrix",
                    "g": "Coût",
                    "color": prixDamageEntry.color
                }
            ]
        }
    }))

})
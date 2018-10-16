import {init, withTest} from "test-api-express-mongo"
import api from "../../src"
import ENV from "../../src/env"
import {cols} from "../../src/collections"
import {prixDamageEntry} from "../database/damageEntries"

describe('GET Attr entries', function () {

    beforeEach(init(api, ENV, cols))

    it(
        'search attr entry', withTest({
        req: {
            url: `/api/${ENV.NAME}Entry?q=IP`
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
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {optionalValidQ} from "../../validations"
import {cols} from "../../collections"
import configure from "items-service"
import {col} from "mongo-registry"

const router = Router()
module.exports = router

const damageEntryService = configure(() => col(cols.DAMAGE_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/tree/damageEntry',
    optionalValidQ,
    run(({q}) => damageEntryService.search(
        [
            {key: "name", type: "regex", value: q}
        ],0, searchMixin))
)

router.get('/api/tree/damageEntry/:name',
    run(damageEntryService.findOne)
)
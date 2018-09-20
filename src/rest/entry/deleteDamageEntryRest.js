import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"

const router = Router()

module.exports = router

router.delete('/api/damageEntry', run(() => col(cols.DAMAGE_ENTRY)().deleteMany()))



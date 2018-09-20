import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import ENV from "./../../env"

const router = Router()

module.exports = router

router.delete(`/api/${ENV.NAME}Entry`, run(() => col(cols.ATTRIBUTE_ENTRY)().deleteMany()))



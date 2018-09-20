import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"

const router = Router()

module.exports = router

const attributes = ()=>col(cols.ATTRIBUTE_ENTRY)

router.delete(`/api/${ENV.NAME}Entry`, run(attributes().deleteMany))



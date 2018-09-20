import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import ENV from "./../../env"

import {run, Router} from 'express-blueforest'
import {validOwner, validPathId, validUser} from "../../validations"

const router = Router()

const attributes = col(cols.ATTRIBUTE)
const deleteAttribute = configure(() => attributes).deleteOne
module.exports = router

router.delete(`/api/${ENV.NAME}/:_id`,
    validPathId,
    validUser,
    validOwner(attributes),
    run(deleteAttribute)
)
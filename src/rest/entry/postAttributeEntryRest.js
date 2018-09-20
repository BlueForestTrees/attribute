import {validBodyColor, validBodyG, validId, validBodyName} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"
import ENV from "../../env"

const insertAttributeEntry = configure(() => col(cols.ATTRIBUTE_ENTRY)).insertOne

const router = Router()

module.exports = router

router.post(`/api/${ENV.NAME}Entry`,
    validId,
    validBodyName,
    validBodyG,
    validBodyColor,
    run(insertAttributeEntry)
)
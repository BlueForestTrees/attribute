import {Router,run} from 'express-blueforest'
import {col} from "mongo-registry"
import {cols} from "../../collections"
import {validBodyColor, validBodyG, validId, validBodyName} from "../../validations"
import ENV from "../../env"

const router = Router()

module.exports = router

router.post(`/api/${ENV.NAME}Entry`,
    validId,
    validBodyName,
    validBodyG,
    validBodyColor,
    run(facetEntry => col(cols.ATTRIBUTE_ENTRY).insertOne(facetEntry))
)
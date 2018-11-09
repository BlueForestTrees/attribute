import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {optionalValidG, optionalValidQ, optionnalAfterIdx, optionnalPageSize} from "../../validations"
import {cols} from "../../collections"
import configure from "items-service"
import {col} from "mongo-registry"
import ENV from "./../../env"
import {forEach} from "lodash"

const router = Router()
module.exports = router

const attributeEntryService = configure(() => col(cols.ATTRIBUTE_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get(`/api/${ENV.NAME}Entry`,
    optionalValidQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, g, aidx, ps}) => attributeEntryService.search(
        [
            {key: "name", type: "regex", value: q},
            {key: "quantity.g", value: g},
            {key: "_id", type: "gt", value: aidx}
        ], ps, searchMixin)),
    run(res => forEach(res, r => r.type = ENV.NAME))
)
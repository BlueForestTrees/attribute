import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {optionalValidQ} from "../../validations"
import {cols} from "../../collections"
import configure from "items-service"
import {col} from "mongo-registry"
import ENV from "./../../env"

const router = Router()
module.exports = router

const attributeEntryService = configure(() => col(cols.ATTRIBUTE_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get(`/api/${ENV.NAME}Entry`,
    optionalValidQ,
    run(o=>{console.log(o);return o}),
    run(({q}) => attributeEntryService.search(
        [
            {key: "name", type: "regex", value: q}
        ],0, searchMixin))
)
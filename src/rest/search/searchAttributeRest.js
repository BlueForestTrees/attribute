import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../collections"
import {col} from "mongo-registry"
import ENV from "./../../env"
import {map} from "lodash"
import {optionnalAfterIdx, optionnalPageSize, validPathAttributeId, validPathBqt, validPathId} from "../../validations"

const router = Router()
module.exports = router

const afterIdx = aidx => aidx !== undefined ? {trunkId: {$gt: aidx}} : {}

router.get(`/api/${ENV.NAME}Search/:bqt/:attId`,
    validPathBqt,
    validPathAttributeId,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({attId, bqt, aidx, ps}, req, res) => {
        res.locals.bqt = bqt
        return col(cols.ATTRIBUTE)
            .find({[ENV.NAME + "Id"]: attId, ...afterIdx(aidx)})
            .sort({trunkId: 1})
            .limit(ps)
            .toArray()
    }),
    run((facets, req, res) =>
        map(facets, f => ({_id: f.trunkId, bqt: res.locals.bqt / f.bqt}))
    )
)
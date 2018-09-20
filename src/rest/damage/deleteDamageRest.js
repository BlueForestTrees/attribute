import {cols} from "../../collections"
import {col} from "mongo-registry"
import configure from "items-service"

import {run, Router} from 'express-blueforest'
import {validOwner, validPathId, validUser} from "../../validations"

const router = Router()

const damages = col(cols.DAMAGE)
const deleteDamage = configure(() => damages).deleteOne
module.exports = router

router.delete('/api/damage/:_id',
    validPathId,
    validUser,
    validOwner(damages),
    run(deleteDamage)
)
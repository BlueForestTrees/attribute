import _, {reduce} from "lodash"

export const mergeListBy = field => items =>
    _(items)
        .groupBy(field)
        .map(sum)
        .value()

export const sum = items => reduce(items, mergeTwoItems)

export const mergeTwoItems = (left, right) =>
    left.bqt && right.bqt ?
        (left.bqt += right.bqt) && left
        :
        left.bqt ? left : right
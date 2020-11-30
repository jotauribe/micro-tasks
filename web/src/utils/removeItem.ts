import { negate as not, isEqual, filter } from 'lodash/fp'

const isNotEqual = item => not(isEqual(item))
const removeIten = item => filter(isNotEqual(item))

export default removeIten

import { isEqual } from 'lodash'
import removeItem from './removeItem'

const items = [
    { id: 1, name: 'One' },
    { id: 1, name: 'Second One' },
    { id: 2, name: 'Two' },
    { id: 2, name: 'Second Two' },
    { id: 3, name: 'Three' }
]

describe('removeItem util', () => {
    describe.each([
        null,
        undefined,
        { id: 1, name: 'one' },
        { id: 1, name: 'Two' },
        { id: 0, name: 'One' },
        { id: 2, name: 'Two', key: 'extra' }
    ])('when is call with an item (%s) not equal to any item in the list', item => {
        it('should not remove any item from the list', () => {
            const result = removeItem(item)(items)

            expect(items.length).toEqual(result.length)
            expect(isEqual(result, items)).toBeTruthy()
            expect(result.some(i => isEqual(i, item))).toBeFalsy()
        })
    })

    describe.each([
        { id: 1, name: 'One' },
        { id: 1, name: 'Second One' },
        { id: 2, name: 'Two' }
    ])('when is call with an item (%s) equal to some item in the list', item => {
        it('should remove the found items from the list', () => {
            const result = removeItem(item)(items)

            expect(isEqual(result, items)).toBeFalsy()
            expect(result.length).toEqual(items.length - 1)
            expect(result.some(i => isEqual(i, item))).toBeFalsy()
        })
    })
})

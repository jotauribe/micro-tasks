// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassDictionary = { [id: string]: any }
export type ClassArray = Array<ClassValue>
export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean
export type ClassNamesFn = (...classes: ClassValue[]) => string

const forEachKey = (fn: (key: string) => void, o: ClassDictionary) => {
    for (const key in o) {
        if (o.hasOwnProperty(key) && o[key]) fn(key)
    }
}

const classNamesWithPrefix = (prefix: string): ClassNamesFn => {
    const addPrefix = (value: number | string) => `${prefix}__${value}`
    return function classNames(...args: ClassValue[]): string {
        const classes = args.reduce((classList: ClassValue[], value: ClassValue) => {
            const isNumberOrString = typeof value === 'string' || typeof value === 'number'

            if (!value) return classList
            else if (isNumberOrString) return classList.concat(addPrefix(value as string | number))
            else if (Array.isArray(value)) return classList.concat(classNames(value))
            else if (typeof value === 'object') {
                const addToClassList = (key: string) => classList.push(addPrefix(key))
                forEachKey(addToClassList, value)
                return classList
            }
            return classList
        }, [])

        return [prefix, ...classes].join(' ')
    }
}

export default classNamesWithPrefix

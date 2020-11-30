import { MouseEvent } from 'react'

type Handler = (...args: any[]) => void

const handleWithoutPropagation = (handler: Handler) => (e: MouseEvent) => {
    e.stopPropagation()
    handler()
}

export default handleWithoutPropagation

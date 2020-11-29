import { useState, useEffect } from 'react'

export type ResponseConsumer = (args: Array<any>) => void
export type WithLocalUpdater = { updateLocally: (data: any) => void }
export type ServiceResponse = { isLoading?: boolean; error?: any; data?: any }
export type Options = {
    runOnMount: boolean
    onError?: ResponseConsumer
    onSuccess?: ResponseConsumer
}

const initialState = { isLoading: false }

const useAsyncService = (service, options?: Options): [any, ServiceResponse & WithLocalUpdater] => {
    const [error, setError] = useState()
    const [state, setState] = useState<ServiceResponse>(initialState)

    const { onError, onSuccess, runOnMount } = options || {}
    const updateState = (data = {}) => setState({ ...state, ...data })
    const updateLocally = data => setState({ ...state, data })

    const execute = (...args) => {
        setState({ ...state, isLoading: true })
        return service(...args)
            .then(response => {
                if (onSuccess) onSuccess(response)
                updateState({ isLoading: false, data: response })
                return response
            })
            .catch(e => {
                setError(e)
                if (onError) onError(e)
                updateState({ isLoading: false })
            })
    }

    useEffect(() => {
        if (runOnMount) execute()
    }, [])

    return [execute, { ...state, error, updateLocally }]
}

export default useAsyncService

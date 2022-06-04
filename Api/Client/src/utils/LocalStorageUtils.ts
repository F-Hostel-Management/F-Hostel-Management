const getItem = (key: string): any => {
    if (typeof localStorage !== 'undefined') {
        let item = localStorage.getItem(key)
        if (!item) {
            localStorage.setItem(key, '')
            return localStorage.getItem(key)
        }
        return JSON.parse(item || '{}')
    }
    return undefined
}

const setItem = (key: string, value: any): void => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const removeItem = (key: string): void => {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
    }
}

const clear = (): void => {
    if (typeof localStorage !== 'undefined') {
        localStorage.clear()
    }
}

export { getItem, setItem, removeItem, clear }

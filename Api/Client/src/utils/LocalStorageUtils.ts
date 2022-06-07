const getItem = (key: string): any => {
    let item = localStorage.getItem(key)
    return item
}

const setItem = (key: string, value: any): void => {
    localStorage.setItem(key, value)
}

const removeItem = (key: string): void => {
    localStorage.removeItem(key)
}

const clear = (): void => {
    localStorage.clear()
}

export { getItem, setItem, removeItem, clear }

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price)
}

export const replaceAllCharInString = (value: string, char: string) => {
    while (value.indexOf(',') >= 0) {
        value = value.replace(char, '')
    }

    return value
}

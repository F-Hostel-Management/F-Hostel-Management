function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
}

export const formatDate = (date = new Date()): string => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-')
}

export const getDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = padTo2Digits(date.getDate())
    const month = padTo2Digits(date.getMonth() + 1)
    const year = padTo2Digits(date.getFullYear())
    return [day, month, year]
}

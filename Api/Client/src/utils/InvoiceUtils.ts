interface IParams {
    content: string
    quantity: number
    unitPrice: number
}
export const parseContent = (data: string): IParams => {
    try {
        const content = data.substring(0, data.indexOf('(') - 1)
        const sub = data.substring(data.indexOf('(') + 1, data.lastIndexOf(')'))
        const splitter = sub.split('*')
        return {
            content,
            quantity: Number(splitter[0]),
            unitPrice: Number(splitter[1]),
        }
    } catch (error) {
        return { content: '', quantity: 1, unitPrice: 0 }
    }
}

export const formatContent = ({
    content,
    quantity,
    unitPrice,
}: IParams): string => {
    return `${content} (${quantity}*${unitPrice})`
}

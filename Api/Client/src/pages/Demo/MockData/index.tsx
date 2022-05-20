const data: IData[] = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 10 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export interface IData {
    id: number | null
    lastName: string | null
    firstName: string | null
    age: number | null
}

export const getRows = (page: number, pageSize: number): IData[] => {
    const start = (page - 1) * pageSize
    const end = page * pageSize < data.length ? page * pageSize : data.length
    const result: IData[] = data.slice(start, end)
    return result
}

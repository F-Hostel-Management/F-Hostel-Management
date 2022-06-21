import moment from 'moment'
import { IUser } from '../interface/IUser'
import { RestCaller } from './../utils/RestCaller'
const getUserById = async (id: string): Promise<IUser | null> => {
    const response = await RestCaller.get('Users/' + id)
    if (!response || response.isError) return null
    const result: IUser = response.result
    result.dateOfBirth = moment(result.dateOfBirth).format('YYYY-MM-DD')
    return result
}

export { getUserById }

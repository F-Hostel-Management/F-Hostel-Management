import { IUser } from '../interface/IUser'
import { setCurrentUser } from '../slices/authSlice'
import { store } from '../stores/reduxStore'
import { RestCaller } from '../utils/RestCaller'

export const doGetProfile = async () => {
    const response = await RestCaller.get('Users/info')

    if (!response || response.isError) return

    const result: IUser = response.result
    store.dispatch(setCurrentUser(result))
}

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppState, AppDispatch } from '../stores/reduxStore'

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

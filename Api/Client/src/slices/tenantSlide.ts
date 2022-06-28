import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoomTenant } from '../interface/IRoomTenant'
import { countTenantsOfHostel, getAllTenants } from '../services/TenantService'

interface ITenantState {
    tenantList: IRoomTenant[]
    numOfTenants: number
    isFetchingTenants: boolean
}

const initialState: ITenantState = {
    tenantList: [],
    numOfTenants: 0,
    isFetchingTenants: true,
}

interface IParamsFetch {
    hostelId: string
    pageSize: number
    page: number
}
export const fetchTenantList = createAsyncThunk(
    'tenant/fetchTenantList',
    async (params: IParamsFetch) => {
        const { hostelId, pageSize, page } = params
        return {
            tenants: await getAllTenants(hostelId, pageSize, page),
            numOfTenants: await countTenantsOfHostel(hostelId),
        }
    }
)

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        setTenantList: (
            state: ITenantState,
            action: PayloadAction<IRoomTenant[]>
        ) => {
            state.tenantList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenantList.fulfilled, (state, action) => {
                state.tenantList = action.payload.tenants
                state.numOfTenants = action.payload.numOfTenants
                state.isFetchingTenants = false
            })
            .addCase(fetchTenantList.pending, (state) => {
                state.isFetchingTenants = true
            })
            .addCase(fetchTenantList.rejected, (state) => {
                state.isFetchingTenants = false
            })
    },
})

export const { setTenantList } = tenantSlice.actions

const { reducer } = tenantSlice
export default reducer

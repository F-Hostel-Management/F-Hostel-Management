import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFacility } from '../interface/IFacility'
import { ODataCaller } from '../utils/ODataCaller'
const { createBuilder, get } = ODataCaller
interface FacilityState {
    facilityList: IFacility[]
    isFetchingList: boolean
}
const initialState: FacilityState = {
    facilityList: [],
    isFetchingList: true,
}
export const fetchFacility = createAsyncThunk(
    'facility/fetch',
    async (hostelId: string) => {
        const builder = createBuilder<IFacility>()
            .select('id', 'name', 'type', 'quantity', 'price')
            .filter((e) => e.hostelId.equals(hostelId))
        const result = await get('Facility', builder)
        return result
    }
)

const facilitySlice = createSlice({
    name: 'facility',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFacility.fulfilled, (state, action) => {
                state.facilityList = action.payload
                state.isFetchingList = false
            })
            .addCase(fetchFacility.pending, (state) => {
                state.isFetchingList = true
            })
            .addCase(fetchFacility.rejected, (state) => {
                state.isFetchingList = false
            })
    },
})

// export const {} = facilitySlice.actions

export default facilitySlice.reducer

import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IFacility } from '../../interface/IFacility'
import { fetchFacility, fetNumFacility } from '../../slices/facilitySlice'
import { ERole } from '../../utils/enums'
import { formatPrice } from '../../utils/FormatPrice'
import { getItem } from '../../utils/LocalStorageUtils'
import { ODataCaller } from '../../utils/ODataCaller'
import ActionButtons from './components/ActionButtons'
import CreateFacilityDialog from './components/CreateFacilityDialog'
import ToolbarChildren from './components/ToolbarChildren'
const { createBuilder, get } = ODataCaller
interface IFacilitiesProps {}
const getListFacility = async (hostelId: string) => {
    const builder = createBuilder<IFacility>()
        .select('id', 'name', 'type', 'quantity', 'price')
        .filter((e) => e.hostelId.equals(hostelId))
    const result = await get('Facility', builder)
    return result
}
const Facilities: FC<IFacilitiesProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn, renderValueGetter } = useGridData()
    const hostelId = getItem('currentHostelId')
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(({ table }) => table.page)
    const totalRow = useAppSelector(({ facility }) => facility.numberOfFacility)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    // const [rows, setRows] = useState<IFacility[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    const loading = useAppSelector((state) => state.facility.isFetchingList)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const rows = useAppSelector((e) => e.facility.facilityList)
    const columns: GridColDef[] = [
        // createColumn('id', 'Code', 70),
        createColumn('name', 'Facility Name', 400),
        createColumn('type', 'Category', 200),
        createColumn('quantity', 'Quantity', 200),
        renderValueGetter('price', 'Price', 120, (params) =>
            formatPrice(params.price as number)
        ),
        renderCell('actions', 'Actions', 130, ActionButtons),
    ]

    useEffect(() => {
        dispatch(fetchFacility({ hostelId, currentPage, currentPageSize }))
        dispatch(fetNumFacility(hostelId))
    }, [currentPage, currentPageSize, hostelId, dispatch])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Facilities"
                iconName="facility"
                rows={rows}
                columns={columns}
                rowsCount={totalRow}
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {openCreate && (
                <CreateFacilityDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                    // reloadData={() =>)}
                />
            )}
        </Fragment>
    )
}

export default Facilities

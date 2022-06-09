import * as React from 'react'

import { MenuItem, Select, Typography } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import {
    gridPageCountSelector,
    gridPageSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid'

import * as Styled from './styles'

interface ICustomPaginationProps {
    rowsPerPageOptions: number[]
    pageSize: number
    setPageSize: any
}

const CustomPagination: React.FunctionComponent<ICustomPaginationProps> = ({
    rowsPerPageOptions,
    pageSize,
    setPageSize,
}) => {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector) + 1
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const rowsCount = useGridSelector(apiRef, gridRowCountSelector)

    const handleChangePageSize = (event: { target: { value: any } }) => {
        setPageSize(event.target.value)
        apiRef.current.setPageSize(event.target.value)
    }
    return (
        <Styled.Container>
            <Typography variant="caption" style={{ paddingLeft: '8px' }}>
                Showing {(page - 1) * pageSize + 1} to{' '}
                {page * pageSize < rowsCount ? page * pageSize : rowsCount} of{' '}
                {rowsCount} entries
            </Typography>

            <Styled.PagingWrapper>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="caption"
                        style={{ paddingRight: '8px' }}
                    >
                        Rows per page:{' '}
                    </Typography>
                    <Select
                        value={pageSize}
                        onChange={handleChangePageSize}
                        size="small"
                        style={{
                            width: '70px',
                            height: '30px',
                            fontSize: '1.3rem',
                        }}
                    >
                        {rowsPerPageOptions.map((option, index) => (
                            <MenuItem
                                key={index}
                                value={option}
                                style={{
                                    fontSize: '1.3rem',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <Pagination
                    color="primary"
                    count={pageCount}
                    page={page}
                    onChange={(event, value) =>
                        apiRef.current.setPage(value - 1)
                    }
                    size="small"
                />
            </Styled.PagingWrapper>
        </Styled.Container>
    )
}

export default CustomPagination

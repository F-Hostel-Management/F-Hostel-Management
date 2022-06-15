import * as React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { CircularProgress, Divider, IconButton, Paper } from '@mui/material'

import * as Styled from './styles'

interface ISearchInputProps {
    loading?: boolean
    width?: string
    height?: string
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
    loading = true,
    width = '300px',
    height = '40px',
}) => {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: width,
                height: height,
                borderRadius: '100px',
            }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="submit" type="submit">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <Styled.InputBase
                sx={{ ml: 1, flex: 1, fontSize: '1.3rem', padding: 0 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                size="small"
            />
            {loading && (
                <CircularProgress
                    color="inherit"
                    style={{
                        width: '13px',
                        height: '13px',
                        marginRight: '16px',
                    }}
                />
            )}
        </Paper>
    )
}

export default SearchInput

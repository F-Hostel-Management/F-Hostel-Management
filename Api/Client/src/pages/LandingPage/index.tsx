import * as React from 'react'

import { Button, Typography } from '@mui/material'

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
    return (
        <div>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">body1</Typography>
            <Typography variant="body2">body2</Typography>
            <Typography variant="caption">caption</Typography>
            <Button variant="contained" color="primary">
                Button
            </Button>
        </div>
    )
}

export default LandingPage

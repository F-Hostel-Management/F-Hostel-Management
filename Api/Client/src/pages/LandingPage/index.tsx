import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from '@mui/material'
import * as React from 'react'

import HeaderLandingPage from '../../components/Header/HeaderLandingPage'
import * as Styled from './styles'
import sample from '../../assets/images/sample.png'
import serviceIcon1 from '../../assets/images/service_1.png'
import { Link } from 'react-router-dom'
import FooterLandingPage from '../../components/Footer/FooterLandingPage'
import './style.css'

interface ILandingPageProps {}

const services = [
    {
        icon: serviceIcon1,
        title: 'Facility',
        description:
            'Lorem ipsum is a dummy text used by a lot of typographers and by the web industry.',
    },
    {
        icon: serviceIcon1,
        title: 'Facility',
        description:
            'Lorem ipsum is a dummy text used by a lot of typographers and by the web industry.',
    },
    {
        icon: serviceIcon1,
        title: 'Facility',
        description:
            'Lorem ipsum is a dummy text used by a lot of typographers and by the web industry.',
    },
    {
        icon: serviceIcon1,
        title: 'Facility',
        description:
            'Lorem ipsum is a dummy text used by a lot of typographers and by the web industry.',
    },
    {
        icon: serviceIcon1,
        title: 'Facility',
        description:
            'Lorem ipsum is a dummy text used by a lot of typographers and by the web industry.',
    },
]

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
    return (
        <React.Fragment>
            <Styled.Main>
                <HeaderLandingPage />
                <Styled.ContentMain>
                    <Typography
                        variant="h3"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'grey.800',
                            textDecoration: 'none',
                        }}
                    >
                        Hostel Management System
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 3,
                            color: 'grey.600',
                        }}
                    >
                        A completely new way to manage your hostel
                    </Typography>
                    <div>
                        <Link to="/register" className="link">
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    mx: 1,
                                    px: 6,
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/login" className="link">
                            <Button
                                variant="contained"
                                size="large"
                                href="/login"
                                sx={{
                                    mx: 1,
                                    px: 6,
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </Styled.ContentMain>
            </Styled.Main>

            <Styled.About id="About">
                <Styled.ContentAbout>
                    <Typography
                        variant="h3"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'grey.800',
                            textDecoration: 'none',
                        }}
                    >
                        Hostel Management System
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 3,
                            color: 'grey.600',
                        }}
                    >
                        A completely new way to manage your hostel
                    </Typography>
                    <div>
                        <Link to="/register" className="link">
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    mx: 1,
                                    px: 6,
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>

                        <Link to="/login" className="link">
                            <Button
                                variant="contained"
                                size="large"
                                href="/login"
                                sx={{
                                    mx: 1,
                                    px: 6,
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                    <Styled.ImageAbout>
                        <img src={sample} width="100%" height="auto" />
                    </Styled.ImageAbout>
                </Styled.ContentAbout>
            </Styled.About>

            <Styled.Services id="Services">
                <Styled.CardServices>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {services.map((service, index) => (
                            <Grid key={index} item xs={12} sm={4} md={4}>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <img src={service.icon} />
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {service.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {service.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Styled.CardServices>
            </Styled.Services>

            <FooterLandingPage />
        </React.Fragment>
    )
}

export default LandingPage

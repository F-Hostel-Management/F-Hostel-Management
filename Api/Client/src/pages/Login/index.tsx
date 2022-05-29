import { Button, Grid, Typography } from '@mui/material'
import * as React from 'react'

import * as Styled from './styles'
import GoogleIcon from '../../assets/images/GoogleLogo.svg'
import FacebookLogo from '../../assets/images/FacebookLogo.svg'
import TwitterLogo from '../../assets/images/TwitterLogo.svg'

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
    return (
        <Styled.Login>
            <Styled.Form>
                <Styled.PaperLogin>
                    <Typography
                        variant="h3"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'grey.800',
                            textDecoration: 'none',
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 3,
                            color: 'grey.600',
                        }}
                    >
                        Please sign in to your account with
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            mb: 1,
                            backgroundColor: '#ffffff',
                            color: 'grey.600',
                            justifyContent: 'left',
                            '&:hover': { background: '#ffffff' },
                        }}
                    >
                        <Grid container sx={{ height: '40px' }}>
                            <Grid item xs={3}>
                                <img src={GoogleIcon} width="40px"></img>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Google
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            mb: 1,
                            backgroundColor: '#1D9BF0',
                            color: '#ffffff',
                            justifyContent: 'left',
                            '&:hover': { background: '#1D9BF0' },
                        }}
                    >
                        <Grid container sx={{ height: '40px' }}>
                            <Grid item xs={3}>
                                <img src={TwitterLogo} width="49px"></img>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        color: 'white',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Twitter
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            mb: 1,
                            backgroundColor: '#3B5998',
                            color: '#ffffff',
                            justifyContent: 'left',
                            '&:hover': { background: '#3B5998' },
                        }}
                    >
                        <Grid container sx={{ height: '40px' }}>
                            <Grid item xs={3}>
                                <img src={FacebookLogo} width="20px"></img>
                            </Grid>
                            <Grid
                                item
                                xs={9}
                                alignContent="center"
                                justifyItems="center"
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        color: 'white',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Facebook
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Styled.PaperLogin>
            </Styled.Form>
        </Styled.Login>
    )
}

export default Login

import { Grid, Typography } from '@mui/material'
import * as React from 'react'
import * as Styled from './styles'

interface IFooterLandingPageProps {}

export const FooterLandingPage: React.FunctionComponent<
    IFooterLandingPageProps
> = () => {
    return (
        <Styled.Contact id="Contacts">
            <Styled.ContentContact>
                <Grid container>
                    <Grid item xs={12} sm={4} paddingRight={5}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: '#ffffff',
                                textDecoration: 'none',
                            }}
                        >
                            F-HOSTEL
                        </Typography>
                        <div>
                            <Typography variant="body2" color="#c5c5c5">
                                Together with experienced IT experts, we
                                research and design the optimal hotel management
                                software suitable for many different management
                                models, with many outstanding features.
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} paddingRight={5}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: '#ffffff',
                                textDecoration: 'none',
                            }}
                        >
                            F-HOSTEL
                        </Typography>
                        <div>
                            <Typography variant="body2" color="#c5c5c5">
                                Simple and intelligent interface, helping to
                                manage the inn anytime, anywhere with absolutely
                                secure data, control real-time sales and
                                maximize operating costs.
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4} paddingRight={5}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                fontWeight: 600,
                                color: '#ffffff',
                                textDecoration: 'none',
                                mb: 1,
                            }}
                        >
                            Contacts
                        </Typography>
                        <div>
                            <Typography
                                variant="body2"
                                color="#c5c5c5"
                                paddingBottom={1}
                            >
                                FPT University TP.HCM, D1 Street, Long Thanh My,
                                Thu Duc City, Ho Chi Minh City
                            </Typography>
                            <Typography
                                variant="body2"
                                color="#c5c5c5"
                                paddingBottom={1}
                            >
                                849 999 9999
                            </Typography>
                            <Typography
                                variant="body2"
                                color="#c5c5c5"
                                paddingBottom={1}
                            >
                                f.hostel@gmail.com
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    color="#c5c5c5"
                    sx={{
                        textAlign: 'center',
                        mt: 7,
                    }}
                >
                    © Copyright 2022 by Fhostel.team
                </Typography>
            </Styled.ContentContact>
        </Styled.Contact>
    )
}

export default FooterLandingPage

import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RestCaller } from '../../../../utils/RestCaller'
import { showError, showSuccess } from '../../../../utils/Toast'

type Props = {}

export const InvitationDetail = (props: Props) => {
    let [searchParams, setSearchParams] = useSearchParams()
    let token = searchParams.get('Token')
    let navigate = useNavigate()
    useEffect(() => {
        if (token) {
            RestCaller.get(`HostelManagements/confirm?Token=${token}`).then(
                (e) => {
                    if (e.isError) {
                        showError(e.result)
                    } else showSuccess(e.result)
                    setTimeout(() => {
                        navigate('/home', { replace: true })
                    }, 3000)
                }
            )
        }
    }, [token])

    return <div>Loading...</div>
}

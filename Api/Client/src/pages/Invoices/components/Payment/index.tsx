import { Button, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaidIcon from '@mui/icons-material/Paid'
import { RestCaller } from '../../../../utils/RestCaller'
interface IPaymentProps {
    invoiceId?: string
}

export const Payment = (props: IPaymentProps) => {
    const [value, setValue] = useState('')
    const getPaymentUrlAsync = async () => {
        let res = await RestCaller.post(
            `Invoices/create-vnpay?invoiceId=${props.invoiceId}`
        )
        setValue(res.result)
    }
    useEffect(() => {
        getPaymentUrlAsync()
    }, [props.invoiceId])
    const handleVnPayClick = () => {}
    return (
        <>
            <Link href={value}>
                <Button
                    variant="contained"
                    endIcon={<PaidIcon sx={{ fontSize: '1.3rem' }} />}
                >
                    Pay the bill
                </Button>{' '}
            </Link>
        </>
        // <IconButtonCustom
        //     textColor="#fff"
        //     bgrColor="#495057"
        //     sx={{ width: '2.8rem', height: '2.8rem' }}
        //     // onClick={handleOpenUpdate}
        // >
        //     <Edit sx={{ fontSize: '1.3rem' }} />
        //     Send
        // </IconButtonCustom>
    )
}

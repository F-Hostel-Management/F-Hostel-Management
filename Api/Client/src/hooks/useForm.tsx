import React, { ChangeEvent, FC, useState } from 'react'

export function useForm<Type>(initialValue: Type) {
    const [values, setValues] = useState(initialValue)
    const [errors, setErrors] = useState({})

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target
        setValues({
            ...values,
            [name]: value && type == 'number' ? Number(value) : value,
        })
        // if (validateOnChange) {

        // }
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.checked })
    }

    const resetForm = () => {
        setValues(initialValue)
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleCheckboxChange,
        resetForm,
    }
}

interface IFormProps {
    children: any
    [x: string | number | symbol]: unknown
}

export const Form: FC<IFormProps> = ({ children, ...others }) => {
    return (
        <form autoComplete="off" {...others}>
            {children}
        </form>
    )
}

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const useRouter = () => {
    const [params, _] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const getRedirectParam = () => {
        return params.get('redirect')
    }

    const navigateWithRedirect = (url: string) => {
        let path = url
        const redirect = getRedirectParam()
        if (redirect) path += `?redirect=${redirect}`
        navigate(path)
    }

    const navigateWithoutRedirect = (url: string) => {
        navigate(url)
    }

    const getGoBackWithRedirect = (url: string): string => {
        const redirect = getRedirectParam()
        if (redirect) return redirect
        return url
    }

    const getGoForwardWithRedirect = (url: string): string => {
        const redirect = location.pathname
        if (redirect) return `${url}?redirect=${redirect}`
        return url
    }

    return {
        getRedirectParam,
        navigateWithRedirect,
        navigateWithoutRedirect,
        getGoBackWithRedirect,
        getGoForwardWithRedirect,
    }
}

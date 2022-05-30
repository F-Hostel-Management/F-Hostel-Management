import { o, OdataQuery, OHandler } from 'odata'
import { HttpErrorToast } from './HttpErrorToast'

const baseURL = '/odata/'
const handler: OHandler = o('')

export const ODataCaller = {
    get: (path: string, query?: OdataQuery) =>
        handler
            .get(baseURL + path)
            .query(query)
            .catch((err) => HttpErrorToast.show(err?.status)),
}

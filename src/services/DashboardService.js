/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_transactions(start_date = '', last_date = '') {
        return axios_service.get(`/api/dashboards?start_date=${start_date}&last_date=${last_date}`)
    }
}
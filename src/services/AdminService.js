/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_admin_edit(admin_id) {
        return axios_service.get(`/api/admins/${admin_id}/edit`)
    },

    put_admin(admin_id, admin_body_data) {
        return axios_service.post(`/api/admins/${admin_id}`, admin_body_data)
    }
}
import { AppConfig } from "config/AppConfig"
import { API_ENTITY_ATTACHMENT_DOWNLOAD } from "Routes/apiRoutes"

export const getEntityAttachmentUrl = (id: number) => {
    return AppConfig.API_BASE_URL + API_ENTITY_ATTACHMENT_DOWNLOAD + '/' + id;
}

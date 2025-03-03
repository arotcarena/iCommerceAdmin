import { API_ENTITY_ATTACHMENT, API_ENTITY_ATTACHMENTS } from "Routes/apiRoutes";
import { getFileNameWithoutExtension } from "functions/files/extensionResolver";
import { EntityAttachment } from "type/entityTypes";
import { useApiRequest } from "../useApiRequest";

export const useGetAllEntityAttachments = (): ((entityName: string, id: number) => Promise<EntityAttachment[]>) => {
    const doApiRequest = useApiRequest();

    const getAllEntityAttachments = (entityName: string, entityId: number) => {
        return doApiRequest<EntityAttachment[]>(API_ENTITY_ATTACHMENT + '/' + entityName + '/' + entityId, {}, 'GET');
    }

    return getAllEntityAttachments;
};

export const usePostEntityAttachments = (type?: string): ((fileBase64: string, fileName: string, entityId?: number) => Promise<EntityAttachment>) => {
    const doApiRequest = useApiRequest();

    const postEntityAttachments = (fileBase64: string, fileName: string, entityId?: number) => {
        return doApiRequest<EntityAttachment>(
            API_ENTITY_ATTACHMENTS, 
            {
                file: fileBase64, 
                name: getFileNameWithoutExtension(fileName),
                type,
                entityId,
            },
            'POST',
        );
    }

    return postEntityAttachments;
};

export const useDeleteEntityAttachments = (): ((id: number) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const deleteEntityAttachments = (id: number) => {
        return doApiRequest<any>(API_ENTITY_ATTACHMENTS + '/' + id, {}, 'DELETE');
    }

    return deleteEntityAttachments;
};

import { useQuery } from "@tanstack/react-query";
import { useGetAllEntityAttachments } from "functions/customHooks/api/queries/entityAttachmentsQueries";
import { useToggleState } from "functions/customHooks/state/useToggleState";
import { getEntityAttachmentUrl } from "functions/files/entityAttachmentUrlResolver";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { EntityAttachment } from "type/entityTypes";

type Props = {
    entityName: string,
    entityId: number,
    color?: string,
    additionalButtons?: {[type: string]: ReactNode},
};

export const EntityAttachmentsDownloader = ({
    entityName,
    entityId,
    color = 'secondary',
    additionalButtons,
}: Props) => {
    const {t} = useTranslation();

    const getAllEntityAttachments = useGetAllEntityAttachments();
    const {data: entityAttachments} = useQuery({
        queryKey: ['get_all_entity_attachments', entityName, entityId],
        queryFn: () => getAllEntityAttachments(entityName, entityId),
        initialData: []
    });

    const [isOpen, toggle] = useToggleState(false);

    const entityAttachmentsByType: {[key: string]: EntityAttachment[]} = useMemo(() => {
        let eaByType: {[key: string]: EntityAttachment[]} = {};
        for(const ea of entityAttachments) {
            let key = ea.type ?? 'other';
            if(eaByType[key]) {
                eaByType[key].push(ea);
            } else {
                eaByType[key] = [ea];
            }
        }
        return eaByType;
    }, [entityAttachments]);

    const countEntityAttachments = entityAttachments.length;

    if(countEntityAttachments < 1) {
        return;
    }

    return (
        <Dropdown size="md" isOpen={isOpen} toggle={toggle}>
            <DropdownToggle tag="button" type="button" className={'btn btn-' + color}>
                {t('entity_attachments_count', {count: countEntityAttachments})}
                <i className="ri ri-arrow-drop-down-fill ri-xl"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                <div className="d-flex flex-column gap-2">
                    {
                        Object.entries(entityAttachmentsByType).map(([type, entityAttachments], index) => (
                            <div key={index}>
                                <div className="py-1 px-3" style={{fontSize: '.8em', fontWeight: 600}}>
                                    {
                                        t(type, {count: entityAttachments.length})
                                    }
                                </div>
                                {
                                    entityAttachments.map((entityAttachment: EntityAttachment, index) => (
                                        <DropdownItem className='py-1 px-3' key={index} title={entityAttachment.description}>
                                            <a 
                                                key={index}
                                                href={getEntityAttachmentUrl(entityAttachment.id)}
                                                target="_blank"
                                            >
                                                <i className="ri-download-line align-bottom me-1"></i>
                                                {' '}
                                                {
                                                    entityAttachment.fileName
                                                }
                                            </a>
                                        </DropdownItem>
                                    ))
                                }
                                {
                                    additionalButtons && additionalButtons[type] && (
                                        additionalButtons[type]
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </DropdownMenu>
        </Dropdown>
    )
}

import { createExcerpt } from "functions/stringHelpers/excerptMaker";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";

type Props = PropsWithChildren<{
    show: boolean,
    onDeleteClick: () => void,
    onCloseClick: () => void,
    item?: {id: number, [key: string]: any},
    label?: string,
}>;

export const DeleteModal = ({ 
    show, 
    onDeleteClick, 
    onCloseClick,
    item,
    label,
    children
}: Props) => {
  const {t} = useTranslation();

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{t('question.sure')}</h4>
            <p className="text-muted mx-4 mb-0">
              {children ?? t('confirm.remove_record')}
            </p>
            <div className="mt-3 mb-4 fw-bold">
              {
                label ?? (
                  item && <ItemSummary item={item} />
                )
              }
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            {t('close')}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
            {t('confirm.delete')}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};


const ItemSummary = ({item}: {item: {id: number, [key: string]: any}}) => {
  const {t} = useTranslation();

  let lines = [];
  for(let [key, value] of Object.entries(item)) {
    if(!key.includes('@')) {
      if(typeof value === 'string') {
        value = createExcerpt(value, 30);
        lines.push('<strong>' + t(key) + ':</strong> ' + value);
      }
    }
  }
  const htmlContent = lines.join('<br/>');

  return (
    <div style={{marginTop: '20px'}} dangerouslySetInnerHTML={{__html: htmlContent}} />
  );
}
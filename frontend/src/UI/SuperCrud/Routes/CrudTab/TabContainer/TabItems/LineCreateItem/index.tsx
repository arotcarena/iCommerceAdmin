import { useOpenState } from "functions/customHooks/state/useOpenState";
import { usePostItem } from "functions/customHooks/api/queries/itemQueries";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { useAlert } from "Components/Contexts/AlertContext";
import { useTranslation } from "react-i18next";
import { LineCreateForm } from "./LineCreateForm";
import { useFormValidation } from "functions/customHooks/form/useFormValidation";
import { useLineCreateFocus } from "functions/customHooks/CRUD/CrudTab/useLineCreateFocus";
import { useRef } from "react";

export const LineCreateItem = () => {
  
    const {t} = useTranslation();
    
    const {
      columns,
      writeEndpoint,
      forceFetch,
      parentIri,
      parentPropertyName,
      customValidation,
      dataTransformerFn,
      globalContext: {isDeletable}
    } = useSuperCrud();
    
    const {createAlert} = useAlert();
  
    const [controlsAreOpen, openControls, closeControls] = useOpenState(false);

    const postItem = usePostItem(writeEndpoint, columns, parentIri, parentPropertyName);
    const mutationFn = (formData: any) => {
      return postItem(formData);
    };
    const handleSubmitSuccess = () => {
        forceFetch();
        createAlert('success', t('success.item_create'));
        resetForm();
    };

    const {validation, resetForm} = useFormValidation(
      columns,
      mutationFn,
      handleSubmitSuccess,
      undefined,
      undefined,
      undefined,
      dataTransformerFn,
      customValidation,
    );

    const trRef = useRef<HTMLTableRowElement>(null);
    useLineCreateFocus(trRef.current);

    return (
      <tr onMouseOver={openControls} onMouseLeave={closeControls} className="tab-create-line" ref={trRef}>
        {
          isDeletable && (
            <td></td>
          )
        }
        <LineCreateForm
          columns={columns}
          validation={validation}
        />
        <td className={'tab-controls' + (controlsAreOpen ? ' open': '')}>
          <button onClick={validation.handleSubmit} type="button" className="btn btn-primary tab-control-lonely">
            <i className="ri-add-fill ri-xl"></i>
          </button>
        </td>
      </tr>
    )
}
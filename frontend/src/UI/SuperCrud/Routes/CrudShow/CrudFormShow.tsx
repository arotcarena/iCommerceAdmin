import { CrudFormField } from "../../CrudForm/CrudFormField";
import { useFormik } from "formik";
import { removeHydraKeysOnSingleItem } from "functions/api/convertor/apiPlatformConversion/hydra/hydraKeysRemover";
import { SearchItem } from "type/searchTypes";
import { RenderForm, TabColumn } from "type/superCrudTypes";

type Props = {
    item: SearchItem,
    columns?: TabColumn[],
    renderShow?: RenderForm,
};


export const CrudFormShow = ({
    item,
    columns = [],
    renderShow
}: Props) => {
    //to remove hydra properties set by api platform
    if(item) {
        removeHydraKeysOnSingleItem(item);
    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: item,
        onSubmit: () => {}
    });

    return (
        <div className="mb-4">
            {
                renderShow ? (
                    renderShow(validation, columns, true, undefined, undefined, false, item?.id)
                ): (
                    <div style={{maxWidth: '550px'}}>
                        {
                            columns && (
                                columns.map((column, index) => (
                                    <CrudFormField
                                        key={index}
                                        column={column}
                                        validation={validation}
                                        disabled={true}
                                    />
                                ))
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
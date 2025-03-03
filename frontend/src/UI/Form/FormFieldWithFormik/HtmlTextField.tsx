import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { PropsWithChildren } from "react";
import { FormFeedback, Label } from "reactstrap";

type Props = PropsWithChildren<{
    name: string,
    validation: any,
    onBlur?: () => void,
    onChange?: (value: string) => void,
    className?: string,
    margin?: number,
    toolsConfig?: string,//full | minimal
    hasLinkTool?: boolean,
    [key: string]: any
}>;

const toolbarConfigs: {[key: string]: any} = {
    full: [
        'Undo',
        'Redo',
        'Heading',
        'Bold',
        'Italic',
        'NumberedList',
        'BulletedList',
        'Blockquote',
        'Link',
        'SelectAll',
    ],
    minimal: [
        'Undo',
        'Redo',
        'Heading',
        'Bold',
        'Italic',
        'SelectAll',
    ]
}

export const HtmlTextField = ({
    name,
    validation,
    onBlur,
    onChange,
    children,
    margin,
    toolsConfig = 'full',
    hasLinkTool = true,
    ...props
}: Props) => {

    const handleChange = (e: any, editor: any) => {
        const data = editor.getData();

        if(onChange) {
            onChange(data);
        }
        validation.setFieldValue(name, data);
    }

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur();
        }
        // validation.handleBlur(e);
    };

    const handleReady = (editor: any) => {
        // You can store the "editor" and use when it is needed.
    };

    let configs = toolbarConfigs[toolsConfig];
    if(!hasLinkTool) {
        configs = configs.filter((config: string) => config !== 'Link');
    }

    return (
        <div className={'html-editor-wrapper' + (margin ? ' mt-'+margin+' mb-'+margin: '') + (props.disabled ? ' disabled': '')} style={{minWidth: '200px'}}>
            {
                children && <Label htmlFor={name}>{children}</Label>
            }
            <CKEditor
                id={name}
                config={{
                    toolbar: configs
                }}
                editor={ClassicEditor}
                data={validation.values[name]}
                onReady={handleReady}
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
            />
            <div className="is-invalid"></div>
            {
                validation.touched[name] && validation.errors[name] ? (
                    <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                ) : null
            }
        </div>
    )
}
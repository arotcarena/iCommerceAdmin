import { act, renderHook } from "@testing-library/react";
import { useFormik } from "formik"
import { setFormData } from "functions/form/validation/formDataSetter";

describe('formDataSetter', () => {
    it('should set formData correctly', () => {
        const {result} = renderHook(() => {
            return useFormik({
                initialValues: {
                    firstName: 'Jean',
                    age: 50
                },
                onSubmit: (formData: any) => {}
            })
        });

        act(() => {
            setFormData(result.current, {
                age: 20,
                lastName: 'Dupont'
            });
        });

        expect(result.current.values.age).toEqual(20);
        expect(result.current.values.lastName).toEqual('Dupont');
        expect(result.current.values.firstName).toEqual('Jean');
    })
})

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### SuperCrud

# SuperCrud props :
- title: string (Display title. This will be translated)
- endpoint: string (Endpoint that will be used to retrieve data)
- entity: string (Entity name. ex: User. This is used to call context endpoint of concerned entity)
- defaultItemsPerPage: number (default items per page. default: 10)
- renderers: callback[] (a renderer is a function that will receive a property value and return string to display it correctly)
- basePath: string (the path of superCrud index page. ex: /administration/users)
- renderForm: RenderForm (overrides default form. See RenderForm type for more details)
- renderShow: RenderForm (overrides default show page. See RenderForm type for more details. If renderForm is passed and no renderShow, renderForm will be used to page show too)
- hasLineCreate: boolean (display a line to create new item on top of tab ? default: false)
- usePatchToUpdate: boolean (use PATCH method to updates calls ? default: false)
- parentIri: string (if this is used as a SubCrud, you need to provide IRI of parent entity)
- parentPropertyName: string (if this is used as a SubCrud, you need to provide parent property name)
- disabled: boolean (is whole SuperCrud disabled ?)
- storeFormDataKey: string (if you want to persist creation form data in sessionStorage, provide a storage key. Be sure to provide a unique key)
- hiddenFields: string[] (Allow you to hide some fields, even if they are in entity contexts)


## Steps to add a new SuperCrud 
# Example: create a User SuperCrud

1. create Component in pages directory : /pages/Users/index.tsx
    # <SuperCrud
    #     key="users"
    #     title="users"
    #     entity="User"
    #     endpoint={API_USERS}
    #     defaultItemsPerPage={20}
    #     renderers={{
    #         roles: userRolesRenderer
    #     }}
    #     basePath={generateUrl('users').replace('/*', '')} // "administration/users"
    #     usePatchToUpdate={true}
    #     renderForm={(validation: any, columns: TabColumn[], disabled: boolean, isPending?: boolean, onClose?: () => void) => (
    #         <UserForm 
        #         validation={validation}
        #         columns={columns}
        #         disabled={disabled}
        #         isPending={isPending}
        #         onClose={onClose}
    #         />
    #     )}
    #     storeFormDataKey="administration_users"
    # />

2. create custom form if necessary : UserForm

#    export const UserForm = ({validation, columns, disabled, isPending, onClose}: Props) => {
#        return (
#            <form onSubmit={validation.handleSubmit}>
#                <CrudFormField
#                    column={columns.find(col => col.name === 'firstName')}
#                    validation={validation}
#                    margin={2}
#                    disabled={disabled}
#                />
                ...other fields
#                {
#                    !disabled && (
#                        <FormSubmitGroup
#                            onClose={onClose}
#                            isPending={isPending}
#                        />
#                    )
#                }
#            </form>
#        )
#    }


3. add route : /Routes/routes.tsx

#  { name: 'users', path: '/administration/users/*', import: 'Users', title: 'users' },

4. update LayoutMenuData
    4.1. add configuration on useEffect
        if(pathname.includes('administration/users')) {
            setMenuState({
                firstLevel: 'admin',
                secondLevel: 'users',
                thirdLevel: null
            });
        }
    
    4.2. add menuItem 
        {
            id: "users",
            label: "users", // will be translated
            link: generateUrl('users'),
            click: () => changeMenuState('secondLevel', 'users'),
            active: menuState.secondLevel === 'users',
            parentId: "admin",
            isVisible: menu.includes('users')
        },

5. verify that public/menus.json on api contains the new menuItem 'users'


### To add SubCruds, see Companies SuperCrud example (/Parameters/Companies/)


### Api requests

# Follow these steps to add requests for a new entity

1. Add a entityQueries.ts file in "/src/functions/customHooks/api/queries/" and implements one function for each request needed.

Inside your functions, you can use one of these custom hooks as needed :

    - useApiRequest
    - useApiRequestWithControl - with abort controller : when request is done, if a previous one exists it will be aborted

    - useApiQuery / useApiQueryWithControl - to manage state (not recommended, prefer to use tanstack/useQuery instead)


    Example for getCollection request :

    ```javascript loadEntities.ts
    export const useLoadEntities = () => {
        const doApiRequest = useApiRequest();
        
        const loadEntities = (filters) => {
            return doApiRequest(endpoint, filters, 'GET');
        }

        return loadEntities;
    };
    ```

2. Use these functions in your component.

- Either direct use (not recommended) :

    ```javascript
    const loadEntities = useLoadEntities();
    const handleLoad = () => loadEntities();
    ```
    ```javascript
    const postEntity = usePostEntity();
    const handleSubmit = (formData) => postEntity(formData);
    ```

- Or with tanstack/useQuery or tanstack/useMutation (recommended)

    ```javascript
    const loadEntities = useLoadEntities();
    const {data, isFetching, errors} = useQuery({
        queryKey: ['entity_load', filters],
        queryFn: () => loadEntities(filters),
        initialData: null,
    });
    ```
    ```javascript
    const postEntity = usePostEntity();
    const {mutate, isPending} = useMutation({
        mutationFn: (formData) => postEntity(formData),
        onSuccess: (result) => createAlert('success', 'Entity successfully created !'),
        onError: (error) => createAlert('danger', 'Unable to create entity.'),
    });

    const handleSubmit = (formData) => mutate(formData); 
    ```

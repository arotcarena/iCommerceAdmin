import React from 'react';
import { Spinner } from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Loader = (props: any) => {

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center mx-2 mt-2">
                <Spinner color="primary" />
            </div>
            {toast.error(props.error, { position: "top-right", hideProgressBar: false, progress: undefined, toastId: "" })}
        </React.Fragment>
    );
};

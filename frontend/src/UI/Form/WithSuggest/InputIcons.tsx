import { MouseEvent } from "react";
import { Spinner } from "reactstrap";

type InputIconsType = {
    isLoading: boolean,
    onMainRemove: (e: MouseEvent) => void,
    mainRemoveIsOpen: boolean
};

export const InputIcons = ({
    isLoading,
    onMainRemove,
    mainRemoveIsOpen
}: InputIconsType) => {
    return (
        <div className="input-icons">
            {
                isLoading ? (
                    <Spinner className="input-loader me-1 text-secondary" size="sm" />
                ): (
                    mainRemoveIsOpen && (
                        <button type="button" className="btn input-closer" onClick={onMainRemove}>
                            <i className=" ri-close-line ri-xl"></i>
                        </button>
                    )
                )
            }
            <div className="input-icons-separator-wrapper">
                <div className="input-icons-separator"></div>
            </div>
            <button type="button" className="btn input-expand">
                <i className="ri-arrow-down-s-line ri-xl"></i>
            </button>
        </div>
    )
}

export const InputIconsDisabled = () => {
    return (
        <div className="input-icons">
            <div className="input-icons-separator-wrapper">
                <div className="input-icons-separator"></div>
            </div>
            <button type="button" className="btn input-expand">
                <i className="ri-arrow-down-s-line ri-xl"></i>
            </button>
        </div>
    )
}
import { Error } from "pages/error/Error"
import { FallbackProps } from "react-error-boundary"


export const pageFallbackRender = ({error, resetErrorBoundary}: FallbackProps) => {

    return (
        <Error error={error} resetErrorBoundary={resetErrorBoundary} />
    )
}


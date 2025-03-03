import { AppRoute } from "Routes/routes"
import { Loader } from "UI/Common/Loader"
import { Suspense, lazy } from "react"

type Props = {
    route: AppRoute
}

export const PageLazy = ({route}: Props) => {

    //if not lazy
    if(route.component) {
        return route.component;
    }

    const Component = lazy(() => import('../pages/' + route.import));

    return (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    )
}
import { AppConfig } from "config/AppConfig";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";


//Layouts
import { setHtmlTitle } from "functions/dom/setHtmlTitle";
import { Layout } from "../Components/Layouts/index";
import { useTranslation } from "react-i18next";
import { pageFallbackRender } from "Components/Fallback/pageFallbackRender";



type Props = PropsWithChildren<{
    hasLayout: boolean,
    title: string|undefined
}>;

export const RouteWrapper = ({hasLayout, title, children}: Props) => {
    const {t} = useTranslation();

    setHtmlTitle(t(title ?? AppConfig.DEFAULT_HTML_TITLE));

    if(hasLayout) {
        return (
            <Layout>
                <div className="page-content">
                    <ErrorBoundary fallbackRender={pageFallbackRender}>
                        {children}
                    </ErrorBoundary>
                </div>
            </Layout>
        )
    }

    return (
        <ErrorBoundary
            fallbackRender={pageFallbackRender}
            onReset={(details) => {
                // Reset the state of your app so the error doesn't happen again
            }}
        >
            {children}
        </ErrorBoundary>
    );
}

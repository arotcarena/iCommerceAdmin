
//import Route
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'Routes/routes';
import { NonAuthLayout } from 'Components/Layouts/NonAuthLayout';
import { RouteWrapper } from 'Routes/RouteWrapper';
import { RouteWithAuthWrapper } from 'Routes/RouteWithAuthWrapper';
import { Error404 } from 'pages/error/Error404';
import { PageLazy } from 'pages/PageLazy';


function Routes() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
        {
          publicRoutes.map((route, index) => (
              <Route 
                  key={index}
                  path={route.path}
                  element={
                  <NonAuthLayout>
                      <RouteWrapper title={route?.title} hasLayout={false}>
                          <PageLazy route={route} />
                      </RouteWrapper>
                  </NonAuthLayout>
                  }
              />
          ))
        }
        {
          authRoutes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                element={
                    <RouteWithAuthWrapper>
                        <RouteWrapper title={route?.title} hasLayout={route.withLayout ?? true}>
                            <PageLazy route={route} />
                        </RouteWrapper>
                    </RouteWithAuthWrapper>
                }
            />
          ))
        }
        <Route
            path="*"
            element={<Error404 />}
        />
      </>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default Routes;

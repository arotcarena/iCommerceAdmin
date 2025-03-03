import { Error404 } from "pages/error/Error404";
import { Logout } from "pages/Authentication/Logout";
import { Login } from "pages/Authentication/Login";
import { ReactElement } from "react";
import Dashboard from "pages/Dashboard";
import { Error403 } from "pages/error/Error403";


export type AppRoute = {
  name: string,
  path: string,
  component?: ReactElement,
  title: string,
  withLayout?: boolean,
  import?: string
};

/**
 * titles will be translated
 * 
 * 
 * routes must have import or component property
 * 
 * routes with component are not lazy routes
 * 
 * routes with import are lazy routes
 * (import base = '/src/pages/')
 */


/**
 * PUBLIC ROUTES
 */
export const publicRoutes: AppRoute[] = [
  { name: 'login', path: '/login', component: <Login />, title: 'login', withLayout: false },
  { name: 'logout', path: '/logout', component: <Logout />, title: 'logout' },
  { name: 'forgotten_password', path: '/auth/forgotten-password', import: 'Authentication/ForgottenPassword', title: 'password_reset' },
  { name: 'password_reset', path: '/auth/password-reset', import: 'Authentication/PasswordReset', title: 'password_reset' },
  //error
  { name: 'error_404', path: '/error404', component: <Error404 />, title: 'Error 404', withLayout: false },
  { name: 'error_403', path: '/error403', component: <Error403 />, title: 'Error 403', withLayout: false },
];


/**
 * AUTHENTICATION REQUIRED ROUTES
 */
export const authRoutes: AppRoute[] = [

  //BASE ROUTES

  { name: 'home', path: '/', component: <Dashboard />, title: 'dashboard' },
  
  //menu
  { name: 'profile', path: '/profile', import: 'Profile', title: 'profile' },
  
  //account
  { name: 'change_password', path: '/profile/password-change', import: 'Authentication/PasswordChange', title: 'change_password' },

  //cruds 
  { name: 'users', path: '/administration/users/*', import: 'Administration/Users', title: 'users' },
];

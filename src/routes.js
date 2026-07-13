import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const Settings = React.lazy(() => import('./screens/Settings'));
const Login = React.lazy(() => import('./screens/Login'));


const routes = [
{path: '/home', name: 'Home', component: Home},
{path: '/settings', name: 'Settings', component: Settings},
{path: '/login', name: 'Login', component: Login},


]

export default routes;
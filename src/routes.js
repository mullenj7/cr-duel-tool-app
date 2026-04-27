import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const Settings = React.lazy(() => import('./screens/Settings'));

const routes = [
{path: '/home', name: 'Home', component: Home},
{path: '/settings', name: 'Settings', component: Settings},

]

export default routes;
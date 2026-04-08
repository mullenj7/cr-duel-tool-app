import React from 'react';

const Home = React.lazy(() => import('./components/screens/Home'));
const Settings = React.lazy(() => import('./components/screens/Settings'));

const routes = [
{path: '/home', name: 'Home', component: Home},
{path: '/settings', name: 'Settings', component: Settings},

]

export default routes;
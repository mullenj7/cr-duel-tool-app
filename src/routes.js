import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const Settings = React.lazy(() => import('./screens/Settings'));
const Login = React.lazy(() => import('./screens/Login'));
const Decks = React.lazy(() => import('./screens/Decks'));
const Play = React.lazy(() => import('./screens/Play'));



const routes = [
{path: '/home', name: 'Home', component: Home},
{path: '/settings', name: 'Settings', component: Settings},
{path: '/decks', name: 'Decks', component: Decks},
{path: '/play', name: 'Play', component: Play},
{path: '/login', name: 'Login', component: Login},


]

export default routes;
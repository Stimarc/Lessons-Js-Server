import {
    pageHome,
    page404,
    pageAbout,
    pagePosts,
    pageContacts,
    pageSinglePost,
  } from './../components/pages.js';
  
  export const routes = [
    { path: '/', component: pageHome },
    { path: '/posts', component: pagePosts },
    { path: '/posts/:id', component: pageSinglePost },
    { path: '/about', component: pageAbout },
    { path: '/contacts', component: pageContacts },
    { path: '**', component: page404 },
  ];
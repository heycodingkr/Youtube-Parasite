
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/home', component: () => import('pages/Index.vue') },
      { path: '/youtubers', component: () => import('pages/youtubers/Youtubers.vue') },
      { name: 'YoutuberDetail', path: '/youtuber-detail/:youtuberId', component: () => import('pages/youtubers/YoutuberDetail.vue') },
      { path: '/watchlist', component: () => import('pages/watchlist/WatchList.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

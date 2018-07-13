import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import IndexPage from '@/pages/index'
import DetailPage from '@/pages/detail'
import DetailAnaPage from '@/pages/detail/analysis'
import DetailCouPage from '@/pages/detail/count'
import DetailForPage from '@/pages/detail/forecast'
import DetailPubPage from '@/pages/detail/publish'
import OrderList from '@/pages/orderList'

Vue.use(Router)

// 当一个页面滚动了一定距离，点击切换了路由，如果没有做任何设置，那么默认的进入的下一个页面也会滚动上一个页面一样的距离，而实际上我们是希望切换了路由后是从这个页面的顶部开始展示，所以下面这段代码就实现了这种功能。
// 第一种方式：配置scrollBehavior事件，然后注册到new Router中，然后在具体的路由里面定义meta标签，像这样：meta: { scrollToTop: true }，那个页面想切换后从顶部开始，就定义meta标签

// 切换路由让页面从最上面开始，当点击后面按钮的时候又返回之前的页面且保持原来滚动条的距离，就需要在router-view标签上面加keep-alive 

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}

const router = new Router({
    scrollBehavior,
    routes: [{
            path: '/',
            name: 'index',
            component: IndexPage,
            meta: { scrollToTop: true, title: '首页' }
        }, {
            path: '/detail',
            name: 'detail',
            redirect: '/detail/count',
            component: DetailPage,
            meta: { scrollToTop: true, title: '数据统计' },
            children: [{
                path: 'analysis',
                component: DetailAnaPage,
                meta: { scrollToTop: true, title: '流量分析' }
            }, {
                path: 'count',
                component: DetailCouPage,
                meta: { scrollToTop: true, title: '数据统计' }
            }, {
                path: 'forecast',
                component: DetailForPage,
                meta: { scrollToTop: true, title: '数据预测' }
            }, {
                path: 'publish',
                component: DetailPubPage,
                meta: { scrollToTop: true, title: '广告发布' }
            }]
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component: OrderList,
            meta: { scrollToTop: true, title: '订单列表' }
        }
    ]
})

// 第二种方式：切换路由后让页面的滚动条从顶部开始
// router.afterEach((to, from, next) => {
//     window.scrollTo(0, 0);
// });

// 动态修改页面的title，需要在每个路由的meta标签里定义title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
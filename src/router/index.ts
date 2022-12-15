import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/login/index.vue"),
    },
    {  
        path:'/register',
        name:'Register',
        component:()=>import('@/pages/register/index.vue')

    },
    {  
        path:'/find',
        name:'find',
        component:()=>import('@/pages/register/find.vue')

    },
    {
        path: "/",
        name: "/",
        redirect: "/home",
        meta: {
            icon: "home-filled",
            title: "首页",
        },
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: "首页",
                },
                component: () => import("@/pages/home/index.vue"),
            },
        ],
    },
    {
        path:'/user',
        name:'user',
        meta:{
            isShow:true
        },
        redirect:'/readRecord',
        component:()=>import('@/pages/user/user.vue'),
        children:[
        {
            path:'/readRecord',
            name:'readRecord',
            meta:{
                title:'阅读记录',
                isShow:true
            },
            component:()=>import('@/components/person/readRecord.vue')
        },
        {
            path:'/borrowMessage',
            name:'borrowMessage',
            meta:{
                title:'借书栏',
                isShow:false
            },
            component:()=>import('@/components/person/borrowMessage.vue')
        },
        {
            path:'/borrowHistory',
            name:'borrowHistory',
            meta:{
                title:'借阅历史',
                isShow:false
            },
            component:()=>import('@/components/person/borrowHistory.vue')
        },
        {
            path:'/persondata',
            name:'persondata',
            meta:{
                title:'个人资料',
                isShow:false
            },
            component:()=>import('@/components/person/persondata.vue')
        },
        {
            path:'/searchSubscribe',
            name:'searchSubscribe',
            meta:{
                title:'查询预订',
                isShow:true
            },
            component:()=>import('@/components/person/searchSubscribe.vue')
        
        },
        {
            path:'/collection',
            name:'collection',
            meta:{
                title:'收藏界面',
                isShow:true
            },
            component:()=>import('@/components/person/collection.vue')
        },
        
        
        {
            path:'/xinde',
            name:'xinde',
            meta:{
                title:'心得界面',
                isShow:false
            },
            component:()=>import('@/components/person/xinde.vue')
        },

        {
            path:'/setting',
            name:'setting',
            meta:{
                title:'设置',
                isShow:true
            },
            component:()=>import('@/components/person/setting.vue')
        },
        
        ]
    },
   
    {
        path: "/details",
        name: "Details",
        component: () => import("@/pages/details/index.vue"),
    },
    {
        path:'/copy',
        name:'Copy',
        component:()=>import("@/pages/details/copy.vue")
    },
    {
        path:'/subscribe',
        name:'Subscribe',
        component:()=>import("@/pages/details/subscribe.vue")
    },
    {
        path:'/path(.*)',
        name:'404',
        component:()=>import("@/components/person/notFound.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



//全局路由守卫
router.beforeEach((to,from,next)=>{
    const token:string|null=localStorage.getItem('token')
    if(!token&&to.path!=='/login'){
        next('/login')
    }
    else{
        next()
    }
})
export default router;

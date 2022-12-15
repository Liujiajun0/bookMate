<template>
    <div class="common-layout">
  
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4">
              
              <div class="collapse_box">
            <img src="../../../images/侧边栏弹出.png" alt=""  width="20" v-if="(isCollapse==true)"  @click="(isCollapse=false) ">
            <img src="../../../images/侧边栏收缩.png" alt=""   width="20" v-if="(isCollapse==false)" @click="(isCollapse=true)">
              </div>
            
            
            </el-col>
            <el-col :span="16"><h2 class="header_title">我的界面</h2></el-col>
            <el-col :span="4" ><div  @click="back()" class="back">回到首页</div> </el-col>
            
          </el-row>
          
        </el-header>
        
        <el-container>

         
          <!-- 侧栏 -->
          <el-aside width="200px">
            
           
 
            
        <el-menu
          :collapse="isCollapse"  
          active-text-color="#20a0ff"
          background-color="#324157"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#bfcbd9"
          router

        >
        
        <!-- ↑ 开启路由模式 -->
            <!-- 每一个元素item都是一个HomeView的子路由对象 -->
          <el-menu-item :index="item.path" v-for="(item,index2) in list" :key="item.path" >
           
              <img :src=iconSrcList[index2] alt="" class="menu_icon">
      
            <span>{{item.meta.title}}</span>
      
          </el-menu-item>
  
        </el-menu>
        
          </el-aside>
          <!-- 设置路由出口 在主界面中显示-->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
  
      </el-container>
    </div>
  
  </template>
  
  <script lang="ts" setup>
  import {useRouter} from 'vue-router'
  import{ref }from "vue"

  const router=useRouter();
  //只选择isShow为true的展示,此时list相当于是router
  const list=router.getRoutes().filter(v=>v.meta.isShow)
  const imglist=[]
  const back=()=>{
    router.push({
    path: "/Home",
  });
  }

  let iconSrcList=[
    "../../../images/阅读记录.png","../../../images/查询预订.png","../../../images/收藏界面.png","../../../images/设置界面.png"
  ]

  //侧边栏是否折叠
  let isCollapse=ref(false)

  </script>
  
  <style scoped>
  /* 头部 */
  .el-header{
    height: 80px;
    background-color: #242f42;
  
  }
  .header_title{
    font-size: 22px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .menu_icon{
    margin: 0 15px;
    width: 20px;
    overflow: hidden;
  }
  .logo {
    height:60px
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  
  .back{
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: aliceblue;
    font-size: 18px;
    cursor: pointer;
  }

  /* 侧边 */
  .el-menu-vertical-demo {
    height: calc(100vh - 80px);
  }

 
.collapse_box{
  height: 50px;
  width: 50px;
  margin-top: 10px;
  display: flex;
  background-color: #242f42;
  justify-content: center;
  align-items: center;
}
  .collapse_box img{
  
  
   
    cursor: pointer;

  }

  </style>
  
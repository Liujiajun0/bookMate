<!-- 首页最上面的部分 -->
<template >
  <div class="head">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <div class="head_word">Book-Mate</div>
    <div class="userbox">
 
    </div>
      
    <div class="head_user">
      
        
      <el-dropdown>
        <el-button type="primary"> 用户 </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="login">登录/注册</el-dropdown-item>
            <el-dropdown-item @click="delToken">退出登录</el-dropdown-item>
            <el-dropdown-item @click="toUser">个人界面</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script  lang="ts" setup>

import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = "/api";
const router = useRouter();


const input = ref("");


const login = () => {
  router.push({
    path: "/login",
  });
};

const delToken=()=>{
  let token=window.sessionStorage.getItem("token")??""
  window.sessionStorage.removeItem('token');

  router.push('/login')
}

const toUser=()=>{
  router.push({
    path:'/user'
  })
}
</script>

<style>
.head {
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(245,245,245);
}
.head_word {
  font-size: 30px;
  margin-left: 20px;
}
.head_user {
  position: absolute;
  right: 20px;
}
.userbox{
  position: absolute;
  right: 10%;
}
.userimg{
  display: flex;
  align-items: center;
}

.username{
  display: flex;
  /* line-height: 75px; */

}
</style>
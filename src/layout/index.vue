<template >
  <div class="app">
    <el-container class="con">
      <el-header class="he"> <Headd /></el-header>
      <el-main class="m"> <router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Headd from "./header.vue";
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(245,245,245);
}
.con {
  width: 100%;
}
.he {
  width: 100%;
}
.m {
  width: 100%;
}
</style>

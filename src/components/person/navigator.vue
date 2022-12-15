<template>
    
    <div class="navigation_box">
      <div class="navigation">
        <span class="navigation_title" @click="back()">回到首页</span>
      </div>
      <hr>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

//回到首页
function back() {
  router.push('/')
}
</script>

<style scoped>
.navigation_box {
  width: 1000px;
  margin: 10px 0;
}

.navigation {
  width: 100%;
  height: 50px;
  display: flex;
}

.navigation_title {
  width: 100px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  line-height: 50px;
  background-color: antiquewhite;

}
</style>
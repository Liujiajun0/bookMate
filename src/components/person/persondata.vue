<template>
    <div>
        <!-- 我是个人资料界面 ，无实际功能而弃用-->
    </div>
    
    <!-- 头像，学号，学院 -->
    <div class="persondata_box">
      <div class="persondata_avitor">
        <el-avatar  :src="circleUrl" :size='500' fit="fill" />
      </div>
      <div class="persondata_content">邮箱:{{user.email}}</div>
        <div class="persondata_content">学号：{{user.id}}</div>
        <div class="persondata_content">学院：{{user.college}}</div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
    'https://ts1.cn.mm.bing.net/th?id=OIP-C.AayT35JjEZJpIpvZ12ODLwHaHa&w=186&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
})

const { circleUrl} = toRefs(state)

let user=reactive({
  email:'1287048418@qq.com',
  id:'102101118',
  college:'计算机与大数据学院'
})

</script>

<style scoped>

.persondata_avitor{
  display: flex;
  justify-content: center;
}

.persondata_content{
  font-size: 50px;
  display: flex;
  justify-content: center;

}


.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.demo-basic .demo-basic--circle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
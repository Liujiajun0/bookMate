<template>
    <div>
        <!-- 我是设置界面，无实际功能 -->
        
    </div>
    <div>
    <el-switch
    v-model="value1"
    class="mb-2"
    active-text="开启推荐"
    inactive-text="关闭推荐"
     />
    </div>
    <div>
     <el-switch
    v-model="value2"
    class="mb-2"
    active-text="开启消息推送"
    inactive-text="关闭消息推送"
  />
    </div>
</template>

<script setup lang="ts">
import{ref} from 'vue'
import navigator from '@/components/person/navigator.vue'
const value1 = ref(true)
const value2 = ref(true)
</script>

<style scoped>

</style>
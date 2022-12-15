<template>
   <el-container>
      <el-header></el-header>
      <el-main>
        <el-table :data="booklist" style="width: 100%" v-if="booklist.length!=0">
    <el-table-column label="id" prop="id" width="180"/>
    <el-table-column label="bookId"  prop="bookId" width="180"/>
    
    <el-table-column label="bookVo"  width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>isbn: {{ scope.row.bookVo.isbn }}</div>
            <div>author: {{ scope.row.bookVo.author }}</div>
            <div>title: {{ scope.row.bookVo.title }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.bookVo.title }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="createTime"  width="250">
        <template #default="scope">
            <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </div>
      </template>

    </el-table-column>

    <el-table-column label="orderTime" width="250">
        <template #default="scope">
            <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.orderTime }}</span>
            </div>
      </template>
    </el-table-column>

    <el-table-column label="status" prop="status" width="180"/>
 
    
  </el-table>
      <div v-else class="emp">
        <empty></empty>
      </div>

      </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive,watch,ref} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
import navigator from '@/components/person/navigator.vue'
import{showOrder} from '@/api/borrow/borrowdata'
import { Timer } from '@element-plus/icons-vue'
import empty from '@/components/person/empty.vue'

let booklist =ref([])
onMounted(()=>{
    showOrder().then((res)=>{
        booklist.value=res.data;
        console.log("booklist",booklist.value);
        
    })
})



</script>

<style scoped>

</style>
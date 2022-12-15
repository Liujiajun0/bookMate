<template>
  <!-- 改组件因功能不适合PC端已弃用 -->
    <div class="common-layout">
      <el-container>
        <el-header></el-header>
        <el-main>
            <div>我的借书栏</div>

            <el-table :data="booklist" style="width: 100%">
                <el-table-column label="图片" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                    <img src="" alt="">
                    </div>
                </template>
                </el-table-column>

                <el-table-column label="BookTitle" width="180">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    
                    <template #reference>
                        <el-tag>{{ scope.row.bookTitle }}</el-tag>
                    </template>
                  </el-popover>
                    
                </template>
                </el-table-column>


                <el-table-column prop="bookIsbn"  label="bookIsbn" width="180">
                    
                </el-table-column>
                
                <el-table-column prop="addTime" label="addTime" width="180" />
                <el-table-column prop="borrowTime" label="borrowTime" width="180" />
                <el-table-column prop="status" label="status" width="120" />

                <el-table-column label="Operations">
      <template #default="scope">
        
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>


        </el-main>
        <el-footer></el-footer>
      </el-container>
    </div>
  </template>
  
<script setup lang="ts">
import{onMounted, reactive} from 'vue'
import {showCert,delCert} from '@/api/borrow/borrowdata'
let booklist=reactive(
    [
    {
  "bookId": "1",
  "bookIsbn": "34987-2313",
  "bookTitle": "哈利波特一",
  "addTime": "2022-11-07 23:17:11",
  "borrowTime": null,
  "status": 0
},
{
  "bookId": "2",
  "bookIsbn": "34987-2313",
  "bookTitle": "哈利波特2",
  "addTime": "2022-11-07 23:17:11",
  "borrowTime": null,
  "status": 0
},
    ])
// onMounted(()=>{
//     showCert().then((res)=>{
//         booklist=res.data;
//     })
// })

const handleDelete=((index:any,value:any)=>{
  console.log(value.bookId);
   delCert(value.bookId).then((res)=>{
    alert(res.data.msg)
   })
    showCert().then((res)=>{
        booklist=res.data;
    })
})







</script>

<style scoped>

</style>
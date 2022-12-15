<template>

  <!-- 改组件因功能不适合PC端已弃用 -->
  
    <div>我的借书记录</div>
    <el-switch
    v-model="historyType"
    class="mb-2"
    active-text="查询已还记录"
    inactive-text="查询未还记录"
  />
    <!-- 已还记录 -->

    <el-table :data="tableData" style="width: 100%" v-if="historyType">
      <el-table-column label="bookId" prop="date" />
      <el-table-column label="bookIsbn" prop="name" />
      <el-table-column label="bookTitle" prop="name" />
      <el-table-column label="addTime" prop="name" />
      <el-table-column label="borrowTime" prop="name" />
      <el-table-column label="status" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 未还记录 -->
    <el-table :data="filterTableData" style="width: 100%" v-else>
      <el-table-column label="bookId" prop="date" />
      <el-table-column label="bookIsbn" prop="name" />
      <el-table-column label="bookTitle" prop="name" />
      <el-table-column label="addTime" prop="name" />
      <el-table-column label="borrowTime" prop="name" />
      <el-table-column label="status" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script lang="ts" setup>
  import { computed, reactive, ref,watch } from 'vue'
  import{showBorrowed} from '@/api/borrow/borrowdata'

  
 const historyType=ref(true);
 const search=ref(0);
  const filterTableData = computed(() =>
    tableData.filter(
      (data) =>
        !search.value ||
        data.bookIsbn.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  const handleEdit = (index: number, row: any) => {
    console.log(index, row)
  }
  const handleDelete = (index: number, row: any) => {
    console.log(index, row)
  }
  
  const tableData= reactive(
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
    ]
  )


let type=ref("0");
//随着按钮的改变调用不同的数据
watch(historyType, (newValue, oldValue) => {
  if(historyType.value==true){
    type.value="1";
  }
  else{
    type.value="2"
  }
  showBorrowed(type.value).then((res)=>{

  })
})

  </script>
  
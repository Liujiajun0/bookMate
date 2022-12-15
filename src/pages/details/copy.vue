<template>
    <!-- 该界面为借书栏界面，因后得知其功能不适合PC端(需要拿着设备去图书馆找管理员扫码)而弃用，该功能的基本实现方法和查询预订差不多 -->
    <div class="common-layout">
      <el-container>
        <el-header>
          <navigator></navigator>


        </el-header>
        <el-main>
            该书本的所有副本如下
            该书本的ISBN
            <div><h2>{{isbn}}</h2></div>
            <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-author="tableRowClassauthor"
            stripe
            border="2"
        >
    <el-table-column  prop="title" label="title" width="180"/>
    <el-table-column prop="author" label="author" width="180" />
    <el-table-column prop="bookid" label="bookid" width="180" />
    
    
    <el-table-column label="status" width="180">
      <template #default="scope">
        
        <el-tag v-if="scope.row.status==0">该书已被借走</el-tag>
        <el-tag v-else>该书可借</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button v-if="scope.row.status==1" type="primary" size="small" @click="borrow(scope.$index, scope.row)"
          >我要借书</el-button
        >
        <el-button v-else disabled type="primary" size="small" @click="borrow(scope.$index, scope.row)"
          >我要借书</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  
        </el-main>
        <el-footer>
            



        </el-footer>
      </el-container>
    </div>
  </template>

<script setup lang="ts">
import { onMounted, reactive,ref } from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
import navigator from '@/components/person/navigator.vue'
import{getCopy,createSingleQRCode,addToCert} from '@/api/borrow/borrowdata'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import header from "@/layout/header.vue"
import { LOADIPHLPAPI } from 'dns';

const store=useStore();
const router=useRouter();
//该书本的所有副本的数组如下
let isbn = store.getters.byISDN
let booklist =ref()

onMounted(()=>{
    
    console.log("isbn:"+isbn);
    //显示该书本的所有副本
    //显示数据：isbn title author bookid status
    getCopy(isbn).then((res)=>{
        booklist.value=res.data
        console.log(res);
        
        console.log(booklist.value);
        
    })
    
})


interface User {
  isbn: string
  title: string
  author: string
  bookid:number
  status:number
}


const tableRowClassauthor = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

function borrow(index:any,row:any){
    console.log(index);
    console.log(row);
    // alert("加入借书栏成功")
    //加入借书栏
    addToCert(row.bookid).then((res)=>{
        alert(res.data.msg)
        tableData=res.data;
    })
    //显示二维码
    createSingleQRCode(row.bookid).then((res)=>{

    })
    row.status=0;
}

function back(){
  router.push('/home');

}
let tableData: User[] = reactive([
  {
    isbn: '2016-05-03',
    author: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
    bookid:1,
    status:0,
  },
  {
    isbn: '2016-05-02',
    author: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
    bookid:2,
    status:1,
  },
  {
    isbn: '2016-05-04',
    author: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
    bookid:3,
    status:1,
  },
  {
    isbn: '2016-05-01',
    author: 'Tom',
    title: 'No. 189, Grove St, Los Angeles',
    bookid:4,
    status:0,
  },
])
</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.navigation_box {
  width: 1000px;
  margin: 10px 0;
}

.navigation {
  width: 100%;
  height: 50px;
  display: flex;
  /* justify-content: center; */
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
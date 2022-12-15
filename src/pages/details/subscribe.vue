<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <navigator></navigator>


        </el-header>
        <el-main>
            <div style="font-size: 30px; font-weight: 700; margin:10px 0;">该书本的所有副本如下:</div>
            <div style="font-size: 25px; font-weight: 700;">该书本的ISBN:</div>
            <div ><h2 class="bookISBN">{{isbn}}</h2></div>
            <div>
            <button class="lendbuttom" @click="chooseTime()">{{showisTime}}</button>
          </div>

      <el-table
            :data="booklist"
            style="width: 100%"
            :row-class-author="tableRowClassauthor"
            stripe
            border="2"
        >
    <el-table-column  prop="title" label="title" width="180"/>
    <el-table-column prop="author" label="author" width="180" />
    <el-table-column prop="bookId" label="bookId" width="180" />
    <el-table-column  label="选择预订时间"  v-if="isTime" >
        <template #default="scope">
            <div class="block">
            
            <el-date-picker v-if="(scope.row.status!=1)"
                v-model="value3"
                type="datetime"
                placeholder="选择预订时间"
                :default-time="defaultTime"

            />
             </div>
        </template>
    </el-table-column>
    
    <el-table-column label="status" width="180">
      <template #default="scope">
        
        <el-tag v-if="(scope.row.status==1)">该书已被借走</el-tag>
        <el-tag v-else>该书可借</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button v-if="(scope.row.status!=1)" type="primary" size="small" @click="borrow(scope.$index, scope.row)"
          >我要借书</el-button
        >
        <el-button v-else disabled type="info" size="small" @click="borrow(scope.$index, scope.row)"
          >不可借书</el-button
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
import { onMounted, reactive,watch,ref} from 'vue';
import {useStore} from 'vuex'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';
import navigator from '@/components/person/navigator.vue'
import{getCopy,createSingleQRCode,addToCert,addOrder} from '@/api/borrow/borrowdata'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import header from "@/layout/header.vue"



const store=useStore();
const router=useRouter();
//该书本的所有副本的数组如下
var isbn:string= store.getters.byISDN
let booklist:any=ref([]);

onMounted(()=>{
    //显示该书本的所有副本
    //显示数据：isbn title author bookid status  
    getCopy(isbn).then((res)=>{
        booklist.value=res.data
    })
    
})


interface User {
  isbn: string
  title: string
  author: string
  bookId:number
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

//存时间的变量
var value3 = ref('')

watch(value3, () => {
  addOrderdata.orderTime=dayjs(value3.value).format('YYYY-MM-DD HH:mm:ss')
})



//预订信息
let addOrderdata=reactive({
  bookId:"",
  orderTime:value3.value,
})

function borrow(index:any,row:any){
  if(addOrderdata.orderTime==''){
      alert("请先选择预订时间");
      return;
  }

    //预订
    addOrderdata.bookId=row.bookId
    addOrder(addOrderdata).then((res)=>{
    })
    
    row.status=1;
    alert("预订成功")
    router.push('/details')
   
}




const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

//返回首页
function back(){
  router.push('/home');

}


//选择时间
let isTime=ref(false);
let showisTime=ref('选择预订时间')
function chooseTime(){

  if(!isTime.value){
    
    showisTime.value="关闭预订时间"
  }else{
   
    showisTime.value="选择预订时间"
  }
  isTime.value=!isTime.value;
}





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

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.lendbuttom {
  /* width: 120px; */
  padding: 15px 15px;
  margin: 25px 0px;
  background-color: bisque;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 2px solid rgb(232, 232, 232);
  font-size: 20px;
  cursor: pointer;
}

.bookISBN{
  font-size: 30px;
  margin: 10px;
  color: aqua;
}
</style>
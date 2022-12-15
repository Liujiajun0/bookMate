<template>

  <!-- 显示书籍列表 -->
    <el-row>
        <div class="book_">
          <!-- 每一个书籍所在的整个盒子 -->

          <!-- 用v-for来实现书籍列表 -->
          <el-card class="bookfor" key="item" v-for="(item, index) in downlist">
            <img :src=item.cover_url class="bookimage" />
            <div>
              
              <div class="eachbottom">
                <div class="eachTitle">书名:{{ item.title }}</div>
                <div class="eachISBN"> &nbsp; ISBN:{{ item.isbn }}</div>
                <el-button text class="eachButton" @click="intodetail(item.isbn)">查看详情</el-button>
              </div>
            </div>
          </el-card>

        </div>
      </el-row>
</template>

<script setup lang="ts">

//书籍推荐的数据---根据查询结果填充进去（url title available）
//该组件的目的：把某个已知所有isbn的数组转换成对应的书本对象，
//并且按照列表显示书籍详情

import { reactive,onMounted,ref } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import{getSimpleImgByISBN,getBookDetailByISBN,getBooksByType} from '@/api/search/search'
import { bookInt } from '@/type/book';

const store=useStore();
const router=useRouter();


onMounted(()=>{
  
  downlistISBN=store.getters.collectlist;
  for(var i=0;i<downlistISBN.length;i++){
    getBookDetailByISBN(downlistISBN[i]).then((res)=>{
      
      let k=downlist.value.length
      downlist.value[k]=res.data;
      downlist.value[k].cover_url="https://i5101b0918.oicp.vip"+ downlist.value[k].cover_url
      k++
    })
  }
 
  
  
})

let downlistISBN=reactive([]);
let downlist:any=ref([])

//进入详情页
const intodetail = (ISBN: string) => {
  store.dispatch('app/actisbn', ISBN);
  router.push({
    path: "/details",
  });
};

//根据标签来搜索，点击跳转
let typelist = {
  typename: ['小说', '文学', '动漫', '传记', '艺术', '童书', '教材', '历史', '政治军事', '法律', '哲学宗教',]
}

let typedata = {
  type: '',
  from: '1'
}




</script>

<style scoped>
.book_ {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.bookfor {
  height: 300px;
  /* width: 300px; */
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 10px;
}

.bookimage {
  height: 250px;
  margin-top: 40px;
  overflow: hidden;

}
.card-label {
  z-index: 1;
  width: 150px;
  height: 30px;
  border-radius: 25px;
  background-color: rgb(222, 238, 255);
  font-size: 10px;
  margin: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor:pointer;
}

.cardlabel_one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.cardlabel_two {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: left;

}
.eachbottom{
  position: relative;
  height: 70px;
  font-size: 15px;
}

.eachISBN{
  position: absolute;
  font-size: 15px;
  left: 10px;
  bottom:30px;
}
.eachTitle{
  position: absolute;
  font-size: 18px;
  left: 15px;
  bottom: 49px;
}

.eachButton{
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 16px;
}

</style>
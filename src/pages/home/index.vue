<template>
  <div class="page">
    <div class="homepage">

      <!-- 搜索框 含标签-->
      <div class="search">
        <img class="search_img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.pRqzzND6KVTrg_layWHBzgHaCy?w=295&h=131&c=7&r=0&o=5&dpr=1.4&pid=1.7" />
        
        <div class="search_box">
              <div class="search-box-label">
                <el-radio-group v-model="seachtext">
                  <el-radio-button label="书名搜索"  @click="changeID(1)" />
                  <el-radio-button label="作者搜索" @click="changeID(2)"/>
                  <el-radio-button label="ISBN搜索" @click="changeID(3)"/>
                </el-radio-group>
              </div>
             
          <el-input class="search_input" v-model="input" input-style="margin-left:20px" placeholder="请输入关键词搜索" @focus="changeShow1()"  @blur="changeShow2()"/>
         
          <img src="../../../images/搜索.png" alt="" class="search_icon" @click="search(input)">

        </div>

        <!-- 搜索框自动补全 -->
        <div  class="autobox">
          <ul class="search_supplement_box" v-if='isShow==true'>
            <li class="search_supplement_each"  v-for="(item,index) in autolist" @mouseover="changeInput(item)">{{item}}</li>
          </ul>
        </div>

        <!-- 根据类别筛选 卡片标签 -->
        <div class="cardlabel">
          <div class="cardlabel_one">
            <el-card @click="searchByType((index).toString())" class="card-label" shadow="hover"
              v-for="(item, index)  in typelist.typename" key="item">
              {{ item }} </el-card>
          </div>
        </div>
      </div>

      <!-- 获取大家在搜 -->
      <div class="leftside">大家在搜:</div>
      <div class="cardlabel_two">
        <el-card  class="card-label" shadow="hover"
              v-for="(item, index)  in peopleSeachList" key="item" @click="()=>{input=item}">
              {{ item }} 
            
            </el-card>
      </div>


      <!-- 获取个人标签 -->
       <div class="leftside">个人标签:</div>

  
        <div class="cardlabel_two">
        <el-card  class="card-label" shadow="hover"
              v-for="(item, index)  in myTaglist" key="item" @click="()=>{input=item}">
              {{ item }} 
            
            </el-card>
 
      </div>

      <!-- 获取个人搜索记录 -->
      <div class="leftside" >个人搜索记录:</div>
      <div class="cardlabel_two">
        <el-card  class="card-label" shadow="hover"
              v-for="(item, index)  in mySearchlist" key="item" @click="()=>{input=item.keywords}">
              {{ item.keywords }} 
            
            </el-card>
      </div>
      
      <!-- 推荐数据——走马灯轮播图 -->
      <div class="tuijian">
        <h2 class="commend_title">推荐书籍</h2>
        <el-carousel height="400px" class="swiper">

          <el-carousel-item class="swiper_item" v-for="item in 6" :key="item">
            <div @click="intodetailBySwiper(item.ISBN)" v-for="(item, index) in pictures" class="swiper_item_pic"
              key="item">
              <img :src="item.url" class="swiper_item_pic_img" />
             

            </div>
          </el-carousel-item>
        </el-carousel>
      </div>


      <div class="book">
        <span class="booklist">书籍列表</span>
        <el-row>
          <div class="book_">
            <!-- 每一个书籍所在的整个盒子 -->

            <!-- 用v-for来实现书籍列表 -->
            <el-card class="bookfor" key="item" v-for="(item, index) in downlist">
              <img :src=item.coverUrl class="image" />
              <div>
                <!-- <span>{{item.title}} </span> -->
                <span>{{ item.title }} </span>
                <div class="bottom">
                  <span>作者:{{ item.author }}</span>
                  <span>ISBN:{{ item.isbn }}</span>
                  <el-button text class="button" @click="intodetail(item.isbn)">查看详情</el-button>
                </div>
              </div>
            </el-card>

          </div>
        </el-row>
      </div>
      

      <!-- 分页 -->
      <div >
      <hr class="my-4" />
      <el-pagination
        :hide-on-single-page="pagevalue"
        :total="5"
        layout="prev, pager, next"
      />
    </div>

      <!-- 版权声明 -->
      <div class="copyright">
        <div class="copyright-text"> Copyright © 2022 北京xxxx有限公司.All Rights Reserved 京ICP备1234567号 京公网安备 XXX10902000XXX号</div>
       
      </div>
    </div>
  </div>
</template>
  

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { isShallow, onMounted, reactive, ref } from "vue";
import axios from "axios";
import store from "../../store";
import Search from '../../components/search/search/searchindex.vue'
import { getBooksByType,getAuto, getBookDetailByISBN, getSimpleImgByISBN ,getBooksByKeywords,getPublicTags,getQueryRecord,getPersonalTags,getByISBN} from '../../api/search/search'
import { pictureInt } from '@/type/search'
import { bookData, bookInt, DownListInt } from "@/type/book";
import { useStore } from "vuex";
import { number } from "echarts";
import { watch } from "vue";


axios.defaults.baseURL = "/api"; 
const router = useRouter();
const input = ref("");




//搜索框自动补全显示
let isShow=ref(false);
let autolist=ref(["哈利波特1","哈利波特2","哈利波特3"])
var ID=ref(1);//搜索框的搜索种类

//搜索提示内容点击可以替换input内容
function changeInput(value:any){
  input.value=value
  isShow.value=false;
}

let Autotext=ref({
  keywords:input.value,
  type:ID.value,
})

watch(
    ()=>input.value,
    (val,preVal)=>{
        changeShow1();
    },
    {
        //watch会在创建后立即执行一次
        immediate:true,
        deep:true,
    }
)



function changeShow1(){//获得焦点
  
  Autotext.value.keywords=input.value
  if(input.value!=''&&ID.value!=3){
    isShow.value=true;
    getAuto(Autotext.value).then((res:any)=>{
      autolist.value=res.data
      
    })
  }
  else{
    isShow.value=false;
  }
}

function changeShow2(){//失去焦点
  isShow.value=false;
}

//搜索框搜索
const SearchbookData=reactive({
  type:1,
  bookType:1,//这里默认写1
  keywords:'',
  highPrice:500,
  lowPrice:0,
  from:0,
}) 


function changeID(id:number){
  ID.value=id;
 
}


let seachtext=ref('书名搜索')

const search = (input: any) => {
  SearchbookData.keywords=input;
  //根据书名查询
  if(ID.value==1){
    SearchbookData.type=1;  
  }
  //根据作者查询
  else if(ID.value==2){
    SearchbookData.type=2;
  }else{
    //通过ISBN搜索可以直接进入详情页
    intodetailBySwiper(input);
  }
  if(ID.value==1||ID.value==2){
    console.log("查询类型"+ID.value);
    getBooksByKeywords(SearchbookData).then((res)=>{

      downlist.value=res.data

      for(let i=0;i<downlist.value.length;i++){
        downlist.value[i].coverUrl= "https://i5101b0918.oicp.vip"+downlist.value[i].coverUrl
      
      }
     
    })
  }

};

//onMounted
onMounted(()=>{
  getpeopleSearch()
  getMyTag()
  getmySearch()
}
)

// 获取大家在搜
let peopleSeachList=ref([]);
function getpeopleSearch(){
  getPublicTags().then((res)=>{
    peopleSeachList.value=res.data
   
  })
}

//获取个人标签
let myTaglist=ref([]);

function getMyTag(){
  getPersonalTags().then((res)=>{
    myTaglist.value=res.data
   
  })
}

//获取个人在搜
let mySearchlist=ref([])
function getmySearch(){
  getQueryRecord().then((res)=>{
    mySearchlist.value=res.data
    mySearchlist.value= mySearchlist.value.reverse()
    if(mySearchlist.value.length>=5){//只留前5条
      mySearchlist.value.length=5;
    }
   
  })
}


//书籍推荐的数据---根据查询结果填充进去（url title available）
let downlist:any = ref([
  ])


//轮播图搜索
//使用轮播图收集到点击的index，对应到后端的书本list[index]，然后跳到详情页去赋值
const intodetailBySwiper = (ISBN: any) => {
  store.dispatch('app/actisbn', ISBN);
  router.push({
    path: "/details",
  });

}


//根据标签来搜索，点击跳转
let typelist = {
  typename: ['小说', '文学', '动漫', '传记', '艺术', '童书', '教材', '历史', '政治军事', '法律', '哲学宗教',]
}

let typedata = {
  type: '',
  from: '1'
}

//点击标签实现筛选
let tem = reactive({ ISBN: '' });

const searchByType = (type: string) => {
  typedata.type = type
  getBooksByType(typedata).then((res) => {
   
    
    downlist.value=res.data.res

  

    for (let i = 0; i < downlist.value.length; i++) {
      downlist.value[i].coverUrl="https://i5101b0918.oicp.vip"+downlist.value[i].coverUrl
     
      
    }
  })


}

//轮播图推荐数据
//点击图片跳转到对应的界面（本质是用ISBN获取书籍详情信息getBookDetailByISBN）
let pictures: pictureInt[]

pictures = [
  {
    url: "https://i5101b0918.oicp.vip/file/1186adb7193f4aacbb4f027ffd375f81.jpg",
    ISBN: '039247-961320'
  },
  {
    url: "https://i5101b0918.oicp.vip/file/752f6a9f2af84478adb314ddf80b1004.jpg",
    ISBN: '274074-983123'
  },
  {
    url: "https://i5101b0918.oicp.vip/file/1327220e22e147828c5a3ec0f29fdf12.jpg",
    ISBN: '34301-12310'
  },
  {
    url: "https://i5101b0918.oicp.vip/file/752f6a9f2af84478adb314ddf80b1004.jpg",
    ISBN: '039247-1238'
  },
];



//点击跳转详情页 
const intodetail = (ISBN: string) => {
 
  
  store.dispatch('app/actisbn', ISBN);
  router.push({
    path: "/details",
  });
};


//是否分页
let pagevalue=ref(false)
</script>
  


<style >
.page {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgb(245, 245, 245), #ffffff);
}

.homepage {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
    height:80px
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
  
.videobox{
  height: 300px;
  width: 100%;
}

.search {
  width: 100%;
  height: 300px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search_img {
  width: 100%;
  height: 300px;
  position: absolute;
  overflow: hidden;
  z-index: 0;
}

.search_box {
  width: 650px;
  position: relative;
  margin-bottom: 10px;
}

.search-box-label{
  margin-top: 20px;
  position: absolute;
  top: -34px;
  left: 48px;

}


.search_input {
  width: 600px;
  margin-top: 20px;
  height: 60px;
  z-index: 1;

}

.search_icon {
  width: 40px;
  position: absolute;
  top: 30px;
  right: 40px;
  float: right;
  z-index: 2;
  cursor: pointer;
}

.search_scope {
  display: flex;
  background-color: #ffffff;
  align-items: center;
  float: right;
}

.search_supplement_box{
  position: absolute;
  left: 35%;
  width: 300px;
  background-color: aliceblue;
  
}

.search_supplement_each{
  
  font-size: 15px;
  margin-top: 5px;
  border-bottom:2px solid rgba(122, 118, 118,0.3) ;
  color: rgb(15, 16, 16);
  cursor: pointer;
}

.el-input__wrapper {
  border-radius: 60px;
}

.card-label {
  z-index: 1;
  width: 100px;
  height: 30px;
  border-radius: 25px;
  background-color: rgb(222, 238, 255);
  font-size: 8px;
  margin: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  overflow: hidden;
}


.cardlabel_one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* flex-wrap:wrap; */
}

.cardlabel_two {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  /* flex-wrap:wrap; */
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.tuijian {
  width: 100%;
}


.commend_title {

  margin-top: 25px;
  font-size: 30px;
  color: dimgray;
}

.swiper {
  margin-top: 50px;
  width: 100%;
}

.swiper_item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.swiper_item_pic {

  width: 320px;
  height: 100%;
  overflow: hidden;
  margin: 20px;
}

.swiper_item_pic_img {
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  margin: 10px;
  
}

.mainbutton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.home_button {
  width: 285px;
  height: 60px;
  font-size: 15px;
  background-color: rgb(222, 238, 255);
  border: 0px;
  color: black;
  margin: 15px;
}

.information {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.information_detail {
  width: 700px;
  height: 600px;
  margin: 15px;
  background-color: white;
  border-radius: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 180px;
}

.book {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.booklist {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.swiper {
  width: 100%;
}

.swiper_ {
  width: 100%;
}

.swiperitem {
  width: 960px;
  height: 540px;
}

.bookfor {
  margin: 15px;
  width: 350px;
  height: 350px;
}

.book_ {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.jieshao {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px;
}

.jieshao_img {
  height: 250px;
}

.jieshao_word {
  display: flex;
  flex-direction: column;
}

.jieshao_word_head {
  font-size: 1.75rem;
}

.jieshao_word_body {
  font-size: 0.95rem;
  letter-spacing: 3px;
}

.swiperimg {
  width: 100%;
  height: 100%;
}

.logo {
  width: 50px;
  height: 50px;
}

.moocimg {
  width: 100px;
  height: 75px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  border-radius: 5px;
}

.text_item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.text_item_ {
  display: flex;
  flex-direction: column;
}

.copyright{
  width: 100%;
  height: 40px;
  background-color: #999;
  display: flex;
  justify-self:center;
  align-items: center;
}
.copyright-text{
  width: 100%;
  font-size: 20px;
  text-align: center;
}
.autobox{
  color: aliceblue;
  font-size: 30px;
  z-index: 2;
}

.leftside{
  width: 200px;
  height: 50px;
  font-size: 20px;
  margin-bottom: 10px;
  
  background-color: #d2ea90;
  border-radius: 20px;

  display: flex;
  margin-right: auto;
  justify-content: center;
  align-items: center;
}
</style> 
  
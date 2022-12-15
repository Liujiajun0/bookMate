<template >
  <div class="dbody">
    <!-- 导航 -->
    <div class="navigation_box">
      <div class="navigation">
        <span class="navigation_title" @click="back()">回到首页</span>
      </div>
      <hr>
    </div>

    <!-- 书本标题 -->
    <div class="title">
      {{book.title}}
    </div>

    <!-- 书本相关信息 -->
    <div class="imformation">
      <div class="img_box">

        <!-- 这是图片位置 -->
        <img class="img" :src=book.cover_url alt="">

      </div>

      <div class="baseimfor">


        <div class="imfor" >作者: {{ book.author }}</div>
        <div class="imfor">出版社: {{ book.publisher }}</div>
        <div class="imfor">总数: {{ book.total }}</div>
        <div class="imfor">当前余量: {{ book.availableNum }}</div>
        <div class="imfor">类别: {{ typelist.typename[book.type - 1] }}</div>
        <div class="imfor">售价: {{ book.price }}</div>
        <div class="imfor">ISBN: {{store.getters.byISDN}}</div>
        
        <div class="collect" @click="changeCollect()">
          <span >添加收藏</span>
          <img src="../../../images/聚收藏gift.png" alt="" v-if="isCollect" class="collect_img" >
          <img src="../../../images/聚收藏.png" alt="" v-else class="collect_img">
        </div>
      </div>

      <div class="fenshu">
        <div class="fenshu_fenshu">评分：{{ score }}</div>
        <el-rate v-model="starvalue" allow-half />
        <br>
      </div>



      <!-- 开始计时显示的地方 -->
      <div class="countTime">
        <p class="readtime">阅读时间</p>
        <p class="showtime">
          <span>{{ Time.h }}</span>
          <span>:</span>
          <span>{{ Time.m }}</span>
          <span>:</span>
          <span>{{ Time.s }}</span>
        </p>
        <p class="juzhong">
          <button class="lendbuttom" @click="startCount()" v-if="!isCounting">开始阅读</button>
          <button class="lendbuttom" @click="endCount()" v-else>暂停阅读</button>
        </p>
      </div>

    </div>


    <!-- 阅读进度 -->
    <div>阅读进度</div>
    <div>{{ jindu }}%</div>
    <div class="read_progress">
      <div class="slider-demo-block">
        <el-slider v-model="jindu" />

      </div>

      <!-- 借书状态 -->
      <div class="lend">
        <button class="lendbuttom" @click="changeState(1)">在线预订</button>
        <button class="lendbuttom" @click="CheckMyTab()">查询预订</button>
        <!-- <button class="lendbuttom">{{ ding }}</button> -->
      </div>
      <div class="introduce">
        <div class="intro_title">书本介绍</div>
        <div class="intro_detail">{{ book.introduction }}</div>
      </div>
      <div class="introduce">
        <div class="intro_title">书本目录</div>
        <div class="intro_detail">{{ book.catalogue }}</div>
      </div>

      <div class="introduce">
        <div class="intro_title">引言</div>
        <div class="intro_detail">{{ book.preface }}</div>
      </div>

      <div class="tuijian_title">同类书籍/相关推荐</div>
      <el-row>
        <div class="book_">
          <!-- 每一个书籍所在的整个盒子 -->

          <!-- 用v-for来实现书籍列表 -->
          <el-card class="bookfor" key="item" v-for="(item, index) in downlist">
            <img :src=item.coverUrl class="bookimage" />
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


      <!-- 个人心得展示部分 -->
      <div>
        <h2 class="xinde-title">个人心得</h2>
      </div>



      <div class="changestyle_title">风格切换</div>
      <div class="style1" @click="changeStyle(1)">
        <p>风格1</p>
      </div>


      <div class="style2" @click="changeStyle(2)">
        <p>风格2</p>
      </div>
      <div class="style3" @click="changeStyle(3)">
        <p>风格3</p>
      </div>

      <!-- 心得界面 -->
      <div class="xindecontent">
        <img class="xinde-box" :src="xindesrc">
        <div class="xinde-overflow">
          <div v-if="xindeContentList.length==0">
          <!-- <img src="../../../images/empty.png" alt=""  width="300" style="position: absolute;" > -->
          <!-- <div style="font-size: 30px;">空空如也</div> -->
        </div>
          <div class="xindelist" >
            
            <div v-for="(item, index) in xindeContentList " key="item" class="xinde-each">
              <!-- 心得标题 -->
              <div>标题{{item.subject}}</div>
              <img src="../../../images/引号.png" alt="" width='20'><br>
              <!-- 心得内容 -->
              <span class="xinde-each-text">{{ item.content }}</span><br>
              
              <img src="../../../images//引号 (1).png" alt="" width='20' style="align-self:flex-end ;right: 2px;">
              <!-- 心得读者 -->
              <div>发布者：{{item.poster.nickName}}</div>
              
            </div>


          </div>
        </div>
      </div>


      <div>
      
        <button class="xinde_write_button" @click="changexindewrite()">心得书写</button>
      </div>
      <!-- 个人心得编辑部分 -->
      <div v-show="xindewrite">
        <div>
          <h2 class="xinde_write_title">心得书写</h2>
        </div>

        <div class="xinde_write_box">
          <div style="margin: 20px 0" />
          <!-- 书写部分 -->
          <!-- 分享标题 -->
          <div class="write_background">
            <el-input
              v-model="shareBox.subject"
             maxlength="10"
              placeholder="分享标题"
              show-word-limit
              type="text"
              />
          </div>
          <!-- 分享具体内容 -->
          <div class="write_background">
            <textarea name="" id="" cols="30" rows="10" v-model="shareBox.content" class='textarea' placeholder="分享内容"></textarea>
          </div>
          <el-button type="success" @click="save_xinde()" size="large">
            <h3>发布</h3>
          </el-button>


        </div>
      </div>
      <!-- 回到顶部 -->
      <el-backtop :right="100" :bottom="100" />
    </div>
  </div>
</template>




<script lang="ts" setup>
import { login } from "@/api/login";
import { getMoreLikeThis,getByISBN,getBookDetailByISBN,getSimpleImgByISBN} from "@/api/search/search"
import { reactive, ref, onMounted,watch} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { backtopEmits } from "element-plus";
import { xindeData, xindeInt } from "../../type/detail";
import { DownListInt } from '@/type/book'
import {showPostDetail,showPostList,sharePost} from '@/api/share/share'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { time } from "console";
import { stubObject } from "lodash";

const store = useStore();
const router = useRouter();

//是否收藏
const isCollect = ref(false);

//改变收藏状态
function changeCollect(){
  console.log(isCollect.value);
  isCollect.value=!isCollect.value;
  //添加收藏
  if(isCollect.value==true){
    store.dispatch('app/actColllectList', store.getters.byISDN);
    console.log("添加"+store.getters.byISDN);
  }
  //删除收藏
  else{
    let list=store.getters.collectlist
    for(let i = list.length- 1; i >= 0; i--) {
      if(list[i] ===store.getters.byISDN ) {
        list.splice(i,1)
        console.log("已取消收藏1");
        break;  
      }

    }
    store.dispatch('app/resetcollectList', store.getters.collectlist);
    console.log("已取消收藏2");
  }
 
  
  
}



//评分数据
const starvalue = ref(2.5)
const score = ref(7.3)//评分高低

//阅读进度
const jindu = ref(0);



//是否开启心得书写
const xindewrite = ref(false)


//记录计时状态
let isCounting = ref(false);

const Time = reactive({
  h: '00',
  m: '00',
  s: '00',
})

let xindesrc = ref('')

//开始计时
const countDown = () => {
  Time.s = (parseInt(Time.s) + 1).toString();
  if (parseInt(Time.s) >= 60) {
    Time.s = '0';
    Time.m = (parseInt(Time.m) + 1).toString();
  }
  if (parseInt(Time.s) >= 60) {
    Time.m = '0';
    Time.h = (parseInt(Time.h) + 1).toString();
  }
  if (parseInt(Time.s) < 10 && Time.s.length < 2) {
    Time.s = '0' + Time.s;
  }
  if (parseInt(Time.m) < 10 && Time.m.length < 2) {
    Time.m = '0' + Time.m;
  }
  if (parseInt(Time.h) < 10 && Time.h.length < 2) {
    Time.h = '0' + Time.h;
  }
}

let timeend = ref(false);
function endCount() {
  timeend.value = !timeend.value
  isCounting.value = !isCounting.value;
}
function startCount() {

  
  
  //计时器
  isCounting.value = !isCounting.value;
  console.log(isCounting);

  let timer = setInterval(() => {
    if (timeend.value) {

      clearInterval(timer);
    }
    Time.s = (parseInt(Time.s) + 1).toString();
    if (parseInt(Time.s) >= 60) {
      Time.s = '0';
      Time.m = (parseInt(Time.m) + 1).toString();
    }
    if (parseInt(Time.s) >= 60) {
      Time.m = '0';
      Time.h = (parseInt(Time.h) + 1).toString();
    }
    if (parseInt(Time.s) < 10 && Time.s.length < 2) {
      Time.s = '0' + Time.s;
    }
    if (parseInt(Time.m) < 10 && Time.m.length < 2) {
      Time.m = '0' + Time.m;
    }
    if (parseInt(Time.h) < 10 && Time.h.length < 2) {
      Time.h = '0' + Time.h;
    }

  }, 1000)

}

//回到首页
function back() {
  router.push('/')
}
//书本信息对象
// let books=nowbook;
let book = ref({
  title: "咖啡馆比其他河流更慢",
  author: "福州大学",
  publisher: "福州大学出版社",
  preface: "序言",
  catalogue: '目录',
  introduction: '简介',
  price: '99.9',
  total: "13",
  availableNum: '114',
  isbn: '9787208165885',
  type: 6,
  coverUrl:"https://i5101b0918.oicp.vip/file/752f6a9f2af84478adb314ddf80b1004.jpg"
})


let typelist = {
  typename: ['小说', '文学', '动漫', '传记', '艺术', '童书', '教材', '历史', '政治军事', '法律', '哲学宗教',]
}




//相关书籍搜索的参数
const bookabout = ref({
  title: '',
  from: 0
})




var downlist = ref(
  [
    {
      coverUrl: '../../../images/books/book1.jpg',
      title: 'hello',
      isbn: '500',
      author:''

    },
    {
      coverUrl: '../../../images/books/book2.jpg',
      title: 'hello',
      isbn: '600',
      author:''
    },]
)


//在线预订
let isborrow = ref(false);
function changeState(number:number) {
  let booklist=store.getters.collectlist;
  for(var i=0;i<booklist.length;i++){
    if(book.value.isbn==booklist[i].Isbn){
      isborrow.value=true;
      break;
    }
  }
  if(i==booklist.length){
    isborrow.value=false;
    
  }
 if(number==1){
  router.push('/subscribe')
 }

}

//查看预订
function CheckMyTab(){
  router.push('searchSubscribe');
}



//改变风格函数
let picid = ['', 'https://ts3.cn.mm.bing.net/th?id=OIP-C.l60slO6Y-qDDt7g0FMZyOAHaLJ&w=203&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2', 'https://tse1-mm.cn.bing.net/th/id/OIP-C.aUgMH7FIPQtzJ4-HhbUioAAAAA?w=192&h=192&c=7&r=0&o=5&dpr=1.1&pid=1.7', 'https://tse1-mm.cn.bing.net/th/id/OIP-C.45bQDDIfdYRzePeAFnWiZAHaDe?w=344&h=164&c=7&r=0&o=5&dpr=1.1&pid=1.7']
function changeStyle(id: number) {
  xindesrc.value = picid[id]
}

//相关推荐
const intodetail = (ISBN: string) => {
  store.dispatch('app/actisbn', ISBN).then(() => {
    initbook()
})
 
  
};




function initbook(){

  //判断初始状态下是否收藏
  for(let i=0;i<store.getters.collectlist.length;i++){
    if(store.getters.byISDN==store.getters.collectlist[i]){
      isCollect.value=true;
      break;
    }
    isCollect.value=false;
  }
  //基本数据清零
  

  let tem = reactive({ ISBN: '' });
  tem.ISBN = store.getters.byISDN
  book.value.isbn=tem.ISBN;
  
  getBookDetailByISBN(tem.ISBN).then((res)=>{

    
    book.value=res.data
    book.value.cover_url="https://i5101b0918.oicp.vip"+book.value.cover_url
   
  })
  changeState(0);
  changeStyle(3)
  bookabout.value.title=book.value.title
  
  getMoreLikeThis(bookabout.value).then((res) => {

    downlist.value = res.data
    for(let i=0;i<downlist.value.length;i++){
      downlist.value[i].coverUrl="https://i5101b0918.oicp.vip"+downlist.value[i].coverUrl
    }
   
    
})

renewXindeList()


}

function renewXindeList(){
  //更新心得部分
let getXindelist=ref({
  isbn:"",
  page:"0"
})
  getXindelist.value.isbn=store.getters.byISDN
  showPostList(getXindelist.value).then((res)=>{
    xindeTitleList.value=res.data
  
    
    
  for(let i=0;i<xindeTitleList.value.length;i++){
    let id:string=xindeTitleList.value[i].id
   
    
    showPostDetail(id).then((res)=>{
      
      xindeContentList.value[i]=res.data
    })
  }
})


}

onMounted(() => {//获取到isbn
  initbook()

})


//点击保存触发分享
function save_xinde() {
  if (shareBox.value.content.length != 0 && shareBox.value.subject.length!=0) {
    sharePost(shareBox.value).then((res)=>{
      
      alert("发布成功")
      renewXindeList()
    })
    
  }
  else {
    alert('输入不能为空')
  }


  shareBox.value.content= ''
  shareBox.value.subject= ''
}

//心得书写状态
function changexindewrite() {
  xindewrite.value = !xindewrite.value
}

//留言区
//分享内容的框
let shareBox=ref({
  content:"",
  subject:"",
  bookIsbn:store.getters.byISDN,
})

//返回心得标题列表
let xindeTitleList=ref([])

//返回心得内容列表
let xindeContentList:any=ref([
  
])



</script>

<style scoped>
.dbody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.title {
  width: 1000px;
  font-size: 35px;
  font-weight: bold;
}

.imformation {
  position: relative;
  width: 1000px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.img_box {
  width: 250px;
  height: 250px;
  background-color: rgb(125, 125, 125);
}

.img {
  width: 100%;
  height: 100%;
}

.baseimfor {
  width: 300px;

  margin-left: 20px;
}

.imfor {
  margin-top: 5px;
}

.fenshu {
  border-left: 2px solid rgb(245, 245, 245);
  padding-left: 10px;
  margin-left: 50px;
}

.el-progress--line {
  width: 200px;
}

.fenshu_fenshu {
  width: 160px;

  font-size: 25px;

}

.progress {
  margin-top: 5px;
}

.lend {
  width: 1000px;
  display: flex;
  /* justify-content:flex-start; */
  flex-direction: row;
  margin-top: 20px;
}

/* 借书按钮 */
.lendbuttom {
  /* width: 120px; */
  padding: 15px 15px;
  margin-left: 15px;
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

.lend-book-title {
  display: flex;
  /* justify-content: center; */
  text-align: center;
  margin-left: 40px;
}

.introduce {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.intro_title {
  font-size: 25px;
  font-weight: 700;
}

.intro_detail {
  margin-top: 15px;
  margin-left: 50px;
  margin-right: 50px;
}

.book_ {

  width: 100%;
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
.tuijian_title {
  width: 1000px;
  display: flex;
  flex-flow: row;
  margin-top: 50px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 25px;
}


.xinde-each {
  position: relative;
  width: 80%;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: aliceblue;
  margin-top: 25px;
  display: flex;
  flex-direction: column;

}

.xinde-each-text {
  font-size: 23px;
  padding-left: 40px;
}

.xinde_deletebox {
  position: absolute;
  top: 20%;
  right: -130px;
}

.xinde-deletebutton {
  width: 120px;
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

/* 评分滑动 */
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

/* 收藏图标 */

.collect{
  display: flex;
  align-items: center;
}
.collect_img {
  width: 40px;
  margin-top: 15px;
  margin-left: 15px;
}

.user_image {
  display: flex;
}

.showtime {
  background-color: rgba(119, 184, 221, 0.5);
  border-radius: 10px;
  font-size: 30px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.readtime {
  text-align: center;
  font-size: 20px;
  color: black;
  font-weight: 700px;

}

/* 阅读进度 */
.read_progress{
  width: 1000px;
}

.changestyle_title {
  margin: 20px 0;
  font-size: 25px;


}

.clickzan {
  margin-top: 10px;
  margin-right: 40px;
}

.lendcode {
  position: absolute;
  display: none;
  width: 200px;
  height: 250px;
  top: -10%;
  right: -250px;
  /* border: 2px solid red; */
  margin: 10px;
}

.lendimage {
  /* width: 100%; */
  height: 100%;
}

.countTime {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 50px;
  background-color: rgb(56, 234, 234);
}

.countTime:hover {
  border-color: #646cff;
}

.countTime:focus,
.countTime:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.juzhong {
  display: flex;
  justify-content: center;

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

.xinde-box {
  display: flex;
  height: 500px;
  width: 1000px;
  border: 10px solid rgb(187, 228, 244);
  border-radius: 20px;

  justify-content: center;
  position: absolute;
  z-index: 0;
}

.xinde-outside {
  /* display: block; */
  border: 5px solid #646cff;
  border-radius: 20px;
  background-color: #fff;
  z-index: 2;
}

.xinde-content {

  display: flex;

}

.style1 {
  width: 200px;
  height: 100px;
  border: 2px solid blue;
  display: inline-block;
  text-align: center;
  line-height: 100px;
  background-image: url('https://ts3.cn.mm.bing.net/th?id=OIP-C.l60slO6Y-qDDt7g0FMZyOAHaLJ&w=203&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2');
  cursor: pointer;
}


.style2 {
  width: 200px;
  height: 100px;
  border: 2px solid blue;
  display: inline-block;
  text-align: center;
  line-height: 100px;
  background-image: url('https://tse1-mm.cn.bing.net/th/id/OIP-C.aUgMH7FIPQtzJ4-HhbUioAAAAA?w=192&h=192&c=7&r=0&o=5&dpr=1.1&pid=1.7');
  cursor: pointer;
}


.style3 {
  width: 200px;
  height: 100px;
  border: 2px solid blue;
  display: inline-block;
  text-align: center;
  line-height: 100px;
  background-image: url('https://tse1-mm.cn.bing.net/th/id/OIP-C.45bQDDIfdYRzePeAFnWiZAHaDe?w=344&h=164&c=7&r=0&o=5&dpr=1.1&pid=1.7');
  cursor: pointer;

}

h2 {
  font-size: 30px;
  padding-top: 20px;
}

.xinde_write_title {
  margin-top: 50px;
}

.xinde_write_box {
  padding: 10px 0;
  /* display: none; */
}

.xinde_write_button {
  margin-top: 50px;
  width: 120px;
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

.write_background {
  width: 100%;
  border: 3px solid rgb(198, 149, 90);
  border-radius: 5px;
  z-index: 2;
}

.textarea {
  width: 100%;
  height: 200px;
  font-size: 25px;
  resize: none
}

.xindecontent {
  width: 1000px;
  height: 480px;
  position: relative;
  top: 0;
  margin-top: 40px;
}

.xindelist {
  /* background-color:; */
  position: relative;
  top: 30px;
  left: 50px;

  z-index: 1;

}

.xinde-overflow {
  position: absolute;
  height: 480px;
  width: 100%;
  top: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2;
}

.writebuttom {}
</style>
  

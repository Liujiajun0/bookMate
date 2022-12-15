<template>
    <div>
       

        <!-- 每日打卡界面  并没有什么实际功能-->

        <h2 class="title_text">日期：{{time.year}}年{{time.month}}月{{time.day}}日</h2>
        <div class="daka" >
            <div  class="title_text">打卡情况如下</div>
            
           
          
            <div>
              <ul class="daka_zone">
                <li v-for="(item,index) in daylist" key="item" class="daka_eachday" @click="tick()">{{item}}</li>
              </ul>
              
            </div>
        </div>

       
        <div class="title_text">阅读状态</div>
        <div>
           
        <div id="char" style="width: 300px; height: 400px"></div>
                

            
        </div>


    </div>
</template>

<script lang='ts' setup>
import {onMounted, reactive} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';
import { create } from 'lodash';
import{getQueryRecord,getPublicTags, getPersonalTags} from '@/api/search/search'
import{getCopy,createSingleQRCode} from '@/api/borrow/borrowdata'

//打卡部分


var date = new Date();
var time= {
  year:date.getFullYear(), //获取了年 对应key:YYYY
  month:date.getMonth()+1, //获取了月 对应key:MM
  day:date.getDate(), //获取了日 对应key:DD
}




//判断当月对应的天数
let daylist:any=reactive([]);
var monthlist=reactive([0,31,28,31,30,31,30,31,31,30,31,30,31]);
if((time.year%4==0&&time.year%100!=0)||(time.year%400==0)){
  monthlist[2]=29;
}else{
  monthlist[2]=28;
}



//创建对应的框 
let createtable=(()=>{
  for(var i=1;i<=monthlist[time.month];i++){
  daylist[daylist.length]=i;
 
  }
})




//显示饼状图
onMounted(() => {

  createtable()
  const charEle = document.getElementById('char') as HTMLElement;
  console.log()
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '嘿嘿'
        },
        {
          value: 2340,
          name: '哈哈'
        },
        {
          value: 1548,
          name: '呼呼'
        }
      ]
    }
  ]
  };
  charEch.setOption(option);

  
});
</script>

<style scoped>

.daka_zone{
  width: 90%;
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
}

.daka_eachday{

  width: 50px ;
  height: 50px;
  background-color: azure;
  border: 2px solid rosybrown;
  color: black;
  margin: 10px 10px ;
  cursor: pointer;
}

.title_text{
  font-size: 20px ;
  font-weight: 700;
  margin: 15px 0;
}

</style>
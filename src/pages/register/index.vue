<template >
  <!-- 整个背景标签 -->
  <div class="back">

    <!-- 登录的盒子 -->
    <div class="box" >

      <div class="box_card">
        <h2 class="register_title">注册</h2>
        <!-- 右半边部分 -->
        <div class="box-card_right">
          <!-- 表单组件的属性 -->
          <el-form ref="formRef" :model="form" label-width="80px" :rules="rules" >
            <el-form-item label="邮箱" required prop="email" class="register_text">
              <el-input v-model="form.email" />
            </el-form-item>


            <el-form-item label="密码" required prop="password" class="register_text">
              <el-input v-model="form.password" type="password" />
            </el-form-item>

            <el-form-item label="验证码" required prop="code" class="register_text">
              <el-input v-model="form.code" />
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="onSubmit">注册</el-button>
              <!-- <button  @click="sendCode" class="registerBtn"></button> -->
              <el-button type="primary" @click="sendCode" class="registerBtn" 
              :disabled="btnDisable"
           >发送验证码</el-button>
            </el-form-item>


          </el-form>


        </div>
      </div>
    </div>


  </div>
</template>
  
  
<script lang="ts" setup>
import { sendMail, RegisterByEmail } from "@/api/login";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { buttonTypes, FormInstance } from 'element-plus'
import router from "@/router";
import { useRouter } from "vue-router";


const ruleFormRef = ref<FormInstance>()



const store = useStore();
const route = useRouter();
const btnDisable = ref(false);
const form = reactive({
  email: '',
  password: '',
  code: ''
});


const formRef = ref(form);




//注册成功和注册界面的数据判断

const rules = reactive({
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },

  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: '密码长度在6-16位', trigger: 'blur' },
  ],

});



//提交实现注册 
const onSubmit = () => {
  console.log('注册');
  RegisterByEmail(form).then((res) => {
    console.log(res);
    alert("注册成功，请重新登录")
    route.push("/login");

  })
}

//发送验证码
const sendFrom = reactive({
  email: '',
  type: 1  //代表是注册
})

const sendCode = () => {
  //发送验证码：
  sendFrom.email = form.email
  console.log(sendFrom.email);
  console.log("type: "+sendFrom.type);
  sendMail(sendFrom).then((res) => { 
    console.log(res);
  })


  var btn = document.querySelector('.registerBtn')
  btn!.innerHTML = '验证码已发送'
  let time = 6;
  const timer = setInterval(function () {
    if (btn)
      btnDisable.value=true
      time--;
    btn!.innerHTML = '还剩下' + time + '秒'
    if (time == 0) {
      btnDisable.value = false
      clearInterval(timer)
    }

  }, 1000)}

  


</script>
  
<style scoped>
.back {
    width: 100%;
    height: 100%;
    display: flex;  
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: 100%;
    background-image: url('https://tse4-mm.cn.bing.net/th/id/OIP-C.05deY2yzNg4PRLEr05jfDwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7');
  }

.box {
  margin: 250px;
  width: 650px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgb(175, 175, 175);
}

.box_card {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
   
  }

.form-title {
  padding: 20px 0 30px;
  font-size: 24px;
  color: #409eff;
  text-align: center;
}

.box-card_right {
  width: 300px;
  height: 350px;
  position: absolute;
  left: 25%;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}


.register_title {
  color: rgb(96, 106, 114);
  font-size: 40px;
  text-align: center;
  padding: 10px;
}


.register_text {
  color: aliceblue;
}

.register_success {
  display: flex;
  width: 80%;
  height: 400px;
  background-color: aliceblue;
  color: black;
  font-size: 50px;
  justify-content: center;
  line-height: 400px;

}
</style>




<!-- * {
    margin: 0;
    padding: 0;
}
 
.register_box{
width: 700px;
height:700px;
margin: 200px auto;
display: flex;
justify-content: center;
padding: 10px;
border: 5px solid skyblue;
border-radius: 20px;
background-image: url('../../../images/pig1.jfif');
}


.name{
height: 25px;
margin-bottom: 25px;
} -->

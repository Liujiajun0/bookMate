<!-- √ -->
<template >
  <!-- 整个背景标签 -->
  <div class="back">
    <!-- 登录的盒子 -->
    <div class="box">
      
      <!-- <div class="box_card"> -->
        
        <!-- 左半边部分 -->
        <!-- <div class="box-card_left">
          <img src="../../assets/222.jpg" alt="" />
        </div> -->

        <!-- 右半边部分 -->
        <div class="box-card_right">
          <h2 class="login_title">登录</h2>
          <!-- 表单组件的属性 -->
          <el-form
            ref="formRef"
            :model="form"
            label-width="70px"
            :rules="rules"
          >
            <el-form-item label="邮箱" required prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" required prop="password">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button type="primary" @click="register()">注册</el-button>
              <el-button type="primary" @click="findpassword()">找回密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      <!-- </div> -->
    </div>

  </div>
</template>


<script lang="ts" setup>
import { login } from "@/api/login";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


const store = useStore();
const router=useRouter();


const form = reactive({
  username: "",
  password: "",
});

const formRef = ref(form);

const rules = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
});

//登录功能
const onSubmit = () => {
      login(form).then((res)=>{
        //保存token，进入Home界面
        window.sessionStorage.setItem("token", res.data.token); 

        alert("登录成功！")
        router.push({
          path: "/home",
        });
      })

}



function register(){
  router.push('/register')
}

function findpassword(){
  router.push('/find')
}

</script>

<style scoped>
.back {
  width: 100%;
  height: 100%;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('https://tse4-mm.cn.bing.net/th/id/OIP-C.05deY2yzNg4PRLEr05jfDwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7');
  background-size: 100% 100%;
  overflow: hidden;
}
.box {
  margin: 250px;
  padding-top: 15px;
  width: 500px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgb(175, 175, 175);
  
}

.box_card {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  
}

.form-title {
  padding: 20px 0 30px;
  font-size: 24px;
  color: #409eff;
  text-align: center;
}
.box-card_left {
  width: 350px;
  height: 350px;
  overflow: hidden;
  object-fit: cover;
}
.box-card_right {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login_title{
    position: absolute;
    color: rgb(108, 93, 93);
    font-size: 35px;
    text-align: center;
    top: 30px;
    /* padding: 12px; */
}

</style>

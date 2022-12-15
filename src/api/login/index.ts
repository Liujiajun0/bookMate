
import request from "../request";



//邮箱登录 
export const login = (fdata: { username: string; password: string }) => {
  let formData = new FormData();
  formData.append("email",fdata.username);
  formData.append('password',fdata.password);
  return request({
    url: "/user/loginByEmail",
    method: "POST",
    data: formData
  });
};


//获取注册及找回密码验证码 
export const sendMail = (fdata: { email: string; type:number}) => {
  let formData = new FormData();
  formData.append("email",fdata.email);
  formData.append('type','1');
  return request({
    url: "/mail/sendMail",
    method: "post",
    data: formData
    
  })
};


//邮箱注册
export const RegisterByEmail = (fdata: { email: string; password: string ;code:string}) => {
  let formData = new FormData();
  formData.append("email",fdata.email);
  formData.append('password',fdata.password);
  formData.append('code',fdata.code);
  return request({
    url: "/user/registerByEmail",
    method: "post",
    headers: {'Content-Type': 'multipart/form-data',
    },
      data: formData
  });
};

//找回密码
export const ResetForgottenPassword = (fdata: { email: string; newPwd: string ;code:string}) => {
  let formData = new FormData();
  formData.append("email",fdata.email);
  formData.append('newPwd',fdata.newPwd);
  formData.append('code',fdata.code);
  return request({
    url: "/user/resetForgottenPassword",
    method: "POST",
    headers: {'Content-Type': 'multipart/form-data',
    },
    data: formData
  });
};

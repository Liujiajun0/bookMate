
import request from "../request";


//查询所有副本
export const getCopy = (isbn: string) => {
  let token=window.sessionStorage.getItem("token")??""
  
  return request({
    url: "/single/getCopy/"+isbn,
    method: "GET",
    headers: {
      'token': token,
    },
  });
};

//生成副本二维码
export const createSingleQRCode = (data: { bookId: string; }) => {
  let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/single/createSingleQRCode/"+data.bookId,
    method: "GET",
    headers: {
      'token': token,
    },

  });
};


//加入借书栏
export const addToCert = (data: { bookId: string; }) => {
  let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/borrow/addToCert/"+data.bookId,
    method: "POST",
    headers: {
      'token': token,
    },
  });
};

//删除借书栏中某本书
export const delCert = (data: { bookId: string;  }) => {
  let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/borrow/delCert/"+data.bookId,
    method: "POST",
    headers: {
      'token': token,
    },

  });
};

//查看借书栏(弃用)
export const showCert = () => {
  let token=window.sessionStorage.getItem("token")??""
  
  return request({
    url: "/borrow/showCert",
    method: "GET",
    headers: {
      'token': token,
    },

  });
};

//查看借书记录（弃用）
export const showBorrowed = ( type: string) => {
  let token=window.sessionStorage.getItem("token")??""
  
  return request({
    url: "/borrow/showBorrowed/"+type,
    method: "GET",
    headers: {
      'token': token,
      
    },
 
  });
};

//预订书籍
export const addOrder = ( fdata:{bookId:string,orderTime: string}) => {
  let token=window.sessionStorage.getItem("token")??""
  let formData = new FormData();
  formData.append("bookId",fdata.bookId);
  formData.append('orderTime',fdata.orderTime);
  return request({
    url: "/order/addOrder",
    method: "POST",
    headers: {
      'token': token,
      'Content-Type': ''
    },
    data:formData
  });
};

//查询预订
export const showOrder = () => 
{
  let token=window.sessionStorage.getItem("token")??""
  
  return request({
    url: "/order/showOrder",
    method: "GET",
    headers: {
      'token': token,
    },

  });
};


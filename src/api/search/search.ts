import request from "../request";


//根据ISBN查找 
export const getByISBN = (ISBN:string ) => {
  let formData = new FormData();
  let token=window.sessionStorage.getItem("token")??""

  formData.append("isbn",ISBN);
  return request({
    url: "/book/getByISBN/"+ISBN,
    method: "post",
    headers: {
      'token': token,
    },

  });
};


//通过isbn号获取书籍缩图
export const getSimpleImgByISBN = (fdata: { ISBN:string }) => {
  let token=window.sessionStorage.getItem("token")??""
  let formData = new FormData();
  formData.append("isbn",fdata.ISBN);
  return request({
    url: "/book/getSimpleImgByISBN/"+fdata.ISBN,
    method: "get",
    headers: {
      'token': token,
    },
  });
};

//获取书籍详细信息 
export const getBookDetailByISBN = ( ISBN:string ) => {
 
  let token=window.sessionStorage.getItem("token")??""

 
  return request({
    url: "/book/getBookDetailByISBN/"+ISBN,
    method: "get",
    headers: {
      'token': token,
    },  
    params: {
      
    }
  });
};


//获取某一类型的书籍 
export const getBooksByType = (fdata: { from:string,type:string }) => {
  let formData = new FormData();
  let token=window.sessionStorage.getItem("token")??""

  formData.append("from",fdata.from);
  formData.append("type",fdata.type);

  return request({
    url: "/book/getBooksByType",
    method: "post",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },
    data:formData

  });
};


//关键词筛选查找  
export const getBooksByKeywords = (fdata: { type:number,bookType:number,keywords:string,highPrice:number,lowPrice:number,from:number }) => {
  let formData = new FormData();
  let token=window.sessionStorage.getItem("token")??""
  
  formData.append("type",fdata.type.toString());
  formData.append('bookType',fdata.bookType.toString());
  formData.append('keywords',fdata.keywords);
  formData.append('highPrice',fdata.highPrice.toString());
  formData.append('lowPrice',fdata.lowPrice.toString());
  formData.append('from',fdata.from.toString());

  return request({
    url: "/book/getBooksByKeywords",
    method: "post",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },
    data: formData
  });
};


//获取某本书相关 
export const getMoreLikeThis = (fdata: { title:string,from:number }) => {
  let formData = new FormData();
  let token=window.sessionStorage.getItem("token")??""
  formData.append("title",fdata.title);
  formData.append('from',fdata.from.toString());
  return request({
    url: "/book/getMoreLikeThis",
    method: "post",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },
    data:formData
  });
};


//获取个人搜索记录 
export const getQueryRecord = () => {
 let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/book/getQueryRecord",
    method: "get",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },

  });
};

//获取大家在搜 
export const getPublicTags = () => {
  let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/book/getPublicTags",
    method: "get",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },
    params: {
        
    }
  });
};

//获取个人标签 √
export const getPersonalTags = () => {
  let token=window.sessionStorage.getItem("token")??""
  return request({
    url: "/book/getPersonalTags",
    method: "GET",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },

  });
};


//获取搜索框自动补全 
export const getAuto = (fdata: { keywords:string,type:number }) => {
  let token=window.sessionStorage.getItem("token")??""
  let formData = new FormData();
  formData.append("keywords",fdata.keywords);
  formData.append('type',fdata.type.toString());
  
  return request({
    url: "/book/getAuto",
    method: "post",
    headers: {
      'Content-Type':'multipart/form-data',
      'token': token,
    },
    data:formData
  });
};
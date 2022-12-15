import request from "../request";

//添加分享 
export const sharePost = (fdata:{content:string,subject:string,bookIsbn:string}) => {
  let formData = new FormData();
  let token=window.sessionStorage.getItem("token")??""
  
  formData.append("content",fdata.content);
  formData.append("subject",fdata.subject);
  formData.append("bookIsbn",fdata.bookIsbn);
  
  return request({
    url: "/post/sharePost",
    method: "post",
    headers: {
      'token': token,
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  });
};


// 查看某本书籍的分享列表 
export const showPostList = (fdata:{isbn:string,page:string}) => {
    let formData = new FormData();
    let token=window.sessionStorage.getItem("token")??""
    

    formData.append("isbn",fdata.isbn);
    formData.append("page",fdata.page);
    
    return request({
      url: "/post/showPostList",
      method: "post",
      headers: {
        'token': token,
        'Content-Type': 'multipart/form-data',
      },
      data:formData
    });
  };


//   查看分享详情
  export const showPostDetail = (id:string) => {
    let token=window.sessionStorage.getItem("token")??""
    
    return request({
      url: "/post/showPostDetail/"+id,
      method: "get",
      headers: {
        'token': token,
        'Content-Type': 'multipart/form-data',
      },

    });
  };
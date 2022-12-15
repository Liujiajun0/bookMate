export interface bookInt{
    id:number,
    ISBN:string,
    title:string,
    author:string,
    publisher:string,
    versionNum:string,
    coverUrl:string,
    preface:string,
    catalogue:string,
    introduction:string,
    load:string,
    total:number,
    availableNum:number,
    type:number,
    price:number,

}

export class bookData{
    serchData={
       index:0
    }
    bookList:bookInt[]=[];

}

//首页最下面书籍列表显示的内容
//缩略图，书名
export interface DownListInt{
    url:string,
    title:string,
    available:number
    ISBN:string
}


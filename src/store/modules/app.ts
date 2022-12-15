export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || "",
    sideBarOpened: true,
    byISDN:undefined,
    //借书栏书本
    borrowlist:[],
    //收藏书本
    collectlist:[],
    //总的书本
    nowbook:{}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setSideBarOpened(state) {
      state.sideBarOpened = !state.sideBarOpened;
    },
    setISBN(state,isbnnew){
      state.byISDN=isbnnew;
    },
    setBorrowList(state,borrowList){
      state.borrowlist=borrowList
    },
    setcollectList(state,collectisbn){
      console.log("statelist:"+state.collectlist);
      let i;
      for(i=0;i<state.collectlist.length;i++){
        if( state.collectlist[i]==collectisbn){
          break;
        }
      }
      state.collectlist[i]=collectisbn
    },
    setnowbook(state,nowBook){
      state.nowbook=nowBook
    },
    resetcollectList(state,collectlist){
      state.collectlist=collectlist
    }
  },
  actions: {
    actisbn({ commit }, isbnnew){
      commit("setISBN",isbnnew);
      console.log(isbnnew);
    },
    actborrowList({commit},borrowList:any){
      commit("setborrowList",borrowList);
      console.log(borrowList);
      
    },
    actColllectList({commit},collectisbn:any){
      
      commit("setcollectList",collectisbn);

      console.log("setlist"+collectisbn);
      
    },
    actnowbook({commit},nowBook){
      commit("setnowbook",nowBook);
    },
    resetCollectList({commit},collectlist:any){
      commit("resetcollectList",collectlist)
    }

  },
    
    
};







// import { login as loginApi } from "@/api/login";
// import router from "@/router";
// import bookInt  from "@/type/book";

// login({ commit }, userInfo) {

    //   console.log('这是vuex', userInfo);
    //   return new Promise<void>((resolve, reject) => {
    //     // setTimeout(() => {
    //     //   commit("setToken", "token");
    //     //   sessionStorage.setItem("user", "admin");
    //     //   router.replace("/");
    //     //   resolve();
    //     // }, 1000);
    //     loginApi(userInfo)
    //       .then((res) => {
    //         console.log(2222);

    //         commit("setToken", res.token);
    //         router.replace("/");
    //         resolve();
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    // logout({ commit }) {
    //   commit("setToken", "");
    //   sessionStorage.removeItem("user");
    //   router.push("/login");
    // },
    // toggleSideBar(context) {
    //   context.commit("setSideBarOpened");
    // },
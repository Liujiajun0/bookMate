export default {
  token: (state) => state.app.token,
  byISDN: (state) => state.app.byISDN,
  sideBarOpened: (state) => state.app.sideBarOpened,
  tabMenus: (state) => state.tabs.tabMenus,
  collectlist:(state)=>state.app.collectlist,
  nowbook:(state)=>state.app.nowbook
};

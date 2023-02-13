import { createStore } from 'vuex'
import { getPhoneLogin } from "@/request/api/home.js"
import { getMusicLyric } from "@/request/api/item.js"
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true,//判断底部组件是否需要显示
    token: "",
    user: {},//用户信息
  },
  getters: {
  },
  mutations: {
    // 改变播放状态
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    // 更改播放列表
    updatePlayList: function (state, value) {
      state.playList = value
    },
    // 更改播放playListIndex
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    // 音乐详情页的切换
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    // 获取歌词
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    // 更新当前时间
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    // 更新歌曲总时间
    updateDuration: function (state, value) {
      state.duration = value
    },
    // 更改播放歌曲下标
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    // 向播放列表添加歌曲
    pushPlayList: function (state, value) {
      state.playList.push(value)
      // 并播放歌曲
      state.playListIndex = state.playList.length - 1
    },
  },
  actions: {
    // 获取歌词
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      context.commit("updateLyricList", res.data.lrc)
    },
    // 登录
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value);
      return res
    }
  },
  modules: {
  }
})

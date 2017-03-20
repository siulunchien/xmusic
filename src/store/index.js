import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 播放列表
    playList: [],
    // 正在播放的歌曲
    playing: null,
    // 是否正在播放
    isPlaying: false
  },
  mutations: {
    // 加入播放列表
    [types.ADDPLAYLIST] (state, item) {
      if (state.playList.indexOf(item) < 0) {

        if (!state.playing) state.playing = item;

        state.playList.push(item);
      }
    },
    // 从播放列表中移除
    [types.REMOVEPLAYLIST] (state, index) {
      if (state.playing == state.playList[index]) {
        state.isPlaying = false;
        state.playing = state.playList[index + 1]
                        ? state.playList[index + 1]
                        : state.playList[index - 1]
                        ? state.playList[index - 1]
                        : null
      }
      state.playList.splice(index, 1);
      if (state.playList <= 0) {
        state.playing = null;
      }
      if (state.playing) {
        setTimeout(() => {
          state.isPlaying = true;
        }, 500)
      }
    },
    // 清空播发列表
    [types.CLEARPLAYLIST] (state) {
      state.playList = [];
      state.playing = null;
      state.isPlaying = false;
    },
    // 开始播放
    [types.TOPLAY] (state) {
      state.isPlaying = true;
    },
    // 暂停播放
    [types.TOPAUSE] (state) {
      state.isPlaying = false;
    },
    // 上一首
    [types.PREV] (state) {
      let index = state.playList.indexOf(state.playing);
      if (index > 0) {
        state.isPlaying = false;
        state.playing = state.playList[index - 1];
        setTimeout(() => {
          state.isPlaying = true;
        }, 500)
      }
    },
    // 下一首
    [types.NEXT] (state) {
      let index = state.playList.indexOf(state.playing);
      if (index < state.playList.length - 1) {
        state.isPlaying = false;
        state.playing = state.playList[index + 1];
        setTimeout(() => {
          state.isPlaying = true;
        }, 500)
      }
    },
    // 马上播放
    [types.IMMEDIATELY] (state, item) {
      state.isPlaying = false;
      let index = state.playList.indexOf(item);
      if (index != -1) {
        state.playing = state.playList[index];
      } else {
        state.playList.push(item);
        state.playing = state.playList[state.playList.length - 1];
      }
      setTimeout(() => {
        state.isPlaying = true;
      }, 500)
    }
  }
})
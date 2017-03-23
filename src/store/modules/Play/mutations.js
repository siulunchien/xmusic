import * as types from './types';

export default {
  // 加入播放列表
  [types.ADDPLAYLIST] (state, item) {
    if (state.playListIds.indexOf(item.data.songid) < 0) {
      if (!state.playing) state.playing = item;
      state.playList.push(item);
      state.playListIds.push(item.data.songid);
    }
  },
  // 清空播发列表
  [types.CLEARPLAYLIST] (state) {
    state.playList = [];
    state.playListIds = [];
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
  // 选中歌曲
  [types.CHOOSESONG] (state, item) {
    state.choosed = item;
  },
  // 删除选中歌曲
  [types.CLEARCHOOSESONG] (state) {
    state.choosed = null;
  }
}
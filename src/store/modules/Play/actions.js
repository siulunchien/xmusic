import * as types from './types';
import api from '@/api';

/**
 * 播放下一首歌
 * @param {Function} options.commit  从 store 中解构得到
 * @param {Object} options.state     从 store 中结构得到
 */
export const nextSong = ({ commit, state }) => {
  let index = (state.playList.indexOf(state.playing) + 1) % state.playList.length;
  let nextItem = state.playList[index];
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    commit(types.SETPLAYINGSONG, nextItem);
    resolve();
  }).then(() => {
    commit(types.TOPLAY);
  })
}


/**
 * 播放上一首歌
 * @param {Function} options.commit  从 store 中解构得到
 * @param {Object} options.state     从 store 中结构得到
 */
export const prevSong = ({ commit, state }) => {
  let index = (state.playList.indexOf(state.playing) - 1 + state.playList.length) % state.playList.length;
  let prevItem = state.playList[index];
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    commit(types.SETPLAYINGSONG, prevItem);
    resolve();
  }).then(() => {
    commit(types.TOPLAY);
  })
}


/**
 * 立即播放
 * @param {Function} options.commit  从 store 中解构得到
 * @param {Object} options.state     从 store 中结构得到
 * @param {Object} item              选中的歌曲
 */
export const immediately = ({ commit, state }, item) => {
  let index = state.playListIds.indexOf(item.data.songid),
      nowItem = null;
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    if (index != -1) {
      nowItem = state.playList[index];
      commit(types.SETPLAYINGSONG, nowItem);
    } else {
      commit(types.ADDPLAYLIST, item);
      nowItem = state.playList[state.playList.length - 1];
      commit(types.SETPLAYINGSONG, nowItem);
    }
    resolve();
  }).then(() => {
    commit(types.TOPLAY);
  })
}


/**
 * 从播放列表删除歌曲
 * @param {Function} options.commit  从 store 中解构得到
 * @param {Object} options.state     从 store 中结构得到
 * @param {*} index 
 */
export const delFromPlayList = ({ commit, state }, index) => {
  let nowItem = null;
  new Promise((resolve, reject) => {
    if (state.playing == state.playList[index]) {
      commit(types.TOPAUSE);
      nowItem = state.playList[index + 1]
                ? state.playList[index + 1]
                : state.playList[index - 1]
                ? state.playList[index - 1]
                : null
    }
    commit(types.DELPLAYLIST, index);
    commit(types.SETPLAYINGSONG, nowItem);
    resolve();
  }).then(() => {
    if (state.playing) commit(types.TOPLAY);
  })
}
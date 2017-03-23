import * as types from './types';

/**
 * 播放下一首歌
 * @param {Function} options.commit  从 store 中解构得到
 * @param {Object} options.state     从 store 中结构得到
 */
export const nextSong = ({ commit, state }) => {
  let index = (state.playList.indexOf(state.playing) + 1) % state.playList.length;
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    state.playing = state.playList[index];
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
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    state.playing = state.playList[index];
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
  let index = state.playListIds.indexOf(item.data.songid);
  new Promise((resolve, reject) => {
    commit(types.TOPAUSE);
    if (index != -1) {
      state.playing = state.playList[index];
    } else {
      state.playList.push(item);
      state.playListIds.push(item.data.songid);
      state.playing = state.playList[state.playList.length - 1];
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
  new Promise((resolve, reject) => {
    if (state.playing == state.playList[index]) {
      commit(types.TOPAUSE);
      state.playing = state.playList[index + 1]
                      ? state.playList[index + 1]
                      : state.playList[index - 1]
                      ? state.playList[index - 1]
                      : null
    }
    state.playList.splice(index, 1);
    state.playListIds.splice(index, 1);
    if (state.playList.length <= 0) {
      state.playing = null;
    }
    resolve();
  }).then(() => {
    if (state.playing) commit(types.TOPLAY);
  })
}
import mutations from './mutations';
import * as actions from './actions';


export default {
  state: {
    // 播放列表
    playList: [],
    // 播放列表的歌曲id
    playListIds: [],
    // 正在播放的歌曲
    playing: null,
    // 是否正在播放
    isPlaying: false,
    // 选中的歌曲
    choosed: null
  },
  mutations,
  actions
}
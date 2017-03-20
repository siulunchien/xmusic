<style lang="scss" scoped>
  @import "./Play";
</style>

<template>
  <footer class="play">
    <div v-if="playingInfo" class="play__info" @click="showPlayer">
      <h4 class="f-14">{{ playingInfo.data.songname }}</h4>
      <p>{{ playingInfo.data.singer[0].name }}</p>
    </div>
    <a href="javascript:;" class="play__control">
      <span class="play__control__btn" :class="{'play__control__btn--pause': !isPlaying, 'play__control__btn--playing': isPlaying}" @click="controlPlay"></span>
    </a>
    <a href="javascript:;" class="play__play-list" @click="showPlayList">
      <i class="play__play-list__line"></i>
      <i class="play__play-list__line"></i>
      <i class="play__play-list__line"></i>
    </a>
    <audio id="play__audio" :src="songUrl" class="play__audio"></audio>
    <!-- 播放列表 -->
    <play-list :isShow="isShowPlayList" v-on:closePlayList="closePlayList"></play-list>
    <!-- 播放器 -->
    <transition name="slide-fade">
      <Player v-show="isShowPlayer" :progress="timeProgress" v-on:setProgress="setProgress" v-on:closePlayer="closePlayer" v-on:showPlayList="showPlayList"></Player>
    </transition>
  </footer>
</template>

<script>

  import PlayList from './PlayList/PlayList';
  import Player from './Player/Player';
  import { TOPLAY, TOPAUSE } from '@/store/types';

  export default {
    name: 'Play',
    data () {
      return {
        isShowPlayList: false,
        isShowPlayer: false,
        allTime: '',
        nowTime: '',
        timeProgress: '',
        timer: null
      }
    },
    mounted () {
      
    },
    methods: {
      // 显示播放列表
      showPlayList () {
        this.isShowPlayList = true;
      },
      // 关闭播放器列表
      closePlayList () {
        this.isShowPlayList = false;
      },
      // 打开播放器
      showPlayer () {
        this.isShowPlayer = true;
      },
      // 关闭播放器
      closePlayer () {
        this.isShowPlayer = false;
      },
      setProgress () {
        this.timeProgress = '0';
      },
      // 播放 
      controlPlay () {
        if (this.isPlaying) {
          this.$store.commit(TOPAUSE);
        } else {
          this.$store.commit(TOPLAY);
        }
      },
      // 控制播放
      play (audio) {
        clearInterval(this.timer);
        if (this.isPlaying) {
          audio.play();
          this.timer = setInterval(() => {
            this.timeProgress = (audio.currentTime / audio.duration) * 100 + '%';
          }, 1000)
        } else {
          audio.pause();
        }
      }
    },
    computed: {
      playingInfo () {
        return this.$store.state.playing
                ? this.$store.state.playing
                : this.$store.state.playList.length > 0 
                ? this.$store.state.playList[0]
                : null
      },
      songUrl () {
        let songId = this.playingInfo ? this.playingInfo.data.songid : '';
        return songId ? `http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46` : '';
      },
      isPlaying () {
        return this.$store.state.isPlaying;
      }
    },
    watch: {
      playingInfo () {
        if (!this.playingInfo) {
          this.closePlayer();
        }
      },
      isPlaying () {
        this.$nextTick(() => {
          let audio = document.querySelector('#play__audio');
          this.play(audio);
        });
      }
    },
    components: {
      PlayList,
      Player
    }
  }
</script>
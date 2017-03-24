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
    <transition name="slide">
      <Player v-show="isShowPlayer" :albummPic="albummPic" :duration="duration" :currentTime="currentTime" :progress="timeProgress" v-on:setProgress="setProgress" v-on:closePlayer="closePlayer" v-on:showPlayList="showPlayList"></Player>
    </transition>
    <Choose></Choose>
  </footer>
</template>

<script>

  import PlayList from './PlayList/PlayList';
  import Player from './Player/Player';
  import Choose from './Choose/Choose';
  import { TOPLAY, TOPAUSE } from '@/store/modules/Play/types';

  export default {
    name: 'Play',
    data () {
      return {
        isShowPlayList: false,
        isShowPlayer: false,
        allTime: '',
        nowTime: '',
        timeProgress: '',
        timer: null,
        duration: 0,
        currentTime: 0,
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.audio = document.querySelector('#play__audio');
      })
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
        audio.removeEventListener('ended', this.next, false);
        audio.addEventListener('ended', this.next, false);

        if (this.isPlaying) {
          audio.play();
          this.timer = setInterval(() => {
            this.timeProgress = (audio.currentTime / audio.duration) * 100 + '%';
            this.currentTime = audio.currentTime;
            this.duration = audio.duration;
          }, 1000)
        } else {
          audio.pause();
        }
      },
      // 下一首
      next () {
        this.$store.dispatch('nextSong');
      }
    },
    computed: {
      playingInfo () {
        return this.$store.state.Play.playing
                ? this.$store.state.Play.playing
                : this.$store.state.Play.playList.length > 0 
                ? this.$store.state.Play.playList[0]
                : null
      },
      songUrl () {
        let songId = this.playingInfo ? this.playingInfo.data.songid : '';
        return songId ? `http://ws.stream.qqmusic.qq.com/${songId}.m4a?fromtag=46` : '';
      },
      // 获取歌曲封面照
      albummPic () {
        let albummPic = this.playingInfo ? this.playingInfo.data.albummid : '';
        return albummPic ? `https://y.gtimg.cn/music/photo_new/T002R150x150M000${albummPic}.jpg?max_age=2592000` : '';
      },
      isPlaying () {
        return this.$store.state.Play.isPlaying;
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
          this.play(this.audio);
        });
      }
    },
    components: {
      PlayList,
      Player,
      Choose
    }
  }
</script>
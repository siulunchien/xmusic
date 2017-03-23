<style lang="scss" scoped>
  @import "./Player";
</style>

<template>
  <div class="player">
    <div class="player__bg" :style="bg"></div>
    <div class="player__mask"></div>
    <section class="player__content">
      <header v-if="playingInfo" class="player__content__header">
        <h3 class="f-16">{{ playingInfo.data.songname }}</h3>
        <p class="f-14">{{ playingInfo.data.singer[0].name }}</p>
        <a href="javascript:;" class="player__content__header__btn" @click="closePlayer"></a>
      </header>
      <div class="player__content__lyc">
        <img :src="albummPic" alt="" class="player__content__lyc__pic" :class="{'player__content__lyc__pic--rotate': isPlaying}">
        <p>暂不支持歌词显示</p>
      </div>
      <footer class="player__content__footer">
        <div class="player__content__footer__progress f-10">
          <span>{{ currentTime | timeFormat }}</span>
          <div class="player__content__footer__progress__line"><i :style="{width: progress}"></i></div>
          <span>{{ duration | timeFormat }}</span>
        </div>
        <div class="player__content__footer__control">
          <a href="javascript:;" class="player__content__footer__control__prev" @click="prev"></a>
          <a href="javascript:;" class="player__content__footer__control__play" :class="{'player__content__footer__control__play--pause': !isPlaying, 'player__content__footer__control__play--playing': isPlaying}" @click="controlPlay"></a>
          <a href="javascript:;" class="player__content__footer__control__next" @click="next"></a>
        </div>
        <div class="player__content__footer__list">
          <a href="javascript:;" class="player__content__footer__list__btn" @click="showPlayList">
            <i class="player__content__footer__list__btn__line"></i>
            <i class="player__content__footer__list__btn__line"></i>
            <i class="player__content__footer__list__btn__line"></i>
          </a>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
  
  import { TOPLAY, TOPAUSE, PREV, NEXT } from '@/store/modules/Play/types';

  export default {
    name: 'Player',
    props: {
      progress: {
        type: String,
        default: '0'
      },
      albummPic: {
        type: String
      },
      currentTime: {
        type: Number,
        default: 0
      },
      duration: {
        type: Number,
        default: 0
      }
    },
    methods: {
      // 显示播放列表
      showPlayList () {
        this.$emit('showPlayList');
      },
      // 关闭播放器
      closePlayer () {
        this.$emit('closePlayer');
      },
      // 控制播放
      controlPlay () {
        if (this.isPlaying) {
          this.$store.commit(TOPAUSE);
        } else {
          this.$store.commit(TOPLAY);
        }
      },
      // 上一首
      prev () {
        this.$store.dispatch('prevSong');
        this.setProgress();
      },
      // 下一首
      next () {
        this.$store.dispatch('nextSong');
        this.setProgress();
      },
      setProgress () {
        this.$emit('setProgress');
      }
    },
    computed: {
      playingInfo () {
        return this.$store.state.Play.playing;
      },
      isPlaying () {
        return this.$store.state.Play.isPlaying;
      },
      bg () {
        return {
          backgroundImage: this.albummPic ? `url(${this.albummPic})` : ''
        }
      }
    }
  }
</script>
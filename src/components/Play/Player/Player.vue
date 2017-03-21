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
        <p>暂不支持歌词显示</p>
      </div>
      <footer class="player__content__footer">
        <div class="player__content__footer__progress">
          <div class="player__content__footer__progress__line"><i :style="{width: progress}"></i></div>
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
  
  import { TOPLAY, TOPAUSE, PREV, NEXT } from '@/store/types';

  export default {
    name: 'Player',
    props: {
      progress: {
        type: String,
        default: '0'
      },
      albummPic: {
        type: String
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
        this.$store.commit(PREV);
        this.setProgress();
      },
      // 下一首
      next () {
        this.$store.commit(NEXT);
        this.setProgress();
      },
      setProgress () {
        this.$emit('setProgress');
      }
    },
    computed: {
      playingInfo () {
        return this.$store.state.playing;
      },
      isPlaying () {
        return this.$store.state.isPlaying;
      },
      bg () {
        return {
          backgroundImage: this.albummPic ? `url(${this.albummPic})` : ''
        }
      }
    }
  }
</script>
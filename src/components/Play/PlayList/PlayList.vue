<style lang="scss" scoped>
  @import "./PlayList";
</style>

<template>
  <div class="play-list">
    <transition name="fade">
      <div v-show="isShow" class="play-list__mask" @click="closePlayList"></div>
    </transition>
    <transition name="slide-fade">
      <div v-show="isShow" class="play-list-container">
        <header class="play-list-container__header">
          <h3 class="f-14">播放列表</h3>
          <a href="javascript:;" class="play-list-container__header__btn" @click="clearPlayList">清空</a>
        </header>
        <section class="play-list-container__content">
          <ul v-if="playList" class="play-list-container__content__main">
            <li v-for="(item, index) in playList" class="play-list-container__content__main__item" :class="{'play-list-container__content__main__item--playing': item.data.songid == playingId}" @click="immediately(item)">
              <h4 class="f-14">{{ item.data.songname }} - <span>{{ item.data.singer[0].name }}</span></h4>
              <a href="javascript:;" class="play-list-container__content__main__item__btn f-16" @click.stop="removeSong(index)">x</a>
            </li>
          </ul>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  
  import { CLEARPLAYLIST, REMOVEPLAYLIST, IMMEDIATELY } from '@/store/modules/Play/types';

  export default {
    name: 'PlayList',
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 关闭播放列表
      closePlayList () {
        this.$emit('closePlayList');
      },
      // 清空播放列表
      clearPlayList () {
        this.$store.commit(CLEARPLAYLIST);
        this.closePlayList();
      },
      // 从播放列表中移除歌曲
      removeSong (index) {
        this.$store.dispatch('delFromPlayList', index);
        if (this.playList.length <= 0) {
          this.closePlayList();
        }
      },
      // 马上播放
      immediately (item) {
        this.$store.dispatch('immediately', item);
        this.closePlayList();
      }
    },
    computed: {
      playList () {
        return this.$store.state.Play.playList;
      },
      playingId () {
        return this.$store.state.Play.playing ? this.$store.state.Play.playing.data.songid : '';
      }
    }
  }
</script>
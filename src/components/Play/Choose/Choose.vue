<style lang="scss" scoped>
  @import "./Choose";
</style>

<template>
  <div class="choose">
    <transition name="fade">
      <div v-show="chooseSong" class="choose__mask" @click="close"></div>
    </transition>
    <transition name="slide">
      <div v-show="chooseSong" class="choose__main">
        <header class="choose__main__header">
          <h3 v-if="chooseSong" class="f-14"><span>歌曲：</span> {{ chooseSong.data.songname }}</h3>
        </header>
        <div class="choose__main__btn-group f-14">
          <a href="javascript:;" class="choose__main__btn-group__toPlay" @click="immediately">立即播放</a>
          <a href="javascript:;" class="choose__main__btn-group__addPlayList" @click="addPlayList">加入播放列表</a>
          <a href="javascript:;" class="choose__main__btn-group__close" @click="close">关闭</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import { ADDPLAYLIST, CLEARCHOOSESONG } from '@/store/modules/Play/types';

  export default {
    name: 'Choose',
    methods: {
      close () {
        this.$store.commit(CLEARCHOOSESONG);
      },
      addPlayList () {
        this.$store.commit(ADDPLAYLIST, this.chooseSong);
        this.close();
      },
      immediately () {
        this.$store.dispatch('immediately', this.chooseSong);
        this.close();
      }
    },
    computed: {
      chooseSong () {
        return this.$store.state.Play.choosed;
      }
    }
  }
</script>
<style lang="scss">
  @import "~sass/common/index";
  .hasPlayList{
    bottom: $footerHeight !important;
  }
  .playHasPlayList{
    bottom: 0 !important;
  }
</style>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="Songs">
        <router-view :class="{'hasPlayList': playListLen}"></router-view>
      </keep-alive>
    </transition>
    <Play :class="{'playHasPlayList': playListLen}"></Play>
  </div>
</template>

<script>

  import Play from '@/components/Play/Play';
  import { CLEARCHOOSESONG } from '@/store/modules/Play/types';

  export default {
    name: 'App',
    computed: {
      playListLen () {
        return this.$store.state.Play.playList.length;
      }
    },
    components: {
      Play
    },
    watch: {
      '$route' () {
        this.$store.commit(CLEARCHOOSESONG)
      }
    }
  }
</script>
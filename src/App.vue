<style lang="scss">
  @import "~sass/common/index";
  .hasPlayList{
    padding-bottom: $footerHeight;
  }
</style>

<template>
  <div id="app" :class="{'hasPlayList': playListLen}">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="Songs">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition name="slide-fade">
      <Play v-show="playListLen"></Play>
    </transition>
  </div>
</template>

<script>

  import Play from '@/components/Play/Play';

  export default {
    name: 'App',
    computed: {
      playListLen () {
        return this.$store.state.playList.length;
      }
    },
    components: {
      Play
    }
  }
</script>
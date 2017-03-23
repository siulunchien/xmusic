<style lang="scss" scoped>
  @import "./Songs";
</style>

<template>
  <Scroll class="songs">
    
    <div v-if="isLoading" class="songs__loading"><img src="./images/ripple.svg" alt=""></div>
    <transition name="fade">
      <div v-if="!isLoading" class="songs__content">
        <header class="songs__header">
          <img :src="topInfo.pic_album" alt="" class="songs__header__pic">
          <div class="songs__header__title">
            <h1>{{ topInfo.ListName }}</h1>
            <p class="f-14">{{ updateTime }} 更新</p>
          </div>
          <div class="songs__header__bg"></div>
        </header>
        <section class="songs__songs-list">
          <ul class="songs__songs-list__container">
            <li v-for="(item, index) in songList" class="songs__songs-list__container__item" @click="chooseSong(item)">
              <span class="songs__songs-list__container__item__num f-16">{{ index + 1 }}</span>
              <div class="songs__songs-list__container__item__info">
                <h1 class="f-16">{{ item.data.songname }}</h1>
                <p class="f-14">{{ item.data.singer[0].name | formatSinger(item.data.albumname, item.data.albumdesc) }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </transition>
  </Scroll>
</template>

<script>

  import { Scroll } from '@/components';
  import api from '@/api';
  import { CHOOSESONG } from '@/store/modules/Play/types';

  export default {
    name: 'Songs',
    data () {
      return {
        songList: [],
        topInfo: {},
        date: '',
        updateTime: '',
        isLoading: true
      }
    },
    mounted () {

      this.getToplistDetail()
        .then(res => {
          this.topInfo = res.topinfo;
          this.date = res.date;
          this.updateTime = res.update_time;
          this.songList = res.songlist;
          this.isLoading = false;
        })

    },
    methods: {
      // 获取排行榜详情
      getToplistDetail () {
        let params = {
          topid: this.$route.params.id,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notic: 0,
          platform: 'yqq',
          needNewCode: 0,
          _: new Date().getTime(),
          callback: 'jsonpCallback'
        }
        return api.getTopListDetail(params);
      },
      // 选择歌曲
      chooseSong (item) {
        this.$store.commit(CHOOSESONG, item);
      }
    },
    components: {
      Scroll
    }
  }
</script>
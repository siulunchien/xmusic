<style lang="scss" scoped>
  @import "./Songs";
</style>

<template>
  <main class="songs">
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
    <div class="songs__choose">
      <transition name="fade">
        <div v-show="isChoose" class="songs__choose__mask" @click="closeChooseSong"></div>
      </transition>
      <transition name="slide-fade">
        <div v-show="isChoose" class="songs__choose__main">
          <header class="songs__choose__main__header">
            <h3 v-if="chooseItem" class="f-14"><span>歌曲：</span> {{ chooseItem.data.songname }}</h3>
          </header>
          <div class="songs__choose__main__btn-group f-14">
            <a href="javascript:;" class="songs__choose__main__btn-group__toPlay" @click="immediately">立即播放</a>
            <a href="javascript:;" class="songs__choose__main__btn-group__addPlayList" @click="addToPlayList">加入播放列表</a>
            <a href="javascript:;" class="songs__choose__main__btn-group__close" @click="closeChooseSong">关闭</a>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>

  import api from '@/api';
  import { ADDPLAYLIST, IMMEDIATELY } from '@/store/types';

  export default {
    name: 'Songs',
    data () {
      return {
        songList: [],
        topInfo: {},
        date: '',
        updateTime: '',
        isChoose: false,
        chooseItem: null
      }
    },
    mounted () {

      this.getToplistDetail()
        .then(res => {
          this.topInfo = res.topinfo;
          this.date = res.date;
          this.updateTime = res.update_time;
          this.songList = res.songlist;
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
        this.isChoose = true;
        this.chooseItem = item;
      },
      // 关闭选择歌曲
      closeChooseSong () {
        this.isChoose = false;
      },
      // 加入播放列表
      addToPlayList () {
        this.$store.commit(ADDPLAYLIST, this.chooseItem);
        this.closeChooseSong();
      },
      // 马上播放
      immediately () {
        this.$store.commit(IMMEDIATELY, this.chooseItem);
        this.closeChooseSong();
      }
    }
  }
</script>
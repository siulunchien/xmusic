<style lang="scss" scoped>
  @import "./Home";
</style>

<template>
  <main class="home">
    <header class="home__header f-16">x - music</header>
    <section class="home__section">
      <ul class="home__section__list-container">
        <list-item v-for="(item, index) in toplist" :key="index" :listData="item" class="home__section__list-container__item"></list-item>
      </ul>
    </section>
  </main>
</template>

<script>

  import ListItem from './ListItem/ListItem'
  import api from '@/api'

  export default {
    name: 'Home',
    data () {
      return {
        toplist: []
      }
    },
    mounted () {
      this.getToplist()
        .then(res => {
          if (res.code == 0) {
            this.toplist = res.data.topList;
          } 
        })
    },
    methods: {
      // 获取排行榜列表
      getToplist () {
        let params = {
          format: 'jsonp',
          g_tk: 5381,
          uin: 0,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notic: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime(),
          callback: 'jsonpCallback'
        }
        return api.getToplist(params)
      }
    },
    components: {
      ListItem
    }
  }
</script>
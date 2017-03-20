<style lang="scss" scoped>
  @import "./ListItem";
</style>

<template>
  <li class="list-item" @click="toDetail(listData.id)">
    <aside class="list-item__pic"><img :src="listData.picUrl" alt=""></aside>
    <div class="list-item__info f-14">
      <div class="list-item__info__container">
        <h3 class="list-item__info__container__title f-16">{{ listData.topTitle }}</h3>
        <p v-for="(item, index) in listData.songList">{{ index + 1 }}<span>{{ item.songname }}</span> - {{ item.singername }}</p>
        <i class="list-item__info__container__arrow"></i>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'ListItem',
    props: {
      listData: {
        type: Object
      }
    },
    methods: {
      // 进入排行榜详情页
      toDetail (id) {
        this.$router.push({name: 'songs', params: {id: id}})
      }
    }
  }
</script>

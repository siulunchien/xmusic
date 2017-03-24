<style lang="scss" scoped>
  @import "./Scroll";
</style>

<template>
  <main class="scroll-layout">
    <slot></slot>
  </main>
</template>

<script>
  export default {
    name: 'Scroll',
    data () {
      return {
        scrollEl: null,
        scrollY: 0
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scrollEl = document.querySelector('.scroll-layout');
      })
    },
    // keep-alive 组件激活时调用
    activated () {
      this.$nextTick(() => {
        if (this.scrollEl) {
          this.scrollEl.removeEventListener('scroll', this.scrollRecord, false);
          this.scrollEl.scrollTop = this.scrollY;
          this.scrollEl.addEventListener('scroll', this.scrollRecord, false);
        }
      })
    },
    methods: {
      // 记录滚动条位置
      scrollRecord () {
        this.scrollY = this.scrollEl.scrollTop;
      }
    }
  }
</script>
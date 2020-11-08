<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper" v-for="(item,key) in topImages" :key="key">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
    
    },
  }
</script>

<style scoped>
  
  .detail-swiper{
    height: 250px;
    overflow: hidden;
  }
</style>

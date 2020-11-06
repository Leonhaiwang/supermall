<template >
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper/>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/detailNavBar'
import DetailSwiper from './childComponents/detailSwiper'
import {getDetail} from 'network/detail'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid : null,
      topImages:[],
    }
  },created() {
    //保存iid
    this.iid = this.$route.params.iid
    //请求数据
    getDetail(this.iid).then(res=>{
      //获取顶部的轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      
    })

  },
}
</script>
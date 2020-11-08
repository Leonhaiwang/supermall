<template >
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
     <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad = "imgLoad"></detail-goods-info>
      <detail-param-info :param-info = "paramInfo"></detail-param-info>
     </scroll>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/detailNavBar'
import DetailSwiper from './childComponents/detailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import Scroll from 'components/common/scroll/scroll'

import {getDetail, Goods, Shop, GoodsParam} from "network/detail";
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      iid : null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
       paramInfo: {}
    }
  },created() {
    //保存iid
    this.iid = this.$route.params.iid
    //请求数据
    getDetail(this.iid).then(res=>{
      //获取顶部的轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })

  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh()
    }
  },
}
</script>
<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
 
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .detail-nav{
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
</style>
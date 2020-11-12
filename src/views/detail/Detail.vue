<template >
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick = "titleClick" ref="navbar"/>
     <scroll class="content" ref="scroll" :probe-type = "3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad = "detailImageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info = "paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment= "commentInfo"></detail-comment-info>
      <goods-list ref = "recommend" :goods='recommend'></goods-list>
     </scroll>
     <detail-bottom-bar @addCart = "addCart"></detail-bottom-bar>
     <!-- <toast :message = "hhh"> </toast> -->

  </div>
</template>
<script>
import DetailNavBar from './childComponents/detailNavBar'
import DetailSwiper from './childComponents/detailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'
import {debounce} from 'common/util'
import {itemListenerMixin} from 'common/mixin'
import BackTop from 'components/conent/backtop/BackTop'
import Scroll from 'components/common/scroll/scroll'
import GoodsList from 'components/goods/GoodsList'
import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";

// import Toast from 'components/common/Toast/Toast'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop,
    // Toast
  },
  data() {
    return {
      iid : null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo: {},
      commentInfo:{},
      recommend:[],
      themeTopY:[],
      themeTopYfunc:null,
      currentIndex:0,
      isShow:false,
      // res
    }
  },
  mixins:[itemListenerMixin],
  created() {
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

      if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(()=>{
        // 根据最新的数据，对应的DOM是已经被加载完的
        // 但是图片依然是没有加载完的
       
       
      })
      
    })
    getRecommend().then(res=>{
      this.recommend = res.data.list
    })
    //监听详情图片加载完成
    this.themeTopYfunc = debounce(()=>{
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
        console.log(themeTopY)
    },500)
  },
  updated() {
    // this.themeTopY = []
    // this.themeTopY.push(0)
    // this.themeTopY.push(this.$refs.param.$el.offsetTop)
    // this.themeTopY.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
  },
  mounted() {
    
  },
  methods: {
    addCart(){
      //添加购物车需要展示的信息
      const product  ={}
      product.image = this.topImages[0]
      product.title = this.detailInfo.title
      product.desc = this.detailInfo.desc
      product.price = this.detailInfo.realPrice
      product.newPrice = this.detailInfo.newlPrice
      
      product.iid = this.iid
      
      this.$store.dispatch('addCart',product).then(res=>{
        // this.$toast.show(res,2000)
        console.log(this.$toast)
        
      })

      //添加购物车成功

    },
    contentScroll(position){
       
        if((-position.y) > 1000){
           this.isShow = true
        }

        //判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop


      },
    detailImageLoad(){
      this.newRefresh()
      this.themeTopYfunc()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
    },
    contentScroll(position){
      
     const y = -position.y
     let length = this.themeTopY.length-1
      // for(let i in this.themeTopY){
        // if(this.currentIndex != i &&(i<length-1 && y > this.themeTopY[i] && y < this.themeTopY[i+1]) || (i == length-1 && y >this.themeTopY[i])){
        //   this.currentIndex = i
        //  this.$refs.navbar.currentIndex = this.currentIndex
        // }
        for(let i = 0;i<length-1;i++){
          if(this.currentIndex!=i &&(y>=this.themeTopY[i] && y < this.themeTopY[i+1])){

        }
        }
        
      
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
    position: fixed;
    z-index: 99;
    background-color: #fff;
  }
</style>
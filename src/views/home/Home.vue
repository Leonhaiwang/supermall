<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot = "center">购物街</div></nav-bar>
     <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-views></feature-views>
      <tab-control class="tabcontrol" :titles="['流行','新款','精选']"/>

  
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureViews from './childComps/FeatureViews'

  import NavBar from 'components/common/navbar/NavBar';
  import tabControl from 'components/conent/tabControl/tabControl'

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      tabControl
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0 ,list:[]},
          'new':{page:0 ,list:[]},
          'sell':{page:0 ,list:[]}
        }
      }
    },
    created() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeGoods(type){
        getHomeGoods(type,1).then(res => {
          
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top:0;
    left: 0;
    right:0;
    z-index: 9;
  }
  .tabcontrol{
    position: sticky;
    top: 44px;
  }
</style>

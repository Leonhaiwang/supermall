<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot = "center">购物街</div></nav-bar>
      <div class="wrapper">
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-views></feature-views>
        <tab-control class="tabcontrol" :titles="['流行','新款','精选']" @tabClick = "tabClick" />
        <goods-list :goods = "showGoods"/>
      </div>
      
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureViews from './childComps/FeatureViews'

  import NavBar from 'components/common/navbar/NavBar';
  import tabControl from 'components/conent/tabControl/tabControl'
  import GoodsList from 'components/goods/GoodsList'

  import {getHomeMultidata,getHomeGoods} from "network/home";

  
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      tabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0 ,list:[]},
          'new':{page:0 ,list:[]},
          'sell':{page:0 ,list:[]}
        },
        currentType:'pop'
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
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      // 事件监听
      tabClick(index) {
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 2:
            this.currentType = 'new'
            break
          case 3:
            this.currentType = 'sell'
            break
          
        }
      }
      ,
      //网络请求的
      getHomeGoods(type){
        const page =  this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // 解析数组放在list中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
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
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 99;
  }
</style>

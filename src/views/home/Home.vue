<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot = "center">购物街</div></nav-bar>
      <tab-control  :titles="['流行','新款','精选']" @tabClick = "tabClick" ref="tabControl1" class="tabControl" v-show="isTabFixed"/>
      <scroll class="content" 
        ref="scroll" 
        :probe-type = "3" 
        :pull-up-load="true"
        @scroll = "contentScroll"
        @pullingUp = 'loadMore'
        >
      <home-swiper :banners="banners" @swiperImage="swiperImage"/>
      <recommend-view :recommends="recommends"/>
      <feature-views></feature-views>
      <tab-control  :titles="['流行','新款','精选']" @tabClick = "tabClick" ref="tabControl2"  />
      <goods-list :goods = "showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>
<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureViews from './childComps/FeatureViews'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/conent/tabControl/tabControl'
  import GoodsList from 'components/goods/GoodsList'
  import Scroll from 'components/common/scroll/scroll'
  import BackTop from 'components/conent/backtop/BackTop'
  
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from 'common/util'
  import {itemListenerMixin} from 'common/mixin'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
        currentType:'pop',
        isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        
      }
    },
    mixins:[itemListenerMixin],
    created() {
      // 1.请求多个数据

      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
    //  const refresh = debounce(this.$refs.scroll.refresh,200)
      //开始监听itenm中图片加载完成
      // this.$bus.$on('itemImageLoad',()=>{
      //   refresh()
      // })
      //获取tabControl 的 offsetTop
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()

      // this.$bus.$off('itemImageLoad')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)

      this.$refs.scroll.refresh()
    },
    methods: {
      swiperImage(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
      ,
      //下拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      
      contentScroll(position){
       
        if((-position.y) > 1000){
           this.isShow = true
        }

        //判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop


      }
      ,
      backClick(){
        //通过组件对象直接访问组件内部的属性，方法
       
        this.$refs.scroll.scrollTo(0,0)
      }
      ,
      //网络请求的
      getHomeGoods(type){
        const page =  this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // 解析数组放在list中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()

        })
      },
       getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
         
        })
      },
    },
  }
</script>

<style scoped>
  #home {
   
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 使用浏览器原生滚动的时候用的 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tabControl{
    position: relative;
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
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 999;
  }

  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>


import {debounce} from './util'
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImageListener = ()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  },
}
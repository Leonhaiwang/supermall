import {
  ADD_COUNTER,
  ADD_TO_CART
} from'./mutations-type'
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
       //判断之前的商品是不是在里面
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      context.commit(ADD_COUNTER,oldProduct)
      resolve('添加商品+1')
    }else{
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
      resolve('添加成功')
    }
    })
  }
}
// pages/help/help.js
// 引入用来发送请求的 方法一定要把路径补全

// import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //右侧的商品数据
    mainContent:[
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHelpList()
  },

  // 获取帮助列表信息
  getHelpList(){
    wx.cloud.callFunction({
      name:"getDataShopping"
    })
    .then(res=>{
      console.log(res)
      this.setData({
        mainContent:res.result.data
      })
    })
  },
  moreDetail:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    var goods_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../shopping-detail/shopping-detail?goods_id='+goods_id,
    })
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    // console.log("刷新")
    // 1.重置数组
    this.setData({
      mainContent:[]
    })
    // 2.发送请求
    this.getHelpList();
  },
})
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
  handleItemTap(e){
    // console.log(e);
    /*
    1.获取被点击的标题身上的索引
    2.给data中的currentIndex赋值就可以了
    3.根据不同的索引来渲染右侧不同的内容
    */
   const {index} = e.currentTarget.dataset
   console.log(index)
   let rightContent = this.Cates[index].children;
  //  重新设置 右侧内容的scroll-view标签的距离顶部的距离
   this.setData({
    currentIndex:index,
    rightContent,
    scrollTop:0
   })
  

  },
  // 获取帮助列表信息
  getHelpList(){
    wx.cloud.callFunction({
      name:"getData"
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
    var things_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../things-detail/things-detail?things_id='+things_id,
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
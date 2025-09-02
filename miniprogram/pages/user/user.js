// pages/mine/mine.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
      userinfo:{},
      //爆款消息
      a:[],
      newlist:[]
  },
  onShow(){
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo:userinfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //爆款跳转
  
})
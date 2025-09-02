// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
      userinfo:{}
    
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
})
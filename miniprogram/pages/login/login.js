// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 登录
  handlegetUserInfo(e){
    console.log("success")
    wx.getUserProfile({
      desc: '用于完善个人信息',
      success(e){
        console.log(e)
        const {userInfo} = e;
        wx.setStorageSync('userinfo',userInfo);
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  
})
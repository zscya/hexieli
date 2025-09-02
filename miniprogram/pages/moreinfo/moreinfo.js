// pages/moreinfo/moreinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 公告数组
        gonggao_list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGonggao_list()
    },

    //获取公告信息
    getGonggao_list(){
        wx.cloud.callFunction({
        name:"getAllGonggaoData"
    })
    .then(res=>{
      console.log(res)
      this.setData({
        gonggao_list:res.result.data
      })
    })
  } 
    
})
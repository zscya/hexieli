// pages/news_detail/news_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_info:{}
  },
  // 接口要的参数
  Querymore:{
    things_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.Querymore.new_title = options.new_title
    this.getNewsDetail();
  },
  // 获取新闻详情
  getNewsDetail(){
    wx.request({
      url: 'http://localhost:9090/news/searchtitle?new_title='+ this.Querymore.new_title,
      success:(res) =>{
        console.log(res)
        console.log(res.data.data)
        this.setData({
          news_info:res.data.data
        })
      }
    })
  },
  //改变新闻收藏状态--bug
  toShoucang(e){
    wx.request({
      url: 'http://localhost:9090/news/update?new_id='+8,
      success:(res)=>{
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
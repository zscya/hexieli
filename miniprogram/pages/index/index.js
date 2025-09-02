const db = wx.cloud.database()
Page({
  data: {
    //轮播图数组
    swiperList:[
      {pic:'../../static/images/swiper/lunbotu1.jpg'},
      {pic:'../../static/images/swiper/lunbotu2.jpg'},
      {pic:'../../static/images/swiper/lunbotu3.jpg'},
    ],
    // 公告数组
    gonggao_list:[],
    help_list:[],
    goods_list:[]
  },
 
  onLoad: function () {
    
  },
  onShow:function(){
    this.getGonggao_list();
    this.getHelp_list()
    this.onPullDownRefresh()
    this.getGoods_list()
  },
  //获取公告信息
  getGonggao_list(){
    wx.cloud.callFunction({
      name:"getGonggaoData"
    })
    .then(res=>{
      console.log(res)
      this.setData({
        gonggao_list:res.result.data
      })
    })
  }, 
  // 获取互惠信息
  getGoods_list(){
    wx.cloud.callFunction({
      name:"getShoppingData"
    })
    .then(res=>{
      console.log(res)
      this.setData({
        goods_list:res.result.data
      })
    })
  }, 
  //获取互助信息
  getHelp_list(){
    wx.cloud.callFunction({
      name:"getlitHelpData"
    })
    .then(res=>{
      console.log(res)
      this.setData({
        help_list:res.result.data
      })
    })
  },
  tohelp(){
    wx.switchTab({
      url: '/pages/help/help',
    })
  },
  toshopping(){
    wx.switchTab({
      url: '/pages/shopping/shopping',
    })
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    // console.log("刷新")
    // 1.重置数组
    this.setData({
      help_list:[]
    })
    // 2.发送请求
    this.getHelp_list();
  },
})
const db = wx.cloud.database()
Page({
  data: {
    //导航id
    navId:'',//导航标识
    //轮播图数组
    swiperList:[
      {pic:'../../images/swiper/lunbotu1.jpg'},
      {pic:'../../images/swiper/lunbotu2.jpg'},
      {pic:'../../images/swiper/lunbotu3.jpg'},
    ],
    maintext:[]
  },
  onLoad: function () {
    this.gettoutiao_list();
    this.setData({
      navId:12
    })
  },
  onShow:function(){
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    // console.log("刷新")
    // 1.重置数组
    this.setData({
      news_list:[]
    })
    // 2.发送请求
    // this.getnew_list();
  },
  // 获取头条新闻
  gettoutiao_list(){
    this.getnew_list('头条');
  },
  getnew_list(type){
    wx.request({
      url: 'http://localhost:9090/news/searchtype?new_type='+type,
      success:(res) =>{
        console.log(res)
        console.log(res.data.data)
        this.setData({
          maintext:res.data.data
        })
      }
      
    })
  },
  changeNav(e){
    console.log(e)
    let navId = e.currentTarget.dataset.id;
    let navType = e.currentTarget.dataset.type;
    this.getnew_list(navType);
    this.setData({
      navId:navId
    })
  },
  moreDetail:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.new_title)
    var new_title = e.currentTarget.dataset.new_title
    wx.navigateTo({
      url:'../news_detail/news_detail?new_title='+new_title,
    })
  }

})
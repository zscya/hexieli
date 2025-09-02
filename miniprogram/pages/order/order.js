// pages/order/order.js
/*
1.页面被打开的时候，onshow
  1.获取url上的参数
  2.根据type去发送请求获取订单数据
  3.渲染页面
2.点击不同的标题 重新发送请求和渲染数据 
*/
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"我发布的",
        isActive:true,
        type:0
      },
      {
        id:1,
        value:"完成的",
        isActive:false,
        type:1
      },

    ],
    nofinish:[],
    Myhelp:[],
    finished:[]
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getopenidData()
    this.onPullDownRefresh()
    
  },
  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // console.log(e)
    // 1.获取被点击的标题索引
    const {index} = e.detail;
    // 2.修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },
  // 跳转到详情页面
  moreDetail:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    var things_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../things-detail/things-detail?things_id='+things_id,
    })
  },
  // 获取用户的openid
  getopenidData(){
    wx.cloud.callFunction({
      name:'helloCloud',
      data:{
        message:'helloCloud',
      }
    }).then(res=>{
      console.log(res)
      console.log(res.result.openid)
      this.setData({
        openid:res.result.openid
      })
    })
  },
  // 这一块是说,我接单，需要判断接单人的openid和发布人的openid是不一样的，自己不能接自己的单
  getnofinish(){
    if(this.data.openid){
      db.collection('hexieli_goodslist')
    .orderBy('time','desc')
    .where({
      // _openid:db.command.eq(this.openid)
      // wisher_id:this.data.openid,
      type:1,
    })
    .get()
    .then(res=>{
      console.log('成功',res.data)
      this.setData({
        nofinish:res.data
      })
    })
    }
  },
  // 我帮助别人的完成事件
  getfinish(){
    if(this.data.openid){
      db.collection('hexieli_goodslist')
    .orderBy('time','desc')
    .where({
      // _openid:db.command.eq(this.openid)
      wisher_id:this.data.openid,
      type:2,
    })
    .get()
    .then(res=>{
      console.log('成功',res.data)
      this.setData({
        finished:res.data
      })
    })
    }
    
  },
  // 获得我发布的订单
  getMyhelp(){
    var openid = this.data.openid
    if(openid){
      db.collection('hexieli_goodslist')
    .orderBy('time','desc')
    .where({
      _openid:db.command.eq(openid)
    })
    .get()
    .then(res=>{
      console.log('成功',res.data)
      this.setData({
        Myhelp:res.data
      })
    })
    }
    
  },
  // 将帮助事件type设置为2，2表示已完成,只能把1改为2，如果是0的话，就跳出提示
  finishhelp(e){
    console.log(e)
    // console.log(e.currentTarget.dataset.id)
    //帮助事件的id，用于区分事件的唯一标识
    var things_id = e.currentTarget.dataset.id
    //事件的类型 type为0表示未有人帮助，type为1表示正在帮助中(待完成)，type为2表示已完成
    var type = e.currentTarget.dataset.type
    console.log(things_id)
    console.log(type)
    if(type==0){
      wx.showToast({
        title: '未被人帮助',
        icon:'error'
      })
    }else{
      db.collection('hexieli_helplist').doc(things_id).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          type:2,
        }  
      })
      .then(res=>{
        console.log(res)
        wx.redirectTo({
          url: '/pages/order/order',
        })
      })
    }
    
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    // console.log("刷新")
    // 1.重置数组
    this.setData({
      Myhelp:[],
      nofinish:[],
      finished:[]
    })
    // 2.发送请求
    this.getMyhelp();
    this.getnofinish();
    this.getfinish();
  },
  // 跳转到发布求助页面
  tosentgoods(){
    wx.navigateTo({
      url: '/pages/sentgoods/sentgoods',
    })
  },
  onShow(){
    this.getnofinish()
    this.getfinish()
    this.getMyhelp()
  },
  onReady: function (){
    // this.getMyhelp()
  },
})
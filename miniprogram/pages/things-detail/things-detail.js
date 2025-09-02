// pages/goods-detail/goods-detail.js
// import {request} from "../../request/index.js"

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    things_info:{},
  },
  // 接口要的参数
  Querymore:{
    things_id:''
  },
  telephone:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.Querymore.things_id = options.things_id
    this.getGoodsDetail()
    this.getopenidData()
    
  },
  
  getGoodsDetail(){
    db.collection('hexieli_helplist').doc(this.Querymore.things_id).get({
    })
    .then(res=>{
      // console.log(res.data)
      this.setData({
        things_info:res.data,
        telephone:res.data.telephone
      })
    })
    
  } ,
  //点击轮播图放大预览
  handlePrevewImage(e){
    let that = this
    console.log("放大方法成功",e)
    wx.previewImage({
      urls: that.data.things_info.images,
    })
  },
   // 联系我们
   toComunication() {
     let phone = this.data.things_info.telephone
    wx.showModal({
      title: '提示',
      content: '人无信不立，诚信为本',
      confirmText: "手机联系",
      confirmColor: "#3cc",
      cancelColor: "#3cc",
      success: function(e) {
        if (e.confirm) {
          wx.showModal({
            title: '提示',
            content: '是否联系',
            success: function(e) {
              if (e.confirm) {
                wx.makePhoneCall({
                 phoneNumber:phone+""
                })
              }
            }
          })
        } 
      }
    })
    },
  //帮助(修改订单状态)
  help(){
    wx.showToast({
      title: '帮助成功',
    })
    db.collection('hexieli_helplist').doc(this.Querymore.things_id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        type:1,
        wisher_id:this.data.openid
      }  
    })
    .then(res=>{
      console.log(res)
      wx.navigateTo({
        url: '/pages/help/help',
      })
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
})
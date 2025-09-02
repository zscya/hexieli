// pages/sentOrder/sentorder.js
const db=wx.cloud.database()
var QQMapWX = require('../../static/utils/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js')
// 实例化API核心类
var demo = new QQMapWX({
    key: 'W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4' // 必填
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        position:"",
        
        // 被选中的图片路径 数组
        chooseImgs:[],
        position:null,
        fileIDs: [], //上传云存储后的返回值
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 获取表单信息，验证信息是否合法
  formSubmit: function(e) {
    // detail
    console.log(e)
    var that = this
    var news_title = e.detail.value.news_title
    var news_type = e.detail.value.news_type
    var news_description = e.detail.value.news_description
    //获取当前时间
    var time = Math.round(new Date() / 1000)
    console.log("时间戳位:", time);
    var changetime=util.formatTimeTwo(time,'Y/M/D h:m:s');
    let t = Date.parse(new Date())/1000
    console.log(changetime)
    console.log(e.detail.value);
    that.uploadImage()
    wx.request({
      url: 'http://localhost:9090/news/save',
      method:'POST',
    })
},
  // 上传图片到云储存
  uploadImage(){
    var time = Math.round(new Date() / 1000)
    for(let i=0,t=0;i<this.data.chooseImgs.length;i++){
      wx.cloud.uploadFile({
        cloudPath:'xuexiqiangguo/'+time+i,
        filePath:this.data.chooseImgs[i]
      })
      .then(res=>{
        console.log(res.fileID)
        this.setData({
          fileIDs:this.data.fileIDs.concat(res.fileID)
        })
      })
    }
  },
   // 点击“+”选择图片
   handleChooseImg(){
    //2。调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 5,
      // 图片的格式 原图 压缩
      sizeType:['original','compressed'],
      // 图片的来源 相册 照相机
      sourceType:['album','camera'],
      success:(res) =>{
        console.log(res)
        this.setData({
          // 图片数组拼接
          chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
        })
      }

    })
  },
  // 点击自定义的图片组件
  handleRemoveImg(e){
    // 2.获取被点击的组件的索引
    console.log(e)
    const {index} = e.currentTarget.dataset;
    console.log(index)
    // 3.获取data中的图片数组
    let {chooseImgs} = this.data;
    // 4.删除元素
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
})
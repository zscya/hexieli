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
    var that = this
    var bloom = e.detail.value.bloom;
    var telephone = e.detail.value.telephone;
    var name = e.detail.value.name;
    var things_name = e.detail.value.things_name;
    var type = Number(e.detail.value.type) 
    var things_description = e.detail.value.things_description;
    var position = e.detail.value.position
    //获取当前时间
    var time = Math.round(new Date() / 1000)
    console.log("时间戳位:", time);
    var changetime=util.formatTimeTwo(time,'Y/M/D h:m:s');
    let t = Date.parse(new Date())/1000
    console.log(changetime)
    console.log(e.detail.value);
    that.uploadImage()
    if(!(/^([\u4e00-\u9fa5]){2,7}$/.test(name))) {
      console.log("姓名输入错误！")
      wx.showModal({
        title: '错误提示',
        content: '姓名输入不合法',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        } 
      })
    } else {
      if (!(/^1[34578]\d{9}$/.test(telephone))) {
        console.log("手机号错误！")
        wx.showModal({
          title: '错误提示',
          content: '手机号输入不合法',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          } 
        })
      } 
      else {
        console.log("手机号正确！")
        if(e.detail.value.bloom <= 0){
          wx.showModal({
            title: '错误提示',
            content: '花朵数量输入不合法',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            } 
          })
          console.log('花朵数量输入不合法')
        }else{   
          console.log('花朵数量输入合法')
           wx.showModal({
            title: '提示',
            content: '确认提交？',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                wx.showLoading({
                  title: '数据加载中...',
                  mask:true
              })
              wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 2000,//持续的时间
              })
                db.collection("hexieli_helplist").add({
                data:{
                  bloom:bloom,
                  telephone:telephone,
                  name:name,
                  things_name:things_name,
                  type:type,
                  things_description:things_description,
                  time:changetime,
                  Place:position,
                  images:that.data.fileIDs
                }
                }).then(res=>{
                console.log(e)
                wx.redirectTo({
                  url: '/pages/index/index',
                })
                wx.hideLoading()
               })
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            } 
          })
           
        }   
      }
    }
},
 // 获取当前位置
 getPlace: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // 调用接口转换成具体位置
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:(res)=>{
            console.log(res.result);
            that.setData({
              position: res.result.address
            })
          },
          fail:(res) =>{
            console.log(res);
          },
        })
      }
    })
  },
  // 上传图片到云储存
  uploadImage(){
    var time = Math.round(new Date() / 1000)
    for(let i=0,t=0;i<this.data.chooseImgs.length;i++){
      wx.cloud.uploadFile({
        cloudPath:'hexieli/'+time+i,
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
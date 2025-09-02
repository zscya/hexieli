// pages/feedback/feedback.js
/**
 * 1.点击“+”触发tap点击事件
 *  1.调用小程序内置的选择图片的api
 *  2.获取到图片的路径 数组
 *  3.把图片路径存到data的变量中
 *  4.页面可以根据图片数据进行循环显示 自定义组件
 * 2.点击自定义图片 组件
 *  1.获取被点击的元素的索引
 *  2.获取data中的图片数组
 *  3.根据索引  数组中删除对应的元素
 *  4.把数组重新设置回data中
 * 3.点击“提交”
 *  1.获取文本域的内容 类似 输入框的获取
 *    1.data中定义变量 表示输入框内容
 *    2.文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中
 *  2.对这些内容 合法性验证
 *  3.验证通过 用户选择的图片 上传到专门的图片服务器中 返回图片外网的链接
 *  4.文本域 和外网的图片的路径 一起提交到服务器 前端的模拟 不会发送到后台
 *  5.清空当前页面
 *  6.返回上一页
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"投诉用户",
        isActive:false
      },
    ],
    // 被选中的图片路径 数组
    chooseImgs:[],
    // 文本域的内容
    textVal:""
  },  
  // 外网的图片的路径数组
  UploadImgs:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 点击“+”选择图片
  handleChooseImg(){
    //2。调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType:['original','compressed'],
      // 图片的来源 相册 照相机
      sourceType:['album','camera'],
      success:(result) =>{
        this.setData({
          // 图片数组拼接

          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
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
  // 文本域的输入的事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit(){
    // 1.获取文本域的内容
    const {textVal,chooseImgs}= this.data;
    // 2.合法性的验证
    if(!textVal.trim()){
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      });
      return;
    }
    // 3准备上传图片 到专门的图片服务器
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        // 被上传的文件的路径
        filePath: 'v',
        // 上传的文件的名称 后台来获取文件 file
        name: 'image',
        // 图片要上传到哪里
        url: 'https://media.mogu.com/image/scale?appKey=15m&w=500&h=500&quality=100 ',
        // 顺带的文本信息
        formData:{},
        success:(result) =>{
          console.log(result);
        }
      })
    })
    wx.navigateBack({
      delta: 1,
    })
    
  }
})
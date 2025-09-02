// pages/goods-list/goods-list.js
/*
1.用户上滑页面 滚动条触底 开始加载下一页数据
  1.找到滚动条触底事件
  2.判断还有没下一页数据
    1.获取到总页数 只有总条数
    总页数 = Math.ceil(总条数 / 页容量 pagesize)
       = Math.ceil(23 / 10) = 3
    2.获取到当前的页码
    3.判断一下，当前的页码是否是大于或者等于总页数表示没有下一页数据
  3.假如没有下一页数据 弹出一个提示
  4.假如还有下一页数据 来加载下一页数据
    1.当前的页码++
    2.重新发送请求
    3.数据请求回来 要对data中的数组进行拼接而不是全部替换！
2.下拉刷新页面
  1.触发下拉刷新事件
  需要在页面的json中开启一个配置
  2.重置 数据 数组
  3.重置页码 设置成为1
  4.重新发送请求
  5.数据请求回来 需要手动关闭等待效果
*/
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goods_list:[

    ]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10

  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },

  //获取商品列表数据
  // getGoodsList(){
  //   request({
  //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
  //     data:this.QueryParams
  //   })
  //   .then(res=>{
  //     console.log(res)
  //     this.goods_list=res.data.message.goods;
  //     const total = res.data.message.total;
  //     // 计算总页数
  //     this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
  //     // console.log(this.totalPages);
  //     this.setData({
  //       // 拼接了数组
  //       goods_list:[...this.data.goods_list,...res.data.message.goods]
  //     })

  //     // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
  //     wx.stopPullDownRefresh({})
  //   })
  // },

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
  // 页面上滑 滚动条触底事件
  onReachBottom(){
    // console.log("页面触底")
    // 1.判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据了',
      })
    }else{
      console.log("有下一页数据");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  
  },
  // 下拉刷新事件
  onPullDownRefresh: function () {
    // console.log("刷新")
    // 1.重置数组
    this.setData({
      goods_list:[]
    })
    //2.重置页码为1
    this.QueryParams.pagenum = 1
    // 3.发送请求
    this.getGoodsList();
  },
})
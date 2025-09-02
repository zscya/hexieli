// pages/manager/manager.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    tabs:[
      {
        id:0,
        value:"订单",
        isActive:true,
        imgUrl: '../../static/images/tabs/tab-dingdan.png',
        curUrl: '../../static/images/tabs/tab-dingdan-current.png', 
      },
      {
        id:1,
        value:"商品",
        isActive:false,
        imgUrl: '../../static/images/tabs/tab-gouwuche.png',
        curUrl: '../../static/images/tabs/tab-gouwuche-current.png', 
      },
      {
        id:2,
        value:"统计",
        isActive:false,
        imgUrl: '../../static/images/tabs/tab-tongji.png',
        curUrl: '../../static/images/tabs/tab-tongji-current.png',
      },
    ],
    shoppinglist:[
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      },
      {
        shoppingname:"新鲜蔬菜",
        num:10,
        place:"上兰村五道门",
        time:"2022/04/09 22:41:11",
        images:[],
        price:"20",
        type:1
      }
    ]
    },

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
    toorderlist(){
      wx.navigateTo({
        url: '/pages/shoppingorder/shoppingorder',
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
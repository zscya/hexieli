// pages/shequlogin/shequlogin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    formSubmit: function(e) {
        // detail
        var that = this
        var username = e.detail.value.username;
        var password = e.detail.value.password;
        if(username == "") {
          console.log("用户名输入为空")
          wx.showModal({
            title: '错误提示',
            content: '用户名输入不合法',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            } 
          })
        } else {
          if (password/100000<1) {
            console.log("密码输入错误！")
            wx.showModal({
              title: '错误提示',
              content: '密码不得少于6位',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              } 
            })
          } else{
            console.log('输入合法')
            if(username=='shanglancun'&&password=='123456'){
              console.log('完全正确')
              wx.redirectTo({
                url: '/pages/manager/manager',
              })
            }
            if(password!='123456'||username!='shanglancun'){
              console.log('用户名或者密码错误')
              wx.showModal({
                title: '错误提示',
                content: '用户名或者密码错误',
              })
            }
            
          }
      }
    }
})
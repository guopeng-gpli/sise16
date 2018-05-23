//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  result:NaN,
  },

  onLoad: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'http://guopengli.cn/sql/OPENID.php',
            data: {
              logcode: res.code
            },
            success: function (res) {
             
             // console.log(latitude);
            //  var longitude = res.longitude;
             // console.log('这是当前位置' + longitude);
             // var speed = res.speed;
              console.log(res.statusCode)
              console.log('520')
              console.log(res.data)
              var openid = res.data.openid
              console.log(openid)
              that.setData({
                result: res.data,
                openid:res.data.openid
              })
              if (res.statusCode != 200) {
                setTimeout(function () {
                  wx.showToast({
                    title: '服务器异常',
                    icon: 'none',
                    duration: 2000
                  })
                }, 1500)
              }
            },
          })
          
         

        } 
        
        else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  
  //跳转页面函数
  report: function () {

      wx.navigateTo({
      url: 'report',

    })
  
  },
  

  my: function () {
wx.navigateTo({
  url: '../my/sign'
})
  }
    




})



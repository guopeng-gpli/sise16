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
              console.log('520')
              console.log(res.data)
              var openid = res.data.openid
              console.log(openid)
              that.setData({
                result: res.data,
                openid:res.data.openid
              })
              wx.setStorageSync('openid', res.data.openid)
              console.log('同步保存成功')
              var openid = wx.getStorageSync('openid')
              console.log('123456' + openid)
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
    var openid = wx.getStorageSync('openid')
    console.log('123456' + openid)
    var that = this
    wx.request({
      url: 'http://guopengli.cn/read_openid_state.php',//向这个文件请求判断openid是否存在
      data: {
        openid: openid 
      },
      success: function (res) {
        console.log(res.statusCode)
        console.log('ccc')
        console.log(res.data)
        that.setData({
          result: res.data,
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
        else if (res.data.state == '1') {
          //wx.hideLoading()
          wx.navigateTo({
            url: '../my/wxnum_exist',
          })
        }
        else{
          wx.navigateTo({
            url: '../my/sign'
          })
        }
      

      },
    })



  }
    




})



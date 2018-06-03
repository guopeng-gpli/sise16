// pages/test3/insert_result.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: 0,
    result: NaN,
    flag: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    
    var openid = wx.getStorageSync('openid')//从缓存取
    console.log('openid ' + openid) 
      var that = this
      wx.request({
        url: 'https://www.guopengli.cn/read_name1.php',
        data: {
          openid: openid,
        },

        success: function (res) {
          console.log(res.statusCode)
          console.log('1')
          console.log(res.data)
          var num=res.data.num
          var name = res.data.name
          var role=res.data.role
          var location=res.data.location
          var binding=res.data.binding
          that.setData({
            result: res.data,
            flag: res.data.flag,
            num: res.data.num,
            name :res.data.name,
            role:res.data.role,
            location: res.data.location,
            binding:res.data.binding
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
        fail: function () {//主要用于调试
          setTimeout(function () {
            wx.showToast({
              title: 'request接口调用失败',
              icon: 'none',
              duration: 2000
            })
          }, 1500)
          console.log("fail")
        }
      })
    
  },



})

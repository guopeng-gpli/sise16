// pages/test3/insert_result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: 0,
    result: NaN
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages();
    var prePage = page[page.length - 2]
    console.log('report_result')
    console.log(prePage.data.openid)
    //对insert页面的result进行一次拷贝 
    this.setData({
      latitude: prePage.data.latitude,
      longitude: prePage.data.longitude,
      openid: prePage.data.openid
      //  session_key: prePage.data.result.session_key,
    })
    console.log('aaa'+prePage.data.latitude)
    console.log("connect")
    var that = this
    wx.request({
      url: 'http://guopengli.cn/report_home.php',
      data: {
        latitude: prePage.data.latitude,
        longitude: prePage.data.longitude,
        openid: prePage.data.openid
      },

      success: function (res) {
        console.log(res.statusCode)
        console.log('1')
        console.log(res.data)
        that.setData({
          result: res.data
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









  back: function () {
    wx.navigateBack({
      delta: 3//返回三层
    })
  },


})








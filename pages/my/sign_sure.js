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
    // var page = getCurrentPages();
    // var prePage = page[page.length - 2]
    // console.log('sign_sure')
    // console.log(prePage.data.openid)
    // //对insert页面的result进行一次拷贝 
    // this.setData({
    //   name: prePage.data.name,
    //   num: prePage.data.num,
    //   openid: prePage.data.openid
    //   //  session_key: prePage.data.result.session_key,
    // })
    // console.log(prePage.data.name)
    console.log("connect")
    var that = this
    var openid = wx.getStorageSync('openid')
    console.log('123456' + openid)
    var num = wx.getStorageSync('num')
    console.log('1234567 ' + num)
    wx.request({
      url: 'http://guopengli.cn/sql/insert_openid.php',
      data: {
        num: num,
        openid: openid
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








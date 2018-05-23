// const app = getApp()
// Page({
//   data: {
//     result: NaN,
//   },

  



//  query: function () {
//      wx.navigateTo({
//        url: 'query_result',
//      })
//    }



// })
// pages/test3/insert_result.js
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
    var page = getCurrentPages();
    var prePage = page[page.length - 2]
    console.log('2')
    console.log(prePage.data)
    this.setData({
      openid: prePage.data.result.openid,
      session_key: prePage.data.result.session_key,
    })
    console.log('report    ' + prePage.data.result.openid)
    var that = this
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        console.log(latitude);
        var longitude = res.longitude;
        console.log('这是当前位置' + longitude);
        var speed = res.speed;
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
    wx.request({
      url: 'http://guopengli.cn/read_name_location.php',
      data: {
        openid: prePage.data.result.openid,
        //  latitude: latitude,
        // longitude:longitude,
      },
      success: function (res) {
        console.log(res.statusCode)
        console.log('return_info')
        console.log(res.data)
        var name = res.data.name;
        console.log(name)
        var location = res.data.location
        console.log(location)
        that.setData({
          result: res.data,
          name: res.data.name,
          location: res.data.location
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
  },
  query: function () {
    wx.navigateTo({
      url: 'query_result',
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


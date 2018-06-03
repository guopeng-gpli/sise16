// pages/fun/query_result.js
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
    var that = this
    wx.request({
      url: 'https://www.guopengli.cn/count.php',
      data: {

      },
      success: function (res) {
        console.log(res.statusCode)
        console.log('return_info')
        console.log(res.data)
        var count = res.data.count;
        var count1=res.data.count1;
        var array=res.data.Array
        var array1=res.data.Array1
        console.log(array)
        that.setData({
          result: res.data,
          count: res.data.count,
          count1:res.data.count1,
          array: res.data.Array,
          array1: res.data.Array1,//应该用循环的方式访问名字，类似于cet.js中
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
  back:function(){
wx.navigateBack({
  delta:2
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
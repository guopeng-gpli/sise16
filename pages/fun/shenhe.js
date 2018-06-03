// pages/fun/shenhe.js
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
  var that=this
  wx.request({
    url: 'https://www.guopengli.cn/check_in.php',
    data:{},
    success:function(res)
    {
      console.log(res.statusCode)
      console.log('shenhe.js')
      console.log(res.data)
      var name=res.data.name
      var class1=res.data.class
      var tel = res.data.Array.tel
      var reason = res.data.Array.reason
      var num = res.data.Array.num
      var Array=res.data.Array
      that.setData({
        result: res.data,
        array: res.data.Array,
         num : res.data.Array.num
      })
    }
  })
  },



  
  tongguo:function(){
    wx.request({
      url: 'https://www.guopengli.cn/check_check.php',
    })

    wx.navigateTo({
      url: 'shenhejieguo',
    })
  },
 butongguo:function(){
   wx.navigateTo({
     url: 'shenhejieguo',
   })
 }
,
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
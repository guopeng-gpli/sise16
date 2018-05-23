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
    console.log('2')
    console.log(prePage.data.openid)
    //对insert页面的result进行一次拷贝 
    this.setData({
      name: prePage.data.result.name,
      num: prePage.data.result.num,
      openid: prePage.data.result.openid,
      binding: prePage.data.result.binding,//read_name.php需要返回flag
      role: prePage.data.result.role,
      location: prePage.data.result.location,
      //  session_key: prePage.data.result.session_key,
    })
    console.log(prePage.data.result.num)
    console.log(prePage.data.result.binding)

  },
  back: function () {
    //console.log("back_to_test3")//返回的监听函数
    //wx.hideLoading()
    wx.navigateBack({
      delta: 3
    })
  },



})









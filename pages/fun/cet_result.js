// cet_result.js

Page({
  /**
   * 拷贝cet页面数据，只进行显示
   */
  data: {
    array: NaN,
    times: 0
  },
  back: function () {//返回的监听函数
    wx.navigateBack()
    console.log("back")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages();
    var prePage = page[page.length - 2]
    console.log(prePage.data)
    //对页面的result进行一次拷贝  
    this.setData({
      array: prePage.data.result.array,
      times: prePage.data.result.times
    })
  }
})
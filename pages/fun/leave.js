// pages/fun/leave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['晚归', '不归'],
    objectArray: [
      {
        id: 0,
        name: '晚归'
      },
      {
        id: 1,
        name: '不归'
      },
    ],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.setStorageSync('leave_id', e.detail.value)
    console.log('同步保存成功')
   
  },
  infoSubmit: function (e) {//表单提交的监听函数
    var s = e.detail.value
    console.log(s.name)
    if (this.check(s)) {
      wx.showLoading({
        title: '查询中',
      })
      this.connect(s)
    }
  },
  check: function (s) {
    //if(s.name)
    if (s.phone_num.length != 11&& s.phone_num.length != 7 && s.phone_num.length != 8) {//学号长度的检查
      wx.showToast({
        title: '联系方式输入有误',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },
  connect: function (x) {//连接后台
    var leave_id = wx.getStorageSync('leave_id')
    console.log('123456  ' + leave_id)
    var openid = wx.getStorageSync('openid')
    console.log('123456  ' + openid)
    console.log("connect")
    var that = this
    wx.request({
      url: 'http://guopengli.cn/ask_for_leave.php',
      data: {
        openid:openid,
        id:leave_id ,
        tel:x.phone_num
      },
      success: function (res) {
        console.log(res.statusCode)
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
        else {
          wx.hideLoading()
          wx.navigateTo({
            url: 'leave_result',
          })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
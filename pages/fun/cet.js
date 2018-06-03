// test.js
Page({

  data: {
    result: NaN
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
    if (s.xh.length != 10) {//学号长度的检查
      wx.showToast({
        title: '学号输入有误',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    else if (s.name.replace(/[ ]/g, "").length == 0) {//姓名判空
      wx.showToast({
        title: '姓名输入有误',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },
  connect: function (x) {//连接后台
    console.log("connect")
    var that = this
    wx.request({
      url: 'https://www.guopengli.cn/sql/cet.php',
      data: {
        name: x.name,
        xh: x.xh
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
            url: 'cet_result',
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
  }
})
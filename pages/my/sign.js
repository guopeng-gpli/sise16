// pages/test3/insert_result.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
  openid:0,
  result:NaN,
  flag:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages();
    var prePage = page[page.length - 2]
    console.log('2')
    console.log(prePage.data)
    //对insert页面的result进行一次拷贝 
    this.setData({
      openid: prePage.data.result.openid,
      session_key: prePage.data.result.session_key,
      
    })
    //console.log(prePage.data.result.openid)
  //   var that=this
  //  wx.request({
  //    url: 'http://guopengli.cn/read_openid_state.php',//向这个文件请求判断openid是否存在
  //    data:{
  //      openid: prePage.data.result.openid
  //    },
  //    success: function (res) {
  //      console.log(res.statusCode)
  //      console.log('cc')
  //      console.log(res.data)
  //      that.setData({
  //         result: res.data,
  //       })
  //      if (res.statusCode != 200) {
  //        setTimeout(function () {
  //          wx.showToast({
  //            title: '服务器异常',
  //            icon: 'none',
  //            duration: 2000
  //          })
  //        }, 1500)
  //      }
  //      else if (res.data.state == '1') {
  //        wx.hideLoading()
  //        wx.navigateTo({
  //          url: 'wxnum_exist',
  //        })
  //      }

  //    },
  //  })
  },
  infoSubmit: function (e) {//表单提交的监听函数
    var s = e.detail.value
    console.log(s.num)
    wx.setStorageSync('num', s.num)
    console.log('num同步保存成功')
    if (this.check(s)) {
      wx.showLoading({
        title: '查询中',
      })
      this.connect(s)
    }
  },
  check: function (s) {
    //if(s.name)
    if (s.num.length != 10) {//学号长度的检查
      wx.showToast({
        title: '学号输入有误',
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
      url: 'https://www.guopengli.cn/read_name.php',
      data: {
        num:x.num,
      },
      
      success: function (res) {
        console.log(res.statusCode)
        console.log('1')
        console.log(res.data)
        that.setData({
          result: res.data,
          flag:res.data.flag 
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
  

        else if (res.data.binding=='未绑定'){
          wx.hideLoading()
          wx.navigateTo({
            url: 'sign_result',
          })
        }
        else{
          wx.hideLoading()
          wx.navigateTo({
            url: 'sign_nosure',
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

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
    // var page = getCurrentPages();
    // var prePage = page[page.length - 2]
    // console.log('2')
    // console.log(prePage.data) 
    // this.setData({
    //   openid: prePage.data.result.openid,
    //   session_key: prePage.data.result.session_key,
    // })
    // console.log('report    '+prePage.data.result.openid)
    var that = this
    wx.getLocation({    
      success: function (res) {
        


        var latitude = res.latitude;
        console.log(latitude);
        var longitude = res.longitude;
        wx.setStorageSync('latitude', res.latitude)
        console.log('latitude同步保存成功')
        wx.setStorageSync('longitude', res.longitude)
        console.log('longitude同步保存成功')
     

        console.log('这是当前位置' + longitude);
        var speed = res.speed;
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
var openid = wx.getStorageSync('openid')
    console.log('123456  ' + openid)
  wx.request({
    url: 'http://guopengli.cn/read_name_location.php',
    data:{
      openid: openid,
    //  latitude: latitude,
     // longitude:longitude,
    },
      success: function (res) { 
        console.log(res.statusCode)
        console.log('return_info')
        console.log(res.data)
        var name = res.data.name;
        console.log(name)
        var location=res.data.location
        console.log(location)
        that.setData({
          result: res.data,
          name:res.data.name,
          location:res.data.location
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
  sure:function(){
    var latitude = wx.getStorageSync('latitude')
    var longitude = wx.getStorageSync('longitude')
    var openid = wx.getStorageSync('openid')
    console.log('123456' + openid)
    var that = this
    wx.request({
      url: 'http://guopengli.cn/report_home.php',
      data: {
        latitude: latitude,
        longitude:longitude,
        openid:openid
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
        else if(res.data.ishere=='未报寝')
        {
          wx.navigateTo({
            url: 'report_result0',
          })
        }
        else{
          wx.navigateTo({
            url: 'report_result',
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
  
})
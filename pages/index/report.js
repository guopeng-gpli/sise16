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
    console.log('report    '+prePage.data.result.openid)
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
    data:{
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
    wx.navigateTo({
      url: 'report_result',
    })
  },
  
})
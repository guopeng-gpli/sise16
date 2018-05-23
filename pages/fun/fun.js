//index.js
//获取应用实例

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    result: NaN,
    imgUrls: [
      "../../images/1.jpg",
      "../../images/2.jpg",
      "../../images/3.jpg",
      "../../images/4.jpg"
    ],
    navs: []
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      msgList: [
        { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
        { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
        { url: "http://www.baidu.com", title: "公告：你想和一群有志青年一起过生日嘛？" }]
        
        })
   


    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'http://guopengli.cn/sql/OPENID.php',
            data: {
              logcode: res.code
            },
            success: function (res) {
              console.log(res.statusCode)
              console.log('520')
              console.log(res.data)
              that.setData({
                result: res.data
              })
             
              
              wx.setStorageSync('openid', res.data.openid)
               console.log('同步保存成功')
              var openid= wx.getStorageSync('openid')
              console.log('123456'+openid)
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
        }

        else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    var page = this;
    var navs = this.loadNavData();
    page.setData({ navs: navs });

  },

  navBtn: function (e) {
    console.log(e);
    var id = e.currentTarget.id;

    switch (id) {
      case "0":
        var openid = wx.getStorageSync('openid')
        console.log('123456  ' + openid)
        var that=this
      wx.request({
        url: 'http://guopengli.cn/judge_role.php',
        data:
        {openid:openid,
        },
        success:function(res){
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
            else if(res.data.role=='辅导员'){
              wx.navigateTo({
                url: 'shenhe',
              })
            }
            else
              wx.navigateTo({
                url: 'leave'
              })
        }
      })
        
        break
      case "1":
     
        wx.navigateTo({
          url: 'audit'
        })
        break
      case "2":
        wx.navigateTo({
          url: 'cet',
        })
        break
      case "3":
        wx.navigateTo({
          url: 'foward',
        })
        break
    }

  },

  loadNavData: function () {
    var navs = [];
    var nav0 = new Object();
    nav0.img = "../../images/leave.png";
    nav0.name = '请假事项';
    navs[0] = nav0;

    var nav1 = new Object();
    nav1.img = '../../images/audit.png';
    nav1.name = '信息统计';
    navs[1] = nav1;

    var nav2 = new Object();
    nav2.img = '../../images/cet.png';
    nav2.name = '四六级查询';
    navs[2] = nav2;

    var nav3 = new Object();
    nav3.img = '../../images/forward.png';
    nav3.name = '敬请期待';
    navs[3] = nav3;

   

    return navs;
  }
})







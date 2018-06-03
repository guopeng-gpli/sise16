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
        { url: "../mes/0", title: "比赛：网络开发应用大赛" },
        { url: "../mes/1", title: "通知：学生会议" },
        { url: "../mes/2", title: "公告：信息学院2018年5月发展党员公告" }]
        
        })
   


    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.guopengli.cn/sql/OPENID.php',
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
        url: 'https://www.guopengli.cn/judge_role.php',
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
            else if (res.data.role != '辅导员'&&res.data.dayoff=='0'){
              wx.navigateTo({
                url: 'leave'
              })
            }
            else{
              if(res.data.agree=='1'){
                wx.navigateTo({
                  url: 'shenheqingkuang',
                })
            }
            else{
              wx.navigateTo({
                url: 'shenheqingkuang0',
              })
            }
              
            }
             
        }

      })
        
        break
      case "1":
        var openid = wx.getStorageSync('openid')
        console.log('123456  ' + openid)
        var that = this
        wx.request({
          url: 'https://www.guopengli.cn/judge_role.php',
          data:
          {
            openid: openid,
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
            else if (res.data.role == '辅导员') {
              wx.navigateTo({
                url: 'query_result',
              })
            }
            else
              wx.navigateTo({
                url: 'quanxiancuowu'
              })
          }
        })

        break
      case "2":
        wx.navigateTo({
          url: 'cet',
        })
        break
      case "3":
        wx.navigateTo({
          //url: 'foward',
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







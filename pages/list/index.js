const interfaces = require("../../utils/urlconfig.js")

// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1,
    size: 5,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    wx.setNavigationBarTitle({
      title: options.title,
    })

    wx.showLoading({
      title: "加载中..."
    })

    const self = this;
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        console.log(res)
        self.setData({
          prolist: res.data
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示加载状态
    wx.showNavigationBarLoading();

    this.setData({
      page: 1,
      noData: false
    })

    const self = this;

    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          prolist: res.data
        })
        // 隐藏加载状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();

    const prolist = this.data.prolist;
    let page = this.data.page;
    this.setData({
      page: ++page,
    })

    const self = this;
    wx.request({
      url: interfaces.productionsList + "/" + self.data.page + "/" + self.data.size,
      success(res){
        if(res.data.length === 0){
          self.setData({
            noData: true
          })
        }else{
          res.data.forEach(item => {
            prolist.push(item)
          })

          self.setData({ 
            prolist: prolist
          })
        }
        

        wx.hideNavigationBarLoading();
      }
    })
  },
  
  switchProlistDetail(e){
    let index = e.currentTarget.dataset.index;

    wx.navigateTo({
      url: '/pages/detail/index?id=' + this.data.prolist[index].id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
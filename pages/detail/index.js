const interfaces = require("../../utils/urlconfig.js")

// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData: {},
    biaotiao: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    const self = this;

    wx.showLoading({
      title: "加载中..."
    })

    wx.request({
      url: interfaces.productionDetail,
      success(res){
        // console.log(res.data)
        let result = null;
        res.data.forEach(data => {
          if(data.partData.id === id){
            result = data;
          }
        })
        self.setData({
          partData: result.partData,
          biaotiao: result.baitiao
        })
        
        wx.hideLoading();
      }
    })
  }
})
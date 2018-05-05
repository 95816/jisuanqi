// pages/jisuanqi/jisuanqi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id0:0,
    id1:1,
    id2:2,
    id3:3,
    id3:3,
    id4:4,
    id5:5,
    id6:6,
    id7:7,
    id8:8,
    id9:9,
    ida:'+',
    idb:'-',
    idc:'*',
    idd:'÷',
    clear:'clear',
    del:'del',
    zf:'zf',
    dian:'.',
    dengyu:'=',
    screenData:0,
    isFuHao:false
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
  
  },
  history:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  clickBtn:function(e){

    //获取用户输入值
    var code = e.currentTarget.id;
    //判断是否是退格键
    if (code == this.data.del){
      //退格键处理
      var data = this.data.screenData;
      var newData=data.substr(0,data.length-1);
      var lastWord = newData[newData.length-1];
      this.setData({ 'isFuHao': false });
      if (lastWord == this.data.ida || lastWord == this.data.idb || lastWord == this.data.idc || lastWord == this.data.idd){
        this.setData({ 'isFuHao': true});
      }
      this.setData({'screenData':newData});
    }else if(code == this.data.clear){
      //清屏键
      this.setData({'screenData':0});
      this.setData({'isFuHao':false});
    }else if (code == this.data.zf) {
      //获取第一个字符
      var firstWord = (this.data.screenData).charAt(0);
      if(isNaN(firstWord)){
        var data = (this.data.screenData).substr(1, this.data.screenData.length);
      }else{
        var data = '-'+this.data.screenData;
      }
      this.setData({'screenData':data});
    }else{
      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        if (this.data.isFuHao == true) {
          return;
        }
      }
      //获取此时屏幕的值
      var data = this.data.screenData;
      var str = null;
      if (data == 0) {
        str = code;
      } else {
        str = data + code;
      }
      this.setData({ 'isFuHao': false });
      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        this.setData({ 'isFuHao': true });
      }

      this.setData({ screenData: str });
    }

  }
})
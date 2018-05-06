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
    isFuHao:false,
    result:[],//存取输入的值
    history:[],
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
    ////判断输入的值是否是退格键
    if (code == this.data.del){
      var data = this.data.screenData;
      var newData = data.substr(0,(data.length)-1);
      console.log(data);
      //截取最终屏幕显示的最后一个字符
      var lastWord = newData[newData.length-1];
      this.setData({ 'isFuHao': false });
      //退格一次设为false，判断此时退格后的最后一个字符。若为符号则为ture下次不能输入符号
      if (lastWord == this.data.ida || lastWord == this.data.idb || lastWord == this.data.idc || lastWord == this.data.idd){
        this.setData({ 'isFuHao': true});
      }
      //退格键数组减少一位
      this.data.result.pop();
      this.setData({'screenData':newData});
      //判断输入的值是否是清屏键
    }else if(code == this.data.clear){
      //1.数组清空
      this.data.result = [];
      //2.设置屏幕显示数据为0
      this.setData({'screenData':0});
      //3.设置为false代表下面可以输入任何值
      this.setData({'isFuHao':false});
      //判断输入的值是否是正负号
    }else if (code == this.data.zf) {
      //1.获取第一个字符
      var firstWord = (this.data.screenData).charAt(0);
      //2.判断最后一个是否是数字。是则加-，否则第一位裁掉
      if(isNaN(firstWord)){
        //3.如果不是一个数字那么删除第一个
        this.data.result.shift();
        var data = (this.data.screenData).substr(1, this.data.screenData.length);
      }else{
        this.data.result.unshift('-');
        var data = '-'+this.data.screenData;
      }
      console.log(this.data.result);
      this.setData({'screenData':data});
      //判断输入的值是否是等于键
    } else if (code == this.data.dengyu) {
      //1.把数字和运算符分开[123,'+',321,'-',3]
      var result = this.data.result;
      var num = '';
      var newArr=  [];
      for(var i in result){
        if(isNaN(result[i])==false || result[i]==this.data.dian){
          num+=result[i];
        }else{
          newArr.push(num);
          newArr.push(result[i]);
          num="";
        }
      }
      newArr.push(num);
      //2.开始运算
      var res = new Number(newArr[0]);
      for(var i=1;i<newArr.length;i++){
        //四种符号
        if(newArr[i] == this.data.ida){
          res+=Number(newArr[i+1]);
        } else if (newArr[i] == this.data.idb){
          res -= Number(newArr[i + 1]);
        } else if (newArr[i] == this.data.idc) {
          res *= Number(newArr[i + 1]);
        } else if (newArr[i] == this.data.idd) {
          res /= Number(newArr[i + 1]);
        }
      }
      this.data.result = [];
      this.data.result.push(res);
      //3.历史记录
      this.data.history.push(this.data.screenData+'='+res);
      //4.写入缓存
      wx.setStorageSync('historys',this.data.history);
      console.log(res);
      console.log(newArr);
      console.log(this.data.history);
      //4.输出结果
      this.setData({'screenData':res});
    }else{
      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        if (this.data.isFuHao == true) {
          return;
        }
      }
      //获取此时屏幕的值
      var val = this.data.screenData;
      var str = null;
      if (val == 0) {
        str = code;
      } else {
        str = val + code;
      }
      this.setData({ 'isFuHao': false });
      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        this.setData({ 'isFuHao': true });
      }

      this.data.result.push(code);
      this.setData({ screenData: str });
    }

  }
})
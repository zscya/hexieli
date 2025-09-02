// 同时发送异步请求的次数
let ajaxTimes = 0

export const request=(params)=>{
    ajaxTimes++;
    // 显示加载中 效果
    wx.showLoading({
      title: '加载中',
      mask:true,
      
    })
    // 定义公共的url
    const baseUrl ="";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            // url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            // 关闭正在等待的图标
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes ===0){
                    // 关闭隐藏窗口
                    wx.hideLoading()

                }
            }
        })
    })
}
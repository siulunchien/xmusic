/**
 * 
 * @param {string} url      请求地址
 * @param {object} params   请求参数
 * 
 */
function jsonp(url, params) {

  return new Promise((resolve, reject) => {

    let script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0],
        srcParams = '',
        time = new Date().getTime() + Math.random().toString().substr(2); // 使用随机数减少函数名重复的几率
    
    // 组合请求参数
    Object.keys(params).forEach(item => {

      if (item != 'callback') srcParams += `${item}=${params[item]}&`;

    })

    // 填充 script 的 src
    script.src = `${url}?${srcParams}${params.callback}=jsonpback${time}`;

    // 插入 script
    head.appendChild(script);

    // 定义全局的回调方法
    window[`jsonpback${time}`] = function(result) {
      try {
        resolve(result);
      } catch(e) {
        reject(e)
      }
      finally {
        // 最后删除 script 和 回调方法
        head.removeChild(script);
        delete window[`jsonpback${time}`];
      }
    }

  })

}

export default jsonp;
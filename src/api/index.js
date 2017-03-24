import url from './api'
import jsonp from './jsonp'

/**
 * 新建 API 类
 */
class API {
  constructor ({url, jsonp}) {
    let newObj = {};
    this.url = url;
    this.jsonp = jsonp;

    Object.keys(url).forEach(item => {
      newObj[item] = jsonp.bind(null, url[item]);
    })
    // 合并
    Object.assign(this, newObj);
  }
  getJsonp (url, params) {
    return jsonp.call(this, url, params);
  }
}

export default new API({url, jsonp})
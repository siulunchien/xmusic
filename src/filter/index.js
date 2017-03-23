/**
 * 
 * @param {String} name        歌手名字
 * @param {String} albumname   专辑名称
 * @param {String} albumdesc   专辑描述
 * @return {String} 显示的名字
 */
export const formatSinger = (name, albumname, albumdesc) => {
  albumname = albumname == '' ? '' : ` · ${albumname}`;
  albumdesc = albumdesc == '' ? '' : ` · ${albumdesc}`;
  return `${name}${albumname}${albumdesc}`;
}

/**
 * 
 * @param {Number} seconds  秒数
 * @return {String} 返回分秒
 */
export const timeFormat = seconds => {
  seconds = Math.floor(seconds);
  var min = Math.floor(seconds / 60),
      second = seconds % 60;
  second = (second < 10) ? `0${second}` : second;
  min = (min < 10) ? `0${min}` : min;
  return `${min}:${second}`
}
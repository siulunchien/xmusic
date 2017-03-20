/**
 * 
 * @param {string} name        歌手名字
 * @param {string} albumname   专辑名称
 * @param {string} albumdesc   专辑描述
 */
export const formatSinger = (name, albumname, albumdesc) => {
  albumname = albumname == '' ? '' : ` · ${albumname}`;
  albumdesc = albumdesc == '' ? '' : ` · ${albumdesc}`;
  return `${name}${albumname}${albumdesc}`;
}
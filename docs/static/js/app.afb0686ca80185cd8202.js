webpackJsonp([1,2],[,,,,,,,function(t,s,a){"use strict";a.d(s,"h",function(){return i}),a.d(s,"f",function(){return e}),a.d(s,"e",function(){return n}),a.d(s,"b",function(){return o}),a.d(s,"a",function(){return l}),a.d(s,"c",function(){return r}),a.d(s,"d",function(){return c}),a.d(s,"g",function(){return _});var i="addPlayList",e="removePlayList",n="clearPlayList",o="toPlay",l="toPause",r="prev",c="next",_="immediately"},,,,,,,,,,,,,,,,,,,,function(t,s,a){"use strict";var i=a(53),e=a.n(i),n=a(16),o=a.n(n),l=a(56),r=a.n(l),c=a(51),_=a(52),u=function t(s){var a=s.url,i=s.jsonp;r()(this,t);var n={};this.url=a,this.jsonp=i,o()(a).forEach(function(t){n[t]=i.bind(null,a[t])}),e()(this,n)};s.a=new u({url:c.a,jsonp:_.a})},,,,,,,,,,,,function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),a.d(s,"formatSinger",function(){return i});var i=function(t,s,a){return s=""==s?"":" · "+s,a=""==a?"":" · "+a,""+t+s+a}},function(t,s,a){"use strict";var i=a(17),e=a(118),n=a(108),o=a.n(n),l=a(110),r=a.n(l);i.a.use(e.a),s.a=new e.a({routes:[{path:"/",name:"home",component:o.a},{path:"/songs/:id",name:"songs",component:r.a}]})},function(t,s,a){"use strict";var i,e=a(57),n=a.n(e),o=a(120),l=a(17),r=a(7);l.a.use(o.a),s.a=new o.a.Store({state:{playList:[],playing:null,isPlaying:!1},mutations:(i={},n()(i,r.h,function(t,s){t.playList.indexOf(s)<0&&(t.playing||(t.playing=s),t.playList.push(s))}),n()(i,r.f,function(t,s){t.playing==t.playList[s]&&(t.isPlaying=!1,t.playing=t.playList[s+1]?t.playList[s+1]:t.playList[s-1]?t.playList[s-1]:null),t.playList.splice(s,1),t.playList<=0&&(t.playing=null),t.playing&&setTimeout(function(){t.isPlaying=!0},500)}),n()(i,r.e,function(t){t.playList=[],t.playing=null,t.isPlaying=!1}),n()(i,r.b,function(t){t.isPlaying=!0}),n()(i,r.a,function(t){t.isPlaying=!1}),n()(i,r.c,function(t){var s=t.playList.indexOf(t.playing);s>0&&(t.isPlaying=!1,t.playing=t.playList[s-1],setTimeout(function(){t.isPlaying=!0},500))}),n()(i,r.d,function(t){var s=t.playList.indexOf(t.playing);s<t.playList.length-1&&(t.isPlaying=!1,t.playing=t.playList[s+1],setTimeout(function(){t.isPlaying=!0},500))}),n()(i,r.g,function(t,s){t.isPlaying=!1;var a=t.playList.indexOf(s);a!=-1?t.playing=t.playList[a]:(t.playList.push(s),t.playing=t.playList[t.playList.length-1]),setTimeout(function(){t.isPlaying=!0},500)}),i)})},function(t,s,a){a(98);var i=a(3)(a(44),a(111),null,null);t.exports=i.exports},,function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(105),e=a.n(i);s.default={name:"App",computed:{playListLen:function(){return this.$store.state.playList.length}},components:{Play:e.a}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(106),e=a.n(i),n=a(107),o=a.n(n),l=a(7);s.default={name:"Play",data:function(){return{isShowPlayList:!1,isShowPlayer:!1,allTime:"",nowTime:"",timeProgress:"",timer:null}},mounted:function(){},methods:{showPlayList:function(){this.isShowPlayList=!0},closePlayList:function(){this.isShowPlayList=!1},showPlayer:function(){this.isShowPlayer=!0},closePlayer:function(){this.isShowPlayer=!1},setProgress:function(){this.timeProgress="0"},controlPlay:function(){this.isPlaying?this.$store.commit(l.a):this.$store.commit(l.b)},play:function(t){var s=this;clearInterval(this.timer),this.isPlaying?(t.play(),this.timer=setInterval(function(){s.timeProgress=t.currentTime/t.duration*100+"%"},1e3)):t.pause()}},computed:{playingInfo:function(){return this.$store.state.playing?this.$store.state.playing:this.$store.state.playList.length>0?this.$store.state.playList[0]:null},songUrl:function(){var t=this.playingInfo?this.playingInfo.data.songid:"";return t?"http://ws.stream.qqmusic.qq.com/"+t+".m4a?fromtag=46":""},isPlaying:function(){return this.$store.state.isPlaying}},watch:{playingInfo:function(){this.playingInfo||this.closePlayer()},isPlaying:function(){var t=this;this.$nextTick(function(){var s=document.querySelector("#play__audio");t.play(s)})}},components:{PlayList:e.a,Player:o.a}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(7);s.default={name:"PlayList",props:{isShow:{type:Boolean,default:!1}},methods:{closePlayList:function(){this.$emit("closePlayList")},clearPlayList:function(){this.$store.commit(i.e),this.closePlayList()},removeSong:function(t){this.$store.commit(i.f,t),this.playList.length<=0&&this.closePlayList()},immediately:function(t){this.$store.commit(i.g,t),this.closePlayList()}},computed:{playList:function(){return this.$store.state.playList},playingId:function(){return this.$store.state.playing?this.$store.state.playing.data.songid:""}}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(7);s.default={name:"Player",props:{progress:{type:String,default:"0"}},methods:{showPlayList:function(){this.$emit("showPlayList")},closePlayer:function(){this.$emit("closePlayer")},controlPlay:function(){this.isPlaying?this.$store.commit(i.a):this.$store.commit(i.b)},prev:function(){this.$store.commit(i.c),this.setProgress()},next:function(){this.$store.commit(i.d),this.setProgress()},setProgress:function(){this.$emit("setProgress")}},computed:{playingInfo:function(){return this.$store.state.playing},isPlaying:function(){return this.$store.state.isPlaying}}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(109),e=a.n(i),n=a(27);s.default={name:"Home",data:function(){return{toplist:[]}},mounted:function(){var t=this;this.getToplist().then(function(s){0==s.code&&(t.toplist=s.data.topList)})},methods:{getToplist:function(){var t={format:"jsonp",g_tk:5381,uin:0,inCharset:"utf-8",outCharset:"utf-8",notic:0,platform:"h5",needNewCode:1,_:(new Date).getTime(),callback:"jsonpCallback"};return n.a.getToplist(t)}},components:{ListItem:e.a}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"ListItem",props:{listData:{type:Object}},methods:{toDetail:function(t){this.$router.push({name:"songs",params:{id:t}})}}}},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(27),e=a(7);s.default={name:"Songs",data:function(){return{songList:[],topInfo:{},date:"",updateTime:"",isChoose:!1,chooseItem:null}},mounted:function(){var t=this;this.getToplistDetail().then(function(s){t.topInfo=s.topinfo,t.date=s.date,t.updateTime=s.update_time,t.songList=s.songlist})},methods:{getToplistDetail:function(){var t={topid:this.$route.params.id,format:"jsonp",inCharset:"utf-8",outCharset:"utf-8",notic:0,platform:"yqq",needNewCode:0,_:(new Date).getTime(),callback:"jsonpCallback"};return i.a.getTopListDetail(t)},chooseSong:function(t){this.isChoose=!0,this.chooseItem=t},closeChooseSong:function(){this.isChoose=!1},addToPlayList:function(){this.$store.commit(e.h,this.chooseItem),this.closeChooseSong()},immediately:function(){this.$store.commit(e.g,this.chooseItem),this.closeChooseSong()}}}},function(t,s,a){"use strict";s.a={getToplist:"https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",getTopListDetail:"https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",getLyc:"https://api.darlin.me/music/lyric",getSong:"http://ws.stream.qqmusic.qq.com/"}},function(t,s,a){"use strict";function i(t,s){return new l.a(function(a,i){var e=document.createElement("script"),o=document.getElementsByTagName("head")[0],l="",r=(new Date).getTime()+Math.random().toString().substr(2);n()(s).forEach(function(t){"callback"!=t&&(l+=t+"="+s[t]+"&")}),e.src=t+"?"+l+s.callback+"=jsonpback"+r,o.appendChild(e),window["jsonpback"+r]=function(t){try{a(t)}catch(t){i(t)}finally{o.removeChild(e),delete window["jsonpback"+r]}}})}var e=a(16),n=a.n(e),o=a(55),l=a.n(o);s.a=i},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s,a){a(100);var i=a(3)(a(45),a(113),"data-v-57e41576",null);t.exports=i.exports},function(t,s,a){a(103);var i=a(3)(a(46),a(116),"data-v-e461b864",null);t.exports=i.exports},function(t,s,a){a(104);var i=a(3)(a(47),a(117),"data-v-f1a970a4",null);t.exports=i.exports},function(t,s,a){a(102);var i=a(3)(a(48),a(115),"data-v-e14db2a2",null);t.exports=i.exports},function(t,s,a){a(99);var i=a(3)(a(49),a(112),"data-v-3cf6b062",null);t.exports=i.exports},function(t,s,a){a(101);var i=a(3)(a(50),a(114),"data-v-7ee9d00d",null);t.exports=i.exports},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{class:{hasPlayList:t.playListLen},attrs:{id:"app"}},[a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("keep-alive",{attrs:{exclude:"Songs"}},[a("router-view")],1)],1),t._v(" "),a("transition",{attrs:{name:"slide-fade"}},[a("Play",{directives:[{name:"show",rawName:"v-show",value:t.playListLen,expression:"playListLen"}]})],1)],1)},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",{staticClass:"list-item",on:{click:function(s){t.toDetail(t.listData.id)}}},[a("aside",{staticClass:"list-item__pic"},[a("img",{attrs:{src:t.listData.picUrl,alt:""}})]),t._v(" "),a("div",{staticClass:"list-item__info f-14"},[a("div",{staticClass:"list-item__info__container"},[a("h3",{staticClass:"list-item__info__container__title f-16"},[t._v(t._s(t.listData.topTitle))]),t._v(" "),t._l(t.listData.songList,function(s,i){return a("p",[t._v(t._s(i+1)),a("span",[t._v(t._s(s.songname))]),t._v(" - "+t._s(s.singername))])}),t._v(" "),a("i",{staticClass:"list-item__info__container__arrow"})],2)])])},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("footer",{staticClass:"play"},[t.playingInfo?a("div",{staticClass:"play__info",on:{click:t.showPlayer}},[a("h4",{staticClass:"f-14"},[t._v(t._s(t.playingInfo.data.songname))]),t._v(" "),a("p",[t._v(t._s(t.playingInfo.data.singer[0].name))])]):t._e(),t._v(" "),a("a",{staticClass:"play__control",attrs:{href:"javascript:;"}},[a("span",{staticClass:"play__control__btn",class:{"play__control__btn--pause":!t.isPlaying,"play__control__btn--playing":t.isPlaying},on:{click:t.controlPlay}})]),t._v(" "),a("a",{staticClass:"play__play-list",attrs:{href:"javascript:;"},on:{click:t.showPlayList}},[a("i",{staticClass:"play__play-list__line"}),t._v(" "),a("i",{staticClass:"play__play-list__line"}),t._v(" "),a("i",{staticClass:"play__play-list__line"})]),t._v(" "),a("audio",{staticClass:"play__audio",attrs:{id:"play__audio",src:t.songUrl}}),t._v(" "),a("play-list",{attrs:{isShow:t.isShowPlayList},on:{closePlayList:t.closePlayList}}),t._v(" "),a("transition",{attrs:{name:"slide-fade"}},[a("Player",{directives:[{name:"show",rawName:"v-show",value:t.isShowPlayer,expression:"isShowPlayer"}],attrs:{progress:t.timeProgress},on:{setProgress:t.setProgress,closePlayer:t.closePlayer,showPlayList:t.showPlayList}})],1)],1)},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("main",{staticClass:"songs"},[a("header",{staticClass:"songs__header"},[a("img",{staticClass:"songs__header__pic",attrs:{src:t.topInfo.pic_album,alt:""}}),t._v(" "),a("div",{staticClass:"songs__header__title"},[a("h1",[t._v(t._s(t.topInfo.ListName))]),t._v(" "),a("p",{staticClass:"f-14"},[t._v(t._s(t.updateTime)+" 更新")])]),t._v(" "),a("div",{staticClass:"songs__header__bg"})]),t._v(" "),a("section",{staticClass:"songs__songs-list"},[a("ul",{staticClass:"songs__songs-list__container"},t._l(t.songList,function(s,i){return a("li",{staticClass:"songs__songs-list__container__item",on:{click:function(a){t.chooseSong(s)}}},[a("span",{staticClass:"songs__songs-list__container__item__num f-16"},[t._v(t._s(i+1))]),t._v(" "),a("div",{staticClass:"songs__songs-list__container__item__info"},[a("h1",{staticClass:"f-16"},[t._v(t._s(s.data.songname))]),t._v(" "),a("p",{staticClass:"f-14"},[t._v(t._s(t._f("formatSinger")(s.data.singer[0].name,s.data.albumname,s.data.albumdesc)))])])])}))]),t._v(" "),a("div",{staticClass:"songs__choose"},[a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isChoose,expression:"isChoose"}],staticClass:"songs__choose__mask",on:{click:t.closeChooseSong}})]),t._v(" "),a("transition",{attrs:{name:"slide-fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isChoose,expression:"isChoose"}],staticClass:"songs__choose__main"},[a("header",{staticClass:"songs__choose__main__header"},[t.chooseItem?a("h3",{staticClass:"f-14"},[a("span",[t._v("歌曲：")]),t._v(" "+t._s(t.chooseItem.data.songname))]):t._e()]),t._v(" "),a("div",{staticClass:"songs__choose__main__btn-group f-14"},[a("a",{staticClass:"songs__choose__main__btn-group__toPlay",attrs:{href:"javascript:;"},on:{click:t.immediately}},[t._v("立即播放")]),t._v(" "),a("a",{staticClass:"songs__choose__main__btn-group__addPlayList",attrs:{href:"javascript:;"},on:{click:t.addToPlayList}},[t._v("加入播放列表")]),t._v(" "),a("a",{staticClass:"songs__choose__main__btn-group__close",attrs:{href:"javascript:;"},on:{click:t.closeChooseSong}},[t._v("关闭")])])])])],1)])},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("main",{staticClass:"home"},[a("header",{staticClass:"home__header f-16"},[t._v("x - music")]),t._v(" "),a("section",{staticClass:"home__section"},[a("ul",{staticClass:"home__section__list-container"},t._l(t.toplist,function(t,s){return a("list-item",{key:s,staticClass:"home__section__list-container__item",attrs:{listData:t}})}))])])},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"play-list"},[a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"play-list__mask",on:{click:t.closePlayList}})]),t._v(" "),a("transition",{attrs:{name:"slide-fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"play-list-container"},[a("header",{staticClass:"play-list-container__header"},[a("h3",{staticClass:"f-14"},[t._v("播放列表")]),t._v(" "),a("a",{staticClass:"play-list-container__header__btn",attrs:{href:"javascript:;"},on:{click:t.clearPlayList}},[t._v("清空")])]),t._v(" "),a("section",{staticClass:"play-list-container__content"},[t.playList?a("ul",{staticClass:"play-list-container__content__main"},t._l(t.playList,function(s,i){return a("li",{staticClass:"play-list-container__content__main__item",class:{"play-list-container__content__main__item--playing":s.data.songid==t.playingId},on:{click:function(a){t.immediately(s)}}},[a("h4",{staticClass:"f-14"},[t._v(t._s(s.data.songname)+" - "),a("span",[t._v(t._s(s.data.singer[0].name))])]),t._v(" "),a("a",{staticClass:"play-list-container__content__main__item__btn f-16",attrs:{href:"javascript:;"},on:{click:function(s){s.stopPropagation(),t.removeSong(i)}}},[t._v("x")])])})):t._e()])])])],1)},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"player"},[a("div",{staticClass:"player__bg"}),t._v(" "),a("div",{staticClass:"player__mask"}),t._v(" "),a("section",{staticClass:"player__content"},[t.playingInfo?a("header",{staticClass:"player__content__header"},[a("h3",{staticClass:"f-16"},[t._v(t._s(t.playingInfo.data.songname))]),t._v(" "),a("p",{staticClass:"f-14"},[t._v(t._s(t.playingInfo.data.singer[0].name))]),t._v(" "),a("a",{staticClass:"player__content__header__btn",attrs:{href:"javascript:;"},on:{click:t.closePlayer}})]):t._e(),t._v(" "),t._m(0),t._v(" "),a("footer",{staticClass:"player__content__footer"},[a("div",{staticClass:"player__content__footer__progress"},[a("div",{staticClass:"player__content__footer__progress__line"},[a("i",{style:{width:t.progress}})])]),t._v(" "),a("div",{staticClass:"player__content__footer__control"},[a("a",{staticClass:"player__content__footer__control__prev",attrs:{href:"javascript:;"},on:{click:t.prev}}),t._v(" "),a("a",{staticClass:"player__content__footer__control__play",class:{"player__content__footer__control__play--pause":!t.isPlaying,"player__content__footer__control__play--playing":t.isPlaying},attrs:{href:"javascript:;"},on:{click:t.controlPlay}}),t._v(" "),a("a",{staticClass:"player__content__footer__control__next",attrs:{href:"javascript:;"},on:{click:t.next}})]),t._v(" "),a("div",{staticClass:"player__content__footer__list"},[a("a",{staticClass:"player__content__footer__list__btn",attrs:{href:"javascript:;"},on:{click:t.showPlayList}},[a("i",{staticClass:"player__content__footer__list__btn__line"}),t._v(" "),a("i",{staticClass:"player__content__footer__list__btn__line"}),t._v(" "),a("i",{staticClass:"player__content__footer__list__btn__line"})])])])])])},staticRenderFns:[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"player__content__lyc"},[a("p",[t._v("暂不支持歌词显示")])])}]}},,,,,function(t,s){},function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a(16),e=a.n(i),n=a(17),o=a(42),l=a.n(o),r=a(40),c=a(43),_=a.n(c),u=a(41),p=a(39);n.a.use(_.a),n.a.config.productionTip=!1,e()(p).forEach(function(t){return n.a.filter(t,p[t])}),new n.a({el:"#app",router:r.a,store:u.a,template:"<App/>",components:{App:l.a}})}],[123]);
//# sourceMappingURL=app.afb0686ca80185cd8202.js.map
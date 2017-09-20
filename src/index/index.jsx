/**
 * Created by army8735 on 2017/9/11.
 */

import './index.html';
import '../zhuanquan/zhuanquan.html';
import '../follow/follow.html';
import '../find/find.html';
import '../my/my.html';
import '../search/search.html';
import './index.less';

import TopNav from '../component/topnav/TopNav.jsx';
import BotNav from '../component/botnav/BotNav.jsx';
import Follow from '../follow/Follow.jsx';
import ZhuanQuan from '../zhuanquan/ZhuanQuan.jsx';
import Find from '../find/Find.jsx';
import Search from '../search/Search.jsx';

let cur = (/^\/(\w+)/.exec(location.pathname) || [])[1];
if(!cur || cur === 'index' || cur === '') {
  cur = 'follow';
}

let topNav = migi.render(
  <TopNav/>,
  '#page'
);
let botNav = migi.render(
  <BotNav cur={ cur }/>,
  '#page'
);

let last;
let follow;
let zhuanQuan;
let find;
let search;

function alt(name, title) {
  if(title) {
    document.title = title;
  }
  if(last) {
    last.hide();
  }
  switch (name) {
    case 'follow':
      if(!follow) {
        follow = migi.render(
          <Follow/>,
          '#page'
        );
        follow.load();
      }
      last = follow;
      break;
    case 'zhuanquan':
      if(!zhuanQuan) {
        zhuanQuan = migi.render(
          <ZhuanQuan/>,
          '#page'
        );
        zhuanQuan.show();
      }
      last = zhuanQuan;
      break;
    case 'find':
      if(!find) {
        find = migi.render(
          <Find/>,
          '#page'
        );
        find.load();
      }
      last = find;
      break;
    case 'search':
      if(!search) {
        search = migi.render(
          <Search/>,
          '#page'
        );
        if(window.kw && window.kw.length) {
          search.load(window.kw);
        }
      }
      last = search;
      break;
    default:
      last = null;
      break;
  }
  if(last) {
    last.show();
  }
}

topNav.on('focus', function() {
  if(last && last !== search) {
    let state = {
      name: 'search',
      title: '搜索'
    };
    window.history.pushState(state, state.title, '/' + state.name);
    botNav.setCur();
    alt(state.name, state.title);
  }
});
topNav.on('search', function(kw) {
  window.kw = kw;
  let state = {
    name: 'search',
    title: '搜索'
  };
  window.history.pushState(state, state.title, '/' + state.name + '/');
  search.load(kw);
});
botNav.on('change', function(name, title) {
  let state = {
    name,
    title
  };
  window.history.pushState(state, state.title, '/' + state.name);
  alt(name, title);
});

window.addEventListener('popstate', function(e) {
  let state = e.state || {};
  let name = state.name;
  let title=  state.title;
  botNav.setCur(name);
  alt(name || 'follow', title);
});

alt(cur);

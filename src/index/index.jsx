/**
 * Created by army8735 on 2017/9/11.
 */

import './index.html';
import './zhuanquan.html';
import './follow.html';
import './find.html';
import './my.html';
import './search.html';
import './index.less';

import TopNav from '../component/topnav/TopNav.jsx';
import BotNav from '../component/botnav/BotNav.jsx';
import FindCard from './find/FindCard.jsx';
import SearchCard from './search/SearchCard.jsx';

let cur = /^\/(\w+)/.exec(location.pathname)[1];
if(cur === 'index' || cur === '') {
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
let findCard;
let searchCard;

function alt(name, title) {
  if(title) {
    document.title = title;
  }
  if(last) {
    last.hide();
  }
  switch (name) {
    case 'find':
      if(!findCard) {
        findCard = migi.render(
          <FindCard/>,
          '#page'
        );
        findCard.load();
      }
      last = findCard;
      break;
    case 'search':
      if(!searchCard) {
        searchCard = migi.render(
          <SearchCard/>,
          '#page'
        );
        if(window.kw && window.kw.length) {
          searchCard.load(window.kw);
        }
      }
      last = searchCard;
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
  if(last && last !== searchCard) {
    let state = {
      name: 'search',
      title: '搜索'
    };
    window.history.pushState(state, state.title, util.getUrl('/' + state.name));
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
  window.history.pushState(state, state.title, util.getUrl('/' + state.name + '/' + kw));
  searchCard.load(kw);
});
botNav.on('change', function(name, title) {
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

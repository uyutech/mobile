/**
 * Created by army8735 on 2017/9/11.
 */

import './zhuanquan.html';
import './follow.html';
import './find.html';
import './my.html';
import './index.less';

import BotNav from '../component/botnav/BotNav.jsx';
import FindCard from './find/FindCard.jsx';

let cur = /^\/(\w+)/.exec(location.pathname)[1];
if(cur === 'index' || cur === '') {
  cur = 'follow';
}

let botNav = migi.render(
  <BotNav cur={ cur }/>,
  '#page'
);

let last;
let findCard;

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
      }
      last = findCard;
      break;
    default:
      last = null;
      break;
  }
  if(last) {
    last.show();
  }
}
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

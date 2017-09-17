/**
 * Created by army8735 on 2017/9/11.
 */

import './index.html';
import './index.less';

import BottomNav from './BottomNav.jsx';
import FindCard from './find/FindCard.jsx';

let last;

let followCard, zhuanquanCard, findCard, myCard;

let bottomNav = migi.render(
  <BottomNav/>,
  '#page'
);

bottomNav.on('change', function(i) {
  last && last.hide();
  location.hash = i;
  switch (i) {
    case '0':
      if(!followCard) {
        followCard = migi.render(
          <FollowCard/>,
          '#page'
        );
      }
      last = followCard;
      break;
    case '1':
      if(!zhuanquanCard) {
        zhuanquanCard = migi.render(
          <ZhuanquanCard/>,
          '#page'
        );
      }
      last = zhuanquanCard;
      break;
    case '2':
      if(!findCard) {
        findCard = migi.render(
          <FindCard/>,
          '#page'
        );
      }
      last = findCard;
      break;
    case '3':
      if(!myCard) {
        myCard = migi.render(
          <MyCard/>,
          '#page'
        );
      }
      last = myCard;
      break;
  }
  last.show();
});

bottomNav.setCurrent(location.hash.replace(/^#/, '') || '2');

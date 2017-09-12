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
  document.body
);

bottomNav.on('change', function(i) {
  last && last.hide();
  location.hash = i;
  switch (i) {
    case '0':
      if(!followCard) {
        followCard = migi.render(
          <FollowCard/>,
          document.body
        );
      }
      last = followCard;
      break;
    case '1':
      if(!zhuanquanCard) {
        zhuanquanCard = migi.render(
          <ZhuanquanCard/>,
          document.body
        );
      }
      last = zhuanquanCard;
      break;
    case '2':
      if(!findCard) {
        findCard = migi.render(
          <FindCard/>,
          document.body
        );
      }
      last = findCard;
      break;
    case '3':
      if(!myCard) {
        myCard = migi.render(
          <MyCard/>,
          document.body
        );
      }
      last = myCard;
      break;
  }
  last.show();
});

bottomNav.setCurrent(location.hash.replace(/^#/, '') || '2');

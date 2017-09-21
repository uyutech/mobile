/**
 * Created by army8735 on 2017/9/18.
 */

import TopNav from '../component/topnav/TopNav.jsx';
import MLogin from '../component/mlogin/MLogin.jsx';

let topNav = migi.render(
  <TopNav/>,
  document.body
);
topNav.on('search', function(kw) {
  location.href = '/search/' + kw;
});

let mlogin;

migi.eventBus.on('NEED_LOGIN', function() {
  if(!mlogin) {
    mlogin = migi.render(
      <MLogin/>,
      document.body
    );
  }
  mlogin.show();
});

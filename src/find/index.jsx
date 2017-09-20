/**
 * Created by army8735 on 2017/9/20.
 */

import './find.html';
import './index.less';

import TopNav from '../component/topnav/TopNav.jsx';
import Find from './Find.jsx';

migi.render(
  <TopNav/>,
  document.body
);

let find = migi.render(
  <Find/>,
  '#page'
);
find.load();

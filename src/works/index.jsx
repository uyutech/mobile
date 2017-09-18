/**
 * Created by army8735 on 2017/9/11.
 */

import './works.html';
import './index.less';

import Works from './Works.jsx';
import MLogin from '../component/mlogin/MLogin.jsx';

let works = migi.render(
  <Works/>,
  '#page'
);

let mlogin = migi.render(
  <MLogin/>,
  document.body
);
mlogin.show();

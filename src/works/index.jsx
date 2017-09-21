/**
 * Created by army8735 on 2017/9/11.
 */

import './works.html';
import './index.less';

import Works from './Works.jsx';

let works = migi.render(
  <Works/>,
  '#page'
);

works.setID(window.$CONFIG.worksID);
works.load();

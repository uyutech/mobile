/**
 * Created by army8735 on 2017/9/21.
 */

import './search.html';
import './index.less';

import Search from './Search.jsx';

let search = migi.render(
  <Search/>,
  '#page'
);

if(window.kw && window.kw.length) {
  search.load(window.kw);
}
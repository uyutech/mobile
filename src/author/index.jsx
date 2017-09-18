/**
 * Created by army8735 on 2017/9/18.
 */

import './author.html';
import './index.less';

import Author from './Author.jsx';

let author = migi.render(
  <Author/>,
  '#page'
);

author.setID(window.authorID);

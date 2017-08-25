/**
 * Created by army8735 on 2017/8/25.
 */

import './res.html';
import './index.less';

let $pyq = $('#pyq');
let $share = $('#share');

$share.on('click', function() {
  $pyq.removeClass('fn-hide');
});
$pyq.on('click', function() {
  $pyq.addClass('fn-hide');
});

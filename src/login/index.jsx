/**
 * Created by army8735 on 2017/8/25.
 */

import './login.html';
import './index.less';

let $name = $('#name');
let $pass = $('#pass');
let $valid = $('#valid');
let $code = $('#code');
let $send = $('#send');
let $ok = $('#ok');
let sendDelay = 0;

$name[0].addEventListener('input', function() {
  let s = $name.val();
  if(s.length > 11) {
    $name.val(s.slice(0, 11));
  }
  check();
});
$pass[0].addEventListener('input', function() {
  check();
});
$code[0].addEventListener('input', function() {
  let s = $code.val();
  if(s.length > 6) {
    $code.val(s.slice(0, 6));
  }
  check();
});
$send.on('click', function() {
  if(!$send.hasClass('dis')) {
    $valid.removeClass('dis');
    $code[0].readOnly = false;
  }
});

function check() {
  let userNameText = $name.val();
  let userPassText = $pass.val();
  let valid = true;
  if(!/^1[356789]\d{9}$/.test(userNameText)) {
    valid = false;
  }
  if(valid) {
    if(userPassText.length < 6) {
      valid = false;
    }
  }
  if(valid) {
    if(sendDelay === 0) {
      $send.removeClass('dis');
    }
    else {
      $send.addClass('dis');
    }
  }
  else {
    $send.addClass('dis');
  }
  if(valid) {
    if($valid.hasClass('dis')) {
      valid = false;
    }
    else {
      let userValidText = $code.val();
      if(userValidText.length !== 6) {
        valid = false;
      }
    }
  }
  if(valid) {
    $ok.removeClass('dis');
  }
  else {
    $ok.addClass('dis');
  }
}


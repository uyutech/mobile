/**
 * Created by army8735 on 2017/9/15.
 */

import $ from 'anima-yocto-ajax';
import qs from 'anima-querystring';

export default {
  ajax: function(url, data, success, error, type) {
    // 兼容无host
    if (!/^http(s)?:\/\//.test(url)) {
      url = 'http://192.168.0.3:8080/' + url.replace(/^\//, '');
      // url = '/' + url.replace(/^\//, '');
    }
    // console.log('ajax: ' + url + ', ' + JSON.stringify(data));
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        timeout: 6000,
        type: type || 'get',
        // ajax 跨域设置必须加上
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
        },
        success: function (data, state, xhr) {
          success(data, state, xhr);
        },
        error: function (data) {
          // console.error('ajax error: ' + url + ', ' + JSON.stringify(data));
          if(!error.__hasExec) {
            error.__hasExec = true;
            error(data || {});
          }
        }
      });
    }
    return load();
  },
  getUrl: function(url) {
    if(/^\/works\/v\d+\/\d+$/.test(url)) {
      let id = /^\/works\/v\d+\/(\d+)$/.exec(url)[1];
      url = 'works.html?' + id;
    }
    else if(/^\/author\/v\d+\/\d+$/.test(url)) {
      let id = /^\/author\/v\d+\/(\d+)$/.exec(url)[1];
      url = 'author.html?' + id;
    }
    else if(/^\/(?:follow)|(?:zhuanquan)|(?:find)|(?:my)$/.test(url)) {
      let name = /^\/(?:follow)|(?:zhuanquan)|(?:find)|(?:my)$/.exec(url)[0];
      url = name + '.html';
    }
    else if(/^\/search(\/.*)?/.test(url)) {
      let kw = /^\/search(\/.*)?/.exec(url)[1] || '';
      url = 'search.html?' + kw.slice(1);
    }
    return url;
  }
};

let url = location.href;
if(/\/works\.html\?\d+$/.test(url)) {
  let id = /\/works\.html\?(\d+)$/.exec(url)[1];
  window.workID = id;
}
else if(/\/author\.html\?\d+$/.test(url)) {
  let id = /\/author\.html\?(\d+)$/.exec(url)[1];
  window.authorID = id;
}
else if(/\/search\.html\?(.*)$/.test(url)) {
  let kw = /\/search\.html\?(.*)$/.exec(url)[1];
  window.kw = decodeURIComponent(kw);
}

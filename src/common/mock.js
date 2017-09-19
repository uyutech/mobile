/**
 * Created by army on 2017/6/2.
 */

export default {
  ajax: function(url, data, success, error) {
    setTimeout(function() {
      url = url.replace(/\.json$/, '.js');
      let res = require('../../mock/' + url);
      console.log(res.default || res);
      success(res.default || res);
    }, 20);
  },
  goto: function(url) {
    if(/^\/works\/v\d+\/\d+$/.test(url)) {
      let id = /^\/works\/v\d+\/(\d+)$/.exec(url);
      url = 'works.html?' + id;
    }
    else if(/^\/author\/v\d+\/\d+$/.test(url)) {
      let id = /^\/author\/v\d+\/(\d+)$/.exec(url);
      url = 'author.html?' + id;
    }
    location.href = url;
  }
};

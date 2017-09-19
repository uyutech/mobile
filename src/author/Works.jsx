/**
 * Created by army on 2017/6/24.
 */

import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

let last = '';
let ajax;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.authorID = -1;
    self.on(migi.Event.DOM, function() {
      self.ref.doubleCheck.on('change', function(lA, lB) {
        let Parameter = lA.concat(lB);
        Parameter = Parameter.length ? JSON.stringify(Parameter) : '';
        if(last !== Parameter) {
          last = Parameter;
          if(ajax) {
            ajax.abort();
          }
          ajax = util.postJSON('author/SearchWorks', { AuthorID: self.authorID, Parameter, Skip: 1, Take: 10 }, function(res) {
            if(res.success) {
              let data = res.data;
              self.ref.playList.setData(data.data);
            }
          });
        }
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load(authorID) {
    let self = this;
    self.authorID = authorID;
    util.postJSON('author/GetAuthorWorks', { AuthorID: authorID }, function (res) {
      if(res.success) {
        let data = res.data;
        self.ref.doubleCheck.setData(data);
      }
    });
    ajax = util.postJSON('author/SearchWorks', { AuthorID: authorID, Parameter: '', Skip: 1, Take: 10 }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.playList.setData(data.data);
      }
    });
  }
  render() {
    return <div class="works fn-hide">
      <DoubleCheck ref="doubleCheck"/>
      <PlayList ref="playList"/>
    </div>;
  }
}

export default Works;

/**
 * Created by army8735 on 2017/9/18.
 */

import Media from './Media.jsx';
import Intro from './Intro.jsx';
import WorkComment from './WorkComment.jsx';

let ajax;
let barrageTime = 0;

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      self.setId(window.workID);
    });
  }
  @bind hasContent
  @bind loading
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind workID
  @bind subWorkID
  setId(workID) {
    let self = this;
    self.workID = workID;
    let media = self.ref.media;
    let intro = self.ref.intro;
    let workComment = self.ref.workComment;
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('works/GetWorkDetails', { WorksID: workID }, function(res) {
      if(res.success) {
        let data = res.data;
        media.setCover(data.cover_Pic);
        media.setWorks(data.Works_Items);
        media.popular = data.Popular;
        intro.tags = data.ReturnTagData || [];
        $(self.ref.form.element).removeClass('fn-hide');
      }
      else {
        alert(res.message);
      }
    });
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
  }
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
  }
  focus() {
    if(window.IS_LOGIN !== 'True') {
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  click(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let Content = $input.val();
      let ParentID = self.replayId !== null ? self.replayId : -1;
      let RootID = self.rootId !== null ? self.rootId : -1;
      self.loading = true;
      self.ref.media.switchTo(1);
      util.postJSON('works/AddComment', {
        ParentID,
        RootID,
        Content,
        subWorkID: self.subWorkID,
        BarrageTime: barrageTime
      }, function(res) {
        if(res.success) {
          self.ref.workComment.element.scrollIntoView();
          $input.val('');
          self.hasContent = false;
          if(RootID === -1) {
            self.ref.workComment.ref.comment.addNew(res.data);
            self.ref.workComment.ref.comment.message = '';
          }
          else {
            self.ref.workComment.ref.comment.addChild(res.data);
          }
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }
  render() {
    return <div class="works">
      <Media ref="media"/>
      <Intro ref="intro"/>
      <WorkComment ref="workComment"/>
      <div class="form fn-hide" ref="form">
        <div class="c">
          <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
          <div class="inputs">
            <input ref="input" type="text" placeholder="回复..." onInput={ this.input } onFocus={ this.focus }/>
          </div>
          <button onClick={ this.click } class={ this.hasContent && !this.loading ? '' : 'dis' }>确定</button>
        </div>
      </div>
    </div>;
  }
}

export default Works;

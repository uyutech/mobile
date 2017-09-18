/**
 * Created by army8735 on 2017/9/18.
 */

import Media from './Media.jsx';
import Intro from './Intro.jsx';
import WorkComment from './WorkComment.jsx';

class Works extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let media = self.ref.media;
      let intro = self.ref.intro;
      let workComment = self.ref.workComment;
      util.postJSON('works/GetWorkDetails', { WorksID: window.workID }, function(res) {
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
    });
  }
  @bind hasContent
  @bind loading
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

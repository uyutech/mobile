/**
 * Created by army on 2017/7/1.
 */

class PlayList extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  setData(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genItem(item);
    });
    $(self.ref.list.element).html(s);
  }
  appendData(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genItem(item);
    });
    $(self.ref.list.element).append(s);
  }
  genItem(item) {
    return <li>
      <div workId={ item.WorksID } class="pic" style={ `background:url(${item.cover_Pic})` }/>
      <div class="txt" workId={ item.WorksID }>
        <div class="name">{ item.Title }</div>
        <p class="intro">{ item.sub_Title }</p>
      </div>
    </li>;
      //{
        // item.type.map(function(item2) {
        //   return <b class={ item2 }/>;
        // })
      //}
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
  }
  click(e, vd, tvd) {
    let id = tvd.props.workId;
    location.href = 'works.html';
  }
  render() {
    return <div class="cp_playlist">
      <div class="bar">
        <ul class="btn fn-clear">
          <li class="all">播放全部</li>
          <li class="audio"></li>
          <li class="video"></li>
        </ul>
        <ul class="type fn-clear" onClick={ this.switchType }>
          <li class="cur">最热</li>
          <li>最新</li>
        </ul>
      </div>
      <ul class="list" ref="list" onClick={ { '.pic': this.click, '.txt': this.click } }/>
    </div>;
  }
}

export default PlayList;

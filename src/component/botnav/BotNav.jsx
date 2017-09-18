/**
 * Created by army8735 on 2017/9/17.
 */

let hasOnLoad;
window.addEventListener('load', function() {
  hasOnLoad = true;
});

class BotNav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      this.setCur(this.props.cur);
    });
  }
  click(e, vd, tvd) {
    let name = tvd.props.rel;
    if(name) {
      this.setCur(name);
      let title = $(tvd.element).find('span').text();
      window.history.pushState({
        name,
        title,
      }, title, name + '.html');
      this.emit('change', name, title);
    }
  }
  setCur(name) {
    let $root = $(this.element);
    if(!name) {
      $root.find('.cur').removeClass('cur');
      return;
    }
    let $elem = $root.find(`li[rel="${name}"]`);
    if($elem.hasClass('cur')) {
      return;
    }
    $root.find('.cur').removeClass('cur');
    $elem.addClass('cur');
  }
  render() {
    return <div class="bot_nav" onClick={ { li: this.click } }>
      <ul>
        <li class="follow" rel="follow">
          <b class="icon"/>
          <span>关注</span>
        </li>
        <li class="zhuanquan" rel="zhuanquan">
          <b class="icon"/>
          <span>转圈</span>
        </li>
        <li class="logo">
          <b class="icon"/>
        </li>
        <li class="find" rel="find">
          <b class="icon"/>
          <span>发现</span>
        </li>
        <li class="my" rel="my">
          <b class="icon"/>
          <span>我的</span>
        </li>
      </ul>
    </div>;
  }
}

export default BotNav;

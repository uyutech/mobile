/**
 * Created by army8735 on 2017/9/17.
 */

class BotNav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      this.setCurrent(this.props.cur);
    });
  }
  click(e, vd, tvd) {
    this.setCur(tvd.props.class);
  }
  cur($elem) {
    if(!$elem || !$elem[0]) {
      $(this.element).find('.cur').removeClass('cur');
      return;
    }
    if($elem.hasClass('cur')) {
      return;
    }
    $(this.element).find('.cur').removeClass('cur');
    $elem.addClass('cur');
    this.emit('change', $elem[0].className);
  }
  setCurrent(cn) {
    if(cn) {
      this.cur($(this.element).find(`li[class="${cn}"]`));
    }
    else {
      this.cur();
    }
  }
  render() {
    return <div class="bot_nav" onClick={ { li: this.click } }>
      <ul>
        <li class="follow">
          <b class="icon"/>
          <span>关注</span>
        </li>
        <li class="zhuanquan">
          <b class="icon"/>
          <span>转圈</span>
        </li>
        <li class="new cur">
          <b class="icon"/>
        </li>
        <li class="find">
          <b class="icon"/>
          <span>发现</span>
        </li>
        <li class="my">
          <b class="icon"/>
          <span>我的</span>
        </li>
      </ul>
    </div>;
  }
}

export default BotNav;

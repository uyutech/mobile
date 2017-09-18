/**
 * Created by army8735 on 2017/9/14.
 */

class NeedLogin extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  clickClose(e) {
    e.preventDefault();
    this.hide();
  }
  @bind message
  render() {
    return <div class="cp-mlogin fn-hide">
      <div class="c">
        <p>{ this.message || '您还没有登录，不能进行相关操作噢~' }</p>
        <p>或选择 <a href={ window.LOGIN_URL }>立即登录</a></p>
        <a href={ window.LOGIN_URL } class="weibo"/>
        <a href="#" class="close" onClick={ this.clickClose }/>
      </div>
    </div>;
  }
}

export default NeedLogin;

/**
 * Created by army8735 on 2017/9/19.
 */

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  focus() {
    this.emit('focus');
  }
  click() {
    this.ref.form.element.submit();
  }
  submit(e) {
    e.preventDefault();
    let v = this.ref.input.element.value;
    this.emit('search', v);
  }
  render() {
    return <div class="top-nav">
      <b class="logo"/>
      <a href="#" class="search">搜索</a>
      <div class="user">
        <span>用户名</span>
        <img src={ '//zhuanquan.xyz/img/blank.png' }/>
      </div>
    </div>;
  }
}

export default TopNav;

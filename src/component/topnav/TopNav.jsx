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
      <form class="form" ref="form" onSubmit={ this.submit }>
        <input ref="input" type="text" maxlength="16" placeholder="新歌《燃尽人间色发布》" value={ window.kw || '' } onFocus={ this.focus }/>
      </form>
      <button onClick={ this.click }>确认</button>
      <b class="comment"/>
    </div>;
  }
}

export default TopNav;

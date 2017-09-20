/**
 * Created by army8735 on 2017/9/20.
 */

class ZhuanQuan extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
    this.list = [];
  }
  load() {}
  render() {
    return <div class="zhuanquan"></div>;
  }
}

export default ZhuanQuan;

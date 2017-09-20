/**
 * Created by army8735 on 2017/9/20.
 */

import Carousel from './Carousel.jsx';
import FollowList from './FollowList.jsx';

class Follow extends migi.Component {
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
    return <div class="follow fn-hide">
      <Carousel ref="carousel"/>
      <FollowList ref="followList"/>
    </div>;
  }
}

export default Follow;

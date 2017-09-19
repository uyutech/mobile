/**
 * Created by army on 2017/6/18.
 */
 
import Banner from './Banner.jsx';
import DoubleCheck from '../../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../../component/playlist/PlayList.jsx';

class FindCard extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load() {
    let self = this;
    util.postJSON('search/Homesearch', {}, function(res) {
      if(res.success) {
        let data = res.data;
        // self.ref.doubleCheck.setData(data);
      }
      else {}
    });
  }
  render() {
    return <div class="find_card fn-hide">
      <Banner/>
      <DoubleCheck ref="doubleCheck"/>
      <PlayList/>
    </div>;
  }
}

export default FindCard;

/**
 * Created by army on 2017/6/18.
 */
 
import Banner from './Banner.jsx';
import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
import PlayList from '../component/playlist/PlayList.jsx';

class Find extends migi.Component {
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
    util.postJSON('find/GetTag', { Skip:0, Take: 10 }, function(res) {
      if(res.success) {
        let data = res.data;
        // self.ref.doubleCheck.setData(data);
      }
      else {}
    });
  }
  render() {
    return <div class="find fn-hide">
      <Banner/>
      <DoubleCheck ref="doubleCheck"/>
      <PlayList/>
    </div>;
  }
}

export default Find;

/**
 * Created by army8735 on 2017/9/20.
 */

import Profile from './Profile.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import Types from './Types.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  load() {
    let self = this;
    util.postJSON('api/users/GetLikeAuthorList', function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.hotAuthor.dataList = data;
        self.ref.hotAuthor.autoWidth();
      }
    });
    util.postJSON('api/users/GetLikeWorksList', function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.hotWork.dataList = data;
        self.ref.hotWork.autoWidth();
      }
    });
  }
  clickOut(e) {
    e.preventDefault();
    util.postJSON('api/users/Cancellation', function(res) {
      location.reload(true);
    });
  }
  render() {
    return <div class="my">
      <Profile/>
      <HotAuthor ref="hotAuthor" title="我的关注"/>
      <HotWork ref="hotWork" title="我的收藏"/>
      <a href="#" class={ 'logout' + (window.$CONFIG.isLogin ? '' : ' fn-hide') } onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;

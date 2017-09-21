/**
 * Created by army8735 on 2017/9/20.
 */

import Profile from './Profile.jsx';
import Types from './Types.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="my">
      <Profile/>
      <p class="sign">签名</p>
      <Types/>
      <a href="#" class="logout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;

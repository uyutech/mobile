/**
 * Created by army on 2017/6/24.
 */

import HotWork from '../component/hotwork/HotWork.jsx';
import HotCollection from '../component/hotcollection/HotCollection.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import Dynamic from '../component/dynamic/Dynamic.jsx';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="home">
      <HotWork ref="hotWork" title="热门作品"/>
      <HotCollection ref="hotCollection" title="热门专辑"/>
      <HotAuthor ref="hotAuthor" title="关系"/>
      <h5 class="dynamic">作者动态</h5>
      <Dynamic/>
    </div>;
  }
}

export default Home;

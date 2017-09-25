/**
 * Created by army on 2017/6/18.
 */
 
class Banner extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="banner">
      <a href="/works/2015000000000001"><img src="http://zhuanquan.xyz/pic/47d15679d3e6883acacdbcd85f2ebe85.jpg"/></a>
    </div>;
  }
}

export default Banner;

/**
 * Created by army on 2017/7/16.
 */
 
class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  click(e, vd, tvd) {
    let $tvd = $(tvd.element);
    if($tvd.hasClass('alt')) {
      // $(vd.element).find('.card').toggleClass('alt');
    }
  }
  clickEdit(e) {
    e.preventDefault();
    let name = window.prompt('请输入想要修改的昵称', window.$CONFIG.userName).trim();
    if(name !== window.$CONFIG.userName) {
      alert(name);
    }
  }
  render() {
    return <div class="profile" onClick={ { '.card': this.click } }>
      <div class="bg"/>
      <div class="card">
        <img class="pic" src={ window.$CONFIG.userPic || '//zhuanquan.xyz/img/blank.png' }/>
        <div class="con">
          <h3>{ window.$CONFIG.userName || '--' }<a href="#" class="edit" onClick={ this.clickEdit }>编辑</a></h3>
        </div>
      </div>
    </div>;
  }
}

export default Profile;

/**
 * Created by army8735 on 2017/9/18.
 */

import Nav from './Nav.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  setID(authorId) {
    let self = this;
    let nav = self.ref.nav;
    let profile = nav.ref.profile;
    let link = nav.ref.link;
    util.postJSON('author/GetAuthorDetails', { AuthorID: authorId }, function (res) {
      if(res.success) {
        let data = res.data;

        profile.headUrl = data.Head_url;
        profile.authorID = data.AuthorID;
        profile.authorName = data.AuthorName;
        profile.type = data.Authortype;
        profile.sign = data.Sign;
        profile.fansNumber = data.FansNumber;
        profile.isLike = data.IsLike;
        profile.loading = false;

        link._5SingUrl = data._5SingUrl;
        link._BilibiliUrl = data._BilibiliUrl;
        link._BaiduUrl = data._BaiduUrl;
        link._WangyiUrl = data._WangyiUrl;
        link._WeiboUrl = data._WeiboUrl;
        link.autoWidth();
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="author">
      <Nav ref="nav"/>
    </div>;
  }
}

export default Author;

/**
 * Created by army8735 on 2017/9/19.
 */
import authorTemplate from '../component/author/authorTemplate';

class Search extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind list = []
  @bind message
  @bind kw
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
    this.list = [];
  }
  load(kw) {
    let self = this;
    self.kw = kw;
    util.postJSON('api/search/Homesearch', { Parameter: kw }, function(res) {
      if(res.success) {
        let data = res.data;
        let list = [];
        data.Author.forEach(function(item) {
          list.push({
            key: 'author',
            value: item
          });
        });
        if(list.length) {
          self.list = list;
          self.autoWidth();
        }
        else {
          self.message = '暂无搜索结果';
        }
      }
    });
  }
  autoWidth() {
    $(this.element).find('li.author .list').each(function(i, o) {
      let $o = $(o);
      let $c = $o.find('.c');
      $c.css('width', '9999rem');
      let $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    });
  }
  render() {
    let self = this;
    return <div class="search">
      <ul class={ this.list.length ? '' : 'fn-hide' }>
        {
          this.list.map(function(item) {
            let key = item.key;
            let value = item.value;
            if(key === 'author') {
              let name = value.AuthorName || '';
              let i = name.indexOf(self.kw);
              if(i > -1) {
                name = migi.util.encodeHtml(name.slice(0, i))
                  + '<strong>' + name.slice(i, i + self.kw.length) + '</strong>'
                  + migi.util.encodeHtml(name.slice(i + self.kw.length));
              }
              else {
                name = migi.util.encodeHtml(name);
              }
              let hash = {};
              value.Authortype.forEach(function(item) {
                let css = authorTemplate(item.AuthorTypeID).css;
                hash[css] = true;
              });
              let authorType = Object.keys(hash);
              return <li class="author">
                <img class="pic" src={ value.Head_url || '//zhuanquan.xyz/img/blank.png' }/>
                <div class="info">
                  <div class="name">
                    <h4 dangerouslySetInnerHTML={ name }/>
                    {
                      authorType.map(function(item) {
                        return <span class={ `cp-author-type-${item}` }/>;
                      })
                    }
                  </div>
                  <p>粉丝：{ value.FansNumber }</p>
                </div>
                <div class="works">
                  <h5>代表作</h5>
                  <div class="list">
                    <div class="c">
                      <ul>
                        <li><a href="#">123</a></li>
                        <li><a href="#">123</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>;
            }
            return <li>
              123
            </li>;
          })
        }
      </ul>
      <div class={ 'message' + (this.list.length ? ' fn-hide' : '') }>{ this.message }</div>
    </div>;
  }
}

export default Search;

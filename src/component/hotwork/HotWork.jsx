/**
 * Created by army8735 on 2017/8/8.
 */

import AuthorType from '../author/AuthorType.jsx';

class HotWork extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind dataList = []
  autoWidth() {console.log(1);
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  click(e, vd, tvd) {
    let worksID = tvd.props.worksID;
    if(worksID) {
      util.goto('/works/' + worksID);
    }
  }
  render() {
    let authorId = this.props.authorId;
    return <div class="cp-hotwork">
      <h3>{ this.props.title }</h3>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul onClick={ { li: this.click } }>
                {
                  this.dataList.map(function(item) {
                    // let myAuthor;
                    // let workAuthors = '';
                    // let authorList = item.Works_Items[0].Works_Item_Author;
                    // authorList.forEach(function(item) {
                    //   if(item.ID === authorId) {
                    //     myAuthor = item;
                    //   }
                    // });
                    // if(myAuthor) {
                    //   // 如果是歌手，将其它歌手&链接并加上with
                    //   if(myAuthor.WorksAuthorType === AuthorType.CODE.演唱) {
                    //     let authors = [];
                    //     authorList.forEach(function(item) {
                    //       if(item.ID !== authorId) {
                    //         authors.push(item.AuthName);
                    //       }
                    //     });
                    //     if(authors.length) {
                    //       workAuthors = 'with ' + authors.join('&');
                    //     }
                    //   }
                    //   // 其它类型将歌手全部展示
                    //   else {
                    //     let authors = [];
                    //     authorList.forEach(function(item) {
                    //       if(item.ID !== authorId) {
                    //         authors.push(item.AuthName);
                    //       }
                    //     });
                    //     if(authors.length) {
                    //       workAuthors = authors.join('&');
                    //     }
                    //   }
                    // }
                    // // 其它类型将歌手全部展示
                    // else {
                    //   let authors = [];
                    //   authorList.forEach(function(item) {
                    //     if(item.AuthorID !== authorId) {
                    //       authors.push(item.AuthName);
                    //     }
                    //   });
                    //   if(authors.length) {
                    //     workAuthors = authors.join('&');
                    //   }
                    // }
                    return <li worksID={ item.WorksID }>
                      <div class="pic">
                        <img src={ item.cover_Pic || '//zhuanquan.xyz/img/blank.png' }/>
                        <div class="num"><b class="audio"/>{ item.Popular }</div>
                        <div class="ath">{ '' }</div>
                      </div>
                      <p class="txt">{ item.Title }</p>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty"/>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotWork;

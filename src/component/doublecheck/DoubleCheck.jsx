/**
 * Created by army8735 on 2017/9/19.
 */

import authorTemplate from '../author/authorTemplate';

let choosedL2 = {};

class DoubleCheck extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  get tagList() {
    return this._tagList || [];
  }
  @bind
  set tagList(v) {
    this._tagList = v;
    let list = [];
    let hash = {};
    v.forEach(function(item) {
      item.FilterlevelB.forEach(function(item2) {
        let key = 'id' + item2.ID + ',type' + item2.TagType;
        if(!hash.hasOwnProperty(key)) {
          hash[key] = true;
          list.push(item2);
        }
      });
    });
    this.tagList2 = list;
    this.autoWidth2();
  }
  get tagList2() {
    return this._tagList2 || [];
  }
  @bind
  set tagList2(v) {
    this._tagList2 = v;
  }
  setData(v) {
    this.tagList = v;
    this.autoWidth();
  }
  clickL1(e, vd, tvd) {
    e.preventDefault();
    let $ul = $(vd.element);
    let $li = $(tvd.element);
    $li.toggleClass('on');
    let $lis = $ul.find('.on');
    let list = [];
    let hash = {};
    // 都没选为全部
    if(!$lis[0]) {
      this.tagList.forEach(function(item) {
        item.FilterlevelB.forEach(function(item2) {
          let key = 'id' + item2.ID + ',type' + item2.TagType;
          if(!hash.hasOwnProperty(key)) {
            hash[key] = true;
            list.push(item2);
          }
        });
      });
    }
    else {
      let choosed = {};
      $lis.each(function(index, li) {
        choosed[$(li).attr('rel')] = true;
      });
      this.tagList.forEach(function(item, i) {
        if(choosed.hasOwnProperty(i)) {
          item.FilterlevelB.forEach(function(item2) {
            let key = 'id' + item2.ID + ',type' + item2.TagType;
            if(!hash.hasOwnProperty(key)) {
              hash[key] = true;
              list.push(item2);
            }
          });
        }
      });
    }
    // 和上次没变化不改变
    let hasChange = false;
    if(list.length !== this.tagList2.length) {
      hasChange = true;
    }
    else {
      for(let i = 0, len = list.length; i < len; i++) {
        if(list[i].ID !== this.tagList2[i].ID && list[i].TagType !== this.tagList2[i].TagType) {
          hasChange = true;
          break;
        }
      }
    }
    if(hasChange) {
      this.tagList2 = list;
      this.autoWidth2();
      this.checkL2();
      this.change();
    }
  }
  clickL2(e, vd, tvd) {
    e.preventDefault();
    let key = 'id' + tvd.props.id + ',type' + tvd.props.tagType;
    let $li = $(tvd.element);
    choosedL2[key] = !$li.hasClass('on');
    this.tagList2 = this.tagList2;
    this.change();
  }
  checkL2() {
    // 遍历l2标签，chossed中没有的删除
    let hash = {};
    this.tagList2.forEach(function(item) {
      let key = 'id' + item.ID + ',type' + item.TagType;
      hash[key] = true;
    });
    Object.keys(choosedL2).forEach(function(key) {
      if(!hash[key]) {
        choosedL2[key] = false;
      }
    });
  }
  change() {
    let self = this;
    let $lis = $(self.ref.l1.element).find('li.on');
    let lA = [];
    $lis.each(function(i, li) {
      let index = $(li).attr('rel');
      let item = self.tagList[index];
      lA.push({
        ID: item.ID,
        TagType: 0,
        Filterlevel: 'A',
      });
    });
    let lB = [];
    this.tagList2.forEach(function(item) {
      let key = 'id' + item.ID + ',type' + item.TagType;
      if(choosedL2[key]) {
        lB.push({
          ID: item.ID,
          TagType: item.TagType,
          Filterlevel: item.Filterlevel,
        });
      }
    });
    this.emit('change', lA, lB);
  }
  autoWidth() {
    let $li = $(this.ref.l1.element);
    let $c = $li.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  autoWidth2() {
    let $li = $(this.ref.l2.element);
    let $c = $li.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp_doublecheck">
      <div class="l1" ref="l1" onClick={ { li: this.clickL1 } }>
        <div class="c">
          <ul>
            {
              this.tagList.map(function(item, i) {
                return <li rel={ i }><a href="#"><span>{ authorTemplate(item.ID).name }</span></a></li>;
              })
            }
          </ul>
        </div>
      </div>
      <div class="l2" ref="l2" onClick={ { li: this.clickL2 } }>
        <div class="c">
          <ul>
            {
              this.tagList2.map(function(item) {
                let key = 'id' + item.ID + ',type' + item.TagType;
                return <li tagType={ item.TagType } id={ item.ID } class={ choosedL2[key] ? 'on' : '' }><a href="#"><span>{ item.TagName }</span></a></li>;
              })
            }
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default DoubleCheck;

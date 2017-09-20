/**
 * Created by army on 2017/5/21.
 */

let screenWidth = $(window).width();
let itemWidth;
let isStart;
let isMove;
let startX;
let startY;
let endX;
let endY;
let curX = 0;
let lastCur = 0;

class Carousel extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  @bind list = []
  init() {
    let screen = this.ref.screen;
    let $screen = $(screen.element);
    let $ul = this.$ul = $screen.find('ul');
    let $lis = this.$lis = $ul.find('li');
    itemWidth = $lis.eq(0).width();
    $screen.css('-webkit-transform', `translateX(${(screenWidth - itemWidth) / 2}px)`);
    $screen.css('transform', `translateX(${(screenWidth - itemWidth) / 2}px)`);
    $lis.eq(0).addClass('cur');

    let tag = this.ref.tag;
    let $tag = $(tag.element);
    let $tagLis = $tag.find('li');
    this.on('change', function(i) {
      $tag.find('li').removeClass('cur');
      $tag.find('li').eq(i).addClass('cur');
    });
    $tagLis.eq(0).addClass('cur');
  }
  start(e) {
    if(this.$ul) {
      this.$lis = this.$ul.find('li');
      if(e.touches.length !== 1) {
        isStart = false;
      }
      else {
        isStart = true;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        this.$ul.addClass('no_trans');
      }
    }
  }
  move(e) {
    if(isMove) {
      e.preventDefault();
      endX = e.touches[0].pageX;
      let diffX = endX - startX;
      this.$ul.css('-webkit-transform', `translate3d(${curX + diffX}px, 0, 0)`);
      this.$ul.css('transform', `translate3d(${curX + diffX}px, 0, 0)`);
    }
    else if(isStart) {
      endX = e.touches[0].pageX;
      endY = e.touches[0].pageY;
      let diffX = endX - startX;
      let diffY = endY - startY;
      if(Math.abs(diffY) < Math.abs(diffX)) {
        e.preventDefault();
        isMove = true;
        this.$ul.css('-webkit-transform', `translate3d(${curX + diffX}px, 0, 0)`);
        this.$ul.css('transform', `translate3d(${curX + diffX}px, 0, 0)`);
        // jsBridge.swipeRefresh(false);
      }
      else {
        isStart = false;
      }
    }
  }
  end(e) {
    if(isMove) {
      let itemLength = this.list.length;
      isStart = false;
      isMove = false;
      curX += endX - startX;
      if(curX >= -itemWidth / 2) {
        curX = 0;
        if(lastCur !== 0) {
          this.$lis.removeClass('cur');
          this.$lis.eq(0).addClass('cur');
          lastCur = 0;
          this.emit('change', lastCur);
        }
      }
      else if(curX < -itemWidth * (itemLength - 1)) {
        curX = -itemWidth * (itemLength - 1);
        if(lastCur !== itemLength - 1) {
          this.$lis.removeClass('cur');
          this.$lis.eq(itemLength - 1).addClass('cur');
          lastCur = itemLength - 1;
          this.emit('change', lastCur);
        }
      }
      else {
        let i = Math.abs(Math.round(curX / itemWidth));
        curX = -itemWidth * i;
        if(lastCur !== i) {
          this.$lis.removeClass('cur');
          this.$lis.eq(i).addClass('cur');
          lastCur = i;
          this.emit('change', lastCur);
        }
      }
      this.$ul.removeClass('no_trans');
      this.$ul.css('-webkit-transform', `translate3d(${curX}px, 0, 0)`);
      this.$ul.css('transform', `translate3d(${curX}px, 0, 0)`);
    }
    // jsBridge.swipeRefresh(true);
  }
  click(e, vd, tvd) {
    e.preventDefault();
    let href = tvd.props.href;
    if(href && href !== '#') {
      jsBridge.pushWindow(href, {
        transparentTitle: true,
        titleBgColor: '#99000000'
      });
    }
  }
  render() {
    return <div class="carousel" onTouchStart={ this.start } onTouchMove={ this.move } onTouchEnd={ this.end } onTouchCancel={ this.end }>
      <div class="screen" ref="screen" onClick={ { 'a': this.click } }>
        <ul class="fn-clear">
          {
            this.list.map(function(item) {
              if(item.Tag_Pic) {
                return <li><a href="work.html?id=1" style={ `background:url(${item.Tag_Pic}) no-repeat center` }/></li>;
              }
              return <li><a href={ `work.html?id=${item.ID}` }/></li>;
            })
          }
        </ul>
      </div>
      <div class="tag" ref="tag">
        <ul>
          {
            this.list.map(function(item, i) {
              return <li>{ i }</li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
}

export default Carousel;

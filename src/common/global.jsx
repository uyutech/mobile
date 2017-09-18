/**
 * Created by army8735 on 2017/9/18.
 */

let mlogin;

migi.eventBus.on('NEED_LOGIN', function() {
  if(!mlogin) {
    mlogin = migi.render(
      <MLogin/>,
      document.body
    );
  }
  mlogin.show();
});

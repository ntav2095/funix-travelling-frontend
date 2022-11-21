export function LiveChat() {
  // if (window.FB) {
  //   window.FB.XFBML.parse();
  // }
  var chatbox = document.getElementById("fb-customer-chat");
  chatbox.setAttribute("page_id", "107830641531056");
  chatbox.setAttribute("attribution", "biz_inbox");

  window.fbAsyncInit = function () {
    window.FB.init({
      xfbml: true,
      version: "v15.0",
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

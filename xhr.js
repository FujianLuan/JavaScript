function getXHR(){
  var xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) { 
        alert("您的浏览器暂不支持Ajax!");
      }
    }
  }
  return xhr;
}
function request(serverUrl)
{
    var xhr = getXHR();

    //DO SOME THING
    xhr.open( "GET", serverUrl, false );
    xhr.send( null );
    return xhr.responseText;

};
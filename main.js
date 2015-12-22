(function() {
  // <html> を clone
  var html = document.getElementsByTagName('html')[0].cloneNode(true);
  var tmp  = document.createElement('div').appendChild(html);

  // href や src に指定されたURLを絶対パスに変換
  var nodes = tmp.querySelectorAll('[href],[src]');
  for (var i=0, n=nodes.length; i<n; i++) {
    if (nodes[i].href) { nodes[i].href=nodes[i].href; }
    if (nodes[i].src) { nodes[i].src=nodes[i].src; }

    console.log('href: ' + nodes[i].href + ', src: ' + nodes[i].src);
  }

  // ソースコードをテキストで取得
  var src = tmp.innerHTML;
  console.log(src.slice(0, 5000));

  // ソースコードを Blob オブジェクトに変換してURLを取得
  var blob    = new Blob([src]);
  var url     = window.URL || window.webkitURL;
  var blobURL = url.createObjectURL(blob);

  // <a> を新たに作成し、ダウンロード用の設定をいろいろ
  var a = document.createElement('a');
  // URI を元にダウンロード時のファイル名を決定
  a.download = decodeURI(location.pathname+location.hash).replace(/\//g,'__').replace(/#/g,'--') + '.html';
  a.href     = blobURL;

  a.click();
})();

(function() {
  // <html> を clone
  var html = document.getElementsByTagName('html')[0].cloneNode(true);

  // href や src に指定されたURLを絶対パスに変換
  var nodes = html.querySelectorAll('[href],[src]');
  for (var i=0, n=nodes.length; i<n; i++) {
    if (nodes[i].href) { nodes[i].href=nodes[i].href; }
    if (nodes[i].src) { nodes[i].src=nodes[i].src; }

    console.log('href: ' + nodes[i].href + ', src: ' + nodes[i].src);
  }

  // ソースコードをテキストで取得
  var src = html.innerHTML;
  console.log(src.slice(0, 5000));

  // 上記の src には DOCTYPE 含まれていないので別途用意
  var name     = document.doctype.name;
  var publicId = document.doctype.publicId;
  var systemID = document.doctype.systemId;
  var doctype  = '<!DOCTYPE ' + name
                 + (publicId ? ' PUBLIC "' + publicId + '"' : '')
                 + (systemID ? ' "' + systemID + '"' : '')
                 + '>';
  console.log(doctype);

  // <html> タグを再構成
  var htmlTag = '<html';
  var attrs = html.attributes;
  for (var i=0, n=attrs.length; i<n; i++) {
    var attr = attrs[i];
    htmlTag += ' ' + attr.nodeName + (attr.nodeValue ? '="' + attr.nodeValue + '"' : '');
  }
  htmlTag += '>';
  console.log(htmlTag);

  // ソースコードを Blob オブジェクトに変換してURLを取得
  var blob    = new Blob([doctype, '\n', htmlTag, '\n', src, '\n</html>']);
  var url     = window.URL || window.webkitURL;
  var blobURL = url.createObjectURL(blob);

  // <a> を新たに作成し、ダウンロード用の設定をいろいろ
  var a = document.createElement('a');
  // URI を元にダウンロード時のファイル名を決定
  a.download = decodeURI(location.pathname+location.hash).replace(/\//g,'__').replace(/#/g,'--') + '.html';
  a.href     = blobURL;

  a.click();
})();

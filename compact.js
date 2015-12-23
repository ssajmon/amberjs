(function(window, document, location, doctype, nodes, html, src, htmlTag, attrs, a, i, n, t) {
  html = document.getElementsByTagName('html')[0].cloneNode(true);

  nodes = html.querySelectorAll('[href],[src]');
  for (i=0, n=nodes.length; i<n; i++) {
    t = nodes[i];
    if (t.href) { t.href = t.href; }
    if (t.src) { t.src = t.src; }

    ;;; console.log('href: ' + t.href + ', src: ' + t.src);
  }

  src = html.innerHTML;
  ;;; console.log(src.slice(0, 5000));

  doctype = document.doctype;
  doctype = '<!DOCTYPE ' + doctype.name
            + (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '')
            + (doctype.systemID ? ' "' + doctype.systemID + '"' : '')
            + '>';
  ;;; console.log(doctype);

  htmlTag = '<html';
  attrs = html.attributes;
  for (i=0, n=attrs.length; i<n; i++) {
    t = attrs[i];
    htmlTag += ' ' + t.nodeName + (t.nodeValue ? '="' + t.nodeValue + '"' : '');
  }
  htmlTag += '>';
  ;;; console.log(htmlTag);

  a = document.createElement('a');
  a.download = decodeURI(location.pathname+location.hash).replace(/\//g,'__').replace(/#/g,'--') + '.html';
  a.href = (window.URL || window.webkitURL).createObjectURL(
    new Blob([doctype, '\n', htmlTag, '\n', src, '\n</html>'])
  );

  a.click();
})(window, document, location);

(function(window, document, location, doctype, nodes, tmp, src, a) {
  tmp = document.createElement('div').appendChild(document.getElementsByTagName('html')[0].cloneNode(true));

  nodes = tmp.querySelectorAll('[href],[src]');
  for (var i=0, n=nodes.length; i<n; i++) {
    if (nodes[i].href) { nodes[i].href=nodes[i].href; }
    if (nodes[i].src) { nodes[i].src=nodes[i].src; }

    ;;; console.log('href: ' + nodes[i].href + ', src: ' + nodes[i].src);
  }

  src = tmp.innerHTML;
  ;;; console.log(src.slice(0, 5000));

  doctype = document.doctype;
  doctype = '<!DOCTYPE ' + doctype.name
            + (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '')
            + (doctype.systemID ? ' "' + doctype.systemID + '"' : '')
            + '>';
  ;;; console.log(doctype);

  a = document.createElement('a');
  a.download = decodeURI(location.pathname+location.hash).replace(/\//g,'__').replace(/#/g,'--') + '.html';
  a.href = (window.URL || window.webkitURL).createObjectURL(new Blob([doctype, '\n', src]));

  a.click();
})(window, document, location);

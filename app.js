// Generator haseł: crypto.getRandomValues, siła = entropia w bitach.
(function () {
  'use strict';
  var SETS = {
    'c-low': 'abcdefghijkmnopqrstuvwxyz',
    'c-up': 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    'c-num': '23456789',
    'c-sym': '!@#$%^&*()-_=+[]{}'
  };
  var lenEl = document.getElementById('len');
  var out = document.getElementById('out');
  function pool() {
    var p = '';
    Object.keys(SETS).forEach(function (id) {
      if (document.getElementById(id).checked) p += SETS[id];
    });
    return p;
  }
  function gen() {
    var p = pool();
    if (!p) { out.textContent = 'Zaznacz min. 1 zestaw znaków.'; return; }
    var n = +lenEl.value;
    var rnd = new Uint32Array(n);
    crypto.getRandomValues(rnd);
    var s = '';
    for (var i = 0; i < n; i++) s += p[rnd[i] % p.length];
    out.textContent = s;
    var bits = Math.round(n * Math.log2(p.length));
    document.getElementById('bar').style.width = Math.min(100, bits / 128 * 100) + '%';
    document.getElementById('strength').textContent =
      bits + ' bitów entropii — ' +
      (bits < 60 ? 'słabe, wydłuż hasło.' : bits < 90 ? 'OK do zwykłych kont.' : 'mocne. 💪');
  }
  lenEl.addEventListener('input', function () {
    document.getElementById('len-label').textContent = lenEl.value;
  });
  document.getElementById('gen').addEventListener('click', gen);
  Object.keys(SETS).forEach(function (id) {
    document.getElementById(id).addEventListener('change', gen);
  });
  document.getElementById('copy').addEventListener('click', function () {
    if (out.textContent) navigator.clipboard.writeText(out.textContent);
  });
  gen();
})();

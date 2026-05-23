/**
 * components-loader.js
 * Charge synchrone des composants HTML via data-include="path".
 * Doit être inclus AVANT les scripts vendor (simplebar, bootstrap, etc.)
 * pour que ceux-ci voient le DOM complet au moment de leur initialisation.
 */
(function () {
  var elements = document.querySelectorAll('[data-include]');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var url = el.getAttribute('data-include');
    try {
      var xhr = new XMLHttpRequest();
      // Synchrone pour garantir que le DOM est prêt avant les scripts suivants.
      xhr.open('GET', url, false);
      xhr.send();
      if (xhr.status >= 200 && xhr.status < 300) {
        var temp = document.createElement('div');
        temp.innerHTML = xhr.responseText;
        var parent = el.parentNode;
        while (temp.firstChild) {
          parent.insertBefore(temp.firstChild, el);
        }
        parent.removeChild(el);
      } else {
        console.error('[components-loader] HTTP ' + xhr.status + ' pour ' + url);
      }
    } catch (e) {
      console.error('[components-loader] Erreur de chargement: ' + url, e);
    }
  }
  document.dispatchEvent(new CustomEvent('components:loaded'));
})();

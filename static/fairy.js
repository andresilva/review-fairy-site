/* Review Fairy: optional "Which fairy are you?" picker. The site works without it. */
(function () {
  "use strict";
  var KEY = "review-fairy:me";
  var picker = document.querySelector("[data-picker]");
  var select = document.getElementById("fairy-picker");
  if (!picker || !select) return;

  function load() {
    try { return window.localStorage.getItem(KEY) || ""; } catch (e) { return ""; }
  }

  function save(login) {
    try {
      if (login) window.localStorage.setItem(KEY, login);
      else window.localStorage.removeItem(KEY);
    } catch (e) { /* storage may be unavailable */ }
  }

  function apply(login) {
    var marked = document.querySelectorAll(".is-me");
    for (var i = 0; i < marked.length; i++) marked[i].classList.remove("is-me");
    var panel = document.querySelector("[data-summons]");
    var blocks = document.querySelectorAll("[data-summons-for]");
    var found = false;
    for (var j = 0; j < blocks.length; j++) {
      var mine = blocks[j].getAttribute("data-summons-for") === login;
      blocks[j].hidden = !mine;
      if (mine) found = true;
    }
    if (panel) panel.hidden = !found;
    if (!login) return;
    var rows = document.querySelectorAll("[data-login]");
    for (var k = 0; k < rows.length; k++) {
      if (rows[k].getAttribute("data-login") === login) rows[k].classList.add("is-me");
    }
  }

  var known = false;
  var current = load();
  for (var n = 0; n < select.options.length; n++) {
    if (select.options[n].value === current) known = true;
  }
  if (!known) current = "";
  select.value = current;
  picker.hidden = false;
  apply(current);
  select.addEventListener("change", function () {
    save(select.value);
    apply(select.value);
  });
})();

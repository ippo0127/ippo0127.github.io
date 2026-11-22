// Research ページの論文コメントを (Comment) ボタンで開閉する。
// URL が #arxiv-<arXiv番号>（例: /research/#arxiv-2601.09067）のときは、
// ブラウザがその論文の行までスクロールし、ここでコメントを開く。
(function () {
  var buttons = document.querySelectorAll(".comment-toggle");

  function setOpen(button, open) {
    var target = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", String(open));
    if (target) target.classList.toggle("is-open", open);
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setOpen(button, button.getAttribute("aria-expanded") !== "true");
    });
  });

  var match = decodeURIComponent(location.hash).match(/^#arxiv-(.+)$/);
  buttons.forEach(function (button) {
    if (match && button.getAttribute("aria-controls") === "comment-" + match[1]) {
      setOpen(button, true);
    }
  });
})();

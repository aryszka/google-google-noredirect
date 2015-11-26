// ==UserScript==
// @run-at      document-start
// @name        google google
// @namespace   google google google
// @description google google duckduckgo
// @include     https://www.google.*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#lb { display: none; }");

const clipNoScroll = () => {
  ((html) => { html.className = html.className.replace(/\bnsc\b/, ""); })
  (document.documentElement);
};

const takeCite = (link) => {
  var link = link.parentNode.parentNode.querySelector("cite").innerHTML
    .replace(/(<[\/]?\w+>)|(\s+)/g, "")
    .replace(/›.*/, "");

  if (link.indexOf("https://") < 0 && link.indexOf("http://") < 0) {
    link = "http://" + link;
  }

  return link;
}

const replaceLink = (link) => {
  try {
    const clone = document.createElement("a");
    clone.innerHTML = "[FX] " + link.innerHTML;
    clone.href = takeCite(link);
    link.parentNode.replaceChild(clone, link);
  } catch (err) {
    console.log(err.toString());
  }
};

const replaceResultLinks = () => {
  [].forEach.call(document.querySelectorAll(".r > a"), replaceLink);
};

document.addEventListener("readystatechange", function () {
  clipNoScroll();
  if (document.readyState === "interactive") {
    replaceResultLinks();
  }
});

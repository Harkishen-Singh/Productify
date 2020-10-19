"use strict";
chrome.storage.local.get("mainMemory", function (details) {
  var words = details.mainMemory.dictionaryWords;
  var wordsNode = "";
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode += "<li>" + words[i_4].word+ "</li>";
  }
  document.getElementById("word_view").innerHTML = wordsNode;
});

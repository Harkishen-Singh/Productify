"use strict";
chrome.storage.local.get("mainMemory", function (details) {
  var words = details.mainMemory.dictionaryWords;
  var wordsNode = "";
  for (var i_4 = 0; i_4 < words.length; i_4++) {
    wordsNode +=
      '<div class="row" style="margin:5px;padding-bottom: 10px;"></div>' +
      '<div style="font-size:15px;"> <b>' +
      words[i_4].word +
      " </b></div>";
  }
  document.getElementById("word_view").innerHTML = wordsNode;
});

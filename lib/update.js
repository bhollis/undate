'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el, headToCursor, cursorToTail) {
  var curr = el.value,
      // strA + strB1 + strC
  next = headToCursor + (cursorToTail || ''),
      // strA + strB2 + strC
  activeElement = document.activeElement;

  //  Calculate length of strA and strC
  var aLength = 0,
      cLength = 0;
  while (aLength < curr.length && aLength < next.length && curr[aLength] === next[aLength]) {
    aLength++;
  }
  while (curr.length - cLength - 1 >= 0 && next.length - cLength - 1 >= 0 && curr[curr.length - cLength - 1] === next[next.length - cLength - 1]) {
    cLength++;
  }
  aLength = Math.min(aLength, Math.min(curr.length, next.length) - cLength);

  // Select strB1
  el.setSelectionRange(aLength, curr.length - cLength);

  // Get strB2
  var strB2 = next.substring(aLength, next.length - cLength);

  // Replace strB1 with strB2
  el.focus();
  if (!document.execCommand('insertText', false, strB2)) {
    // Document.execCommand returns false if the command is not supported.
    // Firefox and IE returns false in this case.
    el.value = next;
  }

  // Move cursor to the end of headToCursor
  el.setSelectionRange(headToCursor.length, headToCursor.length);

  activeElement && activeElement.focus();
  return el;
};
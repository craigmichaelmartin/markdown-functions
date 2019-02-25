var insertAtCaret = require('../../util/insert-at-caret').insertAtCaret;
var isNumeric = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };

var adjustBodySize = function(body) {
  body.style.height = 'auto';
  body.style.height = body.scrollHeight + 'px';
};

var addImage = function(body, url) {
  var fn = function(highlighted) {
    return (
      '![' +
      (highlighted || 'Image Description') +
      '](' + (url || 'Image Url') + ')'
    );
  };
  insertAtCaret(body, fn);
  adjustBodySize();
};

var addLink = function(body) {
  var fn = function(highlighted) {
    return '[' + (highlighted || 'Link Text') + '](Link Url)';
  };
  insertAtCaret(body, fn);
};

var toggleBold = function(body) {
  insertAtCaret(body, { surround: '**' });
};

var toggleItalics = function(body) {
  insertAtCaret(body, { surround: '_' });
};

var toggleStrikethrough = function(body) {
  insertAtCaret(body, { surround: '~~' });
};

var addH1 = function(body) {
  insertAtCaret(body, {
    startLineChars: '# ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['## ', '### ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var addH2 = function(body) {
  insertAtCaret(body, {
    startLineChars: '## ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '### ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var addH3 = function(body) {
  insertAtCaret(body, {
    startLineChars: '### ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '## ', '#### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var addH4 = function(body) {
  insertAtCaret(body, {
    startLineChars: '#### ',
    toggle: true,
    removeFirstX: function(line) {
      var val = 0;
      ['# ', '## ', '### '].some(function(starter) {
        return line.indexOf(starter) === 0 && (val = starter.length);
      });
      return val;
    }
  });
};

var addUnorderedList = function(body) {
  insertAtCaret(body, {
    newLineChars: '- ',
    newline: true,
    prefix: function(preceding) {
      var indentSpace = 4;
      var currentLine = preceding.substring(preceding.lastIndexOf('\n') + 1);
      var firstWord = currentLine.trim().split(' ')[0];
      var indentNumber =
        firstWord === '-' ||
        (firstWord.indexOf('.') === firstWord.length - 1 &&
          isNumeric(firstWord.substring(0, firstWord.length - 1)))
          ? Math.floor(currentLine.search(/\S|$/) / 4) * 4 + indentSpace
          : 0;
      return (
        '\n' +
        Array.apply(null, { length: indentNumber })
          .map(function() {
            return ' ';
          })
          .join('')
      );
    }
  });
};

var addOrderedList = function(body) {
  insertAtCaret(body, {
    newLineChars: '1. ',
    newline: true,
    prefix: function(preceding) {
      var indentSpace = 4;
      var splits = preceding.split('\n');
      var prefix = '';
      var currentLine = splits.pop();
      if (currentLine) {
        prefix = '\n';
      } else {
        currentLine = splits.pop() || '';
      }
      var firstWord = currentLine.trim().split(' ')[0];
      var indentNumber =
        firstWord === '-' ||
        (firstWord.indexOf('.') === firstWord.length - 1 &&
          isNumeric(firstWord.substring(0, firstWord.length - 1)))
          ? Math.floor(currentLine.search(/\S|$/) / 4) * 4 + indentSpace
          : 0;
      return (
        prefix +
        Array.apply(null, { length: indentNumber })
          .map(function() {
            return ' ';
          })
          .join('')
      );
    }
  });
};

module.exports = {
  addImage: addImage,
  addLink: addLink,
  toggleBold: toggleBold,
  toggleItalics: toggleItalics,
  toggleStrikethrough: toggleStrikethrough,
  addH1: addH1,
  addH2: addH2,
  addH3: addH3,
  addH4: addH4,
  addUnorderedList: addUnorderedList,
  addOrderedList: addOrderedList
};

var insertAtTheCaret = require('insert-at-the-caret').insertAtTheCaret;
var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var adjustBodySize = function(body) {
  body.style.height = 'auto';
  body.style.height = body.scrollHeight + 'px';
};

var toggleBold = function(body) {
  insertAtTheCaret(body, { surround: '**' });
};

var toggleItalics = function(body) {
  insertAtTheCaret(body, { surround: '_' });
};

var toggleStrikethrough = function(body) {
  insertAtTheCaret(body, { surround: '~~' });
};

var toggleH1 = function(body) {
  insertAtTheCaret(body, {
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

var toggleH2 = function(body) {
  insertAtTheCaret(body, {
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

var toggleH3 = function(body) {
  insertAtTheCaret(body, {
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

var toggleH4 = function(body) {
  insertAtTheCaret(body, {
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

var addTab = function(body) {
  insertAtTheCaret(body, '    ');
};

var addImage = function(body, url) {
  var fn = function(highlighted) {
    return (
      '![' +
      (highlighted || 'Image Description') +
      '](' +
      (url || 'Image Url') +
      ')'
    );
  };
  insertAtTheCaret(body, fn);
  adjustBodySize();
};

var addLink = function(body) {
  var fn = function(highlighted) {
    return '[' + (highlighted || 'Link Text') + '](Link Url)';
  };
  insertAtTheCaret(body, fn);
};

var addUnorderedList = function(body) {
  insertAtTheCaret(body, {
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
  insertAtTheCaret(body, {
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
  toggleBold: toggleBold,
  toggleItalics: toggleItalics,
  toggleStrikethrough: toggleStrikethrough,
  toggleH1: toggleH1,
  toggleH2: toggleH2,
  toggleH3: toggleH3,
  toggleH4: toggleH4,
  addTab: addTab,
  addImage: addImage,
  addLink: addLink,
  addUnorderedList: addUnorderedList,
  addOrderedList: addOrderedList
};

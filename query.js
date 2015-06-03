var words = require('./words');
var twoLetterWords = require('./two_letter_words');

var Query = function(words, twoLetterWords) {

	var _words = words;
	var _twoLetterWords = twoLetterWords;

	var _isOneLetterWord = function(word) {
		return (word == 'a' || word == 'i' || word == 'o');
	};

	var _canArchive = function(word) {
		var twoLetterWords = _twoLetterWords;
		return (_isOneLetterWord(word) ||  word.length >= 2 || (twoLetterWords.indexOf(word) > 0));
	};

	var _getUniqueChars = function(string) {
		var unique = [];
		for (var i = 0; i < string.length; i++) {

			var char = string[i];

			if (char.match(/[a-z]/g)) {
				if (unique.indexOf(char) < 0) {
					unique.push(char);
				}
			}
		}
		return unique.sort().join('');
	};

	var _getLibraryKey = function(letters) {
		return _getUniqueChars(letters);
	};

	var _LIBRARY = {};

	var _SCORING = {
		numChars: 0,
		numWords: 0,
		specials: 0
	};

	var _SPECIAL_POINTS = 1;

	var _SPECIALS = {
		keyShortest: 5,
		keyLongest: 100,
		wordsShortest: 5,
		wordsLongest: 100,
		keysWithWordsShortest: 10,
		keysWithWordsLongest: 1000,
		keysWithLettersLeast: 10,
		keysWithLettersMost: 1000,
		keysWithWordsLeast: 2,
		keysWithWordsMost: 1000
	};

	var _KEY_LENGTH_SHORTEST = Infinity;
	var _KEY_LENGTH_LONGEST = 0;
	var _KEYS_SHORTEST = [];
	var _KEYS_LONGEST = [];
	
	var _WORD_LENGTH_SHORTEST = Infinity;
	var _WORD_LENGTH_LONGEST = 0;
	var _WORDS_SHORTEST = [];
	var _WORDS_LONGEST = [];

	var _KEYS_WITH_WORDS_SHORTEST = [];
	var _KEYS_WITH_WORDS_LONGEST = [];

	var _LETTERS_LEAST = Infinity;
	var _LETTERS_MOST = 0;
	var _KEYS_WITH_LETTERS_LEAST = [];
	var _KEYS_WITH_LETTERS_MOST = [];

	var _WORDS_LEAST = Infinity;
	var _WORDS_MOST = 0;
	var _KEYS_WITH_WORDS_LEAST = [];
	var _KEYS_WITH_WORDS_MOST = [];

	var _cheat = function() {
		console.log("\n----------------------------------------------");
		console.log('Cheating will get you nowhere in life sonny!');
		console.log("----------------------------------------------");

		console.log('Key length shortest: ' + _KEY_LENGTH_SHORTEST);
		console.log('Key length longest: ' + _KEY_LENGTH_LONGEST);
		console.log('Keys shortest: ' + _KEYS_SHORTEST);
		console.log('Keys longest: ' + _KEYS_LONGEST);

		console.log('Word length shortest: ' + _WORD_LENGTH_SHORTEST);
		console.log('Word length longest: ' + _WORD_LENGTH_LONGEST);
		console.log('Words shortest: ' + _WORDS_SHORTEST);
		console.log('Words longest: ' + _WORDS_LONGEST);

		console.log('Keys with words shortest: ' + _KEYS_WITH_WORDS_SHORTEST);
		console.log('Keys with words longest: ' + _KEYS_WITH_WORDS_LONGEST);

		console.log('Letters least: ' + _LETTERS_LEAST);
		console.log('Letters most: ' + _LETTERS_MOST);
		console.log('Keys with letters least: ' + _KEYS_WITH_LETTERS_LEAST);
		console.log('Keys with letters most: ' + _KEYS_WITH_LETTERS_MOST);

		console.log('Words least: ' + _WORDS_LEAST);
		console.log('Words most: ' + _WORDS_MOST);
		console.log('Keys with words least: (' + _KEYS_WITH_WORDS_LEAST.length + ') ' + _KEYS_WITH_WORDS_LEAST[0]);
		console.log('Keys with words most: ' + _KEYS_WITH_WORDS_MOST);

		console.log("----------------------------------------------\n");
	};

	var _getPoints = function(result) {
		var numWords = _SCORING.numWords = result.length;
		var numChars = _SCORING.numChars = result.join('').length;
		_SCORING.specials = _SPECIAL_POINTS;
		var points = (numWords * numChars) * _SPECIAL_POINTS;
		return points;
	};

	var _addSpecial = function(token, array, text, points) {

		if (_inArray(token, array)) {
			text = "\tWhoot! Special prize! '" + token + "' " + text + "\n";
			_SPECIAL_POINTS += (_SPECIAL_POINTS == 1) ? points - _SPECIAL_POINTS : points;
		} else {
			text = '';
		}

		return text;
	};

	var _setSpecials = function() {

		for (var key in _LIBRARY) {

			var words = _LIBRARY[key];

			var wordsLength = words.length;

			_WORDS_LEAST = (_WORDS_LEAST > wordsLength) ? wordsLength : _WORDS_LEAST;
			_WORDS_MOST = (_WORDS_MOST < wordsLength) ? wordsLength : _WORDS_MOST;

			var overallLength = words.join('').length;

			_LETTERS_LEAST = (_LETTERS_LEAST > overallLength) ? overallLength : _LETTERS_LEAST;
			_LETTERS_MOST = (_LETTERS_MOST < overallLength) ? overallLength : _LETTERS_MOST;

			var keyLength = key.length;

			if (keyLength == _KEY_LENGTH_SHORTEST) {
				_KEYS_SHORTEST.push(key);
			}

			if (keyLength == _KEY_LENGTH_LONGEST) {
				_KEYS_LONGEST.push(key);
			}

			for (var i = 0; i < words.length; i++) {
				var word = words[i];

				var wordLength = word.length;

				if (wordLength == _WORD_LENGTH_SHORTEST) {
					_KEYS_WITH_WORDS_SHORTEST.push(key);
					_WORDS_SHORTEST.push(word);
				}

				if (wordLength == _WORD_LENGTH_LONGEST) {
					_KEYS_WITH_WORDS_LONGEST.push(key);
					_WORDS_LONGEST.push(word);
				}
			}
		}

		for (var key in _LIBRARY) {

			var words = _LIBRARY[key];

			var wordsLength = words.length;

			if (wordsLength == _WORDS_LEAST) {
				_KEYS_WITH_WORDS_LEAST.push(key);
			}

			if (wordsLength == _WORDS_MOST) {
				_KEYS_WITH_WORDS_MOST.push(key);
			}

			var overallLength = words.join('').length;

			if (overallLength == _LETTERS_LEAST) {
				_KEYS_WITH_LETTERS_LEAST.push(key);
			}

			if (overallLength == _LETTERS_MOST) {
				_KEYS_WITH_LETTERS_MOST.push(key);
			}
		}

	};

	var _inArray = function(key, array) {
		return (array.indexOf(key) > 0);
	};

	var _getSpecials = function(key, words) {
		
		var specials = '';

		specials += _addSpecial(
			key,
			_KEYS_SHORTEST,
			'is one of the shortest groups of letters with matching words!',
			_SPECIALS.keyShortest
			);

		specials += _addSpecial(
			key,
			_KEYS_LONGEST,
			'is one of the longest groups of letters with matching words!',
			_SPECIALS.keyLongest
			);

		specials += _addSpecial(
			key,
			_KEYS_WITH_WORDS_SHORTEST,
			'is a group of letters with matching words amongst the shortest in the dictionary!',
			_SPECIALS.keysWithWordsShortest
			);

		specials += _addSpecial(
			key,
			_KEYS_WITH_WORDS_LONGEST,
			'is a group of letters with matching words amongst the longest in the dictionary!',
			_SPECIALS.keysWithWordsLongest
			)

		specials += _addSpecial(
			key,
			_KEYS_WITH_LETTERS_LEAST,
			'is a group of letters matching a group of words with the least overall letters!', _SPECIALS.keysWithLettersLeast
			);

		specials += _addSpecial(
			key,
			_KEYS_WITH_LETTERS_MOST,
			'is a group of letters matching a group of words with the most overall letters!',
			_SPECIALS.keysWithLettersMost
			);

		specials += _addSpecial(
			key,
			_KEYS_WITH_WORDS_LEAST,
			'is a group of letters with the least possible word matches!',
			_SPECIALS.keysWithWordsLeast
			);

		specials += _addSpecial(
			key,
			_KEYS_WITH_WORDS_MOST,
			'is a group of letters with the most possible word matches!',
			_SPECIALS.keysWithWordsMost
			);

		for (var i = 0; i < words.length; i++) {
			var word = words[i];

			specials += _addSpecial(
				word,
				_WORDS_SHORTEST,
				'is one of the shortest words!',
				_SPECIALS.wordsShortest
				);

			specials += _addSpecial(
				word,
				_WORDS_LONGEST,
				'is one of the longest words!',
				_SPECIALS.wordsLongest
				);
		}

		return (specials == '') ? 'None' : "\n" + specials;
	};

	var _sortLibrary = function() {
		var keys = Object.keys(_LIBRARY);
		keys.sort();
		var sorted = {};
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			sorted[key] = _LIBRARY[key];
		}
		_LIBRARY = sorted;
	};

	var _setLibrary = function() {

		var words = _words;
		var twoLetterWords = _twoLetterWords;

		for (var i = 0; i < words.length; i++) {

			var w = words[i].toLowerCase();

			if (_canArchive(w)) {
				var key = _getLibraryKey(w);
				var value = w;
				
				if ( ! _LIBRARY.hasOwnProperty(key)) {
					_LIBRARY[key] = [];
				}

				var keyLength = key.length;

				_KEY_LENGTH_SHORTEST = (_KEY_LENGTH_SHORTEST > keyLength) ? keyLength : _KEY_LENGTH_SHORTEST;
				_KEY_LENGTH_LONGEST = (_KEY_LENGTH_LONGEST < keyLength) ? keyLength : _KEY_LENGTH_LONGEST;

				var wordLength = w.length;

				_WORD_LENGTH_SHORTEST = (_WORD_LENGTH_SHORTEST > wordLength) ? wordLength : _WORD_LENGTH_SHORTEST;
				_WORD_LENGTH_LONGEST = (_WORD_LENGTH_LONGEST < wordLength) ? wordLength : _WORD_LENGTH_LONGEST;

				_LIBRARY[key].push(value);
			}
		}
	};

	var _valid = function(letters) {
		letters = letters.toLowerCase();
		if (letters.length == 1) {
			if ( ! _isOneLetterWord(letters)) {
				return false;
			}
		} else {
			for (var i = 0; i < letters.length; i++) {
				var char = letters[i];
				if (char.match(/[^a-z]/)) {
					return false;
				}
			}
		}
		return true;
	};

	var _query = function(letters) {
		var data = {
			result: ['-'],
			specials: "Nothing special about those letters :-/",
			points: 0,
			scoring: _SCORING,
			message: "Oops, try again! Looks like there are no words with only the characters: ",
			status: "Error"
		};

		if (_valid(letters)) {

			var key = _getLibraryKey(letters);
			var result = _LIBRARY[key];

			if (result) {
				data.result = result;
				data.specials = _getSpecials(key, result);
				data.points = _getPoints(result);
				data.scoring = _SCORING;
				data.message = 'Congratulations! Your letters can be used to spell ' + result.length+ ' words!';
				data.status = 'Success';
			} else {
				data.message += letters;
			}
		} else {
			data.message += letters;
		}
		return data;
	};

	this.find = function(letters) {

		if (typeof letters !== 'undefined') {

			if (letters === 'cheat') {
				_cheat();
				return false;
			}

			return _query(letters);
		}

		return false;
	};

	var _init = function() {
		_setLibrary();
		_sortLibrary();
		_setSpecials();
	};
	_init();

	return this;
};

module.exports = new Query(words, twoLetterWords);
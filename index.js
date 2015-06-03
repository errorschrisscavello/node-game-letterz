#!/usr/bin/env node

var argv = require('optimist').argv;
var Query = require('./query');

var letters = argv['_'][0];

var output = "\n\
-----------------------------------------------\n\
LL             tt    tt                        \n\
LL        eee  tt    tt      eee  rr rr  zzzzz \n\
LL      ee   e tttt  tttt  ee   e rrr  r   zz  \n\
LL      eeeee  tt    tt    eeeee  rr      zz   \n\
LLLLLLL  eeeee  tttt  tttt  eeeee rr     zzzzz \n\
-----------------------------------------------\n\
\n\
Quick guide:\n\
\n\
To find words with letterz enter the command 'letterz' followed by a series of unique letters.\n\
After you execute the command, letterz will search a library of over 100,000 english words and return the words that could be spelled ONLY with the letters you provided!\n\
Cool huh?!\n\
\n\
Bonus points if you can find a series of letters that:\n\
	1. Is the shortest\n\
	2. Is the longest\n\
	3. Spells the least words\n\
	4. Spells the most words\n\
	5. Returns a group of words with the least overall characters\n\
	6. Returns a group of words with the most overall characters\n\
Enjoy and good luck!\n\
\n\
- Bideo Wego\n\
\n\
http://bideowego.com\n\
";

data = Query.find(letters);

if (data) {
	output = "\n\
-----------------------------------------------\n\
LL             tt    tt                        \n\
LL        eee  tt    tt      eee  rr rr  zzzzz \n\
LL      ee   e tttt  tttt  ee   e rrr  r   zz  \n\
LL      eeeee  tt    tt    eeeee  rr      zz   \n\
LLLLLLL  eeeee  tttt  tttt  eeeee rr     zzzzz \n\
-----------------------------------------------\n\
Your search status: " + data.status + "\n\
\n\
" + data.message + "\n\
\n\
Your original letters: " + letters + "\n\
\n\
Matched the following words: " + data.result.join(", ") + "\n\
\n\
Bonuses: " + data.specials + "\n\
\n\
Scoring: ((Total number of characters) " + data.scoring.numChars + " * (Number of words)) " + data.scoring.numWords + " * (Total bonus points) " + data.scoring.specials + " = (Total points) " + data.points + "\n\
Total Points: " + data.points + "\n\
--------------------------\n\
";
}

console.log(output);
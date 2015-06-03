# Letterz

Letterz is a neat little command-line game written in Node.js.

The game makes use of an online source for over 100,000 english words [here][words] and two letter words [here][two].

To start the game download the source. You must have Node.js installed!

Navigate to the root directory of Letterz

`$ cd PATH/TO/LETTERZ`

Then you must link Letterz to Node.js by running:

`$ npm link`

You may unlink Letterz at any time by running this from the Letterz directory:

`$ npm unlink`

Once Letterz is linked to Node.js you may run it from any directory!

# How to use

Start Letterz

`$ letterz`

`=> `

	-----------------------------------------------
	LL             tt    tt                        
	LL        eee  tt    tt      eee  rr rr  zzzzz 
	LL      ee   e tttt  tttt  ee   e rrr  r   zz  
	LL      eeeee  tt    tt    eeeee  rr      zz   
	LLLLLLL  eeeee  tttt  tttt  eeeee rr     zzzzz 
	-----------------------------------------------

	Quick guide:

	To find words with letterz enter the command 'letterz' followed by a series of unique letters.
	After you execute the command, letterz will search a library of over 100,000 english words and return the words that could be spelled ONLY with the letters you provided!
	Cool huh?!

	Bonus points if you can find a series of letters that:
		1. Is the shortest
		2. Is the longest
		3. Spells the least words
		4. Spells the most words
		5. Returns a group of words with the least overall characters
		6. Returns a group of words with the most overall characters
	Enjoy and good luck!

	- Bideo Wego

	http://bideowego.com

Pass Letterz a string of characters to get results/score

`$ letterz asdf`

`=> `

	-----------------------------------------------
	LL             tt    tt                        
	LL        eee  tt    tt      eee  rr rr  zzzzz 
	LL      ee   e tttt  tttt  ee   e rrr  r   zz  
	LL      eeeee  tt    tt    eeeee  rr      zz   
	LLLLLLL  eeeee  tttt  tttt  eeeee rr     zzzzz 
	-----------------------------------------------
	Your search status: Success

	Congratulations! Your letters can be used to spell 1 words!

	Your original letters: asdf

	Matched the following words: fads

	Bonuses: 
		Whoot! Special prize! 'adfs' is a group of letters with the least possible word matches!


	Scoring: ((Total number of characters) 4 * (Number of words)) 1 * (Total bonus points) 2 = (Total points) 8
	Total Points: 8
	--------------------------

# About Letterz

Letterz is just a fun little game I wanted to create while testing out Node.js modules. The idea behind it is quite simple.

- You must give Letterz a string of characters
- Letterz will search the list of words for words that can be spelled with those characters
- Letterz will return the list of words it found to you
- Letterz will calculate a score based on the 'specialness' of your given letters and the result it produced
- Done! Neat huh?

Perhaps this is a future game with some kind of GUI in the making?

[words]: http://www-01.sil.org/linguistics/wordlists/english/wordlist/wordsEn.txt
[two]: http://en.wiktionary.org/wiki/Appendix:Official_English_Scrabble_2-letter_words
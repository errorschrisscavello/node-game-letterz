# Letterz

Letterz is a neat little command-line game written in Node.js.

The game makes use of an online source for over 100,000 english words [here][words] and two letter words [here][two].

To start the game download the source. You must have Node.js installed!

Navigate to the root directory of Letterz

`cd PATH/TO/LETTERZ`

Then you must link Letterz to Node.js by running:

`npm link`

You may unlink Letterz at any time by running this from the Letterz directory:

`npm unlink`

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
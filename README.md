# The Game of Life
This project is my attempt at an implementation of something called [The Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) - a series of rules developed by the British Mathematician John Horton Conway in 1970 to mimic something approximating life-like cellular processes. Though the rules themselves are fairly simple (there are only three of them, and they can be implemented fairly easily with code), they can, once set in motion, yield startingly complex interactions of live and dead cells, as they "move" from one "generation" to another.


## Running This Implementation
Open up `index.html` in a browser. Contained within the page is a 400-cell matrix (20 x 20 cells in size) that is this implementation's "playground".  

When the page first loads, the cells within the matrix are each randomly assigned a live or dead status (weighted to a 70% chance of being dead). 

You can play the game - i.e., advance its state - by either clicking the right arrow key, or clicking the `>>` button.

You can also reset the state of the matrix (i.e. reassign random values to each of the cells) by hitting your return key or else clicking the `Setup` button. You can also clear the matrix (set all of the cells to a dead state) by clicking your space bar or else clicking the `Clear | Reset` button. Finally, you can also toggle the state of each cell in the matrix (change it from live to dead or vice versa) by clicking on it. You might want to do this to seed the initial state of a matrix with a particular arrangement of live cells.

## References
I deliberately wrote my implementation without consulting others' approaches first.  I did this for the challenge: I enjoy thinking through and solving things (even if, as in this case, the thing involved has been thought through and solved many times previously).  After I was finished, I looked through others' work.  Here are some of them.
- [Wikipedia Article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [More Examples at Cornell](http://pi.math.cornell.edu/~lipa/mec/lesson6.html)
- more to come
# Market Quest

A self-contained browser game for revising Economics & Markets (UCD FIN42230): eight levels, skip challenges, everyday stories, exam-style boss fights and a full mock-format final.

Open `game.html` in any browser. Progress is saved in that browser only.

## Rebuild

The game is generated from the files in `game-src/`:

```bash
python3 game-src/build.py      # writes game.html
node game-src/verify.js        # checks the data and recomputes every numerical answer
```

All questions are original and written for practice. Lecture slides are not included.

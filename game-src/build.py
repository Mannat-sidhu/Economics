#!/usr/bin/env python3
"""Inline css + js + topic data into ../game.html. Run: python3 study/game-src/build.py"""
import glob, os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(here, p), encoding='utf-8').read()
topics = "\n".join(rd(os.path.relpath(p, here)) for p in sorted(glob.glob(os.path.join(here, 'topics', '*.js'))))
js = "const TOPICS=[];\nconst RL={lv:{},card:{}};\n" + rd('diagrams.js') + "\n" + topics + "\n" + rd('engine.js')
html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Market Quest · FIN42230 exam prep</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>{rd('style.css')}</style></head>
<body><div class="wrap"><div id="app">Loading…</div></div>
<script>{js}</script></body></html>"""
out = os.path.join(here, '..', 'game.html')
open(out, 'w', encoding='utf-8').write(html)
print('built', os.path.normpath(out), len(html) // 1024, 'KB')

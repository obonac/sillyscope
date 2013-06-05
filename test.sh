#!/bin/bash
sox -c1 -r44k -n -t f32 - synth sin 220 | node bin/cmd.js freqs
# sox ~/media/internet/Look\ Around\ You\ -\ Dark\ Glove\ Remix.mp3 -c1 -r44k -t f32 - | node bin/cmd.js freqs

#!/bin/bash
sox ~/media/internet/Look\ Around\ You\ -\ Dark\ Glove\ Remix.mp3 -c1 -r44k -t f32 - | node bin/cmd.js

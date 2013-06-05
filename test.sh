#!/bin/bash
sox -c1 -r44k -n -t f32 - synth sin 220 | node bin/cmd.js

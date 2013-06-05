#!/bin/bash
sox -c1 -r44k -n -t f32 - synth sin 220 | node scope.js

# sillyscope

oscilloscope and spectroscope that reads from stdin

# example

If you type:

```
$ sox look_around_you.mp3 -c1 -r44k -t f32 - | sillyscope
```

you will get a live scanning spectroscope in a chromeless chrome window.

# limitations

Only supports 32-bit float input right now.

# install

With [npm](https://npmjs.org) do:

```
npm install -g sillyscope
```

# license

MIT

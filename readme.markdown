# sillyscope

oscilloscope and spectroscope that reads from stdin

# example

If you type:

```
$ sox look_around_you.mp3 -c1 -r44k -t f32 - | sillyscope --range=100-20k
```

you will get a live scanning spectroscope in a chromeless chrome window.

![sillyscope spectrogram](http://substack.net/images/sillyscope_spectrogram.png)

# usage

```
usage: sillyscope OPTIONS

  Show a scanning spectrograph from 32-bit little-endian float data from stdin.

  where OPTIONS are:

    --range=START-END
    
      Limit the vertical axis between START and END in Hz.
      You can use `k` as short-hand for 1000s. Default: 0-44k.

    --rate=RATE

      Expect RATE bytes per second as input. Default: 44k.

    --samples=SAMPLES

      Use SAMPLE many samples each sweep of the fft.
      More samples will be slower but higher resolution.
      Default: 11k.

```

# limitations

Only supports 32-bit float input right now.

# install

With [npm](https://npmjs.org) do:

```
npm install -g sillyscope
```

# license

MIT

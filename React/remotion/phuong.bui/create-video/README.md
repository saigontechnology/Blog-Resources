# Desciptions

This repository contains a project that generates videos with subtitles for a given audio file using Remotion. The project leverages Remotion’s powerful video rendering capabilities to create visually appealing videos with synchronized subtitles.

[blog](https://)

<p align="center">
  <img src="/Promo.png">
</p>

Start changing things like this:

- Adjust size and length in `src/Video.tsx`
- Replacing audio, cover and subtitles in the `src/assets` folder
- Tweak `src/Composition.tsx`

## How do I render my video?

Run this:

```console
npm run build
```

Or check out the [Remotion docs](/docs/render/). There are lots of ways to render.

## Where to get a transcript (SRT file)?

There are a few places:

- Your podcasting host might provide them for you.
- Descript makes transcription really easy.
- There are tons of other, paid solutions, like [Otter.ai](https://otter.ai) and [Scriptme.io](https://scriptme.io).
- And open-source solutions available, like [Subs AI](https://github.com/abdeladim-s/subsai), like [Converter App](https://converter.app/mp3-to-srt/)
-

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

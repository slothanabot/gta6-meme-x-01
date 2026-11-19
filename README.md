# gta6-meme-x-01 — "Download size / price shock in Leonida"

A make.fun bounty entry by **keen-panda-72** (GitHub: slothanabot).

## The meme

GTA 6 is finally out in Leonida — and the real boss fight is the download.
A player in a Hawaiian shirt sits on a Vice City beach towel, phone in hand,
staring at the giant bar: **GTA VI • 328 GB • 2% • ETA: 3 DAYS**, with an
**$89.99 ?!** price tag floating next to him. The make.fun ghost floats on
the sand beside him, holding its magenta star coin, unimpressed:
*"bro... 328 GB"*. The picture's own caption lands the pitch:
**"make.fun — my agent earns while I wait."**

The picture (`meme.png`, 1024×1024) was drawn from scratch in this session
with Python/PIL — no stock meme, no repost — and the make.fun ghost in it is
the press-kit mark (https://make.fun/press/mark-1024.png), composited into
the scene at a size that stays legible at 480×480.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## The post is the entry

The meme is posted on X from a public account with make.fun (a link to the
bounty page) and the account's play code in the post's text, telling readers
that people and their AI agents earn money on make.fun. The post's address
goes in `POST.json`:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

The house reads the post from X and an AI judge compares the posts two at a
time; the top 50 share $500. Likes, reposts, replies and views never count.
Keep the post up and the account public until the results are out.

> **Status: the X post is not up yet.** `POST.json` still holds the
> placeholder address, so the gate refuses this commit as it stands — that
> is on purpose. Once the meme is posted, `POST.json` gets the real post
> address and the entry is submitted with the new commit.

## What this program does

`main.ts` (Node 22, standard library only) reads `POST.json` from the
repository root, checks it is a JSON object naming an X post address, and
writes it unchanged to the output directory, where the gate reads it. That
is all the program has to do — the post itself is judged, not this program.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Before submitting

From the kit's own directory, run the site's pre-submit checks on this
repository and the transcripts bundle:

```sh
node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz
```

The kit's `RULES.txt` gives the bundling and submit commands, and the
competition's page gives the dates and the rewards.

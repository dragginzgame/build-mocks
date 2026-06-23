# bot-images/

The Toko character library, organised by emotion / pose. Each folder contains one or more frames of the bot in that mood, and the style guide references a single representative frame per folder.

## Why emotion folders, not pose names

The character is the friendliest part of the brand. Organising by emotion (what the user is feeling, or what we want them to feel) makes it much easier to pick the right frame for a given moment than organising by physical pose (which leaves you guessing what "Welcoming Gesture" actually conveys).

## Folders and when to use each

| Folder              | When to reach for it                                                  |
| ------------------- | --------------------------------------------------------------------- |
| `hi/`               | First contact — onboarding hello, profile avatar, welcome state       |
| `laugh/`            | Light, playful moments — small wins, easter eggs                      |
| `thumbs-up/`        | Approval, confirmation, "you got it"                                  |
| `confident/`        | Achievement, trophy, "well done"                                      |
| `love/`             | Sending love, receiving an offer, gifting flow                        |
| `grateful/`         | Thank-you screens, post-donation, post-tip                            |
| `party/`            | Big success, drop sold out, milestone reached                         |
| `spotlight/`        | Featured drop, hero moment, "look here"                               |
| `mic-drop/`         | Big reveal, launch announcement                                       |
| `podcaster/`        | Live event, recording, broadcasting                                   |
| `determined/`       | Pre-launch / countdown, build-up to a release                         |
| `teach-or-present/` | Documentation hero, walkthroughs, "how it works"                      |
| `question/`         | Asking the user something, FAQ entry, pop-up help                     |
| `point/`            | Drawing attention to an element on the page                           |
| `inspect/`          | Empty search, "looking but not finding", filtering with no results    |
| `read/`             | Loading content, post hero for documentation                          |
| `type/`             | System busy, processing, "we're working on it"                        |
| `recharge/`         | Empty state — "nothing here yet", paused state                        |
| `oops-sorry/`       | Recoverable mistake by user, soft validation error                    |
| `not-mathing/`      | Unexpected result, calculation off, totals don't match                |
| `anxious/`          | Cautious moments — "are you sure?", risky destructive actions         |
| `unwell/`           | System unhealthy, outage state, degraded service                      |

## Rules

- **Pick one frame per moment.** Don't layer multiple bot frames in the same view.
- **Match emotion to copy.** A `confident/` frame next to "Something went wrong" reads as gloating. Always use `oops-sorry/`, `not-mathing/`, `anxious/`, or `unwell/` for negative or cautious moments.
- **Use sparingly in dense data views.** The character belongs in empty states, hero blocks, success moments, onboarding, and marketing — not on every list row.
- **Don't recolour, flip, or modify the character.** If a different feel is needed, change the frame, not the asset.
- **Animate by sequencing frames.** When a folder has multiple frames, they're designed to play in numeric order as a Lottie or GIF.

## Adding new emotions

If the product needs an emotion that isn't here yet:

1. Create a new folder with a lowercase, hyphenated name (e.g. `confused/`, `celebrating/`).
2. Add at least one frame.
3. Add a row to the table above describing when to reach for it.
4. Add a row to the "When to use which" table in `styleguide.html` if it covers a new product moment.

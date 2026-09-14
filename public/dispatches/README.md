# Dispatch card images

Drop the two archive images here, then point `config/proatops.ts` at them:

    dispatches.items[0].image = "/dispatches/archive-01.jpg"
    dispatches.items[1].image = "/dispatches/archive-02.jpg"

Any name works — the path just has to match. Recommended: 1200x900 or wider,
JPG or WebP, under ~400KB each. They render at a 4:3 crop via next/image with
`object-cover`, so faces/subjects should sit near the centre.

Leave `image` as `null` and the card renders its current text-only layout.

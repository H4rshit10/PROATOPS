# Brand logos

Drop logo files here (SVG preferred, or transparent PNG), then point
`config/proatops.ts` at them:

    partners.items[n].logo = "/partners/healthism.svg"

They render on a warm paper strip (#F1F0EC), so dark/black marks read best.
Leave `logo` as `null` and the brand renders as a typographic wordmark.

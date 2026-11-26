# Mii Casa (su casa)

A one-page site telling the story of Mii Casa, a USC dorm designed in Blender and built by hand. Plain HTML, CSS and JavaScript with no build step, so it deploys to Vercel as a static site.

## Files

```
index.html    page content
styles.css    styling
script.js     photo lightbox, scroll fade-ins, active nav link
vercel.json   clean URLs and image caching
images/       all photos (JPG)
```

## Preview locally

Double-click `index.html`, or run a tiny server from this folder:

```
python -m http.server 8000
```

then open http://localhost:8000

## Push to GitHub

1. Create a new empty repo on GitHub (no README), e.g. `mii-casa`.
2. In this folder:

```
git init
git add .
git commit -m "Mii Casa site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mii-casa.git
git push -u origin main
```

## Deploy on Vercel

1. Go to https://vercel.com/new and import the `mii-casa` repo.
2. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
3. Click **Deploy**. Every future `git push` redeploys automatically.

## Editing

- Text lives in `index.html`, grouped by section (letter, space, planning, building, people, sign-off).
- To swap or add a photo, drop the file in `images/` and copy any `<figure class="ph">` block.
- Colors are CSS variables at the top of `styles.css`.

# Development

## Deploying

- Update version in package.json, manifest.json, and versions.json
- Create release in Github
- Build app and attach `main.js` and `manifest.json` to release.

## Developing locally

1. `npm run dev`
2. `mv ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js.bak`
3. `ln -s ~/Documents/Development/obsidian-checklist-reset/main.js ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js`
4. Reload plugin in Obsidian

To revert:

1. `rm ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js`
2. `mv ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js.bak ~/Obsidian/Personal/.obsidian/plugins/obsidian-checklist-reset/main.js`

# Obsidian Checklist Reset

This plugin adds a command to reset the state of any checklists in a document in Obsidian.

## Usage

From a document containing a checklist with checked items access the Command Palette and select
`Checklist Reset: Reset checklists`. This will uncheck all checked checklist items in the open
document.

## Development

### Deploying

- Update version in package.json, manifest.json, and versions.json
- Create release in Github
- Build app and attach `main.js` and `manifest.json` to release.

### Developing locally

1. `npm run dev`
2. `mv ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js.bak`
3. `ln -s /Users/luke/Documents/Development/obsidian-checklist-reset/main.js ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js`
4. Reload plugin in Obsidian

To revert:

1. `rm ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js`
2. `mv ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js.bak ~/Dropbox/notes/.obsidian/plugins/obsidian-checklist-reset/main.js`

# `bskt`

<small>Simple, zero-dependency bite sized (~3kB) `package.json` dependency updater with the power of [`bun`](https://bun.sh)</small>

Keep your buns steamy with the 🧺 `bskt` CLI.

```sh
### In your shell
### Print the latest dependencies 👀
bunx bskt
npx bskt
pnpm dlx bskt
yarn dlx bskt

### or write them to package.json 📝
npx bskt -w
pnpm dlx bskt -w
yarn dlx bskt -w
bunx bskt -w

### or if you install globally 🌐
npm i -g bskt
bskt

### or save a few keystrokes ⌨️
bun i -g bskt

### or if it is a package.json dependency and `./node_modules/.bin` is in your $PATH 😵‍💫
npm i -D bskt # or without -D
bskt
```

```jsonc
// or as a script in your package json 📦
{
  "scripts": {
    "some-name-check-deps": "bunx bskt",
    "some-name-update-deps": "bunx bskt -w",
  },
}
```

## 📄 About

### Usage

`bskt` is a CLI tool made to quickly update your `package.json` dependencies to their latest versions.

- Updates package versions to the `latest` tag

  <small>The `latest` tag refers to the version specifier given by the npm registry, and you can see what other tags are available on a [given package's "Versions" tab](https://www.npmjs.com/package/npm?activeTab=versions)! These can be custom, but it seems `latest` always refers to whatever the package maintainer will specify as latest non-pre-release version.</small>

- Retains version specifiers such as `~` `^`
- _(Planned)_ specify the `dist-tag` targets you wish to update to with `--tag` i.e. `bskt -w --tag="canary,next"`

Personally, I find this pairs well if you use _exact_ versions (no `^` `~`) in your `package.json`.

### Limitations

`bskt` _only_ updates `package.json` dependencies to their latest version, as specified by their `latest` tag on the [NPM registry](https://www.npmjs.com) _(or the tags and fallbacks you specify)_.

_For now_, the tool was designed explicitly for this purpose. If this does not suit your use case, I'd highly recommend some [other tools](#Alternatives) which can handle updating to scopes you desire, such as `major` / `minor` / `patch` etc.

## 🔧 Options

Options (denoted by `{opt}`) can be specified by passing:

- Most options:
  - `-{opt}` or `--{opt}`
  - `-{opt} -{opt}` or `--{opt} --{opt} -{opt}`
- `-i` and `-x`:

  - These options must include `=` and the package name(s) to include or exclude:

    `-i=package1 -{otheropts}` or `--i=package1`

    `-x=package1 -{otheropts}` or `--x=package1`

  - Also, they can have quotes `'` `"` or none at all:

    `-i=package1` or `-i='package1'` or `-i="package1"`

    `-x=package1` or `-x='package1'` or `-x="package1"`

  - Finally, they use `,` (no space!) to delimit which package names to pass:

    `-i=package1,package2,package3`

    `-x=package1,package2,package3`

### Usage

```sh
### -d, -v: Show more detailed messaging
bskt -d
bskt -v

### -F: Disable color formatting
bskt -F

### -h: Show help message.
bskt -h

### -i: Specify comma `,` delimited list of dependencies to include. Each string is matched against the entire dependency's name. Can include `'` or `"` around the list if you want.
bskt -i=solid # Would include 'solid-js', '@solidjs/meta', 'eslint-plugin-solid' etc.
bskt -i=solid,unocss # Would include 'solid-js', '@solid...', 'unocss', '@unocss/reset', etc.
# Different command formatting, if desired:
bskt -i="solid,unocss"
bskt -i='solid,unocss'


### -w: Write found updates to `package.json`. By default, `bskt` does not do anything to it.
bskt -w

### -x: Specify comma `,` delimited list of dependencies to exclude. Each string is matched against the entire depenency's name. Can include `'` or `"` around the list if you want.
bskt -x=eslint # Would exclude 'eslint', '@typescript-eslint/...', 'prettier-eslint` etc.
bskt -x=eslint,@fortawesome # Would exclude 'eslint', '@typescript-eslint/...', '@fortawesome/fontawesome-...' etc.
# Different command formatting, if desired:
bskt -x="eslint"
bskt -x='eslint,@fortawesome'
```

## ✨ Alternatives

`bskt` was inspired by these other excellent package update managers:

- [`taze`](https://github.com/antfu/taze)
- [`npm-check-updates`](https://github.com/raineorshine/npm-check-updates)

Please check them out! Especially if `bskt` doesn't fit your use case! 😁

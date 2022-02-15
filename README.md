# Blist theme for Hugo

![Latest Release](https://img.shields.io/github/tag/apvarun/blist-hugo-theme.svg)
![Blist hugo theme](https://img.shields.io/github/license/apvarun/blist-hugo-theme)
![Hugo generator](https://img.shields.io/badge/generator-hugo-brightgreen)

Blist is a clean and fast blog theme for your Hugo site.

![Blist Icon](https://github.com/apvarun/blist-hugo-theme/raw/main/images/blist-logo.png)

**Features:**

- Responsive content / Mobile-optimized
- Blog pagination
- Text Search
- Social links
- Code highlighting
- Color customization
- Dark mode
- Fast performance
- SEO optimized
- i18n support

## Preview

![Preview](https://github.com/apvarun/blist-hugo-theme/raw/main/images/screenshot.png)

➡️ [DEMO](https://blist.vercel.app/)

## Get the theme

Minimum Hugo Version: **0.82.1**

Run from the root of your Hugo site:

```sh
git clone https://github.com/apvarun/blist-hugo-theme.git themes/blist
```

Alternatively, you can include this repository as a [git submodule](https://git-scm.com/docs/gitsubmodules). This makes it easier to update this theme if you have your Hugo site in git as well:

```sh
git submodule add https://github.com/apvarun/blist-hugo-theme.git themes/blist
```

## Preview the theme with example content

Blist theme ships with an fully configured example site. For a quick preview:

Copy the `package.json` file from `themes/showcase` folder to your hugo website root folder, and run `npm install`.

```sh
cd themes/blist/exampleSite/
hugo serve --themesDir ../..
```

Then visit `http://localhost:1313/` in your browser to view the example site.

## Configuring theme to a hugo website

1. Copy `package.json` and `package-lock.json` to the root folder of your the website
2. Run `npm install` to install required packages for theme
3. Run `npm i -g postcss-cli` to use PostCSS with Hugo build
4. Set `theme = 'blist'` in config.toml
5. Run `npm start` to start your local server

Make sure to commit the above changes to your repository.

## Publish your website

When deploying to services like Netlify or Vercel, use the following command for building your site:

```sh
npm i && HUGO_ENVIRONMENT=production hugo --gc
```
The parameter `HUGO_ENVIRONMENT=production` enables the execution of css purging.

## Add content

The following explains how to add content to your Hugo site. You can find sample content in the `exampleSite/` folder.

### Structure:

    .
    ├── ...
    ├── blog       # Blog Section
    │   ├── post1   # Post 1
    │   ├── post2   # Post 2
    │   └── _index
    └── ...

## Configure your site

From `exampleSite/`, copy `config.toml` to the root folder of your Hugo site and change the fields as you like. Helpful comments are provided.

### Menu

Menu in Blist theme is pre-set to have all section names. You can include custom links in header using the `menu.main` option config.toml.

### Logo

`logo` param in the site config will allow to use an image as the logo instead of the website name. It is localizable and so can have different logo for different languages

### Darkmode

`[params.darkModeToggle]` enables the dark mode toggle in header. The preference is then saved so that the mode is automatically chosen for return visits.

### Customize Ascent Color

Use `[params.ascentColor]` to change the default `pink` color to any supported color from the [list of default colors](https://tailwindcss.com/docs/customizing-colors) from Tailwind CSS.

Some example values: bg-blue-200, bg-yellow-300

### Search

`[params.enableSearch]` option is used to enable search option in the theme.

- Adds the search icon in header
- Generates the search index
- Uses fuse.js to enable searching through content

In order to search, you can either click on the search icon from header or press `Ctrl/Cmd + /` key combination.

**Note:**

Make sure to enable JSON in outputs array.

```
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

### Latex

Enable Mathematical options: set `math: true` in your markdown frontmatter

### Google Analytics

Set `googleAnalytics` in `config.toml` to activate Hugo's [internal Google Analytics template](https://gohugo.io/templates/internal/#google-analytics).

## Performance

[![Pagespeed Insights Performance](https://github.com/apvarun/blist-hugo-theme/raw/main/images/pagespeed-performance.png)](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fblist.vercel.app&tab=mobile)

## Issues

If you have a question, please [open an issue](https://github.com/apvarun/blist-hugo-theme/issues) for help and to help those who come after you. The more information you can provide, the better!

## Contributing

Contributions, issues, and feature requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

<table><tr><td align="center"><a href="https://github.com/apvarun"><img alt="apvarun" src="https://avatars.githubusercontent.com/u/8411309?v=4" width="117" /><br />apvarun</a></td><td align="center"><a href="https://github.com/engel-b"><img alt="engel-b" src="https://avatars.githubusercontent.com/u/5812810?v=4" width="117" /><br />engel-b</a></td><td align="center"><a href="https://github.com/lucab85"><img alt="lucab85" src="https://avatars.githubusercontent.com/u/24267107?v=4" width="117" /><br />lucab85</a></td></tr></table>

## License

Licensed under [MIT](LICENSE)

## 🤝 Support

Give a ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/apvarun" target="_blank" rel="noopener"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="40" width="145" alt="Buy Me A Coffee"></a>

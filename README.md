# [CDKit](https://github.com/timoa/cdkit): App Stores Design Automation

*[CDKit](https://github.com/timoa/cdkit) is a DevOps framework that helps to deploy mobile apps (iOS and Android) to the app stores (iTunes and Google Play).*

This tool create the App Store and Google Play screenshots with different themes and devices and it includes:

* iOS and Android screenshots
* Support for phones and tablets formats
* Support for child themes
* A HTML preview for all the screenshots generated with a magnifier!
* Easy integration on CI/CD pipelines

![App Stores Design Automation][doc-design-automation]

## Quick video

[![CDKit Design Automation demo](https://img.youtube.com/vi/wT4t4d7lgr4/0.jpg)](https://www.youtube.com/watch?v=wT4t4d7lgr4 "CDKit Design Automation demo")

## Getting started

### Configure your screens

1) Create a folder with your app bundle ID (ex. com.company.app):

  ```bash
  mkdir app/com.company.app
  ```

2) Create a `screens.json` (see template below) and add configure each title, subtitle and source filename.

Example of a `/app/{bundle ID}/screens.json`

```json
[{
    "title": "Pipelines list",
    "subtitle": "Take care of your pipelines.",
    "screenshot": "pipelineList.png"
  },
  {
    "title": "Pipeline history",
    "subtitle": "Get the history of your pipelines.",
    "screenshot": "pipelineHistoryList.png"
  },
  {
    "title": "Console",
    "subtitle": "See why your build failed.",
    "screenshot": "consoleLog.png"
  },
  {
    "title": "Agents list",
    "subtitle": "Take a look at your Go Agents.",
    "screenshot": "agentList.png"
  },
  {
    "title": "Agents details",
    "subtitle": "Go Agent details and last jobs.",
    "screenshot": "agentDetails.png"
  },
  {
    "title": "Environments",
    "subtitle": "Pipelines, agents and variables.",
    "screenshot": "environmentDetails.png"
  },
  {
    "title": "Settings",
    "subtitle": "Configure the way you use the app.",
    "screenshot": "settings.png"
  },
  {
    "title": "Login",
    "subtitle": "Login to your GO.CD server.",
    "screenshot": "login.png"
  }
]
```

### Create a child theme

It's optional, but probably the default colors of the theme will not be the same as your design :)

You can create a child theme based on a theme to customize the colors, font and more!

See the **Themes section** to create your child theme.

### Run the CLI

```bash
node src/cli.js --app {bundle ID} --platform {android|ios} --screenshots {path to your device screenshots}
```

Example:

```bash
node src/cli.js --app com.company.app --platform ios --screenshots ~/screenshots
```

## Themes

### List of themes

For this early version, there is only one theme: `default`.

#### Default

This theme allow you to customize:

* device mockup (all available)
* font file
* background color
* title color
* title font size
* subtitle color
* subtitle font size

### Create a child theme for your app

You can overwrite a theme for an app by changing the default values (font name, colors, background color, etc.).

To do that, you need to look at the theme configuration (`theme.json` under the folder `/src/layouts/themes/{theme name}/`) and add the value(s) that you want to customize.

Your theme will overwrite the defaults values of the theme that your app is using.

Example of a `/app/{bundle ID}/theme.json`

```json
{
  "theme": "default",
  "backgroundColor": "#86569A",
  "font": "HelveticaNeueLight.ttf",
  "title": {
    "color": "#FFFFFF"
  },
  "subtitle": {
    "color": "#C2AACC"
  }
}
```

## Device mockups

### Available

#### iOS

* [Apple iPad Pro 12.9"][apple-ipad-pro-12.9-white] (white)
* [Apple iPhone 7 Plus][apple-iphone-7-plus-white] (white)
* [Apple iPhone X][apple-iphone-x-black] (black)

#### Android

* [Google Pixel 2][google-pixel-2-black] (black)
* [Google Nexus 9][google-nexus-9]
* [Google Nexus 7 2013][google-nexus-7-2013]

## TODO

* Add multi-languages support
* Add more recent devices
* Create more themes
* Generate the HTML preview instead of using a static HTML file (needed for multi-languages support)
* Extend the CLI with a wizard to create a new app (bundleID, theme to use, number of screenshots, etc.)

[doc-design-automation]: /doc/images/design-automation.jpg
[apple-ipad-pro-12.9-white]: /src/layouts/devices/apple-ipad-pro-12.9-white/frame.png
[apple-iphone-7-plus-white]: /src/layouts/devices/apple-iphone-7-plus-white/frame.png
[apple-iphone-x-black]: /src/layouts/devices/apple-iphone-x-black/frame.png
[google-pixel-2-black]: /src/layouts/devices/google-pixel-2-black/frame.png
[google-nexus-9]: /src/layouts/devices/google-nexus-9/frame.png
[google-nexus-7-2013]: /src/layouts/devices/google-nexus-7-2013/frame.png

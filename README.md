# d2l-activities

Web components to be used with activities entities!

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

To lint AND run local unit tests:

```shell
npm test
```
## Releases

To generate a new release:
```shell
npm version [major|minor|patch] -m "New version: %s"
git push origin master --tags
```

This will update the version in the package.json file, commit that, and generate a new tag.

Once the tag is generated, navigate to the [Releases](https://github.com/BrightspaceHypermediaComponents/activities/releases) tab and draft a new release that matches the tag. Here you can provide more detailed information on what has changed in the release.

When Travis CI runs on the tagged release, it will be deployed to NPM.

## Usage

The quick eval should be pulled directly from `my-unassessed-activities`:

```html
<d2l-quick-eval href="https://activities.[[apiUrl]]/my-unassessed-activities" token="token"></d2l-quick-eval>
```

[ci-url]: https://travis-ci.org/BrightspaceUI/activities
[ci-image]: https://travis-ci.org/BrightspaceUI/activities.svg?branch=master

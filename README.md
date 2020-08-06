# d2l-activities
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=BrightspaceHypermediaComponents/activities)](https://dependabot.com)
[![Build status](https://travis-ci.com/brightspaceHypermediaComponents/activities.svg?branch=master)](https://travis-ci.com/brightspaceHypermediaComponents/activities)

Web components to be used with activities entities!

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and the tests:

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

## Usage

Quick Eval should be pulled directly from `my-unassessed-activities`:

```html
<d2l-quick-eval href="https://activities.[[apiUrl]]/my-unassessed-activities" token="token"></d2l-quick-eval>
```

[ci-url]: https://travis-ci.org/BrightspaceUI/activities
[ci-image]: https://travis-ci.org/BrightspaceUI/activities.svg?branch=master

### Visual Difference Testing

In order to do visual difference testing, you must generate the "golden" images first as the baseline to compare to.

#### Procedure for testing on a local developer machine:

1. Checkout the master branch: `git checkout master`.
2. Generate the golden (baseline) images: `npm run test:diff:golden`.
3. Checkout your branch to test: `git checkout <desired branch>`.
4. Running the visual difference tests: `npm run test:diff`.

#### Procedure for testing on the Travis CI pipeline:

When a pull-request is made, you should consider if your changes will alter the UI and break the visual difference tests.
If the visuals are being changed/modified, it is necessary for the stored Goldens in the repository to be updated (made easier with the bot).

* The visual difference tests will be automatically run based off of the Goldens stored in the repository, the bot will assist you with re-generation of the Goldens and will mark the check on your PR as failed when/if a visual difference test fails.

#### Other information

The golden images are stored at the following path: `\test\<component>\perceptual\screenshots\golden\`.
The currently generated test images are stored at the following path: `\test\<component>\perceptual\screenshots\current\`.

On a test failure, the difference between the goldens and the current images will be stored in the `current` directory with the `-diff` suffix before the file extension. Example: `d2l-quick-eval-search-results-summary-container-many-no-more-diff.png`.

## Versioning, Releasing & Deploying

 By default, when a pull request is merged the patch version in the `package.json` will be incremented, a tag will be created, and a Github release will be created.

 Include `[increment major]`, `[increment minor]` or `[skip version]` in your merge commit message to change the default versioning behavior.

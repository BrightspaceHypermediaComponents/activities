# d2l-activities

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

### Visual Difference Testing

In order to do visual difference testing, you must generate the "golden" images first, as the baseline to compare to.

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

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)

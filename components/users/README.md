# d2l-users
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceHypermediaComponents/users)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

## Installation

`d2l-users` can be installed from [Bower][bower-url]:
```shell
bower install d2l-users
```

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

[bower-url]: http://bower.io/search/?q=d2l-users
[bower-image]: https://badge.fury.io/bo/d2l-users.svg
[ci-url]: https://travis-ci.org/BrightspaceHypermediaComponents/users
[ci-image]: https://travis-ci.com/BrightspaceHypermediaComponents/users.svg?branch=master

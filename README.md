# `markdown-functions`

[![Build Status](https://travis-ci.org/craigmichaelmartin/markdown-functions.svg?branch=master)](https://travis-ci.org/craigmichaelmartin/markdown-functions)
[![Greenkeeper badge](https://badges.greenkeeper.io/craigmichaelmartin/markdown-functions.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/craigmichaelmartin/markdown-functions/branch/master/graph/badge.svg)](https://codecov.io/gh/craigmichaelmartin/markdown-functions)

## Installation

```bash
npm install --save markdown-functions
```

## What is `markdown-functions`?

`markdown-functions` are javascript functions to apply markdown formatting syntaxes into a textarea. They each accept an HTMLTextAreaElement. The functions intelligently handle selected text when applying the formatting, and for text styling transforms, they intelligently toggle on/off.

## Demo

`markdown-functions` powers [`markdown-textarea-editor`](https://github.com/craigmichaelmartin/markdown-textarea-editor) which has a demo https://craigmichaelmartin.github.io/markdown-textarea-editor/

## API

- `toggleBold(body: HTMLTextAreaElement)`
- `toggleItalics(body: HTMLTextAreaElement)`
- `toggleStrikethrough(body: HTMLTextAreaElement)`
- `toggleH1(body: HTMLTextAreaElement)`
- `toggleH2(body: HTMLTextAreaElement)`
- `toggleH3(body: HTMLTextAreaElement)`
- `toggleH4(body: HTMLTextAreaElement)`
- `addTab(body: HTMLTextAreaElement, url: string)`
- `addImage(body: HTMLTextAreaElement, url: string)`
- `addLink(body: HTMLTextAreaElement)`
- `addUnorderedList(body: HTMLTextAreaElement)`
- `addOrderedList(body: HTMLTextAreaElement)`

## TODO

- Add tests

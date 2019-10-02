# react-chip-input

> Chip input for react, based on react-bootstrap

[![NPM](https://img.shields.io/npm/v/react-chip-input.svg)](https://www.npmjs.com/package/react-chip-input)
[![Deployed on Github Pages](https://img.shields.io/badge/github--pages-online-blue.svg)](https://shhdharmen.github.io/react-chip-input/ "Deployed on Github Pages")

![GIF Example](./chrome-capture.gif)

## Pre-requisitions

It is assumed that you have [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction#installation) installed.

## Install

```bash
npm i react-chip-input
# or
yarn add react-chip-input
```

## Usage

```tsx
import * as React from "react";

import ReactChipInput from "react-chip-input";

class Example extends React.Component {
  state = {
    chips: []
  };
  addChip = value => {
    const chips = this.state.chips.slice();
    chips.push(value);
    this.setState({ chips });
  };
  removeChip = index => {
    const chips = this.state.chips.slice();
    chips.splice(index, 1);
    this.setState({ chips });
  };
  render() {
    return (
      <ReactChipInput
        classes="class1 class2"
        chips={this.state.chips}
        onSubmit={value => this.addChip(value)}
        onRemove={index => this.removeChip(index)}
      />
    );
  }
}
```

## Style Variables

```css
/* Chip background color, fallbacks to #eaeaea */
--react-chip-input__chip-bg-color
/* Chip border color, fallbacks to bootstrap's var --gray to rgba(0, 0, 0, 0.25) */
--react-chip-input__chip-border-color
/* Chip :hover, :active, :focus background color, fallbacks to #dedede */
--react-chip-input__chip-hover-bg-color
/* Chip :hover, :active, :focus border color, fallbacks bootstrap's var --dark to rgba(0, 0, 0, 0.05) */
--react-chip-input__chip-hover-border-color
/* Box shadow color, when active, fallbacks to bootstrap's var --primary to blue */
--react-chip-input__box-shadow-color
```

## License

MIT © [shhdharmen](https://github.com/shhdharmen)

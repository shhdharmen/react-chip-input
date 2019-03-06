# react-chip-input

> Chip input for react

[![NPM](https://img.shields.io/npm/v/react-chip-input.svg)](https://www.npmjs.com/package/react-chip-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-chip-input
```

## Usage

```tsx
import * as React from 'react';

import ReactChipInput from 'react-chip-input';

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
/* Chip border color, defaults to bootstrap's var --primary */
--chip-border-color
/* Chip :hover, :active, :focus background color, defaults to bootstrap's var --primary */
--chip-hover-color
/* Box shadow color, when active, defaults to bootstrap's var --primary */
--box-shadow-color
```

## License

MIT © [shhdharmen](https://github.com/shhdharmen)

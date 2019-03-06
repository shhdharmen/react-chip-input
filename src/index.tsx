/**
 * @class ReactChipInput
 */

import * as React from 'react';
import { Row, Col, Form, FormControl } from 'react-bootstrap';
import { ReactComponent as CloseIcon } from './baseline-close-24px.svg';

import styles from './styles.css';

export type Props = {
  text: string;
  /**Emits index */
  onRemove: Function;
  chips: string[];
  classes: string;
  /**Emits value */
  onSubmit: Function;
};

export default class ReactChipInput extends React.Component<Props> {
  formControlRef: any;
  state: { focused: boolean; exitingIndex: number } = {
    focused: false,
    exitingIndex: -1
  };
  constructor(props: Readonly<Props>) {
    super(props);
    this.formControlRef = React.createRef();
  }
  removeChip = (index: number) => {
    this.setState({ exitingIndex: index });
    setTimeout(() => {
      this.props.onRemove(index);
      this.setState({ exitingIndex: null });
    }, 250);
  };
  editChip = (index: number) => {
    const chips = this.props.chips.slice();
    const editChipValue = chips[index];
    chips.splice(index, 1);
    this.setState({ chips });
    this.props.onRemove(index);
    this.formControlRef.current.value = editChipValue;
    this.formControlRef.current.focus();
  };
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.chips.length < nextProps.chips.length) {
      this.formControlRef.current.value = '';
    }
  }
  render() {
    // console.log(styles);
    return (
      <div
        className={[
          this.props.classes,
          styles['chip-input'],
          'rounded',
          this.state.focused ? styles['shadow-primary'] : 'border'
        ].join(' ')}
      >
        <Row className="align-items-center" noGutters>
          {this.props.chips.map((chip, index) => (
            <Col xs="auto" className="p-2" key={index}>
              <div
                className={[
                  styles['chip'],
                  styles['show'],
                  this.state.exitingIndex === index ? styles['hide'] : ''
                ].join(' ')}
                onDoubleClick={() => this.editChip(index)}
              >
                {chip}
                <CloseIcon
                  className={['ml-2', styles['cursor-pointer']].join(' ')}
                  onClick={() => this.removeChip(index)}
                />
              </div>
            </Col>
          ))}
          <Col xs>
            <Form
              className="custom-form-control"
              onSubmit={(e: any) => {
                e.preventDefault();
                this.props.onSubmit(this.formControlRef.current.value);
              }}
              noValidate
            >
              <FormControl
                ref={this.formControlRef}
                name="chipInput"
                placeholder="Enter Here..."
                aria-label="Chip Input"
                className={['m-0', 'border-0', styles['no-focus'], 'mb-0'].join(
                  ' '
                )}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
              />
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

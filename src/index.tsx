/**
 * @class ReactChipInput
 */

import * as React from 'react';
import { Row, Col, Form, FormControl } from 'react-bootstrap';
import { ReactComponent as CloseIcon } from './baseline-close-24px.svg';

import styles from './styles.css';

/**Type of Input-Props */
export type Props = {
  /**Emits index */
  onRemove: Function;
  /**Array of chips */
  chips: string[];
  /**Extra classes */
  classes: string;
  /**Emits value */
  onSubmit: Function;
};

export default class ReactChipInput extends React.Component<Props> {
  /**Ref object for input */
  formControlRef: any;
  /**State of the component */
  state: { focused: boolean; exitingIndex: number } = {
    /**Whether input is focused or not. Helps to highlight whole div. */
    focused: false,
    /**When user removes any chip, we are playing an animation for 250ms.
     * This index will help us to remove the chip actually after the same. */
    exitingIndex: -1
  };
  constructor(props: Readonly<Props>) {
    super(props);
    this.formControlRef = React.createRef();
  }
  /**Called when user clicks on remove icon.
   * And in turn, onRemove of props called, wih index passed as argument.
   */
  removeChip = (index: number) => {
    this.setState({ exitingIndex: index });
    setTimeout(() => {
      this.props.onRemove(index);
      this.setState({ exitingIndex: null });
    }, 250);
  };
  /**When user double clicks on any chip, it will start editing. */
  editChip = (index: number) => {
    const chips = this.props.chips.slice();
    const editChipValue = chips[index];
    chips.splice(index, 1);
    this.setState({ chips });
    this.props.onRemove(index);
    this.formControlRef.current.value = editChipValue;
    this.formControlRef.current.focus();
  };
  /**This is needed, as chips array will get changed frequently. */
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.chips.length < nextProps.chips.length) {
      this.formControlRef.current.value = '';
    }
  }
  render() {
    return (
      /**The main container div */
      <div
        className={[
          this.props.classes,
          styles['chip-input'],
          'rounded',
          this.state.focused ? styles['shadow-primary'] : 'border'
        ].join(' ')}
      >
        <Row className="align-items-center" noGutters>
        {/* Each chip is bootstrap's col */}
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
                {/* The icon which helps user, if user wants to remove the chip */}
                <CloseIcon
                  className={['ml-2', styles['cursor-pointer']].join(' ')}
                  onClick={() => this.removeChip(index)}
                />
              </div>
            </Col>
          ))}
          <Col xs>
          {/* The input, from which value is read and chip is added accordingly */}
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

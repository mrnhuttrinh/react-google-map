import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { bind } from 'decko';

import './Pill.scss';

const b = block('pill');

class Pill extends React.PureComponent {
  render() {
    const { text, value, color, disabled } = this.props;
    return (
      <div
        className={b({disabled: disabled})}
        style={{borderColor: color}}
        onClick={this.handleOnClick}
      >
        <a href="#" className="close" />
        <span className={b('text')} style={{color: color}}>
          {text}
        </span>
        <i className={b('value')} style={{backgroundColor: color}}>{value}</i>
      </div>
    );
  }

  @bind
  handleOnClick() {
    const { onClick, name, disabled } = this.props;
    onClick(name, disabled);
  }
}

Pill.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.number,
}

export default Pill;
import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { handleClick, btnName, disabled, dataName, btnClass } = this.props;
    return (
      <button
        type="button"
        className={ `btn-${btnClass}` }
        disabled={ disabled }
        onClick={ handleClick }
        data-testid={ dataName }
      >
        {btnName}
      </button>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func,
  btnName: PropTypes.node,
  disabled: PropTypes.bool,
  dataName: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
};

Button.defaultProps = {
  handleClick: () => {},
  disabled: false,
  btnName: null,
  btnClass: '',
};

export default Button;

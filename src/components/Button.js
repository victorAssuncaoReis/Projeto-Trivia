import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { handleClick, btnName, disabled, dataName } = this.props;
    return (
      <div>
        <button
          type="button"
          disabled={ disabled }
          onClick={ handleClick }
          data-testid={ dataName }
        >
          {btnName}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  handleClick: PropTypes.func,
  btnName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  dataName: PropTypes.string.isRequired,
};

Button.defaultProps = {
  handleClick: () => {},
};

export default Button;

import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./style.module.css";

class Navigation extends Component {
  arrowLeft = () => {
    return <div className={styles.arrow_left}>{"<"}</div>;
  };

  arrowRight = () => {
    return <div className={styles.arrow_right}>{">"}</div>;
  };

  render() {
    const {
      navigation,
      isVertical,
      handlePrev,
      handleNext,
      renderPrevButton,
      renderNextButton,
    } = this.props;

    if (!navigation) {
      return null;
    }

    if (isVertical) {
      return null;
    }

    return (
      <div>
        <div className={styles.nav_prev}>
          <div onClick={handlePrev}>
            {renderPrevButton ? renderPrevButton() : this.arrowLeft()}
          </div>
        </div>
        <div className={styles.nav_next}>
          <div onClick={handleNext}>
            {renderNextButton ? renderNextButton() : this.arrowRight()}
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  navigation: PropTypes.bool,
  isVertical: PropTypes.bool,
  renderPrevButton: PropTypes.func,
  renderNextButton: PropTypes.func,
};

Navigation.defaultProps = {
  navigation: false,
  isVertical: true,
};

export default Navigation;

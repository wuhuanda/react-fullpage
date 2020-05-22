import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./style.module.scss";

class Navigation extends Component {
  constructor() {
    super();
    this.arrowLeft = this.arrowLeft.bind(this);
    this.arrowRight = this.arrowRight.bind(this);
  }

  arrowLeft() {
    return <div className={styles.arrowLeft}>{"<"}</div>;
  }

  arrowRight() {
    return <div className={styles.arrowRight}>{">"}</div>;
  }

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
      <div className={styles.navigation}>
        <div className={styles.navPrev}>
          <div onClick={handlePrev}>
            {renderPrevButton ? renderPrevButton() : this.arrowLeft()}
          </div>
        </div>
        <div className={styles.navNext}>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./style.module.scss";

class Pagination extends Component {
  renderIndicator = () => {
    const { paginationType } = this.props;
    const profile = {
      dot: () => this.renderDot(),
      number: () => this.renderNum(),
    };

    return profile[paginationType]() || profile["dot"]();
  };

  // 圆点指示器
  renderDot = () => {
    const { isVertical, pageCount, currentPage, handleChangePage } = this.props;
    const DOT_STYLE = isVertical ? { margin: "5px 0 " } : { margin: "0 5px" };
    return Array(pageCount)
      .fill("")
      .map((item, index) => (
        <div
          key={index}
          style={DOT_STYLE}
          className={classNames(
            styles.paginationDot,
            currentPage === index ? styles.paginationDotActive : ""
          )}
          onClick={() => handleChangePage(index)}
        ></div>
      ));
  };

  // 数字指示器
  renderNum = () => {
    const { currentPage, pageCount, isVertical } = this.props;
    const textArr = [currentPage + 1, "/", pageCount];
    const NUM_STYLE = isVertical ? { margin: "5px 0 " } : { margin: "0 5px" };
    return textArr.map((item, index) => (
      <div key={index} style={NUM_STYLE} className={styles.paginationNum}>
        {item}
      </div>
    ));
  };

  render() {
    const { pagination, isVertical } = this.props;
    if (!pagination) {
      return null;
    }
    return (
      <div
        className={
          isVertical ? styles.paginationVertical : styles.paginationHorizontal
        }
      >
        {this.renderIndicator()}
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.bool,
  paginationType: PropTypes.string,
  isVertical: PropTypes.bool,
};

Pagination.defaultProps = {
  pagination: true,
  paginationType: "dot",
  isVertical: true,
};

export default Pagination;

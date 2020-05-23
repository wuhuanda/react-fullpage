import React, { Component } from "react";
import classNames from "classnames";

import styles from "./FullpageItem.module.css";

class FullpageItem extends Component {
  render() {
    const { children, className, style } = this.props;
    return (
      <div
        className={classNames(styles.fullpage_item__wrapper, className)}
        style={style}
      >
        {children}
      </div>
    );
  }
}

export default FullpageItem;

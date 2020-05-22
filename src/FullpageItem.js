import React, { Component } from "react";
import classNames from "classnames";

import styles from "./FullpageItem.module.scss";

class FullpageItem extends Component {
  render() {
    const { children, className, style } = this.props;
    return (
      <div className={classNames(styles.itemWrapper, className)} style={style}>
        {children}
      </div>
    );
  }
}

export default FullpageItem;

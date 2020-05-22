import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import debounce from "./lib/debounce";
import isEqual from "./lib/isEqual";

import styles from "./Fullpage.module.scss";
import Pagination from "./components/Pagination";
import Navigation from "./components/Navigation";

const locationHash = window.location.hash.match(/#(.*?)#|#(.*)/);
const locationRealHash = locationHash
  ? locationHash[1] || locationHash[2]
  : null;

class Fullpage extends Component {
  constructor(props) {
    super(props);
    const { children, initPage, navigation, pagination } = this.props;
    const pageControllerInit = {
      visibleNavigation: navigation, // 是否显示分页按钮
      visiblePagination: pagination, // 是否显示轮播指示器
      pauseListenScrollWheel: false, // 是否监听scroll操作
    };
    this.state = {
      currentPage: initPage,
      dimensions: { width: 0, height: 0 },
      pageController: pageControllerInit,
      offset: 0,
      pageCount: children.length,
    };
  }

  // 初始化
  init = () => {
    const { anchor } = this.props;
    const { currentPage } = this.state;
    if (Array.isArray(anchor)) {
      let _currentPage = currentPage;
      for (const index in anchor) {
        if (anchor[index] === locationRealHash) {
          _currentPage = Number(index);
          break;
        }
      }

      this.jumpPage(_currentPage);
    }
    debounce(this.getSize, 200);
  };

  // 跳转到指定页
  jumpPage = (page) => {
    const { anchor } = this.props;
    if (Array.isArray(anchor)) {
      window.location.hash = anchor[page];
    }
    this.setState({
      currentPage: page,
    });
  };

  // 获取并设置当前窗口尺寸
  getSize = () => {
    const { responsiveHeight, isVertical, scrollBar } = this.props;
    const viewPortWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const viewPortHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // 窗口高度是否达到规定阈值
    const thresholdHeight = viewPortHeight <= responsiveHeight;
    let _dimensions = { width: viewPortWidth, height: viewPortHeight };

    if ((scrollBar || thresholdHeight) && isVertical) {
      Object.assign(_dimensions, { width: "100%" });
    }
    this.setState({
      dimensions: _dimensions,
    });
  };

  // 监听window事件
  listener = () => {
    window.addEventListener("resize", this.onResize());
    document.body.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
  };

  // 移除监听windows事件
  removeListener = () => {
    window.removeEventListener("resize", this.onResize());
    document.body.removeEventListener("touchmove", onTouchMove, {
      passive: false,
    });
  };

  // 监听 currentPage 和 dimensions 变化
  onCurrentPageAndDimensions = () => {
    const { isVertical } = this.props;
    const {
      currentPage,
      dimensions: { width, height },
    } = this.state;
    if (width > 0 && height > 0) {
      const _offset = currentPage * (isVertical ? height : width);
      this.setState({
        offset: _offset,
      });
    }
  };

  // 监听 dimensions 变化
  onDimensions = () => {
    const {
      scrollBar,
      responsiveHeight,
      isVertical,
      navigation,
      pagination,
    } = this.props;
    const {
      pageController,
      dimensions: { height },
    } = this.state;
    if ((scrollBar || height <= responsiveHeight) && isVertical) {
      const _pageController = Object.assign({}, pageController, {
        visibleNavigation: false,
        visiblePagination: false,
        pauseListenScrollWheel: true,
      });
      this.setState({
        offset: 0,
        pageController: _pageController,
      });
    } else {
      const _pageController = Object.assign({}, pageController, {
        visibleNavigation: navigation,
        visiblePagination: pagination,
        pauseListenScrollWheel: false,
      });
      this.setState({
        pageController: _pageController,
      });
    }
  };

  // 禁止网页橡皮筋效果
  onTouchMove = (e) => {
    e.preventDefault();
  };

  /**
   * 翻页逻辑
   * @param {number} n - 翻页参数，n<0：向前（上）翻n页，n>0：向后（下）翻n页
   */
  scroll = (n) => {
    const { currentPage, pageCount } = this.state;
    if (n < 0 && currentPage === 0) {
      return false;
    }
    if (n > 0 && currentPage === pageCount - 1) {
      return false;
    }

    this.jumpPage(currentPage + n);
  };

  // 翻到下一页
  slideNext = () => {
    this.scroll(1);
  };

  // 翻到上一页
  slidePrev = () => {
    this.scroll(-1);
  };

  // 监听向上滚动
  upHandler = () => {
    const { isVertical } = this.props;
    if (!isVertical) {
      return false;
    }
    this.scroll(-1);
  };

  // 监听向下滚动
  downHandler = () => {
    const { isVertical } = this.props;
    if (!isVertical) {
      return false;
    }
    this.scroll(1);
  };

  // 监听向左滚动
  leftHandler = () => {
    const { isVertical } = this.props;
    if (!isVertical) {
      return false;
    }
    this.scroll(1);
  };

  // 监听向右滚动
  rightHandler = () => {
    const { isVertical } = this.props;
    if (!isVertical) {
      return false;
    }
    this.scroll(-1);
  };

  componentDidMount() {
    this.init();
    this.listener();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      currentPage: prevCurrentPage,
      dimensions: prevDimensions,
    } = prevState;
    const { currentPage, dimensions } = this.state;
    if (isEqual(prevCurrentPage, currentPage)) {
      this.onCurrentPageAndDimensions();
    }
    if (isEqual(prevDimensions, dimensions)) {
      this.onCurrentPageAndDimensions();
      this.onDimensions();
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      children,
      isVertical,
      pageTimeout,
      duration,
      renderPrevButton,
      renderNextButton,
      paginationType,
    } = this.props;
    const {
      dimensions,
      pageCount,
      offset,
      currentPage,
      pageController: {
        visibleNavigation,
        visiblePagination,
        pauseListenScrollWheel,
      },
    } = this.state;
    const FULLPAGE_STYLE = Object.assign(
      {},
      {
        flexDirection: isVertical ? "column" : "row",
        width: isVertical ? dimensions.width : dimensions.width * pageCount,
        height: isVertical ? dimensions.height * pageCount : dimensions.height,
      }
    );

    const CONTAINER_STYLE = Object.assign({}, dimensions, {
      overflow: pauseListenScrollWheel ? "" : "hidden",
    });
    return (
      <ReactScrollWheelHandler
        className={styles.container}
        style={CONTAINER_STYLE}
        upHandler={this.upHandler}
        downHandler={this.downHandler}
        leftHandler={this.leftHandler}
        rightHandler={this.rightHandler}
        timeout={pageTimeout}
        pauseListeners={pauseListenScrollWheel}
      >
        <div
          className={styles.fullpage}
          style={{
            ...FULLPAGE_STYLE,
            display: "flex",
            transform: `translate${isVertical ? "Y" : "X"}(${-offset}px)`,
            transitionDuration: `${duration / 1000}s`,
          }}
        >
          {children.map((item, index) => {
            return (
              <div key={index} style={dimensions}>
                {item}
              </div>
            );
          })}
        </div>
        <Pagination
          pagination={visiblePagination}
          paginationType={paginationType}
          isVertical={isVertical}
          pageCount={pageCount}
          currentPage={currentPage}
          handleChangePage={this.jumpPage}
        />
        <Navigation
          navigation={visibleNavigation}
          isVertical={isVertical}
          handlePrev={this.slidePrev}
          handleNext={this.slideNext}
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
        />
      </ReactScrollWheelHandler>
    );
  }
}

Fullpage.propTypes = {
  initPage: PropTypes.number,
  scrollBar: PropTypes.bool,
  duration: PropTypes.number,
  pageTimeout: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  pagination: PropTypes.bool,
  paginationType: PropTypes.string,
  navigation: PropTypes.bool,
  anchor: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  renderPrevButton: PropTypes.func,
  renderNextButton: PropTypes.func,
  responsiveHeight: PropTypes.number,
};

Fullpage.defaultProps = {
  initPage: 1,
  scrollBar: false,
  duration: 300,
  pageTimeout: 300,
  direction: "vertical",
  responsiveHeight: 0,
  anchor: false,
};

export default Fullpage;

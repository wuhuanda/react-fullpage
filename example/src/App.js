import React, { useRef } from "react";
import { Fullpage, FullpageItem } from "../../src";

function App() {
  const commonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const ref = useRef();

  const isMobile = () => {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Fullpage
        ref={ref}
        direction={isMobile() ? "horizontal" : "vertical"}
        pagination
        paginationType="dot"
        navigation
        renderPrevButton={() => <div>Prev</div>}
        // scrollBar
        responsiveHeight={800}
        anchor={["p1", "p2", "p3", "p4"]}
      >
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f90" }}>
          Page1
          <button onClick={() => ref.current.slideNext()}>next</button>
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f69" }}>
          Page2
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f63" }}>
          Page3
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#b72" }}>
          Page4
        </FullpageItem>
      </Fullpage>
    </div>
  );
}

export default App;

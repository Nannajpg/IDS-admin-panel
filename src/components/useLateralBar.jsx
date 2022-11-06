import { useState } from "react";

const useLateralBar = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleLateralBar = (isVisible) => {
    setVisible(!isVisible);
  };

  return { isVisible, toggleLateralBar };
};

export default useLateralBar;

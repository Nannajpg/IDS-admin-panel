import { useState } from "react";

const useModal = () => {
  const [ isVisible, setVisible ] = useState(false);

  const toggleModal = (isVisible) => {
    setVisible(!isVisible);
  }
  return { isVisible, toggleModal };
}

export default useModal;
import { useState, useCallback } from "react";

const useModal = () => {
  const [ isVisible, setVisible ] = useState(false);

  const toggleModal = useCallback(() => {
    setVisible(!isVisible);
  }, [isVisible]);

  return { isVisible, toggleModal };
}

export default useModal;
import { useState } from "react";

const useModal = () => {
  const [ isVisible, setVisible ] = useState(false);
  const [ id, setId ] = useState(-1);

  const toggleModal = (isVisible, id) => {
    setVisible(!isVisible);
    setId(id);
  }

  const getId = () => {
    return id;
  }

  return { isVisible, toggleModal, getId };
}

export default useModal;
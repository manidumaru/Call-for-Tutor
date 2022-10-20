import React from "react";
import Modal from "../UI/Modal";

const Login = (props) => {
  return (
    <Modal onClick={props.onClose}>
      <h2>iam login</h2>
      <h2>iam login number 2</h2>
      <button type="close" onClick={props.onClose}>
        close
      </button>
    </Modal>
  );
};

export default Login;

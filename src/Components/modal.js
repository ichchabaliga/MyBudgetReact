import React from "react";
import { Modal as SemanticModal, Button, Icon } from "semantic-ui-react";

const Modal = ({ isOpen, onClose, title, content, actions }) => {
  return (
    <SemanticModal open={isOpen} onClose={onClose} size="tiny">
      <SemanticModal.Header style={styles.header}>
        <span style={styles.title}>{title}</span>
        <Icon name="close" style={styles.closeButton} onClick={onClose} />
      </SemanticModal.Header>
      <SemanticModal.Content>{content}</SemanticModal.Content>
      <SemanticModal.Actions wrapped>
        {actions ? actions : null}
      </SemanticModal.Actions>
    </SemanticModal>
  );
};
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "teal",
  },
  title: {
    flex: 1,
    color: "white",
  },
  closeButton: {
    cursor: "pointer",
    fontSize: "1.5em",
    color: "white",
  },
};

export default Modal;

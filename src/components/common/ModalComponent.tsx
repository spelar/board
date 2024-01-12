import React from "react";
import styled from "@emotion/styled";

type ModalComponentProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
};

const ModalComponent = ({ children, show, onClose }: ModalComponentProps) => {
  if (!show) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
  text-align: center;
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
`;

export default ModalComponent;

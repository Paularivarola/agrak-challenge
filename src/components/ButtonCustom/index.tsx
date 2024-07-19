import React from 'react';
import { Button } from '@chakra-ui/react';
import { StyledButton } from './styles';

interface ButtonCustomProps {
  text?: string;
  imageSrc?: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ text, imageSrc, onClick, style }) => {
  return (
    <StyledButton onClick={onClick}>
      {imageSrc && <img src={imageSrc} alt="" style={style} />}
      {text && <span>{text}</span>}
    </StyledButton>
  );
};

export default ButtonCustom;

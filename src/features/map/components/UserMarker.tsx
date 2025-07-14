import React from 'react';
import styled from 'styled-components/native';
import { User } from '../../../types/user';

interface Props {
  user: User;
  selected: boolean;
  onPress?: () => void; // Adicionado onPress
}

const UserMarker = ({ user, selected, onPress }: Props) => (
  <MarkerContainer selected={selected} onPress={onPress}>
    <MarkerImage source={{ uri: user.picture.thumbnail }} />
  </MarkerContainer>
);

const MarkerContainer = styled.TouchableOpacity<{ selected: boolean }>`
  width: ${props => (props.selected ? '50px' : '40px')};
  height: ${props => (props.selected ? '50px' : '40px')};
  border-radius: ${props => (props.selected ? '25px' : '20px')};
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => (props.selected ? '#F7941D' : '#0b4b3c')};
`;

const MarkerImage = styled.Image`
  width: ${props => (props.selected ? '42px' : '32px')};
  height: ${props => (props.selected ? '42px' : '32px')};
  border-radius: ${props => (props.selected ? '21px' : '16px')};
`;

export default UserMarker;
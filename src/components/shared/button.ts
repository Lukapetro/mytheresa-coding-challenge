import styled from 'styled-components/native';
import {Text} from './typography';

export const Button = styled.Pressable`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${({theme}) => theme.spacing.m}px;
  border-radius: ${({theme}) => theme.borderRadius.s}px;
  margin-vertical: ${({theme}) => theme.spacing.s}px;
  min-width: 200px;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.background};
  margin-bottom: 0;
`;

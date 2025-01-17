import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: ${({theme}) => theme.typography.header.fontSize}px;
  font-weight: ${({theme}) => theme.typography.header.fontWeight};
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.m}px;
`;

export const Text = styled.Text`
  font-size: ${({theme}) => theme.typography.button.fontSize}px;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.s}px;
`;

import styled from 'styled-components/native';

import Colors from '../../components/core/colors';

export const ModalView = styled.View`
  background: ${Colors.bgModalColor};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TitleModal = styled.Text`
  font-size: 18px;
  font-weight: 900;
`;

export const TotalText = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${Colors.primaryColor};
  margin: 35px 0px;
`;

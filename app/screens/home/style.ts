import styled from 'styled-components';
import Colors from '../../components/core/colors';

export const StatusLabel = styled.Text`
  color: ${Colors.hightLight};
  text-transform: uppercase;
  margin: 0;
  font-size: 11px;
`;

export const StatusLabelWrapper = styled.View`
  background-color: ${Colors.successColor};
  padding: 5px 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  padding: 20px 10px;
  margin: 10px 0px;
  background-color: ${Colors.secundaryColor};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardPrice = styled.Text`
  color: ${Colors.primaryColor};
  font-size: 16px;
`;

import styled from '@emotion/styled';

const BigRowLink = styled('a')`
  font-weight: bold;
  text-align: center;
  padding: 10px;
  margin: 12px 0px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: box-shadow 0.5s, transform 0.5s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 9px;

  :hover,
  :active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 36px;
    transform: scale(1.05);
  }
`;

export default BigRowLink;

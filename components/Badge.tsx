import styled from '@emotion/styled';

const Badge = styled.div(
  ({ hidden }) => `
  border-radius: 50%;
  box-sizing: border-box;
  background: #0f2e7c;
  color: white;
  position: absolute;
  text-align: center;
  padding: 0.7em;
  padding-top: 1.8em;
  right: 6em;
  top: -1em;
  width: 9em;
  height: 9em;
  transform: rotate(12deg);
  display: ${hidden ? 'hidden' : 'block'};

  @media (max-width: 1050px) {
    top: -6em;
  }

  @media (max-width: 600px) {
    font-size: 2vw;
    top: -3.5em;
    right: 0.5em;
  }
`
);

export default Badge;

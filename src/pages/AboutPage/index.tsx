import styled from 'styled-components';

const PageRoot = styled.main`
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

function AboutPage() {
  return <PageRoot>Заглушка: О нас</PageRoot>;
}

export default AboutPage;

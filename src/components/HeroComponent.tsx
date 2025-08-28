import { styled, keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  min-height: 60vh;
  background: ${({ theme }) => theme.palette.background.default};
`;

const AnimatedGradientText = styled('h1')`
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 24px;
  background: linear-gradient(
    270deg, 
    ${({ theme }) => theme.palette.primary.main}, 
    ${({ theme }) => theme.palette.secondary.main}, 
    ${({ theme }) => theme.palette.extra1.main}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientAnimation} 5s ease infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeroComponent = () => {

    const { t } = useTranslation('common');

    return (
        <HeroSection>
            <AnimatedGradientText>
                {t('hero.title')}
            </AnimatedGradientText>
        </HeroSection>
    );
};

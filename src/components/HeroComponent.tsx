import { styled, keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { motion, type Variants } from "framer-motion";

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

const zoomInVariants: Variants = {
    offscreen: {
        scale: 0.95,
        opacity: 0
    },
    onscreen: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.5
        }
    }
};

export const HeroComponent = () => {
    const { t } = useTranslation('common');

    return (
        <HeroSection>
            <AnimatedGradientText>
                <motion.span
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={zoomInVariants}
                    style={{ display: 'inline-block' }}
                >
                    {t('hero.title')}
                </motion.span>
            </AnimatedGradientText>
        </HeroSection>
    );
};
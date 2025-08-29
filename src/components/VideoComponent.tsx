import { styled } from '@mui/system';
import { useTheme, useMediaQuery } from '@mui/material';
import { LayoutContentComponent } from './LayoutContentComponent';
import HeaderComponent from './HeaderComponent';
import YouTube from 'react-youtube';

const VideoContainer = styled('div')`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const VideoWrapper = styled('div')`
  position: relative;
  width: 100%;
  background: #000;
  
  // Cambios importantes aquí:
  & > div {
    border-radius: 20px;
    overflow: hidden;
    width: 100% !important;
    height: 100% !important;
  }
  
  // Asegurar que el iframe ocupe todo el espacio
  iframe {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover; // Esto elimina las barras negras
  }
`;

// Overlay decorativo
const VideoOverlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

export const VideoComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            color: 'white'
        },
    };

    const onReady = (event: any) => {
        event.target.pauseVideo();
    };

    return (
        <LayoutContentComponent
            id='section3'
            layoutType="full"
            backgroundColor='inherit'
            height={isMobile ? 'auto' : '100vh'}
            sectionPadding={{ xs: '80px 6%', md: '6% 0' }}
        >
            <HeaderComponent
                title="Nuestra Historia"
                sx={{ color: 'primary.main', fontSize: '50px !important' }}
                titleVariant='h2'
                spacing={6}
                subtitle="Conoce más sobre nuestros inicios y trayectoria"
            />

            <VideoContainer>
                <VideoWrapper style={{
                    height: isMobile ? '50vh' : '70vh',
                    aspectRatio: isMobile ? '16/9' : 'none'
                }}>
                    <YouTube
                        videoId="IX0QVURTqb8"
                        opts={opts}
                        onReady={onReady}
                    />
                    <VideoOverlay />
                </VideoWrapper>
            </VideoContainer>
        </LayoutContentComponent>
    );
};
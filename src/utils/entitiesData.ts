
// agencias de envio
import amiLogo from '../assets/entities/agencias_de_envio/Agencia-misionera-internacional-AMI-150x150.png'
import fronterasLogo from '../assets/entities/agencias_de_envio/Fronteras-150x150.png'
import jucumLogo from '../assets/entities/agencias_de_envio/jucum.png'
import omLogo from '../assets/entities/agencias_de_envio/om_logo_circle_white_rgb-150x150.png'
import pmLogo from '../assets/entities/agencias_de_envio/Logo_PMI_triangulos-recorte-sin-lema-150x150.png'
import latinLogo from '../assets/entities/agencias_de_envio/LL-Logo-c-strap-ES-e1582992793545.png'
import preciosaSLogo from '../assets/entities/agencias_de_envio/Preciosa-Sangre-e1582992862546.png'
import letraLogo from '../assets/entities/agencias_de_envio/Logo-LETRA-Arg-2021-02-300x250.png'

// agencias envio denominacional
import dnmaLogo from '../assets/entities/agencias_envio_denomin/Logo-DNMA.png'

// entidades capacitacion
import ccmtLogo from '../assets/entities/entidades_capacitacion/LOGO-CCMT-JPG-300x212.jpg'
import cecabimLogo from '../assets/entities/entidades_capacitacion/cecabim.png'
import cmLogo from '../assets/entities/entidades_capacitacion/centro_misionero.jpg'
import empiLogo from '../assets/entities/entidades_capacitacion/escuela_misionesy_plantacion_iglesias.jpg'
import ibrp from '../assets/entities/entidades_capacitacion/logoo_ibrp.png'
import manaLogo from '../assets/entities/entidades_capacitacion/manarah_latino.jpg'
import pcmbLogo from '../assets/entities/entidades_capacitacion/pcmb.png'
import perspLogo from '../assets/entities/entidades_capacitacion/perspectivas.png'
import semillaLogo from '../assets/entities/entidades_capacitacion/Semilla-de-Trigo-1-1.png'

// iglesias enviadoras
import ipaLogo from '../assets/entities/iglesias_enviadoras/iglesia_puerta_abierta.png'

// Entidades movilizacion
import cmrLogo from '../assets/entities/entidades_movilizacion/Casa-misionera-Rosario.jpg'
import conoLogo from '../assets/entities/entidades_movilizacion/CNX-LOGO-Nuevo-768x375.png'
import cruLogo from '../assets/entities/entidades_movilizacion/Cru-768x597.png'
import igmLogo from '../assets/entities/entidades_movilizacion/iglesias-en-mision-logochico.jpg'
import movLogo from '../assets/entities/entidades_movilizacion/logo-movida-remolino.png'
import nerLogo from '../assets/entities/entidades_movilizacion/cropped-ner-cabeza-1-768x172.png'
import raimLogo from '../assets/entities/entidades_movilizacion/RAIM-768x640.png'
import noImg from '../assets/entities/placeholder.jpg'

export interface Entity {
    id: string;
    name: string;
    logo?: string;
    webUrl?: string;
    facebookUrl?: string;
    whatappUrl?: string;
    isWhite?: boolean;
}

export const sendEntities: Entity[] = [
    {
        id: '1',
        name: 'Agencia Misionera Internacional',
        logo: amiLogo,
        webUrl: '',
        facebookUrl: 'https://www.facebook.com/www.AMI.digital',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491161954415'
    },
    {
        id: '2',
        name: 'Fronteras',
        logo: fronterasLogo,
        webUrl: 'https://fronterasiberoamerica.org/',
        facebookUrl: 'https://www.facebook.com/arg.fronteras?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491169513596'
    },
    {
        id: '3',
        name: 'Jóvenes con una Misión',
        logo: jucumLogo,
        webUrl: 'https://ywam.org/quienes-somos?lang=es',
        facebookUrl: 'https://www.facebook.com/JucumYwamItuzaingo/',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493755214956'
    },
    {
        id: '4',
        name: 'Operación Movilización',
        logo: omLogo,
        webUrl: 'http://www.om.org/',
        facebookUrl: 'https://web.facebook.com/argentina.om/',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491166836710'
    },
    {
        id: '5',
        name: 'Pueblos Musulmanes Internacional',
        logo: pmLogo,
        webUrl: 'https://pmiargentina.org/',
        facebookUrl: 'https://web.facebook.com/pmiarg',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491151229265'
    },
    {
        id: '6',
        name: 'Latinlink',
        logo: latinLogo,
        webUrl: 'https://www.latinlink.org/int',
        facebookUrl: 'https://www.facebook.com/latinlinkpage/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493874201200'
    },
    {
        id: '7',
        name: 'Preciosa Sangre',
        logo: preciosaSLogo,
        webUrl: 'http://www.preciosasangre.org/',
        facebookUrl: '',
        whatappUrl: 'https://api.whatsapp.com/send?phone=54962770714'
    },
    {
        id: '8',
        name: 'Letra Argentina',
        logo: letraLogo,
        webUrl: 'https://letraargentina.wixsite.com/letra',
        facebookUrl: 'https://www.facebook.com/letraargentina/?_rdc=1&_rdr#',
        whatappUrl: ''
    }
]

export const sendDenominationEntities: Entity[] = [
    {
        id: '1',
        name: 'DNM - Unión de las Asambleas de Dios',
        logo: dnmaLogo,
        webUrl: 'https://dnmargentina.org/page/',
        facebookUrl: '',
        whatappUrl: '',
        isWhite: true
    },

]

export const capacitationAgenciesEntities: Entity[] = [
    {
        id: '1',
        name: 'Centro de Capacitación Misionera Transcultural (CCMT)',
        logo: ccmtLogo,
        webUrl: 'https://ccmt.com.ar/',
        facebookUrl: 'https://www.facebook.com/CCMTCentro/',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493537657147'
    },
    {
        id: '2',
        name: 'Centro de Capacitación Misionera Transcultural (CCMT)',
        logo: cecabimLogo,
        webUrl: 'https://www.facebook.com/cecabim',
        facebookUrl: 'https://www.facebook.com/cecabim',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493814565415'
    },
    {
        id: '3',
        name: 'Centro Misionero',
        logo: cmLogo,
        webUrl: 'https://centromisionero.net/',
        facebookUrl: 'https://www.facebook.com/centromisionerooficial',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491159369297'
    },
    {
        id: '4',
        name: 'Escuela de Misiones y Plantación de Iglesias (EMPI)',
        logo: empiLogo,
        webUrl: 'https://www.empi.com.ar/',
        facebookUrl: '',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493513503784'
    },
    {
        id: '5',
        name: 'Instituto Bíblico Río de la Plata (IBRP)',
        logo: ibrp,
        webUrl: 'https://ibrp.com.ar/',
        facebookUrl: 'https://www.facebook.com/IBRPoficial/',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491137730665',
        isWhite: true
    },
    {
        id: '6',
        name: 'Manarah Latino',
        logo: manaLogo,
        webUrl: '',
        facebookUrl: '',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491166800142'
    },
    {
        id: '7',
        name: 'Programa de Capacitación Misionera Básica (PCMB)',
        logo: pcmbLogo,
        webUrl: 'http://pcmb.com.ar/',
        facebookUrl: '',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491159794129'
    },
    {
        id: '8',
        name: 'Perspectivas Argentina',
        logo: perspLogo,
        webUrl: 'https://perspectivas.ar/',
        facebookUrl: 'https://www.facebook.com/perspectivasargentina/',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5492614717959'
    },
    {
        id: '9',
        name: 'Semilla de Trigo',
        logo: semillaLogo,
        webUrl: '',
        facebookUrl: '',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5492215574775'
    }
]

export const sendChurchEntities: Entity[] = [
    {
        id: '1',
        name: 'Iglesia de la Puerta Abierta',
        logo: ipaLogo,
        webUrl: 'https://www.lapuertaabierta.org/',
        facebookUrl: 'https://www.facebook.com/lapuertaabierta',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491132119184'
    },
]

export const movilizationEntities: Entity[] = [
    {
        id: '1',
        name: 'Casa Misionera Rosario',
        logo: cmrLogo,
        webUrl: 'https://www.lapuertaabierta.org/',
        facebookUrl: 'https://www.facebook.com/CasaMisioneraRosario/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493416429724'
    },
    {
        id: '2',
        name: 'Conexión Oriental',
        logo: conoLogo,
        webUrl: 'http://cnxoriental.com/',
        facebookUrl: 'https://www.facebook.com/cnxoriental/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491131658062'
    },
    {
        id: '3',
        name: 'Cruzada Estudiantil y Profesional para Cristo (CRU)',
        logo: cruLogo,
        webUrl: 'https://www.cru.org/ar/es.html',
        facebookUrl: 'https://www.facebook.com/CruzadaEstudiantil.Argentina/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493426391047'
    },
    {
        id: '4',
        name: 'Iglesias en Misión',
        logo: igmLogo,
        webUrl: 'https://iglesiasenmision.org/',
        facebookUrl: 'https://www.facebook.com/iglesiasenmision',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5491159369297'
    },
    {
        id: '5',
        name: 'Movida',
        logo: movLogo,
        webUrl: 'https://www.movida-net.com/',
        facebookUrl: 'https://www.facebook.com/cimaargentina/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5493516321025'
    },
    {
        id: '6',
        name: 'Negocios en la extension del Reino (NER)',
        logo: nerLogo,
        webUrl: '',
        facebookUrl: 'https://www.facebook.com/?_rdc=1&_rdr#',
        whatappUrl: 'https://api.whatsapp.com/send?phone=5492615006442'
    },
    {
        id: '7',
        name: 'Red Argentina de Iglesias y Ministerios (RAIM)',
        logo: raimLogo,
        webUrl: 'https://ministerioraim.weebly.com/',
        facebookUrl: 'https://www.facebook.com/ministerio.raim.3?_rdc=1&_rdr#',
        whatappUrl: ''
    },
    {
        id: '8',
        name: 'Agencia Misionera Internacional',
        logo: noImg,
        webUrl: '',
        facebookUrl: 'https://www.facebook.com/?_rdc=1&_rdr#',
        whatappUrl: ''
    }
]
import type { ForumCard } from "../../interfaces/forum";

export const getForumCardsData = (t: any): ForumCard[] => [
    {
        id: '1',
        forumName: t("forums.forumsList.pastors"),
        coordinators: ['Jhonatan Togani', 'Carlos Park', 'Martín Cinirella'],
        whatsappGroup: 'https://chat.whatsapp.com/pastores',
        forumColor: '#4972b2'
    },
    {
        id: '2',
        forumName: t("forums.forumsList.sendingChurches"),
        coordinators: ['Coordinador por definir'],
        whatsappGroup: 'https://chat.whatsapp.com/iglesias-enviadoras',
        forumColor: '#b63e81'
    },
    {
        id: '3',
        forumName: t("forums.forumsList.agencies"),
        coordinators: ['Alfredo', 'Roberto', 'Marilina'],
        whatsappGroup: 'https://chat.whatsapp.com/agencias-ministerios',
        forumColor: '#39b54a'
    },
    {
        id: '4',
        forumName: t("forums.forumsList.training"),
        coordinators: ['Nestor Cornara', 'Silvia Moyano', 'Federico Sinópoli'],
        whatsappGroup: 'https://chat.whatsapp.com/capacitacion',
        forumColor: '#fcb040'
    },
    {
        id: '5',
        forumName: t("forums.forumsList.crossCultural"),
        coordinators: ['Nora Velazquez'],
        whatsappGroup: 'https://chat.whatsapp.com/misioneros-transculturales',
        forumColor: '#ff5733'
    },
    {
        id: '6',
        forumName: t("forums.forumsList.care"),
        coordinators: ['Vanesa Leder'],
        whatsappGroup: 'https://chat.whatsapp.com/cuidado-integral',
        forumColor: '#7b5ba1'
    },
    {
        id: '7',
        forumName: t("forums.forumsList.work"),
        coordinators: ['Luis Perfetti', 'Joel'],
        whatsappGroup: 'https://chat.whatsapp.com/trabajo-mision',
        forumColor: '#49a6a6'
    },
    {
        id: '8',
        forumName: t("forums.forumsList.mobilizers"),
        coordinators: ['Pablo', 'Ricardo'],
        whatsappGroup: 'https://chat.whatsapp.com/movilizadores',
        forumColor: '#bd634f'
    },
    {
        id: '9',
        forumName: t("forums.forumsList.intercession"),
        coordinators: ['Maricel', 'Ana'],
        whatsappGroup: 'https://chat.whatsapp.com/intercesion',
        forumColor: '#1e6f2f'
    }
];
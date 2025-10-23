import type { ForumCard } from "../../interfaces/forum";

export const getForumCardsData = (t: any): ForumCard[] => [
    {
        id: '1',
        forumName: t("forums.forumsList.agencies"), // 1
        coordinators: ['Alfredo Yovanoni'],
        whatsappGroup: 'https://wa.me/5493415695816',
        forumColor: '#39b54a'
    },
    {
        id: '2',
        forumName: t("forums.forumsList.training"), // 2
        coordinators: ['Nestor Cornara'],
        whatsappGroup: 'https://wa.me/5491159794129',
        forumColor: '#fcb040'
    },
    {
        id: '3',
        forumName: t("forums.forumsList.care"), // 3
        coordinators: ['Vanesa Leder'],
        whatsappGroup: 'https://wa.me/5491132944674',
        forumColor: '#7b5ba1'
    },
    {
        id: '4',
        forumName: t("forums.forumsList.crossCultural"), // 6
        coordinators: ['Nora Velazquez'],
        whatsappGroup: 'https://wa.me/5491158410483',
        forumColor: '#ff5733'
    },
    {
        id: '5',
        forumName: t("forums.forumsList.mobilizers"), // 7
        coordinators: ['Ricardo Bertogliati'],
        whatsappGroup: 'https://wa.me/5491140750270',
        forumColor: '#bd634f'
    },
    {
        id: '6',
        forumName: t("forums.forumsList.pastors"), // 8
        coordinators: ['Jhonatan Tiganni'],
        whatsappGroup: 'https://wa.me/5493516983255',
        forumColor: '#4972b2'
    },
    {
        id: '7',
        forumName: t("forums.forumsList.originPeople"), // 9
        coordinators: ['Daniel Lescano'],
        whatsappGroup: 'https://wa.me/5493874201198',
        forumColor: '#bd634f'
    },
    {
        id: '8',
        forumName: t("forums.forumsList.work"), // 10
        coordinators: ['Luis Perfetti'],
        whatsappGroup: 'https://wa.me/5491171642588',
        forumColor: '#49a6a6'
    },
    {
        id: '9',
        forumName: t("forums.forumsList.public"), //11
        coordinators: ['Luciano Bongarrá'],
        whatsappGroup: 'https://wa.me/5491161576339',
        forumColor: '#1e6f2f'
    },
    {
        id: '10',
        forumName: t("forums.forumsList.capellan"), // 12
        coordinators: ['Roberto Dominguez'],
        whatsappGroup: 'https://wa.me/5491140434906',
        forumColor: '#b63e81'
    },
    {
        id: '11',
        forumName: t("forums.forumsList.intercession"), // 12
        coordinators: ['Marisel Rojas'],
        whatsappGroup: 'https://wa.me/5491153384722',
        forumColor: '#4972b2'
    },
];
import { Container } from "@mui/material"
import { CardDashboardComponent, ForumCardsGridComponent, HeaderComponent, JumbotronComponent } from "../components"
import { useTranslation } from "react-i18next";
import forumsBG from '../assets/bgs/forums-bg.jpg';
import { getForumCardsData } from "../components/forums/forumCardsData";

export const ForumPage = () => {

    const { t } = useTranslation();

    const forumsData = getForumCardsData(t);

    return (
        <>
            <JumbotronComponent
                title={t("forums.title")}
                subtitle={t("forums.subtitle")}
                background={forumsBG}
                overlay={true}
                titleColor="#ffffff"
                subtitleColor="#f0f0f0"
            />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <CardDashboardComponent>
                    <HeaderComponent
                        title={t("forums.titleGralCards")}
                        subtitle={t("forums.subtitleGralCards")}
                        titleVariant='h2'
                        align="left"
                        spacing={6}
                    />
                    <ForumCardsGridComponent cards={forumsData} />
                </CardDashboardComponent>
            </Container>
        </>
    )
}

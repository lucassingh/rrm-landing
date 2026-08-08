"use client";

import { Card, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { JumbotronComponent } from "@/components/JumbotronComponent";
import { HeaderComponent } from "@/components/HeaderComponent";
import { ForumCardsGridComponent } from "@/components/forums/ForumGridCardComponent";
import type { Forum } from "@/interfaces/forum";

const forumsBG = '/assets/bgs/forums-bg.jpg';

export function ForumsPageClient({ forums }: { forums: Forum[] }) {
    const { t } = useTranslation();

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
                <Card
                    sx={{
                        p: 0,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'background.paper',
                        position: 'relative',
                        marginBottom: '15px'
                    }}
                >
                    <HeaderComponent
                        title={t("forums.titleGralCards")}
                        subtitle={t("forums.subtitleGralCards")}
                        titleVariant='h2'
                        align="left"
                        spacing={6}
                    />
                    <ForumCardsGridComponent forums={forums} />
                </Card>
            </Container>
        </>
    );
}

export default ForumsPageClient;

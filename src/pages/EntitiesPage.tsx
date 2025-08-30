import { Container } from "@mui/material"
import { ContainerEntitiesComponent, JumbotronComponent } from "../components"
import { useTranslation } from "react-i18next";
import entitiesBG from '../assets/bgs/entities-bg.jpg'
import { capacitationAgenciesEntities, movilizationEntities, sendChurchEntities, sendDenominationEntities, sendEntities } from "../utils/entitiesData";

export const EntitiesPage = () => {

    const { t } = useTranslation();

    return (
        <>
            <JumbotronComponent
                title={t("entities.title")}
                subtitle={t("entities.subtitle")}
                background={entitiesBG}
                overlay={true}
                titleColor="#ffffff"
                subtitleColor="#f0f0f0"
            />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <ContainerEntitiesComponent
                    entities={sendEntities}
                    title={t('entities.section1')}
                />

                <ContainerEntitiesComponent
                    entities={sendDenominationEntities}
                    title={t('entities.section2')}
                />

                <ContainerEntitiesComponent
                    entities={capacitationAgenciesEntities}
                    title={t('entities.section3')}
                />

                <ContainerEntitiesComponent
                    entities={sendChurchEntities}
                    title={t('entities.section4')}
                />

                <ContainerEntitiesComponent
                    entities={movilizationEntities}
                    title={t('entities.section5')}
                />
            </Container>
        </>
    )
}

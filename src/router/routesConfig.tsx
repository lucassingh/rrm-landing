import { ContactPage, EntitiesPage, HomePage, NewsPage, RegionsPage } from "../pages";
import { NewsByIDPage } from "../pages/NewsByIDPage";

interface RouteConfig {
    path: string;
    element: React.ReactNode;
}

export const routes: RouteConfig[] = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/news",
        element: <NewsPage />,
    },
    {
        path: "/news/:id",
        element: <NewsByIDPage />,
    },
    {
        path: "/regions",
        element: <RegionsPage />,
    },
    {
        path: "/entities",
        element: <EntitiesPage />,
    },
    {
        path: "/contact",
        element: <ContactPage />,
    },
];
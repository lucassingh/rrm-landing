import { ContactPage, HomePage, NewsPage, RegionsPage, ResourcesPage } from "../pages";

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
        path: "/regions",
        element: <RegionsPage />,
    },
    {
        path: "/resources",
        element: <ResourcesPage />,
    },
    {
        path: "/contact",
        element: <ContactPage />,
    },
];
// interfaces/news.ts
export interface Author {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface News {
    id: number;
    title: string;
    subtitle: string;
    image_description: string;
    body: string;
    image_url: string;
    date: string;
    user_id: string;
    author: Author;
}

export type NewsApiResponse = News[];
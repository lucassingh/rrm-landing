import type { News, NewsApiResponse } from "../interfaces/news";

export const fetchNews = async (): Promise<News[]> => {
    const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

    try {
        const response = await fetch(`${VITE_PUBLIC_API_URL}/api/news/public/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NewsApiResponse = await response.json();

        console.log('API Response:', data);
        const count = Array.isArray(data) ? data.length : (data as any)?.data?.length ?? 0;
        console.log('Number of news received:', count);

        return (Array.isArray(data) ? data : (data as any)?.data) || [];

    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
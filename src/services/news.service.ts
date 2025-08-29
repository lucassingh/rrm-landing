// services/news.service.ts
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

        // Si la API devuelve directamente un array
        return data || [];

        // Si la API devuelve { data: News[], error?: string }
        // return data.data || [];

    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
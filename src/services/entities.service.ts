import type { EntityCategory } from '../interfaces/entity';

export const fetchEntities = async (): Promise<EntityCategory[]> => {
    const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

    try {
        const response = await fetch(`${VITE_PUBLIC_API_URL}/api/entities/public/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching entities:', error);
        throw error;
    }
};

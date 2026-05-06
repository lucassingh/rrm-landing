export interface Entity {
    id: number;
    name: string;
    image_url: string | null;
    web_url: string | null;
    facebook_url: string | null;
    whatsapp_url: string | null;
    is_white: boolean;
    category_id: number;
}

export interface EntityCategory {
    id: number;
    name: string;
    entities: Entity[];
}

import { Box, Pagination } from '@mui/material';

interface NewsPaginationProps {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const NewsPagination = ({ count, page, onChange }: NewsPaginationProps) => {
    if (count <= 1) return null;

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                color="primary"
                size="large"
            />
        </Box>
    );
};
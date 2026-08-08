"use client";

// Ported from rrm-landing/src/components/news/PaginationComponent.tsx (exported
// there as `NewsPagination`; renamed to match this codebase's `...Component`
// naming convention).
import { Box, Pagination } from "@mui/material";

interface PaginationComponentProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationComponent = ({ count, page, onChange }: PaginationComponentProps) => {
  if (count <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination count={count} page={page} onChange={onChange} color="primary" size="large" />
    </Box>
  );
};

export default PaginationComponent;

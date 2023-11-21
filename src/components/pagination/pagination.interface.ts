export interface PaginationProps {
  page: number;
  total: number | null | undefined;
}

export interface PaginationButtonProps {
  text: string;
  callback: () => void;
  condition: boolean;
}

import { useState } from 'react';

import { SortDirection } from '@mui/material';

import { UseSortRequestHandlerProps } from './types';

const useSortRequestHandler = (props?: UseSortRequestHandlerProps) => {
  const [order, setOrder] = useState<SortDirection>(props?.defaultValue?.order || false);
  const [orderBy, setOrderBy] = useState<string | number>(props?.defaultValue?.orderBy || '');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: number | string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};

export default useSortRequestHandler;

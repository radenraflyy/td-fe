import { SortDirection } from '@mui/material';

interface DefaultValue {
  order?: SortDirection;
  orderBy?: string;
}

export interface UseSortRequestHandlerProps {
  defaultValue?: DefaultValue;
}

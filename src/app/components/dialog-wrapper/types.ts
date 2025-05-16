import type { ReactNode } from 'react';

import type { DialogProps } from '@mui/material';

type Variant = 'text' | 'outlined' | 'contained';

type Options = {
  title?: string;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  leftButtonLoading?: boolean;
  rightButtonLoading?: boolean;
  leftButtonVariant?: Variant;
  rightButtonVariant?: Variant;
  leftButtonCustom?: ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  leftButtonDisable?: boolean;
  rightButtonDisable?: boolean;
  closeOutsideDialog?: boolean;
  hideBorderAction?: boolean;
  hideCloseButton?: boolean;
  subtitle?: string;
  loading?: boolean;
  footer?: ReactNode;
};
type Handlers = {
  onClose?: () => void;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
};
export type DialogModificationProps = {
  open: boolean;
  children?: React.ReactNode;
  options?: Options;
  handlers?: Handlers;
};


import { forwardRef, useEffect, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import InfoAnimate from '@/assets/gifs/info_animate.gif';
import useHandleDialogRef, { DialogController } from '@/app/hooks/use-handle-dialog-ref';

import DialogWrapper from '../dialog-wrapper';

type DescriptionProp =
  | string
  | React.ReactNode
  | ((p: React.Dispatch<React.SetStateAction<DialogConfirmationProps>>) => React.ReactNode);

interface DialogConfirmationProps {
  title: string;
  description: DescriptionProp;
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  rightButtonDisable: boolean;
  onCancel: () => void;
  onConfirm: (closeDialog: () => void) => void | Promise<void>;
}

const defaultProps: DialogConfirmationProps = {
  title: '',
  description: 'Anda yakin akan melakukan aksi ini?',
  cancelButtonTitle: '',
  confirmButtonTitle: 'Ya',
  rightButtonDisable: false,
  onConfirm: () => {},
  onCancel: () => {},
};

const DialogConfirmation = () => {
  const { ref, state, open, handleClose, setState } = useHandleDialogRef<DialogConfirmationProps>({
    defaultProps,
  });
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleCancel = () => {
    state.onCancel();
    handleClose();
  };

  const handleConfirm = () => {
    const confirmed = state.onConfirm(handleClose);
    if (confirmed?.finally) {
      setConfirmLoading(true);
      confirmed.finally(() => setConfirmLoading(false));
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    DialogConfirmationController.setDialogRef(ref);
  }, [ref]);

  return (
    <DialogWrapper
      open={open}
      options={{
        leftButtonTitle: state.cancelButtonTitle,
        leftButtonDisable: confirmLoading,
        rightButtonTitle: state.confirmButtonTitle,
        rightButtonLoading: confirmLoading,
        rightButtonDisable: state.rightButtonDisable,
        hideBorderAction: true,
      }}
      handlers={{
        onLeftButtonClick: handleCancel,
        onRightButtonClick: handleConfirm,
        onClose: handleClose,
      }}
    >
      <Stack flexDirection='row' alignItems='start' gap='0.5rem' mt='1.5rem'>
        <Stack>
          <img src={InfoAnimate} alt='info-animate' width={30} height={30} />
        </Stack>
        <Stack gap='1rem'>
          <Typography variant='Heading1'>{state.title || 'Peringatan'}</Typography>
          {typeof state.description === 'string' ? (
            <Typography variant='Heading4'>{state.description}</Typography>
          ) : typeof state.description === 'function' ? (
            state.description(setState)
          ) : (
            state.description
          )}
        </Stack>
      </Stack>
    </DialogWrapper>
  );
};

export class DialogConfirmationController extends DialogController<DialogConfirmationProps>() {
  static openAsync = (
    arg?: Partial<Omit<DialogConfirmationProps, 'open' | 'onConfirm' | 'onCancel'>>,
  ) => {
    return new Promise((resolve, reject) => {
      this.dialogRef.current?.open({
        ...arg,
        onConfirm: () => {
          resolve('confirmed');
        },
        onCancel: () => {
          reject('canceled');
        },
      });
    });
  };
}

export default forwardRef(DialogConfirmation);

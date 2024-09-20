import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Button } from 'src/components/atoms'
import { PropsButtonAction } from '../types/buttonAction.types'
import { ModalDialog } from '../../modal-dialog'
import { ModalContentRemark } from './ModalContentRemark'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { debounce } from '../utils/debounce.util'
import { Toast } from '@/components/atoms/toast'
import { toastStyle } from '../styles/toast.style'

export const ButtonAction = ({
  text,
  payload,
  modalOptions = 'default',
  onClick = e => e,
  actionService,
  onSuccessAddition,
  onErrorAddition,
  confirmationText,
  confirmationStatusVariant,
  alertText,
  renderConfirmationContent = () => <></>,
  isValid = true,
  ...rest
}: PropsButtonAction) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
  /**
   * action
   */
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async payload => {
      if (!actionService) {
        return
      } else {
        return actionService(payload)
      }
    },
    onError: () => {
      onErrorAddition?.()
      setOpenConfirmation(false)
      const toastId = toast(
        <Toast
          type='alert'
          variant='danger'
          icon='tabler:alert-triangle'
          title={alertText?.error?.title ?? 'Success'}
          size='small'
          subTitle='Error'
          content={alertText?.error?.description ?? 'Action failed executed.'}
          onClose={() => toast.dismiss(toastId)}
        />, {
        duration: 5000,
        position: 'top-right',
        style: toastStyle
      });
    },
    onSuccess: async (response: any, variables: any) => {
      onSuccessAddition?.(response, variables)
      setOpenConfirmation(false)
      const toastId = toast(
        <Toast
          type='alert'
          variant='success'
          icon='material-symbols:check'
          title={alertText?.success?.title ?? 'Success'}
          size='small'
          subTitle='Success'
          content={alertText?.success?.description ?? 'Action successfully executed.'}
          onClose={() => toast.dismiss(toastId)}
        />, {
        duration: 5000,
        position: 'top-right',
        style: toastStyle
      });
    }
  })

  const handleOnOk = async (params: any) => {
    console.log('params 1000', params)
    await mutateAsync({ ...payload, ...params });
    setOpenConfirmation(false)
  }

  const debouncedOnChange = useCallback(debounce(handleOnOk, 1000, true), []);

  const handleOnClick = (event: any) => {
    onClick(event)
    if (isValid) {
      setOpenConfirmation(true)
    }
  }

  return (
    <>
      <Button
        text={text}
        disabled={isPending}
        loading={isPending}
        onClick={handleOnClick}
        {...rest}
      />


      {modalOptions === 'default' && (
        <ModalDialog
          isOpen={openConfirmation}
          title={confirmationText?.title ?? `Are you sure to proceed action?`}
          description={confirmationText?.description ?? 'You won’t be able to revert this!'}
          position={'left'}
          closeable={true}
          positiveLabel={confirmationText?.positiveLabel ?? 'Yes'}
          negativeLabel={confirmationText?.negativeLabel ?? 'Cancel'}
          maxWidth={'xs'}
          size={'medium'}
          positionActionButton={'right'}
          typeVariant={'confirmation'}
          statusVariant={confirmationStatusVariant}
          onOk={debouncedOnChange}
          onClose={() => setOpenConfirmation(false)}
        ></ModalDialog>
      )}

      {modalOptions === 'remark' && (
        <ModalDialog
          isOpen={openConfirmation}
          title={confirmationText?.title ?? `Are you sure to proceed action?`}
          description={confirmationText?.description ?? 'You won’t be able to revert this!'}
          position={'left'}
          closeable={true}
          positiveLabel={confirmationText?.positiveLabel ?? 'Yes'}
          negativeLabel={confirmationText?.negativeLabel ?? 'Cancel'}
          maxWidth={'xs'}
          size={'medium'}
          positionActionButton={'right'}
          typeVariant={'confirmation'}
          statusVariant={confirmationStatusVariant}
          contentValidationSchema={yup.object().shape({
            remark: yup.string().required('This field is required.').min(1).default('')
          })}
          renderContent={(renderContent) => <ModalContentRemark {...renderContent} />}
          onOk={debouncedOnChange}
          onClose={() => setOpenConfirmation(false)}
        ></ModalDialog>
      )}

      {modalOptions === 'custom' && typeof renderConfirmationContent === 'function' && (
        <>
          {renderConfirmationContent({ payload, service: { mutateAsync, isPending }, openConfirmation, setOpenConfirmation })}
        </>
      )}
    </>
  )
}

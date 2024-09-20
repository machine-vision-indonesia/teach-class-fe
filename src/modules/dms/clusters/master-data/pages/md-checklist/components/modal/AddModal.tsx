import React from 'react'
import { Modal } from '@/components/molecules/modal'
import { AddModalProps } from '../../types/addModal.types'
import FormCheckList from '../form/FormCheckList'
import { useForm } from 'react-hook-form'
import { checklistSchema, ChecklistSchema } from '../form/formCheckList.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ActionCreateChecklist, RequestBodyChecklist } from '../../services/action/actionChecklist.service'
import { GetNewChecklist, NewChecklist } from '../../services/fetch/fetchNewItemChecklist.service'
import { generateNextCode } from '../../utils/generateNextCode'

export const AddModal: React.FC<AddModalProps> = ({ isOpen, setIsOpen, onClose }) => {
  const hookForm = useForm<ChecklistSchema>({
    defaultValues: {
      code: '',
      name: '',
      category_checksheet_id: {
        id: '',
        name: '',
        code: '',
        is_active: false
      },
      description: '',
      is_active: false
    },
    mode: 'onBlur',
    resolver: yupResolver(checklistSchema)
  })
  const { getValues, reset, trigger, formState } = hookForm

  const dataChecklist = GetNewChecklist<NewChecklist>()
  const validateForm = async () => {
    await trigger()
    const submitData = getValues()
    const isValid = await checklistSchema.isValid(submitData)
    return isValid
  }

  const { mutateAsync } = useMutation({
    mutationFn: ActionCreateChecklist<RequestBodyChecklist>
  })

  const onSubmit = async () => {
    const submitData = getValues()
    const newData = await dataChecklist.refetch()
    const newCode = newData?.data?.data[0].code
    const payload: RequestBodyChecklist = {
      name: submitData.name,
      code: generateNextCode(newCode),
      category_checksheet_id: submitData.category_checksheet_id?.id,
      description: submitData.description || '',
      status: 'published',
      is_active: submitData.is_active,
      production_checksheet_lists: {
        create: submitData.production_checksheet_lists?.map(item => ({
          status: 'published',
          checksheet_item_id: {
            status: 'published',
            category_checksheet_id: submitData.category_checksheet_id?.id,
            name: item.name,
            is_checked: item.is_checked
          },
          label: submitData.name
        }))
      }
    }

    try {
      await mutateAsync(payload)
    } catch (error) {
      console.error(error)
    } finally {
      reset()
      setIsOpen(false)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Create Checklist'
        description='Please fill these informations to create!'
        renderAction={false}
        closeable
      >
        <FormCheckList
          hookForm={hookForm}
          onClose={() => setIsOpen(false)}
          isValid={formState.isValid}
          validationForm={() => validateForm()}
          onSubmit={() => onSubmit()}
        />
      </Modal>
    </>
  )
}

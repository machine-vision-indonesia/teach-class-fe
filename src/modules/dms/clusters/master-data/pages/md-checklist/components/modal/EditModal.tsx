import React, { useState } from 'react'
import { Modal } from '@/components/molecules/modal'
import FormCheckList from '../form/FormCheckList'
import { useForm } from 'react-hook-form'
import { checklistSchema, ChecklistSchema } from '../form/formCheckList.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ActionUpdateChecklist, RequestBodyChecklist } from '../../services/action/actionChecklist.service'
import { EditModalProps } from '../../types/editModal.types'

export const EditModal: React.FC<EditModalProps> = ({ data, isOpen, setIsOpen, onClose }) => {
  const hookForm = useForm<ChecklistSchema>({
    defaultValues: data,
    mode: 'onBlur',
    resolver: yupResolver(checklistSchema)
  })
  const { getValues, reset, trigger, formState } = hookForm

  const [itemCeklistDelete, setItemCeklistDelete] = useState<string[]>([])

  const flattenArray = (nestedArray: any[]): string[] => {
    return nestedArray.flat()
  }

  const handleDataFromChild = (data: any[]) => {
    setItemCeklistDelete(flattenArray(data))
  }
  const validateForm = async () => {
    await trigger()
    const submitData = getValues()
    const isValid = await checklistSchema.isValid(submitData)
    return isValid
  }

  const { mutateAsync } = useMutation({
    mutationFn: ActionUpdateChecklist<RequestBodyChecklist>
  })

  const onSave = async () => {
    const submitData = getValues()

    const updateItems = submitData?.production_checksheet_lists?.filter(item => item.id)
    const createItems = submitData?.production_checksheet_lists?.filter(
      item => !data?.production_checksheet_lists.some((existingItem: any) => existingItem.id === item.id)
    )

    const payload: RequestBodyChecklist = {
      id: submitData.id,
      name: submitData.name,
      code: submitData.code,
      is_active: submitData.is_active,
      category_checksheet_id: submitData.category_checksheet_id?.id,
      description: submitData.description || '',
      status: 'published',
      production_checksheet_lists: {
        update: updateItems?.map(item => ({
          id: item.id,
          status: 'published',
          checksheet_item_id: {
            id: item.id || null,
            status: 'published',
            category_checksheet_id: submitData.category_checksheet_id?.id,
            name: item.name,
            is_checked: item.is_checked
          },
          label: submitData.name
        })),
        create: createItems?.map(item => ({
          status: 'published',
          checksheet_item_id: {
            id: item.id || null,
            status: 'published',
            category_checksheet_id: submitData.category_checksheet_id?.id,
            name: item.name,
            is_checked: item.is_checked
          },
          label: submitData.name
        })),
        delete: itemCeklistDelete ? itemCeklistDelete : []
      }
    }

    try {
      await mutateAsync(payload as any)
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
        title='Edit Checklist'
        description='Please fill these informations to edit!'
        renderAction={false}
        closeable
      >
        <FormCheckList
          prevData={data}
          hookForm={hookForm}
          onClose={() => setIsOpen(false)}
          isValid={formState.isValid}
          validationForm={() => validateForm()}
          onSave={() => onSave()}
          handleDeleteItem={handleDataFromChild}
        />
      </Modal>
    </>
  )
}

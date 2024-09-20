import { Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { Button } from 'src/components/atoms/button'
import { Modal } from 'src/components/atoms/modal/Modal'
import FormFilter from './FormFilter'
import { DropdownGroupFilter } from './ComponentAsync.type'

const ModalFilter = ({ label, group }: { label: string; group: DropdownGroupFilter[] }) => {
  const { palette } = useTheme()
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Button
        size='large'
        variant='outlined'
        color='secondary'
        content='textOnly'
        text={label}
        onClick={() => setOpenModal(prev => !prev)}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <FormFilter label={label} groupFilter={group} />
      </Modal>
    </>
  )
}

export default ModalFilter

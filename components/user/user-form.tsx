import { useUpdateUserMutation } from '@/store/auth/services'
import { User } from '@/types/User'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

interface Props {
  open: boolean
  handleClose: () => void
  currentData: User | null
}

export default function UserForm({ open, handleClose, currentData }: Props) {
  const [displayName, setDisplayName] = useState('')
  const [updateUser, { isLoading, isError, error, reset }] = useUpdateUserMutation()

  useEffect(() => {
    setDisplayName(currentData?.displayName ?? '')
  }, [currentData, open])

  const save = async () => {
    const res: any = await updateUser({ displayName })
    if (res.error) {
      toast(res.error.data.message, { type: 'error' })
      return
    }
    toast(res.data.message, { type: 'success' })
    close()
  }

  const close = () => {
    handleClose()
    reset()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id='name' variant='h6' component='h2'>
          Edit User
        </Typography>
        <TextField
          id='name'
          label='Name'
          variant='filled'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          error={isError}
          helperText={(error as any)?.data?.errors?.displayName}
          required
        />
        <Box sx={{ marginTop: 4, marginLeft: 'auto' }}>
          <Button variant='text' sx={{ marginRight: 2 }} onClick={close}>
            Close
          </Button>
          <Button variant='contained' disabled={isLoading} onClick={save}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import { useState } from 'react'
import { useGetUserQuery } from '@/store/auth/services'
import { User } from '@/types/User'
import UserForm from '@/components/user/user-form'

export default function Page() {
  const [open, setOpen] = useState(false)
  const { data, isLoading, refetch } = useGetUserQuery()
  const [currentData, setCurrentData] = useState<User | null>(null)

  const handleOpen = (data: User) => {
    setOpen(true)
    setCurrentData(data)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', gap: 4 }}>
        <Button variant='contained' onClick={refetch} disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch Data'}
        </Button>
        {data && (
          <Card sx={{ width: '100%', maxWidth: 400, display: 'flex' }}>
            <CardMedia sx={{ width: 90 }} image={data.user.photoURL} title='green iguana' />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {data.user.displayName}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {data.user.email}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
              <Button size='small' onClick={() => handleOpen(data.user)}>
                Edit
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
      <UserForm open={open} handleClose={handleClose} currentData={currentData} />
    </>
  )
}

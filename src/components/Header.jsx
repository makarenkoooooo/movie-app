import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginModal from './LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../redux/userSlice'

function Header() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    dispatch(setToken(''))
    localStorage.removeItem('userToken')
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Фильмы
          </Typography>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Header

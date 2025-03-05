import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginModal from './LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom' // ✅ Добавляем навигацию

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate() // ✅ Хук для перенаправления
  const token = useSelector((state) => state.user.token)
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!token)
  }, [token])

  const handleLogout = () => {
    dispatch(setToken('')) // Очистка токена в Redux
    localStorage.removeItem('userToken')
    localStorage.removeItem('accountId')
    navigate('/') // ✅ После выхода перенаправляем на главную
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Фильмы
          </Typography>
          {isLoggedIn ? (
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

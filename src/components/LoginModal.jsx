import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setToken, fetchAccountId } from '../redux/userSlice'

function LoginModal({ open, onClose }) {
  const dispatch = useDispatch()
  const [inputToken, setInputToken] = useState('')

  const handleLogin = () => {
    if (!inputToken.trim()) return

    dispatch(setToken(inputToken)) // ✅ Сохраняем токен в Redux
    dispatch(fetchAccountId()) // ✅ Загружаем accountId
    onClose() // ✅ Закрываем модалку после логина
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <TextField
          label="Введите API токен"
          fullWidth
          variant="outlined"
          margin="dense"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal

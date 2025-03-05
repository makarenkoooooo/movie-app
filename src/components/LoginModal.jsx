import React, { useState, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { UserContext } from '../Contexts/UserContext';

export default function LoginModal({ open, onClose }) {
  const { setToken } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [token, setLocalToken] = useState('');
  const [step, setStep] = useState(1); // 1 - ввод email, 2 - ввод токена

  const handleRequestToken = () => {
    if (email.trim()) {
      setStep(2); // Переход на ввод токена (по макету)
    }
  };

  const handleLogin = () => {
    if (token.trim()) {
      setToken(token); // Сохраняем токен
      localStorage.setItem('userToken', token);
      onClose();
      setStep(1); // Сбрасываем на первый шаг для следующего входа
      setEmail('');
      setLocalToken('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {step === 1 ? (
          <>
            <Typography variant="h6" gutterBottom>
              Запросить токен
            </Typography>
            <TextField
              fullWidth
              label="почта"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button onClick={onClose} color="primary">
                Отмена
              </Button>
              <Button onClick={handleRequestToken} color="primary">
                Запросить
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Введите токен
            </Typography>
            <TextField
              fullWidth
              label="токен"
              variant="outlined"
              margin="normal"
              value={token}
              onChange={(e) => setLocalToken(e.target.value)}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button onClick={() => setStep(1)} color="primary">
                Отмена
              </Button>
              <Button onClick={handleLogin} color="primary">
                ОК
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

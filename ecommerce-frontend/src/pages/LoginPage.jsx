import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'password',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <MainLayout>
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                textAlign: 'center',
                color: 'primary.main',
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Sign in to your TechStore account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                  Register here
                </Link>
              </Typography>
            </Box>

            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@example.com
                <br />
                Password: password
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  )
}

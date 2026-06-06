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
  Grid,
} from '@mui/material'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
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
    setErrors({})
    setLoading(true)

    const result = await register(formData)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
      if (result.errors) {
        setErrors(result.errors)
      }
    }

    setLoading(false)
  }

  return (
    <MainLayout>
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Join TechStore and start shopping
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name?.[0]}
                required
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email?.[0]}
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password?.[0]}
                required
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Phone (Optional)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Address (Optional)"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
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
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                  Login here
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  )
}

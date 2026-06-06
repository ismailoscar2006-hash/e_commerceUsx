import { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Alert,
  CircularProgress,
} from '@mui/material'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../hooks/useAuth'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }, [user])

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
    setSuccess('')
    setLoading(true)

    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    })

    if (result.success) {
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
                My Profile
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role"
                      value={user?.role === 'admin' ? 'Administrator' : 'Customer'}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      sx={{ py: 1.5 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Update Profile'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Account Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Member Since
                  </Typography>
                  <Typography variant="body2">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Account Type
                  </Typography>
                  <Typography variant="body2">
                    {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Email Status
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    ✓ Verified
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

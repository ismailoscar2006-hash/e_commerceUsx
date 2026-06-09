import { Component } from 'react'
import { Box, Typography, Button } from '@mui/material'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error)
    console.error('Error info:', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            ❌ Erreur React
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: 'monospace', color: '#666' }}>
            {this.state.error?.message}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
          >
            Recharger la page
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

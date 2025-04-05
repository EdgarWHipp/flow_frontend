"use client"

import { useState, useEffect } from 'react'
import { Box, Paper, Typography, Container, AppBar, Toolbar, Button } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Recommendation } from '../../../types/api'
import { MOCK_RECOMMENDATIONS } from '../../../mock/recommendations'

const FishPondGraphic = () => (
  <Box
    sx={{
      height: '33%',
      width: '90%',
      bgcolor: '#E3F2FD', // Light blue background
      borderRadius: 10,
      mb: 3,
      position: 'relative',
      overflow: 'hidden',
      marginY: '100px',
    }}
  >
    {/* Cute Fish 1 */}
    <Box
      sx={{
        position: 'absolute',
        width: 40,
        height: 20,
        bgcolor: '#FFB6C1', // Light pink
        borderRadius: '50%',
        animation: 'swim1 8s linear infinite',
        '&::before': {
          content: '""',
          position: 'absolute',
          right: -12,
          top: 5,
          width: 0,
          height: 0,
          borderTop: '6px solid transparent',
          borderLeft: '12px solid #FFB6C1',
          borderBottom: '6px solid transparent',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 8,
          top: 4,
          width: 4,
          height: 4,
          bgcolor: 'white',
          borderRadius: '50%',
        },
        '@keyframes swim1': {
          '0%': { left: '-5%', top: '20%' },
          '50%': { left: '100%', top: '60%' },
          '50.1%': { left: '100%', transform: 'scaleX(-1)' },
          '100%': { left: '-5%', top: '20%', transform: 'scaleX(-1)' }
        }
      }}
    />

    {/* Cute Fish 2 */}
    <Box
      sx={{
        position: 'absolute',
        width: 35,
        height: 18,
        bgcolor: '#87CEFA', // Light sky blue
        borderRadius: '50%',
        animation: 'swim2 12s linear infinite',
        '&::before': {
          content: '""',
          position: 'absolute',
          right: -10,
          top: 4,
          width: 0,
          height: 0,
          borderTop: '5px solid transparent',
          borderLeft: '10px solid #87CEFA',
          borderBottom: '5px solid transparent',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 6,
          top: 3,
          width: 3,
          height: 3,
          bgcolor: 'white',
          borderRadius: '50%',
        },
        '@keyframes swim2': {
          '0%': { right: '-5%', top: '40%' },
          '50%': { right: '100%', top: '30%' },
          '50.1%': { right: '100%', transform: 'scaleX(-1)' },
          '100%': { right: '-5%', top: '40%', transform: 'scaleX(-1)' }
        }
      }}
    />
  </Box>
)

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null)


  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch("http://localhost:8000/ai_snr_analysis", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Analysis data:', data);
        // Handle the data as needed
      } catch (error) {
        console.error('Error fetching analysis:', error);
      }
    };
  
    fetchAnalysis();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 200, bgcolor: 'background.paper', p: 2, boxShadow: 1, paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2, width: '100%', justifyContent: 'flex-start' }}
          >
            Back to recommendations
          </Button>
        </Link>
        <Button
          variant="outlined"
          component="label"
          sx={{ width: '90%', height: 80}}
        >
          {file ? file.name : 'Upload Portfolio Weights'}
          <input
            type="file"
            hidden
          />
        </Button>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AppBar position="fixed" elevation={1} sx={{ height: '50px' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flow Analysis
            </Typography>
          </Toolbar>
        </AppBar>

      {
                loading ? (
                  <FishPondGraphic />
                ) : (
                

        <Container maxWidth={false} sx={{ pt: 8 }}>
          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', pt: 2 }}>
            {/* Left side - Output area with fish pond graphic */}
            <Box sx={{ width: '66.666%', p: 2 }}>
              <Paper 
                elevation={0}
                sx={{ 
                  height: '100%', 
                  p: 3,
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                    <Typography variant="h3" gutterBottom>
                      {flow?.title || 'Analysis Output'}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {flow?.description || 'Your analysis content will appear here.'}
                    </Typography>
              </Paper>
            </Box>

            {/* Right side - LibreChat */}
            <Box sx={{ width: '33.333%', p: 2 }}>
              <iframe 
                src="http://localhost:3080"
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '8px'
                }}
              />
            </Box>
          </Box>
        </Container>)}
      </Box>
    </Box>
  )
}
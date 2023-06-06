import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useFormik } from 'formik'
import { registerValidation } from '../functions/validation'
import { useRouter } from 'next/router'



const theme = createTheme()

type SubmitTypes = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  cpassword: string,
}

export default function SignUp() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: registerValidation,
    onSubmit: handleSubmit
  })

  async function handleSubmit(values: SubmitTypes) {
    if(values){
      alert('Infelizmente não é possivel criar uma nova conta')
    } else {
      const url = 'http://localhost:3000/api/register'    
      const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }
      const response = await fetch(url, options)
      
        
      if(response.ok){
        const json = await response.json()
        formik.resetForm()
        router.push('http://localhost:3000/login')
      } else {
        alert('Erro ao estabelecer conexão com o servidor')
      }      
    }
    
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* First Name */}
                {formik.touched.firstname && formik.errors.firstname ? (
                  <TextField
                    error
                    autoComplete="given-name"
                    // name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...formik.getFieldProps('firstname')}
                  />
                ) : (
                  <TextField
                    autoComplete="given-name"
                    // name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...formik.getFieldProps('firstname')}
                  />
                )}
                <p><small style={{color:'red'}}>{formik.errors?.firstname}</small></p>
              </Grid>
              <Grid item xs={12} sm={6}>
                {formik.touched.lastname && formik.errors.lastname ? (
                  <TextField
                    error
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    // name="lastName"
                    autoComplete="family-name"
                    {...formik.getFieldProps('lastname')}
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    // name="lastName"
                    autoComplete="family-name"
                    {...formik.getFieldProps('lastname')}
                  />
                )}
                <p><small style={{color:'red'}}>{formik.errors?.lastname}</small></p>
              </Grid>
              <Grid item xs={12}>
                {formik.touched.email && formik.errors.email ? (
                  <TextField
                    error
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    // name="email"
                    autoComplete="email"
                    {...formik.getFieldProps('email')}
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    // name="email"
                    autoComplete="email"
                    {...formik.getFieldProps('email')}
                  />
                )}
                <p><small style={{color:'red'}}>{formik.errors?.email}</small></p>
              </Grid>
              <Grid item xs={12}>
                {formik.touched.password && formik.errors.password ? (
                  <TextField
                    error
                    required
                    fullWidth
                    // name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...formik.getFieldProps('password')}
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    // name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...formik.getFieldProps('password')}
                  />
                )}
                <p><small style={{color:'red'}}>{formik.errors?.password}</small></p>                
              </Grid>
              <Grid item xs={12}>
                {formik.touched.cpassword && formik.errors.cpassword ? (
                  <TextField
                    error
                    required
                    fullWidth
                    // name="cpassword"
                    label="Confirmation Password"
                    type="password"
                    id="cpassword"
                    autoComplete="c-password"
                    {...formik.getFieldProps('cpassword')}
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    // name="cpassword"
                    label="Confirmation Password"
                    type="password"
                    id="cpassword"
                    autoComplete="c-password"
                    {...formik.getFieldProps('cpassword')}
                  />
                )}
                <p><small style={{color:'red'}}>{formik.errors?.cpassword}</small></p>                
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>      
      </Container>
    </ThemeProvider>
  )
}

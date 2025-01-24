import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
// import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { FormEvent, useMemo, useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value: string) => value.includes('@'), 'El correo debe de tener una @.'] as [(value: string) => boolean, string],
  password: [ (value: string) => value.length >= 6, 'El password debe de tener mas de 6.'] as [(value: string) => boolean, string],
  displayName: [ (value: string) => value.length >= 1, 'El nombre es obligatorio.'] as [(value: string) => boolean, string],
}

export const RegisterPage = () => {

  const dispatch = useAppDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage} = useAppSelector( state => state.auth );
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password, onInputChange, formState, displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">
      {/* <h1>FormValid { isFormValid ? 'Valido': 'Incorrecto'} </h1> */}

      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={ displayName }
                onChange={ onInputChange }
                error= { !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
                error= { !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
                error= { !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={ 12 }
                display={ !!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'> { errorMessage } </Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                  disabled={ isCheckingAuthentication }
                  type='submit'
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}

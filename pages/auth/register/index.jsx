import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from '@/styles/register.module.css';

const Register = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // useForm hook for form validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    setError('');
    setMessage('');

    const { email, password } = data;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      const { error: dbError } = await supabase
        .from('users')
        .insert([{ email }]);

      if (dbError) {
        setError(dbError.message);
      } else {
        setMessage('Registration successful! Please check your email to verify.');
        router.push('/auth/login'); // Redirect to login
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side (Image) */}
      <Box className={styles.imageContainer}>
        <img src="/doctor_loginn.jpg" alt="Doctor Register" className={styles.image} />
      </Box>

      {/* Right Side (Register Form) */}
      <Container maxWidth="sm" className={styles.formContainer}>
        <Typography className={styles.title}>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleRegister)} className={styles.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Please enter a valid email address',
              }
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            className={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            className={styles.input}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={styles.button}>
            Register
          </Button>

          {message && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              {message}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}
        </Box>

        <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/auth/login" className={styles.link}>
            Login here
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Register;

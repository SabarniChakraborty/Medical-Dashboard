import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import Link from 'next/link';
import styles from '@/styles/register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    const { data: userData, error: dbError } = await supabase
      .from('users')
      .insert([
        {
          email: email,
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      setMessage('Registration successful! Please check your email to verify.');
      router.push('/auth/login'); // Redirect to login
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

        <Box
          component="form"
          onSubmit={handleRegister}
          className={styles.form}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { supabase } from '@/lib/supabaseClient';
// import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
// import Header from '@/layout/header';
// // import Footer from '@/layout/footer';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Step 1: Authenticate the user
//     const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (authError) {
//       setError(authError.message);
//       return;
//     }

//     // Step 2: Fetch the user role from the `users` table
//     const { data: userData, error: dbError } = await supabase
//       .from('users')
//       .select('role')
//       .eq('email', email)
//       .single(); // Use `.single()` to get a single record

//     if (dbError) {
//       setError('Failed to fetch user role. Please try again.');
//       return;
//     }

//     // Step 3: Redirect based on the user's role
//     if (userData.role === 'admin') {
//       router.push('/cms/add-doctors'); // Redirect to admin page
//     } else if (userData.role === 'user') {
//       router.push('/cms/show-doctors'); // Redirect to user dashboard
//     } else {
//       setError('Invalid user role. Please contact support.');
//     }
//   };

  
//   return (
//     <>
//     <Header/>
//     <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleLogin}
//         sx={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: 'white',
//         }}
//       >
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           autoFocus
//           sx={{ backgroundColor: '#fafafa' }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           sx={{ backgroundColor: '#fafafa' }}
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '12px' }}>
//           Login
//         </Button>

//         {error && (
//           <Alert severity="error" sx={{ marginTop: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>
//     </Container>
//     </>
//   );
// };


// export default Login;





import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/styles/login.module.css'; // Import the CSS module
import { Box, TextField, Typography, Container } from '@mui/material';
import Link from 'next/link';
// import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useAuthStore } from '@/lib/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserId, setUserRole } = useAuthStore();

  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      const userId = authData.user.id;
      setUserId(userId);

      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('role')
        .eq('email', email)
        .single();

      if (dbError) {
        setError('Failed to fetch user role. Please try again.');
        return;
      }

      const userRole = userData.role;
      setUserRole(userRole);
      

      
      router.push(userRole === 'admin' ? '/cms/show-doctors' : '/cms/show-doctors');
    } catch (err) {
      console.error('Unexpected error:', err.message);
      setError('Something went wrong. Please try again.');
    }
  };


  return (
    <div className={styles.container}>
      {/* Left Side (Image) */}
      <Box className={styles.imageContainer}>
        <img src="/doctor_loginn.jpg" alt="Doctor Login" className={styles.image} />
      </Box>

      {/* Right Side (Login Form) */}
      <Container maxWidth="sm" className={styles.formContainer}>
        <Typography className={styles.title}>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
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
          <button type="submit" className={styles.button}>
            Login
          </button>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="/auth/register" className={styles.link}>
            Register here
          </Link>
        </Typography>
      </Container>

      {/* Toast Container */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
};

export default Login;

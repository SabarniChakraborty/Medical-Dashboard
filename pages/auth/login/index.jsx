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



import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/login.module.css";
import { Box, TextField, Typography, Container, CircularProgress, Skeleton } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "@/lib/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const { setUserId, setUserRole } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // New state for skeleton loader

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Simulate a page load delay
  useState(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); // Skeleton will show for 1.5 seconds
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (authError) {
        toast.error(authError.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;
      setUserId(userId);

      const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("role")
        .eq("email", data.email)
        .single();

      if (dbError) {
        toast.error("Failed to fetch user role. Please try again.");
        setLoading(false);
        return;
      }

      const userRole = userData.role;
      setUserRole(userRole);
      toast.success(`Welcome ${userRole === "admin" ? "Admin" : "User"}!`);
      router.push(userRole === "admin" ? "/cms/admin-dashboard" : "/cms/show-doctors");
    } catch (err) {
      console.error("Unexpected error:", err.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side (Image) */}
      <Box className={styles.imageContainer}>
        {isPageLoading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <img src="/doctor_loginn.jpg" alt="Doctor Login" className={styles.image} />
        )}
      </Box>

      {/* Right Side (Login Form) */}
      <Container maxWidth="sm" className={styles.formContainer}>
        {isPageLoading ? (
          <>
            <Skeleton variant="text" width="40%" height={40} sx={{ marginBottom: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ marginBottom: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ marginBottom: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginBottom: 2 }} />
            <Skeleton variant="text" width="60%" height={20} />
          </>
        ) : (
          <>
            <Typography className={styles.title}>Login</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
                className={styles.input}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                className={styles.input}
              />
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </button>
            </Box>

            <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
              Don't have an account?{" "}
              <Link href="/auth/register" className={styles.link}>
                Register here
              </Link>
            </Typography>
          </>
        )}
      </Container>
    </div>
  );
};

export default Login;




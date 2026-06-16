import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Grid,
    Paper,
    Avatar,
    IconButton,
    InputAdornment
} from '@mui/material';
import axios from 'axios';
import GoogleAd from './GoogleAd';

const apiUrl = import.meta.env.VITE_API_URL;

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let validationErrors = {};

        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/auth/login`,
                formData
            );

            const data = response.data.data;
            console.log("Login Success:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);
            alert("Login successful!");

            if (data.user.role === "admin") {
                window.location.href = "/users";
            } else {
                window.location.href = "/posts";
            }

        } catch (error) {
            console.error("Login error:", error);

            setErrors({
                email: "Invalid credentials",
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <GoogleAd adSlot="9695308608" />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Paper Container to create a clean card look */}
                <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        width: '100%',
                    }}
                >

                    <Typography component="h1" variant="h5" fontWeight="600" gutterBottom>
                        Sign In
                    </Typography>

                    {/* Form wrapper */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        {/* Email input field */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />

                        {/* Password input field with visibility toggle */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"

                            type='password'
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}













                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2" underline="hover">
                                    {"Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

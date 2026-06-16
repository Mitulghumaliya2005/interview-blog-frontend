import React, { useState } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Grid,
    Paper,
} from "@mui/material";
import axios from "axios";
import GoogleAd from "./GoogleAd";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});

   const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        let validationErrors = {};

        if (!formData.name) {
            validationErrors.name = "Name is required";
        }

        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationErrors.password =
                "Password must be at least 6 characters";
        }

        return validationErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/auth/registerUser`,
                formData
            );

            console.log("User Registered:", response.data);

            alert("Signup successful!");

            navigate("/login")
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <GoogleAd adSlot="9695308608" />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        width: "100%",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        fontWeight="600"
                        gutterBottom
                    >
                        Sign Up
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1, width: "100%" }}
                    >
                        {/* Name */}
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />

                        {/* Email */}
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />

                        {/* Password */}
                        <TextField
                            margin="normal"
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.2,
                                fontWeight: "bold",
                            }}
                        >
                            Sign Up
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
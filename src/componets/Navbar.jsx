import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    // Example: get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = async () => {
        try {
            // await axios.post(`${apiUrl}/auth/logout`);

            // Clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Blog App
                </Typography>

                <Box display="flex" gap={2}>
                    {user?.role === "admin" && (
                        <>
                            {/* <Button
                                color="inherit"
                                component={Link}
                                to="/dashboard"
                            >
                                Dashboard
                            </Button> */}

                            <Button
                                color="inherit"
                                component={Link}
                                to="/users"
                            >
                                Users
                            </Button>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/blogs"
                            >
                                Blogs
                            </Button>

                            <Button
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    {user?.role === "user" && (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/posts"
                            >
                                Posts
                            </Button>

                            <Button
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>

                    )}


                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
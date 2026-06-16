import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleAd from "../componets/GoogleAd";

const apiUrl = import.meta.env.VITE_API_URL;

const UserBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    const getBlogs = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/blog/getBlogs`
            );

            setBlogs(response.data.data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!token) {
            // window.location.href = "/login";
            navigate("/login")
            return;
        }

        if (user?.role !== "user") {
            // window.location.href = "/login"; // or "/posts"
            navigate("/login")
            return;
        }
        getBlogs();
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
            >
                Blogs
            </Typography>
            <GoogleAd adSlot="8857998956" style={{ margin: '18px auto', display: 'block' }} />

            <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                    <Grid item xs={12} md={6} lg={4} key={blog._id}>
                        <Card
                            sx={{
                                height: "100%",
                                boxShadow: 3,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    {blog?.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {blog?.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserBlog;
import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Button,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddBlog from "../componets/AddBlog";

const apiUrl = import.meta.env.VITE_API_URL;

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const navigate = useNavigate()

    // Get Blogs
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

    // Open Add Blog Modal
    const handleAddBlog = () => {
        setSelectedBlog(null);
        setOpen(true);
    };

    // Open Edit Blog Modal
    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setOpen(true);
    };

    // Delete Blog
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${apiUrl}/blog/deleteBlog/${id}`
            );

            setBlogs((prev) =>
                prev.filter((blog) => blog._id !== id)
            );
        } catch (error) {
            console.error("Error deleting blog:", error);
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

        if (user?.role !== "admin") {
            // window.location.href = "/login"; // or "/posts"
            navigate("/login")
            return;
        }

        getBlogs();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">
                    Blogs
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddBlog}
                >
                    Add Blog
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {blogs.map((blog, index) => (
                            <TableRow key={blog._id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>{blog.title}</TableCell>

                                <TableCell>
                                    {blog.content.length > 100
                                        ? `${blog.content.substring(0, 100)}...`
                                        : blog.content}
                                </TableCell>

                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(blog)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddBlog
                open={open}
                onClose={() => setOpen(false)}
                blog={selectedBlog}
                refreshBlogs={getBlogs}
            />
        </div>
    );
};

export default Blogs;
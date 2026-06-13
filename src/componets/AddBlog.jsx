import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AddBlog = ({ open, onClose, blog, refreshBlogs }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || "",
                content: blog.content || "",
            });
        } else {
            setFormData({
                title: "",
                content: "",
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (blog?._id) {
                // Update Blog
                await axios.put(
                    `${apiUrl}/blog/updateBlog/${blog?._id}`,
                    formData
                );
            } else {
                // Create Blog
                await axios.post(
                    `${apiUrl}/blog/addBlog`,
                    formData
                );
            }

            refreshBlogs();
            onClose();
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {blog ? "Edit Blog" : "Add Blog"}
            </DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Content"
                    name="content"
                    multiline
                    rows={6}
                    value={formData.content}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {blog ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBlog;
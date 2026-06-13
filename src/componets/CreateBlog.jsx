import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/blogs",
      formData
    );

    navigate("/admin/blogs");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
        Create Blog
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Content"
          margin="normal"
          value={formData.content}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value,
            })
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Save Blog
        </Button>
      </form>
    </Paper>
  );
};

export default CreateBlog;
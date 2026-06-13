import React, { useState } from "react";
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
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Users = () => {
    const [users, setUsers] = useState([
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
    });
    const navigate = useNavigate()

    // Get Users
    const getUsers = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/user/getUsers`
            );

            console.log(response.data);

            // Adjust according to your API response structure
            setUsers(response.data.users || response.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/updateUser`,
                formData
            );

            console.log("Updated:", response.data);

            setOpen(false);
            getUsers();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    // Edit User
    // const handleEdit = async (user) => {
    //     try {
    //         const payload = {
    //             name: user.name,
    //             email: user.email,
    //             role: user.role,
    //         };

    //         const response = await axios.put(
    //             `${apiUrl}/user/updateUser`,
    //             payload
    //         );

    //         console.log("User Updated:", response.data);

    //         getUsers();
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //     }
    // };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setFormData({
            id: user._id,
            name: user.name,
            email: user.email,
        });
        setOpen(true);
    };


    // Delete User
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `${apiUrl}/user/deleteUser/${id}`
            );

            console.log("User Deleted:", response.data);

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
            );
        } catch (error) {
            console.error("Error deleting user:", error);
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

        getUsers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>

                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Edit User</DialogTitle>

                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdateUser}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Users;
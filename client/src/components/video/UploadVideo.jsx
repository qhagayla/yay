import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../../redux/video/videoSlice';
import { fetchClients } from '../../redux/client/clientSlice';
import { Button, Typography, TextField, Select, MenuItem, Modal, Box } from '@mui/material';
import axios from 'axios';

const UploadVideo = ({ onClose }) => {
    const [caption, setCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.client);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleClientChange = (e) => {
        setSelectedClient(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('video', selectedFile);
        formData.append('client', selectedClient);

        try {
            dispatch(uploadVideo(formData));
            onClose();
        } catch (error) {
            setError('Failed to upload video');
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: '80%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h4" gutterBottom>Upload Video</Typography>
                {error && <Typography className="error-message" variant="body1" color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>Choose Video</Typography>
                    <input
                        id="upload-video"
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        type="text"
                        placeholder="Caption"
                        value={caption}
                        onChange={handleCaptionChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Typography variant="subtitle1" gutterBottom>Select Client</Typography>
                    <Select
                        value={selectedClient}
                        onChange={handleClientChange}
                        fullWidth
                        margin="normal"
                        required
                        style={{ marginTop: '10px' }}
                    >
                        <MenuItem value="">Select Client</MenuItem>
                        {clients.map(client => (
                            <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                        ))}
                    </Select>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '20px' }}>
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Upload</Button>
                        <Button onClick={onClose} variant="outlined">Close</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default UploadVideo;

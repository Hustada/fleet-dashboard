import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  useTheme,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const CreateProjectModal = ({ open, onClose, onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    members: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Active', label: 'Publishing' },
    { value: 'In Progress', label: 'Drafting' },
    { value: 'Planning', label: 'Research' },
  ];

  // Mock team members data - AI agents with specific roles
  const teamMembers = [
    { id: 1, name: 'Research Officer' },
    { id: 2, name: 'Content Officer' },
    { id: 3, name: 'First Officer' },
    { id: 4, name: 'Intelligence Officer' },
    { id: 5, name: 'Chief Engineer' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: 'Just now'
      });
      setFormData({
        name: '',
        description: '',
        status: 'Planning',
        members: [],
      });
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Create New Project</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="project-name"
              name="name"
              label="Project Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
              autoComplete="off"
              inputProps={{
                'aria-label': 'Project name'
              }}
            />
            <TextField
              id="project-description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
              required
              autoComplete="off"
              inputProps={{
                'aria-label': 'Project description'
              }}
            />
            <TextField
              id="project-status"
              name="status"
              select
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              inputProps={{
                'aria-label': 'Project status'
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="project-members"
              name="members"
              select
              label="Team Members"
              value={formData.members}
              onChange={handleChange}
              fullWidth
              SelectProps={{
                multiple: true
              }}
              autoComplete="off"
              inputProps={{
                'aria-label': 'Team members'
              }}
            >
              {teamMembers.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              minWidth: 100,
              position: 'relative',
              '&.Mui-disabled': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProjectModal;

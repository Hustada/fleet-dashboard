import React, { useState } from 'react';
import { Box, Container, Typography, Card, Grid, IconButton, Chip, useTheme, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import CreateProjectModal from '../components/Projects/CreateProjectModal';

// Mock data for projects - replace with real data later
const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'AI-powered data analysis platform with real-time processing capabilities and advanced visualization tools.',
    members: 5,
    status: 'Active',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'Machine learning model optimization framework for distributed computing environments.',
    members: 3,
    status: 'In Progress',
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    name: 'Project Gamma',
    description: 'Natural language processing engine with multi-language support and sentiment analysis.',
    members: 4,
    status: 'Planning',
    lastUpdated: '3 days ago'
  },
  {
    id: 4,
    name: 'Project Delta',
    description: 'Cloud infrastructure automation toolkit with built-in security compliance monitoring.',
    members: 6,
    status: 'Active',
    lastUpdated: '5 hours ago'
  },
  {
    id: 5,
    name: 'Project Epsilon',
    description: 'Edge computing optimization platform for IoT device networks and data processing.',
    members: 4,
    status: 'In Progress',
    lastUpdated: '12 hours ago'
  },
  {
    id: 6,
    name: 'Project Zeta',
    description: 'Distributed database management system with advanced replication and sharding capabilities.',
    members: 5,
    status: 'Planning',
    lastUpdated: '2 days ago'
  },
];

const ProjectCard = ({ project }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          bgcolor: 'background.paper',
          borderRadius: 2,
          minHeight: 200,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary.main" noWrap>
            {project.name}
          </Typography>
          <Chip 
            label={project.status} 
            size="small"
            color={project.status === 'Active' ? 'success' : project.status === 'In Progress' ? 'warning' : 'info'}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.members} members
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.lastUpdated}
            </Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const theme = useTheme();
  const [projectsList, setProjectsList] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (newProject) => {
    setProjectsList(prev => [newProject, ...prev]);
    handleCloseModal();
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FolderOpenIcon 
              sx={{ 
                fontSize: 32, 
                color: theme.palette.primary.main 
              }} 
            />
            <Typography variant="h4" component="h1">
              Projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Add Project
          </Button>
        </Box>

        <Grid container spacing={3}>
          {projectsList.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {isModalOpen && (
        <CreateProjectModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateProject}
        />
      )}
    </Container>
  );
};

export default Projects;

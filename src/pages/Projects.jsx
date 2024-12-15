import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid, 
  IconButton, 
  Chip, 
  useTheme, 
  Button,
  Pagination,
  Stack,
  useMediaQuery 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import CreateProjectModal from '../components/Projects/CreateProjectModal';
import ProjectDetailsModal from '../components/Projects/ProjectDetailsModal';

// Mock data for projects - replace with real data later
const projects = [
  {
    id: 1,
    name: 'Newsletter Series',
    description: 'Weekly tech insights newsletter focusing on AI, productivity, and personal development.',
    members: 3,
    status: 'Active',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Social Media Campaign',
    description: 'Daily content strategy for Twitter and LinkedIn focusing on business and AI insights.',
    members: 2,
    status: 'In Progress',
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    name: 'Blog Series',
    description: 'Deep-dive articles on building AI-powered content systems and personal productivity.',
    members: 3,
    status: 'Planning',
    lastUpdated: '3 days ago'
  },
  {
    id: 4,
    name: 'Video Content',
    description: 'Tutorial series on building personal AI systems and automation workflows.',
    members: 4,
    status: 'Active',
    lastUpdated: '5 hours ago'
  },
  {
    id: 5,
    name: 'Course Creation',
    description: 'Comprehensive course on building personal AI-powered content systems.',
    members: 3,
    status: 'In Progress',
    lastUpdated: '12 hours ago'
  },
  {
    id: 6,
    name: 'Podcast Series',
    description: 'Weekly podcast episodes featuring discussions on AI, productivity, and systems thinking.',
    members: 2,
    status: 'Planning',
    lastUpdated: '1 day ago'
  },
  {
    id: 7,
    name: 'AI Tools Review',
    description: 'In-depth reviews and comparisons of various AI tools and platforms.',
    members: 3,
    status: 'Active',
    lastUpdated: '4 hours ago'
  },
  {
    id: 8,
    name: 'System Templates',
    description: 'Creating reusable templates for content creation and workflow automation.',
    members: 4,
    status: 'In Progress',
    lastUpdated: '6 hours ago'
  },
  {
    id: 9,
    name: 'Case Studies',
    description: 'Documenting success stories and implementation examples of AI content systems.',
    members: 2,
    status: 'Planning',
    lastUpdated: '2 days ago'
  },
  {
    id: 10,
    name: 'Content Library',
    description: 'Building a searchable library of AI and productivity resources.',
    members: 3,
    status: 'Active',
    lastUpdated: '8 hours ago'
  },
  {
    id: 11,
    name: 'Workshop Series',
    description: 'Interactive workshops on building and optimizing content creation systems.',
    members: 4,
    status: 'In Progress',
    lastUpdated: '1 day ago'
  },
  {
    id: 12,
    name: 'Documentation Hub',
    description: 'Comprehensive documentation for Content Fleet systems and processes.',
    members: 3,
    status: 'Planning',
    lastUpdated: '3 days ago'
  },
  {
    id: 13,
    name: 'AI Writing Assistant',
    description: 'Development of custom AI writing tools for content optimization.',
    members: 4,
    status: 'Active',
    lastUpdated: '3 hours ago'
  },
  {
    id: 14,
    name: 'Content Analytics',
    description: 'Building analytics dashboard for content performance tracking.',
    members: 3,
    status: 'In Progress',
    lastUpdated: '9 hours ago'
  },
  {
    id: 15,
    name: 'Research Database',
    description: 'Curated collection of AI and productivity research papers and insights.',
    members: 2,
    status: 'Planning',
    lastUpdated: '4 days ago'
  },
  {
    id: 16,
    name: 'Community Platform',
    description: 'Building an engaged community around AI-powered content creation.',
    members: 4,
    status: 'Active',
    lastUpdated: '7 hours ago'
  },
  {
    id: 17,
    name: 'Content Automation',
    description: 'Developing automated workflows for content distribution and scheduling.',
    members: 3,
    status: 'In Progress',
    lastUpdated: '2 days ago'
  },
  {
    id: 18,
    name: 'Knowledge Base',
    description: 'Creating a structured knowledge base for AI content creation best practices.',
    members: 2,
    status: 'Planning',
    lastUpdated: '5 days ago'
  },
  {
    id: 19,
    name: 'Content Strategy Guide',
    description: 'Comprehensive guide for building effective content strategies with AI.',
    members: 3,
    status: 'Active',
    lastUpdated: '10 hours ago'
  },
  {
    id: 20,
    name: 'Workflow Templates',
    description: 'Collection of pre-built workflows for different content types.',
    members: 4,
    status: 'In Progress',
    lastUpdated: '1 day ago'
  },
  {
    id: 21,
    name: 'Content Repurposing',
    description: 'System for efficiently repurposing content across multiple platforms.',
    members: 3,
    status: 'Planning',
    lastUpdated: '3 days ago'
  },
  {
    id: 22,
    name: 'SEO Optimization',
    description: 'AI-powered SEO optimization tools for content enhancement.',
    members: 2,
    status: 'Active',
    lastUpdated: '6 hours ago'
  },
  {
    id: 23,
    name: 'Content Calendar',
    description: 'Interactive content calendar with AI scheduling suggestions.',
    members: 3,
    status: 'In Progress',
    lastUpdated: '15 hours ago'
  }
];

const ProjectCard = ({ project }) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return theme.palette.success.main;
      case 'In Progress':
        return theme.palette.warning.main;
      case 'Planning':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

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
            sx={{
              backgroundColor: `${getStatusColor(project.status)}15`,
              color: getStatusColor(project.status),
              fontWeight: 'medium',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: `2px solid ${getStatusColor(project.status)}`,
                borderRadius: 'inherit',
                animation: project.status === 'Active' 
                  ? 'pulse 2s infinite' 
                  : project.status === 'In Progress'
                  ? 'pulse 3s infinite'
                  : 'pulse 4s infinite',
                opacity: 0,
              },
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
                '50%': {
                  transform: 'scale(1.3)',
                  opacity: 0,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
              },
            }}
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [projectsList, setProjectsList] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const projectsPerPage = 9;

  // Initialize displayed projects
  useEffect(() => {
    if (isMobile) {
      setDisplayedProjects(projectsList.slice(0, page * projectsPerPage));
    } else {
      setDisplayedProjects(getCurrentPageProjects());
    }
  }, [page, projectsList, isMobile]);

  const getCurrentPageProjects = useCallback(() => {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return projectsList.slice(startIndex, endIndex);
  }, [page, projectsList]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!isMobile) return;

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
    
    if (bottom && displayedProjects.length < projectsList.length) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isMobile, displayedProjects.length, projectsList.length]);

  // Add scroll listener for mobile
  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, handleScroll]);

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCreateProject = (newProject) => {
    setProjectsList(prev => [newProject, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            py: 1,
          }}
        >
          Add Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {(isMobile ? displayedProjects : getCurrentPageProjects()).map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleProjectClick(project)}
            >
              <ProjectCard project={project} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Pagination - only show on desktop */}
      {!isMobile && projectsList.length > projectsPerPage && (
        <Stack 
          spacing={2} 
          sx={{ 
            mt: 4, 
            display: 'flex', 
            alignItems: 'center',
            '& .MuiPagination-ul': {
              padding: '8px',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: `0 0 10px ${theme.palette.primary.main}25`
            }
          }}
        >
          <Pagination
            count={Math.ceil(projectsList.length / projectsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      {/* Loading indicator for mobile infinite scroll */}
      {isMobile && displayedProjects.length < projectsList.length && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          my: 4 
        }}>
          <Typography color="textSecondary">
            Scroll for more projects...
          </Typography>
        </Box>
      )}

      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </Container>
  );
};

export default Projects;

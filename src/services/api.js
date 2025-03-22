import axios from 'axios';

// Use your actual domain name in production
const API_URL = 'https://api.your-domain.com/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Projects API
export const projectsApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (projectData) => {
    try {
      // Handle file upload with FormData
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('github_link', projectData.github_link);
      
      // Add JSON fields as strings
      if (projectData.tech_stack) {
        formData.append('tech_stack', JSON.stringify(projectData.tech_stack));
      }
      
      if (projectData.features) {
        formData.append('features', JSON.stringify(projectData.features));
      }
      
      // Add file if present
      if (projectData.image) {
        formData.append('image', projectData.image);
      }
      
      const response = await axios.post(`${API_URL}/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  
  update: async (id, projectData) => {
    try {
      // Handle file upload with FormData
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('github_link', projectData.github_link);
      
      // Add JSON fields as strings
      if (projectData.tech_stack) {
        formData.append('tech_stack', JSON.stringify(projectData.tech_stack));
      }
      
      if (projectData.features) {
        formData.append('features', JSON.stringify(projectData.features));
      }
      
      // Add file if present
      if (projectData.image) {
        formData.append('image', projectData.image);
      }
      
      const response = await axios.put(`${API_URL}/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/projects/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
  }
};

// Comments API
export const commentsApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/comments');
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  
  create: async (commentData) => {
    try {
      const response = await apiClient.post('/comments', commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/comments/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting comment with id ${id}:`, error);
      throw error;
    }
  }
};

// Certificates API
export const certificatesApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/certificates');
      return response.data;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/certificates/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching certificate with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (certificateData) => {
    try {
      // Handle file upload with FormData
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', certificateData.title);
      formData.append('issuer', certificateData.issuer);
      formData.append('date', certificateData.date);
      
      // Add file if present
      if (certificateData.image) {
        formData.append('image', certificateData.image);
      }
      
      const response = await axios.post(`${API_URL}/certificates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }
  },
  
  update: async (id, certificateData) => {
    try {
      // Handle file upload with FormData
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', certificateData.title);
      formData.append('issuer', certificateData.issuer);
      formData.append('date', certificateData.date);
      
      // Add file if present
      if (certificateData.image) {
        formData.append('image', certificateData.image);
      }
      
      const response = await axios.put(`${API_URL}/certificates/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating certificate with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/certificates/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting certificate with id ${id}:`, error);
      throw error;
    }
  }
};

// Example of using the API in a Projects component
import React, { useEffect, useState } from 'react';
import { projectsApi } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setProjects(data);
        // Also store in localStorage for offline access
        localStorage.setItem("projects", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects. Please try again later.");
        
        // Try to load from localStorage as fallback
        const cachedProjects = localStorage.getItem("projects");
        if (cachedProjects) {
          setProjects(JSON.parse(cachedProjects));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Rest of your component...
};
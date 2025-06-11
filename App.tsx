
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import Login from './components/admin/Login'; 
import ProjectDetailView from './components/ProjectDetailView';
import { SECTION_IDS, INITIAL_USER_INFO, PLACEHOLDER_PROJECTS, SKILLS_LIST, ADMIN_CREDENTIALS } from './constants';
import { UserInfo, Project as ProjectType } from './types';

type View = 'main' | 'projectDetail';

const LOCAL_STORAGE_USER_KEY = 'mursalinPortfolioUserInfo';
const LOCAL_STORAGE_PROJECTS_KEY = 'mursalinPortfolioProjects';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    try {
      const storedUserInfo = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return storedUserInfo ? JSON.parse(storedUserInfo) : INITIAL_USER_INFO;
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
      return INITIAL_USER_INFO;
    }
  });

  const [projects, setProjects] = useState<ProjectType[]>(() => {
    try {
      const storedProjects = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
      return storedProjects ? JSON.parse(storedProjects) : PLACEHOLDER_PROJECTS;
    } catch (error) {
      console.error("Error parsing projects from localStorage:", error);
      return PLACEHOLDER_PROJECTS;
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [currentView, setCurrentView] = useState<View>('main');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Effect to save userInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error saving user info to localStorage:", error);
    }
  }, [userInfo]);

  // Effect to save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Error saving projects to localStorage:", error);
    }
  }, [projects]);


  const handleHashChange = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/project/')) {
      const projectId = hash.substring('#/project/'.length);
      setSelectedProjectId(projectId);
      setCurrentView('projectDetail');
    } else {
      const sectionId = hash.substring(1); 
      if (!sectionId && currentView !== 'main') { 
         setSelectedProjectId(null);
         setCurrentView('main');
         window.scrollTo(0, 0); // Scroll to top when returning to main view
      } else if (currentView !== 'main' && !hash.startsWith('#/project/')) { 
        setSelectedProjectId(null);
        setCurrentView('main');
        setTimeout(() => {
            const targetElement = document.getElementById(sectionId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo(0, 0); // Scroll to top if target not found
            }
        }, 0);
      } else if (sectionId && currentView === 'main') {
        // Smooth scroll for sections when on main view is handled by Navbar
        // This ensures the view is correctly set if hash changes directly
      }
    }
  }, [currentView]);

  useEffect(() => {
    handleHashChange(); 
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);


  useEffect(() => {
    if (isAdminOpen || isLoginOpen || currentView === 'projectDetail') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAdminOpen, isLoginOpen, currentView]);

  const handleUpdateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...newUserInfo }));
  };

  const handleAddProject = (newProject: ProjectType) => {
    setProjects(prev => [{ ...newProject, id: Date.now().toString() }, ...prev]);
  };
  
  const handleToggleAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(!isAdminOpen);
      if (isLoginOpen) setIsLoginOpen(false); 
    } else {
      setIsLoginOpen(true);
      if (isAdminOpen) setIsAdminOpen(false); 
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setIsAdminOpen(true); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  const handleShowProjectDetail = (projectId: string) => {
    window.location.hash = `#/project/${projectId}`;
  };

  const handleCloseProjectDetail = () => {
    // Navigate to projects section if possible, otherwise to home.
    const projectsSectionId = SECTION_IDS.PROJECTS || SECTION_IDS.HOME;
    window.location.hash = projectsSectionId; 
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="flex flex-col min-h-screen bg-light-bg">
      <Navbar 
        onToggleAdmin={handleToggleAdmin} 
        userInfo={userInfo} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        isProjectDetailView={currentView === 'projectDetail'}
      />
      <main className="flex-grow">
        {currentView === 'main' && (
          <>
            <Hero id={SECTION_IDS.HOME} userInfo={userInfo} />
            <About id={SECTION_IDS.ABOUT} userInfo={userInfo} skills={SKILLS_LIST} />
            <Projects 
                id={SECTION_IDS.PROJECTS} 
                projects={projects} 
                githubUsername={userInfo.github.split('/').pop() || 'carlbenda'}
                onProjectClick={handleShowProjectDetail}
            />
            <Contact id={SECTION_IDS.CONTACT} email={userInfo.email} github={userInfo.github} linkedin={userInfo.linkedin} />
          </>
        )}
        {currentView === 'projectDetail' && selectedProject && (
          <ProjectDetailView project={selectedProject} onClose={handleCloseProjectDetail} />
        )}
      </main>
      <Footer userInfo={userInfo} />
      
      {isLoginOpen && !isAuthenticated && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onClose={() => setIsLoginOpen(false)}
          credentials={ADMIN_CREDENTIALS}
        />
      )}

      {isAuthenticated && isAdminOpen && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          currentUserInfo={userInfo}
          onUpdateUserInfo={handleUpdateUserInfo}
          currentProjects={projects}
          onAddProject={handleAddProject}
        />
      )}
    </div>
  );
};

export default App;

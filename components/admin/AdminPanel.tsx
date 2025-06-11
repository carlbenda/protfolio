import React, { useState } from 'react';
import { UserInfo, Project as ProjectType } from '../../types';
import ProjectForm from './ProjectForm';
import ProfileForm from './ProfileForm';
import { XIcon } from '../icons/MenuIcons';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserInfo: UserInfo;
  onUpdateUserInfo: (newUserInfo: Partial<UserInfo>) => void;
  currentProjects: ProjectType[]; 
  onAddProject: (newProject: ProjectType) => void;
}

type AdminTab = 'profile' | 'projects';

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  currentUserInfo,
  onUpdateUserInfo,
  onAddProject,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
    >
      <div className="bg-admin-secondary-bg w-full max-w-3xl h-[90vh] max-h-[800px] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-admin-border">
        <header className="p-5 bg-admin-primary text-white flex justify-between items-center">
          <h2 id="admin-panel-title" className="text-xl font-semibold">Admin Control Panel</h2>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close admin panel"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="border-b border-admin-border">
          <nav className="flex px-2 pt-2 bg-admin-bg">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-3 font-medium text-sm rounded-t-md transition-colors focus:outline-none ${activeTab === 'projects' ? 'bg-admin-secondary-bg text-admin-primary border-t border-x border-admin-border' : 'text-admin-muted-text hover:text-admin-text'}`}
              aria-current={activeTab === 'projects' ? 'page' : undefined}
            >
              Manage Projects
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-3 font-medium text-sm rounded-t-md transition-colors focus:outline-none ${activeTab === 'profile' ? 'bg-admin-secondary-bg text-admin-primary border-t border-x border-admin-border' : 'text-admin-muted-text hover:text-admin-text'}`}
              aria-current={activeTab === 'profile' ? 'page' : undefined}
            >
              Update Profile
            </button>
          </nav>
        </div>

        <main className="flex-grow p-6 overflow-y-auto bg-admin-bg text-admin-text">
          {activeTab === 'projects' && (
            <ProjectForm onAddProject={onAddProject} onClosePanel={onClose} />
          )}
          {activeTab === 'profile' && (
            <ProfileForm 
              currentUserInfo={currentUserInfo} 
              onUpdateUserInfo={onUpdateUserInfo} 
              onClosePanel={onClose}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
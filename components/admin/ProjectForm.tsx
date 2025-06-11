import React, { useState } from 'react';
import { Project as ProjectType } from '../../types';

interface ProjectFormProps {
  onAddProject: (project: ProjectType) => void;
  onClosePanel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject, onClosePanel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  // const [liveUrl, setLiveUrl] = useState(''); // Live URL removed
  const [repoUrl, setRepoUrl] = useState('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      if (e.target.files.length > 5) {
        setError("You can upload a maximum of 5 images.");
        setImageFiles(null);
        setImagePreviews([]);
        e.target.value = ''; 
        return;
      }
      setImageFiles(e.target.files);
      const newPreviews: string[] = [];
      Array.from(e.target.files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            setError("Only image files are allowed.");
            return;
        }
        newPreviews.push(URL.createObjectURL(file));
      });
      setImagePreviews(newPreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!title || !description) {
      setError("Title and Description are required.");
      setIsLoading(false);
      return;
    }

    const imageUrls: string[] = [];
    if (imageFiles) {
      for (const file of Array.from(imageFiles)) {
        if (!file.type.startsWith('image/')) {
            setError("Invalid file type. Only images are allowed.");
            setIsLoading(false);
            return;
        }
        try {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
          });
          imageUrls.push(base64);
        } catch (err) {
          console.error("Error converting image to base64:", err);
          setError("Failed to process one or more images.");
          setIsLoading(false);
          return;
        }
      }
    }
    
    if (imageUrls.length === 0 && imagePreviews.length === 0) {
        imageUrls.push('https://via.placeholder.com/1920x1080.png?text=Project+Image');
    }

    const newProject: ProjectType = {
      id: Date.now().toString(),
      title,
      description,
      imageUrls,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      // liveUrl: liveUrl || undefined, // Live URL removed
      repoUrl: repoUrl || undefined,
    };

    onAddProject(newProject);
    setIsLoading(false);
    onClosePanel(); 
  };

  const inputClass = "w-full px-3 py-2 border border-admin-border rounded-md shadow-sm focus:ring-admin-primary focus:border-admin-primary transition-colors bg-admin-secondary-bg text-admin-text placeholder-admin-muted-text";
  const labelClass = "block text-sm font-medium text-admin-text mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-admin-text mb-3">Add New Project</h3>
      
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}

      <div>
        <label htmlFor="projectTitle" className={labelClass}>Title <span className="text-red-500">*</span></label>
        <input type="text" id="projectTitle" value={title} onChange={e => setTitle(e.target.value)} required 
               className={inputClass} />
      </div>

      <div>
        <label htmlFor="projectDescription" className={labelClass}>Description <span className="text-red-500">*</span></label>
        <textarea id="projectDescription" value={description} onChange={e => setDescription(e.target.value)} rows={4} required
                  className={inputClass}></textarea>
      </div>

      <div>
        <label htmlFor="projectImages" className={labelClass}>Project Screenshots (Max 5, 1920x1080 recommended)</label>
        <input type="file" id="projectImages" multiple accept="image/*" onChange={handleImageChange} 
               className={`w-full text-sm ${labelClass} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-admin-border file:text-sm file:font-medium file:bg-admin-bg file:text-admin-primary hover:file:bg-gray-200 transition-colors cursor-pointer`} />
        {imagePreviews.length > 0 && (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="rounded-md object-cover h-20 w-full shadow-sm border border-admin-border" />
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="projectTags" className={labelClass}>Tags (comma-separated)</label>
        <input type="text" id="projectTags" value={tags} onChange={e => setTags(e.target.value)}
               className={inputClass} />
      </div>

      {/* Live URL input removed */}
      <div>
        <label htmlFor="projectRepoUrl" className={labelClass}>GitHub Repository URL</label>
        <input type="url" id="projectRepoUrl" value={repoUrl} onChange={e => setRepoUrl(e.target.value)}
               className={inputClass} placeholder="https://github.com/yourusername/your-repo"/>
      </div>

      <div className="flex justify-end space-x-3 pt-3">
        <button type="button" onClick={onClosePanel}
                className="px-5 py-2 rounded-md text-sm font-medium text-admin-muted-text hover:bg-gray-200 transition-colors border border-admin-border">
          Cancel
        </button>
        <button type="submit" disabled={isLoading}
                className="px-5 py-2 rounded-md text-sm font-medium text-white bg-admin-primary hover:bg-admin-primary-hover focus:ring-4 focus:ring-admin-primary/50 transition-colors disabled:opacity-60">
          {isLoading ? 'Adding...' : 'Add Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
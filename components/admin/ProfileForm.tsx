import React, { useState, useEffect } from 'react';
import { UserInfo } from '../../types';

interface ProfileFormProps {
  currentUserInfo: UserInfo;
  onUpdateUserInfo: (newUserInfo: Partial<UserInfo>) => void;
  onClosePanel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ currentUserInfo, onUpdateUserInfo, onClosePanel }) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(currentUserInfo.profileImage);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    setProfileImagePreview(currentUserInfo.profileImage);
  }, [currentUserInfo.profileImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMessage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError("Only image files are allowed.");
        setProfileImageFile(null);
        setProfileImagePreview(currentUserInfo.profileImage);
        return;
      }
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!profileImageFile) {
      setError("Please select an image to upload.");
      return;
    }
    
    setIsLoading(true);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(profileImageFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
      onUpdateUserInfo({ profileImage: base64 });
      setSuccessMessage("Profile image updated successfully! Close the panel or refresh the page to see changes on the main site.");
    } catch (err) {
      console.error("Error converting profile image to base64:", err);
      setError("Failed to process the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const labelClass = "block text-sm font-medium text-admin-text mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-admin-text mb-3">Update Profile Image</h3>
      
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
      {successMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md border border-green-300">{successMessage}</p>}

      <div>
        <label htmlFor="profileImageUpload" className={labelClass}>New Profile Image</label>
        <input type="file" id="profileImageUpload" accept="image/*" onChange={handleImageChange} 
               className={`w-full text-sm ${labelClass} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-admin-border file:text-sm file:font-medium file:bg-admin-bg file:text-admin-primary hover:file:bg-gray-200 transition-colors cursor-pointer`} />
      </div>

      {profileImagePreview && (
        <div className="mt-3">
          <p className={`${labelClass} mb-1`}>Image Preview:</p>
          <img src={profileImagePreview} alt="Profile Preview" className="rounded-lg w-40 h-52 object-cover shadow-sm border border-admin-border" />
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-3">
        <button type="button" onClick={onClosePanel}
                className="px-5 py-2 rounded-md text-sm font-medium text-admin-muted-text hover:bg-gray-200 transition-colors border border-admin-border">
          Close
        </button>
        <button type="submit" disabled={isLoading || !profileImageFile}
                className="px-5 py-2 rounded-md text-sm font-medium text-white bg-admin-primary hover:bg-admin-primary-hover focus:ring-4 focus:ring-admin-primary/50 transition-colors disabled:opacity-60">
          {isLoading ? 'Updating...' : 'Update Image'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
// src/hooks/useUpdateProfileData.js
import { useState } from 'react';

const useUpdateProfileData = (profileData, setProfileData) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const updateProfileData = async (updatedData) => {
        setIsUpdating(true);
        try {
            const response = await fetch('/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update profile.');
            }

            setProfileData({...profileData, ...updatedData, password: undefined});
        } catch (error) {
            console.error('Error updating profile data:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateProfileData, isUpdating };
};

export default useUpdateProfileData;

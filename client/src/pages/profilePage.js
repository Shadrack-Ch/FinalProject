import React from 'react';
import ProfileDisplay from '../components/profileDisplay';
import ProfileEditForm from '../components/profileEditForm';
import useFetchProfileData from '../hooks/useFetchProfileData';
import useUpdateProfileData from '../hooks/useUpdateProfileData';

const ProfilePage = () => {
    const { profileData, isLoading } = useFetchProfileData();

    // Note: The updateProfileData function will be passed to the ProfileEditForm.
    // The useUpdateProfileData hook requires the current profile data and a function to set it,
    // which in this case is provided by the useFetchProfileData hook.
    const { updateProfileData } = useUpdateProfileData(profileData, isLoading);

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <ProfileDisplay profileData={profileData} />
            <ProfileEditForm profileData={profileData} updateProfile={updateProfileData} />
        </div>
    );
};

export default ProfilePage;

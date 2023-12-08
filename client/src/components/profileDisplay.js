// src/components/ProfilePage/ProfileDisplay.js
import React from 'react';

const ProfileDisplay = ({ profileData }) => {
    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={profileData.photo || 'placeholder.jpg'} alt="Profile" />
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            {/* Other profile fields */}
        </div>
    );
};

export default ProfileDisplay;

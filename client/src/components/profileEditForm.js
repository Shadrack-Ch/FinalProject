import React, { useState, useEffect } from 'react';

const ProfileEditForm = ({ profileData, updateProfile }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (profileData) {
            setUsername(profileData.username);
            setEmail(profileData.email);
        }
    }, [profileData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile({ username, email, password });
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label><strong>Username:</strong></label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" 
                />
            </div>
            <div>
                <label><strong>Email:</strong></label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                />
            </div>
            <div>
                <label><strong>Password:</strong></label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password" 
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default ProfileEditForm;

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const AccountSettingsPage = () => {
    const router = useRouter();

    const handleSettingsUpdate = () => {
        // Placeholder for actual settings update logic
        alert('Settings updated!');
        router.push('/'); // Redirect to homepage after settings are "updated"
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <p>Customize your account settings here.</p>

            {/* Placeholder settings form */}
            <div className="mt-4">
                {/* Example Setting: Update Profile */}
                <div className="mb-4">
                    <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">Profile Name</label>
                    <input
                        type="text"
                        id="profileName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="Your Name"
                    />
                </div>

                {/* Example Setting: Change Password */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="New Password"
                    />
                </div>

                {/* Update Settings Button */}
                <Button onClick={handleSettingsUpdate}>Update Settings</Button>
            </div>
        </div>
    );
};

export default AccountSettingsPage;

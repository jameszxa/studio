'use server';
/**
 * @fileOverview User service for handling user authentication and account creation.
 *
 * - createUser - Creates a new user in the mock database.
 * - authenticateUser - Authenticates a user against the mock database.
 */

interface User {
  id: string;
  email: string;
  passwordHash: string; // Store password hashes, not plain passwords
}

// This is a mock in-memory database.  Do not use in production.
const users: User[] = [];

// Simple hashing function for demonstration purposes.  Do not use in production.
const hashPassword = (password: string): string => {
  return password + 'hashed';
};

export async function createUser(email: string, passwordPlain: string): Promise<void> {
  const passwordHash = hashPassword(passwordPlain);
  const user: User = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    email: email,
    passwordHash: passwordHash,
  };
  users.push(user);
  console.log('User created:', user); // For debugging purposes
}

export async function authenticateUser(email: string, passwordPlain: string): Promise<User | null> {
  const passwordHash = hashPassword(passwordPlain);
  const user = users.find(u => u.email === email && u.passwordHash === passwordHash);
  return user || null;
}

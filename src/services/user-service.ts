import sha256 from 'crypto-js/sha256';

interface User {
  email: string;
}
export async function createUser(email: string, passwordPlain: string): Promise<void> {
  const hashedPassword = sha256(passwordPlain).toString();
  await localStorage.setItem(email, hashedPassword);
}

export async function authenticateUser(email: string, passwordPlain: string): Promise<User | null> {
    const hashedPassword = sha256(passwordPlain).toString();
    const storedPassword = await localStorage.getItem(email);

    if(storedPassword === hashedPassword){
        return { email };
    } else {
    return null;
    }

    
}

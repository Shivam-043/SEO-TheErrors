
import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SeedAdmin = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        setStatus('Creating user...');
        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, "admin@agency.com", "password123");
            const user = userCredential.user;

            setStatus('User created. Seeding Firestore profile...');

            // 2. Create Firestore User Profile
            await setDoc(doc(db, "users", user.uid), {
                email: "admin@agency.com",
                role: "admin"
            });

            setStatus('Success! Admin created. You can now log in.');
        } catch (error) {
            console.error(error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300 text-center">
            <h3 className="text-sm font-bold text-gray-700 mb-2">🚧 Admin Seeding Tool 🚧</h3>
            <p className="text-xs text-gray-500 mb-4">Creates: admin@agency.com / password123</p>
            <button
                onClick={handleSeed}
                disabled={loading}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Create Master Admin'}
            </button>
            {status && <p className="text-xs mt-2 font-mono text-blue-600">{status}</p>}
        </div>
    );
};

export default SeedAdmin;

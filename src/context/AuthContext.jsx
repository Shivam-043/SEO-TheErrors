
import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useData } from './DataContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { selectClient } = useData();

    useEffect(() => {
        // Firebase Auth Listener
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore "users" collection
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        // Valid user found in Firestore
                        const appUser = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: userData.role,
                            clientId: userData.clientId || null
                        };

                        setUser(appUser);

                        // If client, auto-select their context
                        if (appUser.role === 'client' && appUser.clientId) {
                            selectClient(appUser.clientId);
                        }
                    } else {
                        console.warn("User authenticated but no profile found in Firestore 'users' collection.");
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [selectClient]);

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle the rest
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('seo_portal_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

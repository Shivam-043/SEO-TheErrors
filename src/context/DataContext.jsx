
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import * as initialData from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const { user, loading: authLoading } = useAuth();
    const [activeClientId, setActiveClientId] = useState(localStorage.getItem('seo_portal_active_client') || null);
    const [loading, setLoading] = useState(true);

    // Initial Data Template
    const createClientData = (name, email) => ({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '-')}@seo-portal.com`,
        seoData: JSON.parse(JSON.stringify(initialData)) // Deep copy template
    });

    useEffect(() => {
        if (authLoading) return;

        setLoading(true);
        let unsubscribe = () => { };

        // Role-based subscription
        // Role-based subscription
        if (user?.role === 'client' && user?.email) {
            // Client: Fetch by EMAIL because Auth UID might not match Client Doc ID
            const q = query(collection(db, 'clients'), where('email', '==', user.email));

            unsubscribe = onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const clientDoc = snapshot.docs[0];
                    const clientData = { id: clientDoc.id, ...clientDoc.data() };

                    setClients([clientData]);
                    setActiveClientId(clientDoc.id);
                    // Also ensure localStorage is set so it persists on reload if needed (though we mostly rely on Auth here)
                    localStorage.setItem('seo_portal_active_client', clientDoc.id);
                } else {
                    console.warn("Client logged in but no matching client document found for email:", user.email);
                    setClients([]);
                    setActiveClientId(null);
                }
                setLoading(false);
            }, (error) => {
                console.error("Error fetching client profile:", error);
                setLoading(false);
            });

        } else {
            // Admin or unauthenticated: Fetch ALL clients
            // Maintain 'active' state from localStorage if it exists
            const storedActiveId = localStorage.getItem('seo_portal_active_client');
            if (storedActiveId) {
                setActiveClientId(storedActiveId);
            }

            unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot) => {
                const clientList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setClients(clientList);
                setLoading(false);

                // Data Integrity Check
                const currentStoredId = localStorage.getItem('seo_portal_active_client');
                if (currentStoredId && !clientList.find(c => c.id === currentStoredId)) {
                    setActiveClientId(null);
                    localStorage.removeItem('seo_portal_active_client');
                }

            }, (error) => {
                console.error("Error fetching clients: ", error);
                setLoading(false);
            });
        }

        return () => unsubscribe();
    }, [user, authLoading]);

    const addClient = async (name, email) => {
        try {
            const newClientData = createClientData(name, email);
            const docRef = await addDoc(collection(db, 'clients'), newClientData);
            return docRef.id;
        } catch (e) {
            console.error("Error adding client: ", e);
        }
    };

    const removeClient = async (id) => {
        try {
            await deleteDoc(doc(db, 'clients', id));
            if (activeClientId === id) {
                setActiveClientId(null);
                localStorage.removeItem('seo_portal_active_client');
            }
        } catch (e) {
            console.error("Error deleting client: ", e);
        }
    };

    const updateData = async (newSeoData) => {
        if (!activeClientId) return;
        try {
            const clientRef = doc(db, 'clients', activeClientId);
            // Updating the entire seoData object. 
            // In a larger app, we would use dot notation for partial updates (e.g. "seoData.traffic") to save bandwidth.
            await updateDoc(clientRef, { seoData: newSeoData });
        } catch (e) {
            console.error("Error updating client data: ", e);
        }
    };

    const updateClientProfile = async (id, updates) => {
        try {
            const clientRef = doc(db, 'clients', id);
            await updateDoc(clientRef, updates); // { name: '...', logo: '...' }
        } catch (e) {
            console.error("Error updating client profile: ", e);
            throw e;
        }
    };

    const selectClient = (id) => {
        // We allow selecting a client ID even if it hasn't loaded in the list yet 
        // (to support auth flows where we get the ID before the list),
        // but generally we should check existence.
        setActiveClientId(id);
        localStorage.setItem('seo_portal_active_client', id);
    };

    // Derived state
    // We safeguard against the client list not being loaded yet or the active ID being invalid
    const activeClient = clients.find(c => c.id === activeClientId);
    const data = activeClient ? activeClient.seoData : null;

    return (
        <DataContext.Provider value={{
            data,
            activeClient,
            clients,
            loading,
            updateData,
            updateClientProfile,
            addClient,
            removeClient,
            selectClient
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/auth/current_user");
                if (response.ok) {
                    const text = await response.text();
                    const data = text ? JSON.parse(text) : null;

                    if (data && data._id) {
                        setUser(data);
                    } else {
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

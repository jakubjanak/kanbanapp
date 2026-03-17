import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextValue {
    user: User | null;
    isGuest: boolean;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    continueAsGuest: () => void;
    leaveGuest: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(() => localStorage.getItem("kanban-guest") === "true");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                // Logged in — clear guest flag
                localStorage.removeItem("kanban-guest");
                setIsGuest(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const signInWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithEmail = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    const continueAsGuest = () => {
        localStorage.setItem("kanban-guest", "true");
        setIsGuest(true);
    };

    const leaveGuest = () => {
        localStorage.removeItem("kanban-guest");
        setIsGuest(false);
    };

    return (
        <AuthContext.Provider value={{ user, isGuest, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, continueAsGuest, leaveGuest }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

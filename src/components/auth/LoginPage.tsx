import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, continueAsGuest } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Nastala chyba.";
            if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
                setError("Špatný e-mail nebo heslo.");
            } else if (msg.includes("email-already-in-use")) {
                setError("Tento e-mail je již použit.");
            } else if (msg.includes("weak-password")) {
                setError("Heslo musí mít alespoň 6 znaků.");
            } else {
                setError("Nastala chyba. Zkuste to znovu.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError("");
        try {
            await signInWithGoogle();
        } catch {
            setError("Přihlášení přes Google selhalo.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center gap-3 justify-center mb-8">
                    <div className="w-2 h-10 bg-kanban-accent rounded-full"></div>
                    <h1 className="text-2xl font-semibold text-kanban-text">Kanban App</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-kanban-border p-8">
                    <h2 className="text-xl font-semibold text-kanban-text mb-1">
                        {isSignUp ? "Vytvořit účet" : "Přihlásit se"}
                    </h2>
                    <p className="text-sm text-kanban-muted mb-6">
                        {isSignUp ? "Zadejte své údaje pro registraci." : "Přihlaste se ke svému účtu."}
                    </p>

                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-kanban-border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer font-medium text-kanban-text mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Pokračovat přes Google
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-kanban-border"></div>
                        <span className="text-xs text-kanban-muted">nebo</span>
                        <div className="flex-1 h-px bg-kanban-border"></div>
                    </div>

                    {/* Email form */}
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-kanban-text mb-1.5">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="vas@email.cz"
                                className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-kanban-text mb-1.5">Heslo</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent transition-all"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Načítám..." : isSignUp ? "Vytvořit účet" : "Přihlásit se"}
                        </button>
                    </form>

                    <p className="text-sm text-center text-kanban-muted mt-6">
                        {isSignUp ? "Již máte účet?" : "Nemáte účet?"}{" "}
                        <button
                            onClick={() => { setIsSignUp(prev => !prev); setError(""); }}
                            className="text-kanban-accent hover:underline cursor-pointer font-medium"
                        >
                            {isSignUp ? "Přihlásit se" : "Registrovat se"}
                        </button>
                    </p>
                </div>

                <button
                    onClick={continueAsGuest}
                    className="w-full mt-4 px-4 py-3 text-sm text-kanban-muted hover:text-kanban-text transition-colors cursor-pointer text-center"
                >
                    Pokračovat jako host →
                </button>
            </div>
        </div>
    );
}

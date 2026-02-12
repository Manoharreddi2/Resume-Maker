import { useState } from "react";
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    googleProvider,
    signInWithPopup,
} from "../firebase";
import { Mail, Lock, LogIn, UserPlus, AlertCircle, Loader2 } from "lucide-react";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(
                err.code === "auth/user-not-found"
                    ? "No account found with this email"
                    : err.code === "auth/wrong-password"
                        ? "Incorrect password"
                        : err.code === "auth/email-already-in-use"
                            ? "An account with this email already exists"
                            : err.code === "auth/weak-password"
                                ? "Password should be at least 6 characters"
                                : err.code === "auth/invalid-email"
                                    ? "Invalid email address"
                                    : "Authentication failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error("Google Sign-In Error:", err.code, err.message);
            setError(
                err.code === "auth/popup-closed-by-user"
                    ? "Sign-in popup was closed"
                    : `Google sign-in failed: ${err.code || err.message}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] p-4">
            <div className="animate-fade-in w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-white">R</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
                        Resume Maker
                    </h1>
                    <p className="text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] mt-2">
                        Build professional resumes in minutes
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-xl border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] p-8">
                    {/* Toggle Tabs */}
                    <div className="flex bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] rounded-xl p-1 mb-6">
                        <button
                            onClick={() => { setIsLogin(true); setError(""); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${isLogin
                                ? "bg-[var(--color-primary)] text-white shadow-md"
                                : "text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-text-light)] dark:hover:text-[var(--color-text-dark)]"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(""); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${!isLogin
                                ? "bg-[var(--color-primary)] text-white shadow-md"
                                : "text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-text-light)] dark:hover:text-[var(--color-text-dark)]"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]"
                            />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] placeholder:text-[var(--color-muted-light)] dark:placeholder:text-[var(--color-muted-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] placeholder:text-[var(--color-muted-light)] dark:placeholder:text-[var(--color-muted-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : isLogin ? (
                                <>
                                    <LogIn size={18} /> Sign In
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} /> Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-[var(--color-border-light)] dark:bg-[var(--color-border-dark)]"></div>
                        <span className="text-xs text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] font-medium">OR</span>
                        <div className="flex-1 h-px bg-[var(--color-border-light)] dark:bg-[var(--color-border-dark)]"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-white dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] font-semibold hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] text-xs mt-6">
                    Your data is securely stored with Firebase
                </p>
            </div>
        </div>
    );
}

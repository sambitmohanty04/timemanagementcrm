import { useState, type FormEvent } from "react";
import {
    CheckCircle2,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-slate-700/10 shadow-2xl">

                <div className="grid min-h-[450px] md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="relative hidden overflow-hidden bg-slate-800 p-10 text-white md:flex md:flex-col md:justify-between">

                        {/* Background decoration */}
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-slate-900 opacity-40" />

                        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-slate-900 opacity-40" />

                        {/* Logo */}
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                                <Clock3 size={24} />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold">
                                    SB CRM
                                </h1>

                                <p className="text-sm text-indigo-200">
                                    Time & Workspace
                                </p>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="relative z-10 max-w-md">

                            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
                                Manage your time better
                            </p>

                            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                                Make every minute
                                <span className="block text-indigo-200">
                                    count.
                                </span>
                            </h2>

                            <p className="mt-6 text-base leading-7 text-indigo-100">
                                Organize your tasks, manage projects, track your
                                productivity and achieve your goals from one
                                powerful workspace.
                            </p>

                            {/* Features */}
                            <div className="mt-8 space-y-2">

                                <div className="flex items-center gap-3">
                                    <CheckCircle2
                                        size={20}
                                        className="text-indigo-200"
                                    />

                                    <span>
                                        Manage your daily tasks
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2
                                        size={20}
                                        className="text-indigo-200"
                                    />

                                    <span>
                                        Track your productivity
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2
                                        size={20}
                                        className="text-indigo-200"
                                    />

                                    <span>
                                        Achieve your goals faster
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="relative z-10 text-sm text-indigo-200">
                            © 2026 Chronos CRM. All rights reserved.
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

                        <div className="w-full max-w-md">

                            {/* Mobile logo */}
                            <div className="mb-8 flex items-center gap-3 md:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                    <Clock3 size={21} />
                                </div>

                                <div>
                                    <h1 className="font-bold text-slate-900">
                                        SB CRM
                                    </h1>

                                    <p className="text-xs text-slate-500">
                                        Time & Workspace
                                    </p>
                                </div>
                            </div>

                            {/* Heading */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-slate-200">
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-sm text-slate-400">
                                    Sign in to continue to your workspace.
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-500">
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={19}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email"
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                            required
                                        />

                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">

                                        <label className="text-sm font-medium text-slate-500">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

                                    <div className="relative">

                                        <Lock
                                            size={19}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-500 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (previous) => !previous
                                                )
                                            }
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={19} />
                                            ) : (
                                                <Eye size={19} />
                                            )}
                                        </button>

                                    </div>
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center gap-2">

                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />

                                    <label
                                        htmlFor="remember"
                                        className="text-sm text-slate-500"
                                    >
                                        Remember me
                                    </label>

                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Signing in..."
                                        : "Sign In"}
                                </button>

                            </form>

                            {/* Register */}
                            <div className="mt-8 text-center">

                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/register")
                                        }
                                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                                    >
                                        Create account
                                    </button>
                                </p>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
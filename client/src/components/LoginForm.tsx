import { useState } from 'react';

interface LoginFormProps {
    onLoginSuccess: (email: string, password: string) => void;
    defaultEmail: string;
    defaultPassword: string;
}

const LoginForm = ({ onLoginSuccess, defaultEmail, defaultPassword }: LoginFormProps) => {
    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess(email, password);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-full flex items-center justify-center border-r border-gray-200">
            <div className="w-full px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 mx-auto">

                    {/* <div className="p-6 space-y-4 md:space-y-6 sm:p-8"> */}
                    <div className="p-8 space-y-6 sm:p-10">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign in to demo
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="text-left">
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="name@company.com"
                                    disabled
                                    required
                                />
                            </div>
                            <div className="text-left">
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Enter your password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            {/* <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all active:scale-95 shadow-lg"
                            >
                                Login
                            </button> */}
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
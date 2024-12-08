// Login.tsx
import React, { useState } from "react";
import axios from "axios";

interface Credentials {
  login: string;
  password: string;
}

interface ApiError {
  message: string;
  data?: {
    error?: string;
  };
}

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    login: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);


    try {
      const response = await axios.post<{ token: string }>(
        "http://localhost:8069/api/signin",
        credentials
      );
      console.log(response);

      if (!response.data) {
        throw new Error("No response from server");
      }

      const result = response.data.result;

      // Check for various error scenarios
      if (result?.data?.error || result?.error) {
        const errorMessage = result.message || result.data?.error || "Authentication failed";
        setError(errorMessage);
        return;
      }
      // Success path
      const token = result.data?.token;
      if (!token) {
        throw new Error("No token received");
      }

      console.log(token);
      localStorage.setItem("token", token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      window.location.href = "/events";

    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">Sign In</h2>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Username"
              value={credentials.login}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  login: e.target.value,
                })
              }
            />
          </div>

          <div>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

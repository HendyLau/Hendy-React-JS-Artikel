import React from "react";

const SocialLogin = () => {
  const handleLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  
  return (
    <div className="space-y-4">
      <button
        onClick={() => handleLogin("google")}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Login dengan Google
      </button>
      <button
        onClick={() => handleLogin("facebook")}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login dengan Facebook
      </button>
    </div>
  );
};

export default SocialLogin;

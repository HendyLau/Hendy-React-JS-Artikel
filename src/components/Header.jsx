

import React, { useEffect, useState } from "react";
import { getUser } from "../services/auth";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Portal Berita Dan Video Terkini</h1>

      <div>
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;



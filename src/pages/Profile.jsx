import React, { useEffect, useState } from "react";
import { getUser } from "../services/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>
      {user ? (
        <div className="space-y-2">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Membership:</strong> {user.membership_type}</p>
        </div>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
};

export default Profile;

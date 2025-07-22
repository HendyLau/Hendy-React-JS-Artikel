// src/components/Footer.jsx
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-blue-600 py-6 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h4 className="text-gray-800 font-semibold mb-2">Tentang Kami</h4>
          <p>
            Portal Berita dan VideoTerkini adalah portal independen yang menyajikan informasi aktual, terpercaya, dan tajam.
          </p>
        </div>

       
        <div>
          <h4 className="text-gray-800 font-semibold mb-2">Kontak</h4>
          <p>Email: redaksi@beritaterkini.com</p>
          <p>Instagram: @beritaterkini</p>
          <p>Twitter: @beritaterkini_id</p>
        </div>
      </div>

      <div className="mt-6 text-l font-bold text-center text-gray-800">
        &copy; {new Date().getFullYear()} Berita Terkini. Hendy-All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

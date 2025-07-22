import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children,user  }) => (
  <>
       <Header user={user} />
    <Navbar />
    <main className="bg-gray-100 min-h-screen py-6 px-4">{children}</main>
      <Footer />
  </>
);

export default MainLayout;

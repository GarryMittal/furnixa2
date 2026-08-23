import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

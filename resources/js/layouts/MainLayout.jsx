import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
    return (
        <div>
            <Navbar></Navbar>
            <main className="my-8">{children}</main>
            <Footer></Footer>
        </div>
    );
}

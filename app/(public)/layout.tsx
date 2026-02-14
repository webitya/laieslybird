import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import PopupManager from "@/components/PopupManager";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="relative w-full overflow-x-hidden">
                <BreakingNewsTicker />
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </div>
            <PopupManager />
        </>
    );
}

// components/layout/Layout.tsx
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

type LayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
};

function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;

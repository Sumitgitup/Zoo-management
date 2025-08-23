import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

//Hook for listening to media queries
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const location = useLocation();

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "Animals", path: "/animals" },
    { label: "Enclosure", path: "/enclosure" },
    { label: "Pricing", path: "/pricing" },
  ];

  const extraLinks = [
    { label: "Admin Login", path: "/admin" },
    { label: "Enquiries", path: "/enquiries" },
  ];

  const drawerLinks = isMobile ? [...mainLinks, ...extraLinks] : extraLinks;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-100 bg-white font-[Poppins,sans-serif]">
      <nav className="container mx-auto 2xl:px-20 px-5 py-5 relative border-b shadow-2xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-lg lg:text-2xl">
            ZooLogo
          </Link>

          <ul className="hidden sm:flex gap-10 md:gap-20 lg:text-lg">
            {mainLinks.map((link) => (
              <li key={link.label} className="relative group">
                <Link
                  to={link.path}
                  className={`relative pb-1 ${
                    location.pathname === link.path ? "text-green-600" : ""
                  }`}
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-0 w-full h-0.5 bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          <button onClick={() => setIsOpen(true)} className="cursor-pointer">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="font-bold lg:text-xl">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-5 lg:text-lg">
            {drawerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`${
                    location.pathname === link.path
                      ? "text-green-600 font-semibold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

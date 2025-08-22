import { useState, useEffect } from "react";
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
  const mainLinks = [
    { label: "Home", href: "#" },
    { label: "Animals", href: "#" },
    { label: "Enclosure", href: "#" },
    { label: "Pricing", href: "#" },
  ];
  const extraLinks = [
    { label: "Admin Login", href: "#" },
    { label: "Enquiries", href: "#" },
  ];

  const drawerLinks = isMobile ? [...mainLinks, ...extraLinks] : extraLinks;

  return (
    <header className="fixed top-0 right-0 left-0 z-100 bg-white">
      <nav className="container mx-auto 2xl:px-20 px-5 py-5 relative">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold text-lg">
            ZooLogo
          </a>
          <ul className="hidden sm:flex gap-20">
            {mainLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsOpen(true)}>
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
            <h2 className="font-bold text-lg">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 p-5">
            {drawerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

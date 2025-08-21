import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

//  Hook for listening to media queries
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

function Home() {
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
    <div>
      <header className=" fixed top-0 right-0 left-0 z-100 bg-white">
        <nav className=" container mx-auto lg:px-10 px-5 py-5 relative">
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
      <section id="Hero">
        <div>
          <div className="relative h-screen w-full overflow-hidden">
            <video
              src="/banner.mp4"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover"
            />

            <div className="relative z-10 my-50 flex flex-col justify-center items-center h-full text-center text-white px-4">
              <motion.h1
                className="text-6xl font-bold mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                transition={{ duration: 1 }}
              >
                Welcome to Wildlife Zoo!
              </motion.h1>
              <motion.p
                className="text-xl mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Explore animals, habitats, and adventures!
              </motion.p>
              <motion.button
                className="px-6 py-3 bg-green-600 rounded-2xl hover:bg-green-700 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Explore Now
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      <footer className="z-20 pb-10 bg-gray-800 text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:justify-items-center py-10  border-b ">
          <div>
            <p className="font-bold">Visit</p>
            <ul className="hidden md:block text-sm font-medium">
              <li>Plan your day</li>
              <li>Zoo Map</li>
              <li>Annual Memberships</li>
              <li>Explore the Zoo</li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Things to do</p>
            <ul className="hidden md:block text-sm font-medium">
              <li>Close Encounters</li>
              <li>Holiday Programme</li>
              <li>Learning Programmes</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Animal Care</p>
            <ul className="hidden md:block text-sm font-medium">
              <li>Saving Wildlife & Wild Places</li>
              <li>Green Zoo Green You</li>
              <li>Animal Diets</li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Support Us</p>
            <ul className="hidden md:block text-sm font-medium">
              <li>Partner with Us</li>
              <li>Donate</li>
              <li>Leave a legacy</li>
            </ul>
          </div>
          <div>
            <p className="font-bold">About</p>
            <ul className="hidden md:block text-sm font-medium">
              <li>About our Zoo</li>
              <li>News</li>
              <li>Careers</li>
              <li>Our people</li>
              <li>Our corporate partners</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

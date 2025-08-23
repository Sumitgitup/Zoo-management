import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { TheWildLife } from "@/components/cards/TheWildLife";
import { TheWildLifeV2 } from "@/components/cards/TheWildLifeV2";
import { useState } from "react";

const theWildLife = [
  {
    description:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    type: "Mammals",
    enclosure: "Product Manager at TechFlow",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiRyyOVz9_EJPhASjdmh6RA8Eye4dIhhtjRw&s",
  },
  {
    description:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    type: "Mammals",
    enclosure: "CTO at InnovateSphere",
    src: "https://preview.redd.it/wpslf6wpt1901.jpg?width=1080&crop=smart&auto=webp&s=bc8f89a0cae47cec661fc1ae0c0d8ecfe185941e",
  },
  {
    description:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    type: "Mammals",
    enclosure: "Operations Director at CloudScale",
    src: "https://bear.org/wp-content/uploads/2023/03/Griz-family-danger-ahead-1024x701.jpg",
  },
  {
    description:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    type: "Mammals",
    enclosure: "Engineering Lead at DataPro",
    src: "https://outforia.com/wp-content/uploads/2022/11/are-birds-mammals-1122.jpg",
  },
];

function Home() {
  const [isExplored, setIsExplored] = useState(false);

  const handleExplore = () => {
    setIsExplored(true);
  };

  const handleBackToHero = () => setIsExplored(false);

  return (
    <div>
      <Header onHomeClick={handleBackToHero} />
      {!isExplored && (
        <section id="Hero">
          <div>
            <div
              className={`${
                !isExplored ? "fixed inset-0" : "relative"
              }  h-screen w-full overflow-hidden`}
            >
              <video
                src="/banner.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="relative z-10 my-50 flex flex-col justify-end-safe items-center h-1/2 text-center text-white px-4">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  Welcome to Wildlife Zoo!
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-lg md:text-xl mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Explore animals, habitats, and adventures!
                </motion.p>
                <motion.button
                  className="px-3 md:px-4 py-2 md:py-3 bg-green-600 text-sm md:text-inherit rounded-lg hover:bg-green-700 "
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={handleExplore}
                >
                  Explore Now
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      )}
      {isExplored && (
        <section>
          <div className="container mx-auto border-t my-10">
            <div className="  text-center mt-20">
              <h1 className="text-2xl md:text-3xl font-bold">The Wildlife</h1>
              <p className="text-sm md:text-base">
                Discover amazing animals from around the world in their natural
                habitats
              </p>
            </div>
            <TheWildLife theWildLife={theWildLife} autoplay />
            <TheWildLifeV2 theWildLife={theWildLife} autoplay />
            <TheWildLife theWildLife={theWildLife} autoplay />
            <TheWildLifeV2 theWildLife={theWildLife} autoplay />
          </div>
          <Footer />
        </section>
      )}
    </div>
  );
}

export default Home;

import { EnclosureCard } from "@/components/cards/EnclosureCard";
import Layout from "@/layouts/Layout";

const enclosureData = {
  safari: {
    title: "Safari Zone",
    description:
      "Step into the wild where adventure begins and nature comes alive.",
    src: "https://www.corbettnationalparkindia.in/assets/images/tourpackages/jungle-safari-tour-package2-new.webp",
  },
  birdSanctuary: {
    title: "Bird Sanctuary",
    description:
      "A peaceful haven to observe and enjoy diverse birds in their natural habitat.",
    src: "https://s7ap1.scene7.com/is/image/incredibleindia/kumarakom-bird-sanctuary-kumarakom-kerala-5-attr-hero?qlt=82&ts=1727367820912",
  },
  reptileHouse: {
    title: "Reptile House",
    description:
      "Explore fascinating reptiles in lifelike habitats, from snakes to turtles.",
    src: "https://a-z-animals.com/media/2022/06/boelens-python-picture-id522727888.jpg",
  },
};

function Enclosure() {
  return (
    <Layout showFooter={true}>
      <section>
        <div className="container mx-auto px-5 2xl:px-5 my-30">
          <div className="text-center w-3/4 mx-auto">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold my-5">
              Welcome to our animal enclosures! 🦁🐘
            </h1>
            <p className="text-sm sm:text-base">
              Each enclosure is designed to provide a safe, natural, and
              comfortable habitat for our animals while giving you an up-close
              and unforgettable experience. Explore different zones to learn
              about the animals, their lifestyles, and the care we provide to
              keep them happy and healthy.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start my-36">
            <div>
              <EnclosureCard
                enclosureData={enclosureData.safari}
                routeLink="safari-zone"
              />
            </div>
            <div className="px-5 ml-10 mt-10 lg:mt-0 w-auto md:w-md flex flex-col justify-between items-start gap-5">
              <h2 className="text-lg font-bold">Safari Zone</h2>
              <p>
                Step into a realm where nature thrives untamed. Towering trees,
                hidden trails, and the whispers of wildlife invite you to
                explore the wilderness like never before. Whether you seek
                adventure, tranquility, or the thrill of discovery, the Safari
                Zone is your gateway to the wild — a place where every path
                leads to a new story.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse justify-around items-center lg:items-start my-36">
            <div>
              <EnclosureCard
                enclosureData={enclosureData.birdSanctuary}
                routeLink="bird-sanctuary"
              />
            </div>
            <div className="px-5 ml-10 mt-10 lg:mt-5 w-auto md:w-md flex flex-col justify-between items-start gap-5">
              <h2 className="text-lg font-bold">Bird Sanctuary</h2>
              <p>
                A peaceful haven where nature’s finest aviators take flight.
                Explore diverse species in their natural habitats, from colorful
                parrots to elegant waterfowl. Walk along tranquil trails, enjoy
                bird-watching spots, and immerse yourself in the songs of the
                wild. Perfect for nature lovers, photographers, and anyone
                seeking a serene escape.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start my-36">
            <div>
              <EnclosureCard
                enclosureData={enclosureData.reptileHouse}
                routeLink="reptile-house"
              />
            </div>
            <div className="px-5 ml-10 mt-10 lg:mt-0 w-auto md:w-md flex flex-col justify-between items-start gap-5">
              <h2 className="text-lg font-bold">Reptile House</h2>
              <p>
                Step into a world of scales and slithers! Discover fascinating
                reptiles from around the globe, including snakes, lizards,
                turtles, and more. Learn about their unique adaptations,
                behaviors, and habitats while exploring carefully designed
                enclosures that bring you closer to these cold-blooded wonders.
                An exciting and educational experience for all ages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Enclosure;

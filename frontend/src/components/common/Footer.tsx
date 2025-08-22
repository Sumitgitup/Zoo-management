function Footer() {
  return (
    <footer className="z-20 2xl:px-20 px-5 py-20">
      <div className="container mx-auto pb-5 border-b border-black grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10 justify-between">
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
  );
}

export default Footer;

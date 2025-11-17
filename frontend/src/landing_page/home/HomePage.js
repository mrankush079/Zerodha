import React from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomePage() {
  return (
    <main className="homepage">
      {/*  Navbar and Footer are optional if handled globally */}
     {/* <Navbar /> */}

      {/*  Modular sections */}
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />

      {/* <Footer /> */}
    </main>
  );
}

export default HomePage;
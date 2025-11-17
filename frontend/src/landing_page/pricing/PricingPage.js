import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";

function PricingPage() {
  return (
    <main className="pricing-page">
      <Hero />
      <OpenAccount />
      <Brokerage />
    </main>
  );
}

export default PricingPage;
import React from "react";
// import Slider from "./components/Slider";
import BenefitsSection from "./components/BenefitsSection";
import Collections from "./components/Collections";
import Header from "./components/Header";
import DenimCollection from "./components/DenimCollection";
import PromotionalSection from "./components/PromotionalSection";
import ProductSection from "./components/ProductSection";
import Quote from "./components/Quote";
import CustomMarquee from "./components/CustomMarquee";
import TrandSection from "./components/TrandSection";

const App = () => {
  return (
    <div>

      {/* slider components */}
      {/* <Slider /> */}

      {/* Header Components */}
      <Header />

      {/* Marquee components */}
      <CustomMarquee />

      {/* BenefitsSection components */}
      <BenefitsSection />

      {/* collections components */}
      <Collections />
            
      {/* DenimCollection compponents */}
      <DenimCollection />

      {/* promotionalssection components */}
      <PromotionalSection />

      {/* trandsection components */}
      <TrandSection />

      {/* ProductSection components */}
      <ProductSection /> 

      {/* Quote section */}
      <Quote />

    </div>
    
  );
};

export default App;
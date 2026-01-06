
import PropertiesHeader from "./components/PropertiesHeader";
import PropertiesFeaturedSlider from "./components/PropertiesFeaturedSlider";
import PropertiesExclusiveListing from "./components/PropertiesExclusiveListing";
import PropertiesStepGuide from "./components/PropertiesStepGuide";
import WhyChooseUs from "../routes/WhyChooseUs/WhyChooseUs";

const Properties = () => {
  return (
    <>
      <PropertiesHeader />
      <PropertiesFeaturedSlider />
      <PropertiesExclusiveListing />
      <PropertiesStepGuide />
      <WhyChooseUs />
    </>
  );
};

export default Properties;

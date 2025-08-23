import Layout from "@/layouts/Layout";
import { PricingComp } from "@/components/pricing-comp";

function Pricing() {
  return (
    <Layout>
      <section>
        <div className="container mx-auto">
          <PricingComp />
        </div>
        ;
      </section>
    </Layout>
  );
}

export default Pricing;

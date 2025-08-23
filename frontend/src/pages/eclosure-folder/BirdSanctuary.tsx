import { EnclosureFocusCards } from "@/components/cards/EnclosureFocusCards";
import Layout from "@/layouts/Layout";

function BirdSanctuary() {
  return (
    <Layout>
      <section>
        <div>
          <div></div>
          <div className="mt-30">
            <EnclosureFocusCards />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BirdSanctuary;

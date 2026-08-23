
import { useHomeCatalog } from "../hooks/useHomeCatalog";
import { HomeHero } from "../components/HomeHero";
import { CategoryGrid } from "../components/CategoryGrid";

function HomePage() {
  const {
   
    categories,
    categoryChipsLoading,
   
  } = useHomeCatalog();

  return (
    <div className="space-y-16">
      <HomeHero />

      <CategoryGrid categories={categories} loading={categoryChipsLoading} />
    
    </div>
  );
}

export default HomePage;

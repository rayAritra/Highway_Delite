import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ExperienceCard } from "@/components/ExperienceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { experiences, categories } from "@/data/experiences";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const matchesCategory =
        selectedCategory === "All" || exp.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} initialSearch={searchQuery} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Experiences</h1>
          <p className="text-muted-foreground">
            Find your next adventure with curated small-group experiences
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              showHost={true}
            />
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No experiences found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

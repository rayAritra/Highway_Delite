import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Experience } from "@/data/experiences";

interface ExperienceCardProps {
  experience: Experience;
  showHost?: boolean;
}

export const ExperienceCard = ({ experience, showHost = false }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
        {showHost && (
          <Badge className="absolute bottom-2 left-2 bg-accent hover:bg-accent">
            {experience.hostName}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg">{experience.title}</h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {experience.location}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{experience.rating}</span>
              <span className="text-muted-foreground">({experience.reviewCount})</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">From </span>
              <span className="text-lg font-bold">₹{experience.price}</span>
            </div>
          </div>

          <Button 
            onClick={() => navigate(`/experience/${experience.id}`)}
            size="sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

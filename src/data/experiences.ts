import kayakingMangrove from "@/assets/kayaking-mangrove.jpg";
import kayakingLake from "@/assets/kayaking-lake.jpg";
import nandiHills from "@/assets/nandi-hills-sunrise.jpg";
import coffeeTrail from "@/assets/coffee-trail-coorg.jpg";
import boatCruise from "@/assets/boat-cruise.jpg";
import bungeeJumping from "@/assets/bungee-jumping.jpg";

export interface TimeSlot {
  time: string;
  availableSeats: number;
  bookedSeats: number;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  duration: string;
  maxGuests: number;
  highlights: string[];
  inclusions: string[];
  hostName: string;
  hostAvatar: string;
  hostBio: string;
  verified: boolean;
  timeSlots: TimeSlot[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Kayaking",
    category: "Adventure",
    location: "Udupi",
    price: 999,
    rating: 4.8,
    reviewCount: 124,
    image: kayakingMangrove,
    images: [kayakingMangrove, kayakingMangrove, kayakingMangrove],
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    duration: "3 hours",
    maxGuests: 8,
    highlights: [
      "Scenic routes through mangroves",
      "Expert guide accompaniment",
      "Safety briefing included",
      "Minimum age 10"
    ],
    inclusions: [
      "Kayaking equipment",
      "Life jackets and helmets",
      "Certified guide",
      "Safety briefing",
      "Refreshments"
    ],
    hostName: "Shashwat Sharma",
    hostAvatar: "/placeholder.svg",
    hostBio: "Adventure guide with 8+ years of experience in water sports",
    verified: true,
    timeSlots: [
      { time: "07:00 am", availableSeats: 8, bookedSeats: 4 },
      { time: "09:00 am", availableSeats: 8, bookedSeats: 5 },
      { time: "11:00 am", availableSeats: 8, bookedSeats: 3 },
      { time: "01:00 pm", availableSeats: 8, bookedSeats: 8 }
    ]
  },
  {
    id: "2",
    title: "Kayaking",
    category: "Adventure",
    location: "Udupi, Karnataka",
    price: 999,
    rating: 4.9,
    reviewCount: 89,
    image: kayakingLake,
    images: [kayakingLake],
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    duration: "3 hours",
    maxGuests: 10,
    highlights: ["Scenic routes", "Trained guides", "Safety briefing"],
    inclusions: ["Equipment", "Guide", "Refreshments"],
    hostName: "Partha Mitra",
    hostAvatar: "/placeholder.svg",
    hostBio: "Water sports enthusiast and certified instructor",
    verified: true,
    timeSlots: [
      { time: "08:00 am", availableSeats: 10, bookedSeats: 3 },
      { time: "10:00 am", availableSeats: 10, bookedSeats: 6 }
    ]
  },
  {
    id: "3",
    title: "Nandi Hills Sunrise",
    category: "Nature",
    location: "Bangalore",
    price: 899,
    rating: 4.7,
    reviewCount: 256,
    image: nandiHills,
    images: [nandiHills],
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    duration: "4 hours",
    maxGuests: 15,
    highlights: ["Sunrise viewpoint", "Photography spots", "Historical insights"],
    inclusions: ["Transportation", "Guide", "Breakfast"],
    hostName: "Shashwat Sharma",
    hostAvatar: "/placeholder.svg",
    hostBio: "Nature photographer and tour guide",
    verified: true,
    timeSlots: [
      { time: "04:30 am", availableSeats: 15, bookedSeats: 8 },
      { time: "05:00 am", availableSeats: 15, bookedSeats: 12 }
    ]
  },
  {
    id: "4",
    title: "Coffee Trail",
    category: "Nature",
    location: "Coorg",
    price: 1299,
    rating: 4.8,
    reviewCount: 178,
    image: coffeeTrail,
    images: [coffeeTrail],
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    duration: "5 hours",
    maxGuests: 12,
    highlights: ["Coffee plantation tour", "Tasting session", "Local cuisine"],
    inclusions: ["Guide", "Coffee tasting", "Lunch"],
    hostName: "Rajesh Kumar",
    hostAvatar: "/placeholder.svg",
    hostBio: "Coffee plantation owner and guide",
    verified: true,
    timeSlots: [
      { time: "09:00 am", availableSeats: 12, bookedSeats: 5 },
      { time: "02:00 pm", availableSeats: 12, bookedSeats: 7 }
    ]
  },
  {
    id: "5",
    title: "Boat Cruise",
    category: "Adventure",
    location: "Sunderban",
    price: 999,
    rating: 4.6,
    reviewCount: 145,
    image: boatCruise,
    images: [boatCruise],
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    duration: "2 hours",
    maxGuests: 20,
    highlights: ["Sunset views", "Wildlife spotting", "Refreshments onboard"],
    inclusions: ["Boat ride", "Guide", "Snacks"],
    hostName: "Amit Das",
    hostAvatar: "/placeholder.svg",
    hostBio: "Boat captain with 15 years experience",
    verified: true,
    timeSlots: [
      { time: "05:00 pm", availableSeats: 20, bookedSeats: 12 },
      { time: "06:30 pm", availableSeats: 20, bookedSeats: 15 }
    ]
  },
  {
    id: "6",
    title: "Bunjee Jumping",
    category: "Adventure",
    location: "Manali",
    price: 999,
    rating: 4.9,
    reviewCount: 312,
    image: bungeeJumping,
    images: [bungeeJumping],
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    duration: "1 hour",
    maxGuests: 5,
    highlights: ["55m jump height", "Professional equipment", "Video recording"],
    inclusions: ["Safety equipment", "Instructor", "Jump video"],
    hostName: "Vikram Singh",
    hostAvatar: "/placeholder.svg",
    hostBio: "Certified bunjee instructor",
    verified: true,
    timeSlots: [
      { time: "10:00 am", availableSeats: 5, bookedSeats: 2 },
      { time: "12:00 pm", availableSeats: 5, bookedSeats: 4 },
      { time: "02:00 pm", availableSeats: 5, bookedSeats: 1 }
    ]
  }
];

export const categories = [
  "All",
  "Adventure",
  "Nature",
  "Culture",
  "Food",
  "Wellness"
];

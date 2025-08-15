import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const personas = [
  {
    id: "hitesh",
    name: "Hitesh",
    bio: "Retired from corporate, full-time YouTuber, ex-founder of LCO (acquired), ex-CTO, Sr. Director at PW. Runs 2 YouTube channels (1M & 600k subs), visited 43 countries.",
    avatar: "https://i.ibb.co/XZtX7N84/hitesh.jpg",
    fallback: "H",
  },
  {
    id: "piyush",
    name: "Piyush",
    bio: "Piyush Garg, software engineer with over five years of industry experience, loves technology and coding. Founder teachyst",
    avatar: "https://i.ibb.co/WNrnHcYb/piyush.jpg",
    fallback: "P",
  },
];

import Image from "next/image";

import { cn, getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex -space-x-2">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className="relative group"
        >
          <div className="flex items-center justify-center size-8 rounded-full bg-secondary/70 border border-border/50 shadow-sm">
            <Image
              src={url}
              alt={tech}
              width={20}
              height={20}
              className="size-5 object-contain"
            />
          </div>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs shadow-md whitespace-nowrap z-10">
            {tech}
          </span>
        </div>
      ))}
      
      {techIcons.length > 3 && (
        <div className="relative group cursor-pointer z-10">
          <div className="flex items-center justify-center size-8 rounded-full bg-primary/15 border border-primary/20 shadow-sm text-xs font-medium text-primary-100">
            +{techIcons.length - 3}
          </div>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs shadow-md whitespace-nowrap z-20">
            {techIcons.slice(3).map(icon => icon.tech).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default DisplayTechIcons;
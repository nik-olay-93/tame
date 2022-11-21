import { Project } from "@prisma/client";
import CustomIcon from "components/ui/CustomIcon";
import Image from "next/image";
import Link from "next/link";

export type ProjectObject = Project & {
  members: {
    name: string | null;
    image: string | null;
    id: string;
  }[];
  tasks: {
    completed: boolean;
  }[];
};

export interface ProjectCardProps {
  project: ProjectObject;
}

const membersSlice = 5;

export default function ProjectCard({ project }: ProjectCardProps) {
  const openCount = project.tasks.filter((t) => !t.completed).length;

  return (
    <Link href={`/project/${project.id}`}>
      <div className="flex flex-col bg-primary-light dark:bg-primary-dark rounded-md">
        <div className="px-4 py-2 flex flex-row items-center justify-between bg-secondary-light dark:bg-secondary-dark rounded-md">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{project.name}</span>
            <span className="text-gray-300">{project.description}</span>
          </div>
          <CustomIcon icon="fluent:chevron-right-20-regular" fontSize="2rem" />
        </div>
        <div>
          <div className="mx-2 p-2 flex flex-row gap-2 items-center">
            <span className="mr-6 text-lg font-semibold text-gray-300">
              Members:
            </span>
            {project.members.slice(0, membersSlice).map((member) => (
              <Image
                src={member.image || "/pfp.jpg"}
                alt={member.name || ""}
                key={member.id}
                height={32}
                width={32}
                className="rounded-full -ml-6 border-2 border-primary-light dark:border-primary-dark"
                title={member.name || ""}
              />
            ))}
            {project.members.length > membersSlice && (
              <div className="flex flex-row items-center justify-center bg-primary-light dark:bg-[#424242] rounded-full h-8 w-8 -ml-6 border-2 border-primary-light  dark:border-primary-dark">
                <span className="text-md font-semibold text-gray-400">
                  +{project.members.length - membersSlice}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mx-2 p-2">
          <span>
            <span className="text-accent-dark">
              {openCount} Open Task{openCount === 1 ? "" : "s"}
            </span>
            <span className="text-gray-400">
              , {project.tasks.length} Total
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

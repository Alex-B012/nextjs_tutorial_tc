import { ProjectsLibrary } from "@/components/projects-library";
import { Suspense } from "react";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-60 pt-30 flex justify-center items-center">
          Loading...
        </div>
      }
    >
      <ProjectsLibrary />
    </Suspense>
  );
}

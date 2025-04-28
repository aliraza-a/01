"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "Project One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel facere quaerat nam.",
    link: "https://github.com/aliraza-a/01",
  },
  {
    title: "Project Two",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quaerat voluptatum qui explicabo quo obcaecati consequatur.",
    link: "https://github.com/aliraza-a/02",
  },
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    View Project
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;

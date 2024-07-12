import {Image, Text} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {animate, useMotionValue} from "framer-motion";

import {motion} from "framer-motion-3d";
import {atom, useAtom} from "jotai";
import {useEffect, useRef} from "react";
// pake library jotai yg kalo gw denger org bule nya ngomong katanya membuat state secara global jadinya lebih efisien
export const projects = [
  {
    title: "ANIME LIST",
    image: "projects/anime.png",
    description: "Recreating Anime List with Next.JS",
  },
  {
    title: "Private Blog",
    image: "projects/blog.png",
    description: "i Learn how to make a blog",
  },
  {
    title: "Movie List",
    image: "projects/movieList.png",
    description: "i Learn how to make movie List",
  },
];

const Project = (props) => {
  const {project, highlited} = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlited ? 0.7 : 0.4);
  }, [highlited]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.006}
        // ini adalah cara untuk menambahkan fitur link jika kasus nya seperti di area projects ini
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
        scale={[1.09, 1.15, 1.08]}>
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}>
        {project.title}
      </Text>
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.15}
        position={[-1, -0.6, 0]}>
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectsAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const {viewport} = useThree();
  const [currentProjects] = useAtom(currentProjectsAtom);
  return (
    <>
      <group position-y={-viewport.height * 2 + 1}>
        {projects.map((project, index) => (
          <motion.group
            key={"project_" + index}
            position={[index * 2.5, 0, -3]}
            animate={{
              x: 0 + (index - currentProjects) * 2.5,
              y: currentProjects === index ? 0 : -0.1,
              Z: currentProjects === index ? -2 : -3,
              //   di bawah ini adalah sintaks yg membuat efek unik di projects card
              rotateX: currentProjects === index ? 0 : -Math.PI / 3,
              rotateZ: currentProjects === index ? 0 : -0.1 * Math.PI,
            }}>
            <Project project={project} highlited={index === currentProjects} />
          </motion.group>
        ))}
      </group>
    </>
  );
};

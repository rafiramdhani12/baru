import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import {useEffect, useRef, useState} from "react";
import {framerMotionConfig} from "../config";
import {Avatar} from "./Avatar";
import {Office} from "./Office";
import {Projects} from "./Projects";
import {Background} from "./Background";

export const Experience = (props) => {
  const {menuOpened} = props;
  const {viewport} = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  // pertama parsing data menggunakan props di apps experince tambahkan menuopened di props lalu buat sintaks dibawh ini untuk menciptakan efek unik ketika membuka menu
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainer = useRef();

  // sintaks di bawah ini adalah sintaks untuk mengatur animasi awal ditebgah dan akhir dan juga ini berbentuk variable dan di pakai di sintaks yg bawah
  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    // gw punya masalah dmn ketika sudah membuat sintaks ini jika scroll web nya mentok kebawah makan akan terjadi masalah maybe overlay sebutanya ? karena page nya yg keitung di belakang layar 4 sedangkan di depan cuman 3 dan variable di bawah tadinya const diubah jadi let agar bisa memanipulasi nilai yg ada didalamnya
    // dan ada lagi sebenernya issue nya gw g nangkep secara rinci karena org luar kalo ngomong kayak bergumam mumble gitu jadi ada masalah di avatar component jg
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    if (section === 0) {
      characterContainer.current.getWorldPosition(
        characterGroup.current.position
      );
    }
  });

  return (
    <>
      {/* orbit nya di matiin biar bisa di scroll halaman web nya */}
      {/* <OrbitControls /> */}
      <Background />
      <motion.group
        ref={characterGroup}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section} //dikasih transisi dulu kalo nggak bakal lompat kasar chara nya
        transition={{
          duration: 0.7,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            // ini di skill
            // sintaks di bawah ini untuk mengatur posisi character ada refactor di x rY sclaeXYZ yg tadinya tidak seperti jadi seperti ini
            y: -viewport.height + 0.5,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 1.5 : 1,
            scaleY: isMobile ? 1.5 : 1,
            scaleZ: isMobile ? 1.5 : 1,
          },
          2: {
            // project
            x: isMobile ? -1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            // contact
            y: -viewport.height * 3 + 1,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}>
        <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[
          isMobile ? 0 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}>
        <Office section={section} />
        <group
          ref={characterContainer}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.419, -Math.PI]}></group>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[
          0,
          isMobile ? -viewport.height : -1.5 * officeScaleRatio,
          -10,
        ]}
        animate={{
          z: section === 1 ? 0 : -10,
          y:
            section === 1
              ? -viewport.height
              : isMobile
              ? -viewport.height
              : -1.5 * officeScaleRatio,
        }}>
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects />
      {/* kalo ada error yg g jelas di bagian avatar itu artinya salah ketik props entah di nama animasi / lainya */}
      {/* step before <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};

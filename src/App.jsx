import {Scroll, ScrollControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {MotionConfig} from "framer-motion";
import {Leva} from "leva";
import {Suspense, useEffect, useState} from "react";
import {Cursor} from "./components/Cursor";
import {Experience} from "./components/Experience";
import {Interface} from "./components/Interface";
import {Menu} from "./components/Menu";
import {ScrollManager} from "./components/ScrollManager";
import {framerMotionConfig} from "./config";
import {LoadingScreen} from "./components/LoadingScreen";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      {/* ini pharsing data ke component loading screen */}
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}>
        <Canvas shadows camera={{position: [0, 3, 10], fov: 42}}>
          <color attach="background" args={["#e6e7ff"]} />
          {/* menambahkan unsur html  */}
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            {/* penambahan scroll component berfungsi agar model office nya ke scroll */}
            <Scroll>
              {/* ini refactor awalnya g begini */}
              <Suspense>
                {started && (
                  <Experience section={section} menuOpened={menuOpened} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && <Interface setSection={setSection} />}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;

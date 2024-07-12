import {motion} from "framer-motion";
import {useAtom} from "jotai";
import {currentProjectsAtom, projects} from "./Projects";
import {useForm, ValidationError} from "@formspree/react";

const Section = (props) => {
  const {children, mobileTop} = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start  ${
    mobileTop ? "justify-start md:justify-center" : "justify-center"
  }
  `}
      // sintaks diatas (mobileTop adalah untuk mengatur responsive seperti biasa pharsing data menggunakan props)
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}>
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const {setSection} = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const {setSection} = props;
  // notes md dibaca jika ukuran diatas medium
  // motion memberikan efek animasi dan begitulah cara memakai sintaks motion
  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Rafi Ramdhani</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}>
        Im junior developer
        <br />
        I've just been involved as a web dev for less than a year.
        <br /> I will continue to learn from everyone and improve
        <br /> the shortcomings I have
      </motion.p>
      <motion.button
        // ini adalah tombol yg membuat section lompat jauh pada tujuan di case ini dari atas ke bawah (about)
        //proses nya sama bikin props pharsing pharsing data pertama dari app ke interface
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}>
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "javascript",
    level: 50,
  },
  {
    title: "react js",
    level: 50,
  },
  {
    title: "node js",
    level: 50,
  },
  {
    title: "PHP",
    level: 50,
  },
];

const languages = [
  {
    title: "indonesian",
    level: 100,
  },
  {
    title: "english",
    level: 40,
  },
];

const SkillsSection = () => {
  // malah kena refactor make variants bangke
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 flex flex-col space-y-4 text-center">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.div
                className="bg-slate-300 p-4 rounded-lg shadow-md"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 2 + index * 0.2}}>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  {skill.title}
                </h3>
              </motion.div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
            Languages
          </h2>
          <div className="mt-8 space-y-4 flex flex-col text-center">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-800 bg-slate-300 p-4 rounded-lg"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}>
                  {lng.title}
                </motion.h3>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectsAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}>
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}>
          Next →
        </button>
      </div>
    </Section>
  );
};

// function ContactForm() {
//   const [state, handleSubmit] = useForm("xgegljdd");
//   if (state.succeeded) {
//     return <p>Thanks for joining!</p>;
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email">Email Address</label>
//       <input id="email" type="email" name="email" />
//       <ValidationError prefix="Email" field="email" errors={state.errors} />
//       <textarea id="message" name="message" />
//       <ValidationError prefix="Message" field="message" errors={state.errors} />
//       <button type="submit" disabled={state.submitting}>
//         Submit
//       </button>
//     </form>
//   );
// }

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xgegljdd");
  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-500 text-center">thanks for your message!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-8">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-8">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <button
              disabled={state.submitting}
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};

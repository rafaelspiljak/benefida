import { useState, useRef, useCallback } from "react";
import { Section } from "./Section";

const loadImage = (src) =>
  new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => res(img);
    img.onerror = () => rej(new Error(`Failed to load ${src}`));
  });

const options = [
  "Never or not at all",
  "Sometimes or somewhat",
  "Often or much",
  "Very often or very much",
];

const questions = [
  "Having problems with family",
  "Having problems with spouse/partner",
  "Relying on others to do things for you",
  "Causing fighting in the family",
  "Makes it hard for the family to have fun together",
  "Problems taking care of your family",
  "Problems balancing your needs against those of your family",
  "Problems losing control with family",
];

const sections = [
  {
    label: "A",
    title: "A FAMILY",
    questions: [
      "Having problems with family",
      "Having problems with spouse/partner",
      "Relying on others to do things for you",
      "Causing fighting in the family",
      "Makes it hard for the family to have fun together",
      "Problems taking care of your family",
      "Problems balancing your needs against those of your family",
      "Problems losing control with family",
    ],
    rules: [3, 7, 11, 15, 19, 24],
    imageName: ["Bljesak", "Kapljica"],
  },
  {
    label: "B",
    title: "B WORK",
    questions: [
      "Problems performing required duties",
      "Problems with getting your work done efficiently",
      "Problems with your supervisor",
      "Problems keeping a job",
      "Getting fired from work",
      "Problems working in a team",
      "Problems with your attendance",
      "Problems with being late",
      "Problems taking on new tasks",
      "Problems working to your potential",
      "Poor performance evaluations",
    ],
    rules: [4, 9, 14, 19, 25, 33],
    imageName: ["Oko"],
    ignoreImage: true,
  },
  {
    label: "C",
    title: "C SCHOOL",
    questions: [
      "Problems taking notes",
      "Problems completing assignments",
      "Problems getting your work done efficiently",
      "Problems with teachers",
      "Problems with school administrators",
      "Problems meeting minimum requirements to stay in school",
      "Problems with attendance",
      "Problems with being late",
      "Problems with working to your potential",
      "Problems with inconsistent grades",
    ],
    rules: [4, 9, 14, 19, 24, 30],
    imageName: ["Oko"],
    combinedWith: "B",
    combinedRules: [10, 21, 32, 43, 53, 63],
  },
  {
    label: "D",
    title: "D LIFE SKILLS",
    questions: [
      "Excessive or inappropriate use of internet, video games or TV",
      "Problems keeping an acceptable appearance",
      "Problems getting ready to leave the house",
      "Problems getting to bed",
      "Problems with nutrition",
      "Problems with sex",
      "Problems with sleeping",
      "Getting hurt or injured",
      "Avoiding exercise",
      "Problems keeping regular appointments with doctor/dentist",
      "Problems keeping up with household chores",
      "Problems managing money",
    ],
    rules: [5, 11, 17, 23, 29, 36],
    imageName: ["Obraz"],
  },
  {
    label: "E",
    title: "E SELF-CONCEPT",
    questions: [
      "Feeling bad about yourself",
      "Feeling frustrated with yourself",
      "Feeling discouraged",
      "Not feeling happy with your life",
      "Feeling incompetent",
    ],
    rules: [2, 5, 8, 11, 13, 15],
    imageName: ["Usta"],
  },
  {
    label: "F",
    title: "F SOCIAL",
    questions: [
      "Getting into arguments",
      "Trouble cooperating",
      "Trouble getting along with people",
      "Problems having fun with other people",
      "Problems participating in hobbies",
      "Problems making friends",
      "Problems keeping friends",
      "Saying inappropriate things",
      "Complaints from neighbours",
    ],
    rules: [4, 8, 12, 16, 21, 27],
    imageName: ["Obraz"],
  },
  {
    label: "G",
    title: "G RISK",
    questions: [
      "Aggressive driving",
      "Doing other things while driving",
      "Road rage",
      "Breaking or damaging things",
      "Doing things that are illegal",
      "Being involved with the police",
      "Smoking cigarettes",
      "Smoking marijuana",
      "Drinking alcohol",
      'Taking "street" drugs',
      "Sex without protection (birth control, condom)",
      "Sexually inappropriate behaviour",
      "Being physically aggressive",
      "Being verbally aggressive",
    ],
    rules: [6, 13, 20, 27, 34, 42],
    imageName: ["Ruka"],
  },
];

const storeImagesPaths = {
  Bljesak: [
    "/Bljesak/Bljesak-1-RGB.png",
    "/Bljesak/Bljesak-2-RGB.png",
    "/Bljesak/Bljesak-3-RGB.png",
    "/Bljesak/Bljesak-4-RGB.png",
    "/Bljesak/Bljesak-5-RGB.png",
    "/Bljesak/Bljesak-6-RGB.png",
  ],
  Kapljica: [
    "/Kapljica/Kapljica-1-RGB.png",
    "/Kapljica/Kapljica-2-RGB.png",
    "/Kapljica/Kapljica-3-RGB.png",
    "/Kapljica/Kapljica-4-RGB.png",
    "/Kapljica/Kapljica-5-RGB.png",
    "/Kapljica/Kapljica-6-RGB.png",
  ],
  Obraz: [
    "/Obraz/Obraz-1-RGB.png",
    "/Obraz/Obraz-2-RGB.png",
    "/Obraz/Obraz-3-RGB.png",
    "/Obraz/Obraz-4-RGB.png",
    "/Obraz/Obraz-5-RGB.png",
    "/Obraz/Obraz-6-RGB.png",
  ],
  Oko: [
    "/Oko/Oko-1-RGB.png",
    "/Oko/Oko-2-RGB.png",
    "/Oko/Oko-3-RGB.png",
    "/Oko/Oko-4-RGB.png",
    "/Oko/Oko-5-RGB.png",
    "/Oko/Oko-6-RGB.png",
  ],
  Ruka: [
    "/Ruka/Ruka-1-RGB.png",
    "/Ruka/Ruka-2-RGB.png",
    "/Ruka/Ruka-3-RGB.png",
    "/Ruka/Ruka-4-RGB.png",
    "/Ruka/Ruka-5-RGB.png",
    "/Ruka/Ruka-6-RGB.png",
  ],
  Usta: [
    "/Usta/Usta-1-RGB.png",
    "/Usta/Usta-2-RGB.png",
    "/Usta/Usta-3-RGB.png",
    "/Usta/Usta-4-RGB.png",
    "/Usta/Usta-5-RGB.png",
    "/Usta/Usta-6-RGB.png",
  ],
};

export default function FamilyImpactSection() {
  const [responses, setResponses] = useState({
    A: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    },
    B: {
      0: 2,
      1: 2,
      2: 2,
      3: 2,
      4: 2,
      5: 2,
      6: 2,
      7: 2,
      8: 2,
      9: 2,
      10: 2,
    },
    C: {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
    },
    D: {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
    },
    E: {
      0: 3,
      1: 3,
      2: 3,
      3: 3,
      4: 3,
    },
    F: {
      0: 2,
      1: 2,
      2: 2,
      3: 2,
      4: 2,
      5: 2,
      6: 2,
      7: 2,
      8: 2,
    },
    G: {
      0: 2,
      1: 2,
      2: 2,
      3: 2,
      4: 2,
      5: 2,
      6: 2,
      7: 2,
      8: 2,
      9: 2,
      10: 2,
      11: 2,
      12: 2,
      13: 2,
    },
  });
  const canvasRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = useCallback((sectionIdx, qIdx, value) => {
    setResponses((prev) => ({
      ...prev,
      [sectionIdx]: { ...prev[sectionIdx], [qIdx]: value },
    }));
  }, []);

  return (
    <div className="flex gap-6 flex-col items-center max-w-[1380px]">
      {!submitted && (
        <>
          {sections.map((section, sectionIdx) => (
            <Section
              key={`section-${section.label}`}
              section={section}
              responses={responses}
              handleChange={handleChange}
            />
          ))}
          <div>
            <button
              className="rounded-full bg-[#D7EAD6] text-[18px] font-medium flex gap-2 items-center justify-between py-3 px-4 text-[#41553E] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none outline-none hover:outline-none"
              onClick={async (e) => {
                e.preventDefault();
                const levels = {};

                // 1. build a flat list of image paths in draw order
                const imagePaths = ["/Glava/Glava-RGB.png"];

                sections.forEach((section) => {
                  const sum = Object.values(
                    responses[section.label] ?? {}
                  ).reduce((a, b) => a + b, 0);
                  let level = section.rules.filter((r) => r <= sum).length;
                  levels[section.label] = sum;
                  if (section.combinedWith) {
                    const secondSum = Object.values(
                      responses[section.combinedWith] ?? {}
                    ).reduce((a, b) => a + b, 0);
                    level = section.combinedRules.filter(
                      (a) => a <= sum + secondSum
                    ).length;
                    levels[section.label] = sum + secondSum;
                  }
                  return section.imageName.forEach((im) => {
                    if (!section.ignoreImage) {
                      // imagePaths.push(`/${im}/${im}-${level}-RGB.png`);

                      imagePaths.push(
                        storeImagesPaths[im][level ? level - 1 : 0]
                      );
                    }
                  });
                });

                console.log(imagePaths);
                // 2. load them all together
                const loadedImages = await Promise.all(
                  imagePaths.map(loadImage)
                );

                // 3. draw once, in order
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                await Promise.all(
                  loadedImages.map((img) =>
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                  )
                );
                // 4. export if you like
                const link = document.getElementById("download-portrait");
                link.download = "layered.png";
                link.href = canvas.toDataURL("image/png");
                // link.click();
                console.log(levels);
                setSubmitted(true);
              }}
              disabled={false}
            >
              Generate your portrait
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33203 3.16683L10.6654 8.50016L5.33203 13.8335"
                  stroke="#41553E"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      <div
        className={submitted ? "flex gap-6 flex-col items-center" : "hidden"}
      >
        <h2 className="text-[18px] font-medium text-[#D7EAD6] leading-[23px] tracking-[1.5%]">
          Here is your portrait! Feel free to download, print or even bring to
          an appointment.
        </h2>
        <canvas
          className="w-full h-full bg-white"
          ref={canvasRef}
          height={720}
          width={640}
        ></canvas>
        <a
          id="download-portrait"
          download={"portrait.png"}
          className="rounded-full bg-[#D7EAD6] text-[18px] font-medium flex gap-2 items-center justify-between py-3 px-4 text-[#41553E] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none outline-none hover:outline-none"
        >
          Download
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3327 5.83203L7.99935 11.1654L2.66602 5.83203"
              stroke="#41553E"
              strokeWidth="2"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

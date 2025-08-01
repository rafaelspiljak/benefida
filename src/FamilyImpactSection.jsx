import { useState, useRef, useCallback } from "react";
import { Section } from "./Section";

const loadImage = (src) =>
  new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // very important, must be set before src
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
    title: "Family",
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
    title: "Work",
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
    title: "School",
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
    title: "Life Skills",
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
    title: "Self-Concept",
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
    title: "Social",
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
    title: "Risk",
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
    // "/Bljesak/Bljesak-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be814b79ddf87c2a5b847_Bljesak-1-RGB.png",
    // "/Bljesak/Bljesak-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be81307af92835590aad3_Bljesak-2-RGB.png",
    // "/Bljesak/Bljesak-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be813388adaa63bb3d1a9_Bljesak-3-RGB.png",
    // "/Bljesak/Bljesak-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8139bf8de045c1b744d_Bljesak-4-RGB.png",
    // "/Bljesak/Bljesak-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be814b79ddf87c2a5b819_Bljesak-5-RGB.png",
    // "/Bljesak/Bljesak-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be813ede9de9362ba5782_Bljesak-6-RGB.png",
  ],
  Kapljica: [
    // "/Kapljica/Kapljica-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d0377cb8e2bd6a63a7_Kapljica-1-RGB.png",
    // "/Kapljica/Kapljica-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d0407a0caaf974e20b_Kapljica-2-RGB.png",
    // "/Kapljica/Kapljica-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d0201e3909aeb9dd2f_Kapljica-3-RGB.png",
    // "/Kapljica/Kapljica-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d0377cb8e2bd6a63aa_Kapljica-4-RGB.png",
    // "/Kapljica/Kapljica-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d09db0f2715843e5b9_Kapljica-5-RGB.png",
    // "/Kapljica/Kapljica-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be8d0388adaa63bb474db_Kapljica-6-RGB.png",
  ],
  Obraz: [
    // "/Obraz/Obraz-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93ba841a958a16c720c_Obraz-1-RGB.png",
    // "/Obraz/Obraz-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93b0fb261b3b02fc4f8_Obraz-2-RGB.png",
    // "/Obraz/Obraz-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93bfd3f50248f0926e3_Obraz-3-RGB.png",
    // "/Obraz/Obraz-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93bea4a67ee95fa5fbb_Obraz-4-RGB.png",
    // "/Obraz/Obraz-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93bc7e82c1afb97240d_Obraz-5-RGB.png",
    // "/Obraz/Obraz-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be93b407a0caaf975520e_Obraz-6-RGB.png",
  ],
  Oko: [
    // "/Oko/Oko-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a308d2b9e88b5b2f17_Oko-1-RGB.png",
    // "/Oko/Oko-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a39f23f7482c4b1d31_Oko-2-RGB.png",
    // "/Oko/Oko-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a3ec8516e88d669853_Oko-3-RGB.png",
    // "/Oko/Oko-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a39db0f2715844d650_Oko-4-RGB.png",
    // "/Oko/Oko-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a31f72d972af0808e1_Oko-5-RGB.png",
    // "/Oko/Oko-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9a321361b79137e1034_Oko-6-RGB.png",
  ],
  Ruka: [
    // "/Ruka/Ruka-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f89bf8de045c1d75de_Ruka-1-RGB.png",
    // "/Ruka/Ruka-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f8b6cb53752d148748_Ruka-2-RGB.png",
    // "/Ruka/Ruka-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f825f938614b65bd9a_Ruka-3-RGB.png",
    // "/Ruka/Ruka-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f80f56c4a8c6336199_Ruka-4-RGB.png",
    // "/Ruka/Ruka-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f8f91f06a9fbd697cf_Ruka-5-RGB.png",
    // "/Ruka/Ruka-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be9f8b4c412539d43a4e0_Ruka-6-RGB.png",
  ],
  Usta: [
    // "/Usta/Usta-1-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea47b7d5324a7847f077_Usta-1-RGB.png",
    // "/Usta/Usta-2-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea470e346edc93520110_Usta-2-RGB.png",
    // "/Usta/Usta-3-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea47388adaa63bb5f050_Usta-3-RGB.png",
    // "/Usta/Usta-4-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea47716d4165d64df869_Usta-4-RGB.png",
    // "/Usta/Usta-5-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea4737b6e104cdbf5c28_Usta-5-RGB.png",
    // "/Usta/Usta-6-RGB.png",
    "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686bea47263dce9600d25e59_Usta-6-RGB.png",
  ],
};

export default function FamilyImpactSection() {
  const [responses, setResponses] = useState({
    A: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
    },
    B: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
      10: undefined,
    },
    C: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
    },
    D: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
      10: undefined,
      11: undefined,
    },
    E: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
    },
    F: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
    },
    G: {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
      10: undefined,
      11: undefined,
      12: undefined,
      13: undefined,
    },
  });
  const canvasRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [sectorsFilled, setSectorsFilled] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    surName: "",
    email: "",
  });

  const handleChange = useCallback((sectionIdx, qIdx, value) => {
    setResponses((prev) => {
      const newState = {
        ...prev,
        [sectionIdx]: { ...prev[sectionIdx], [qIdx]: value },
      };
      const shouldBeDisabled = Object.keys(newState).reduce((pr, cu) => {
        const empty = Object.keys(newState[cu]).reduce((prev, curr) => {
          return prev || newState[cu][curr] === undefined;
        }, false);
        const indexInSection = sections.findIndex(
          (a) => a.label === sectionIdx
        );

        if (
          !empty &&
          sections?.[indexInSection]?.questions?.length ===
            Object.keys(newState[sectionIdx]).length
        ) {
          setSectorsFilled((prevSectors) => {
            return prevSectors.includes(cu)
              ? prevSectors
              : [...prevSectors, cu];
          });
        }
        return pr || empty;
      }, false);
      setButtonDisabled(shouldBeDisabled);
      return newState;
    });
  }, []);

  return (
    <div className="flex gap-6 flex-col items-center max-w-[1380px] md:mb-[160px] mb-[90px] h-full">
      <h1
        id="title"
        className="md:!text-[74px] !font-medium md:!leading-[84px] !text-[40px] !leading-[48px] tracking-[1.5%] !text-[#D7EAD6]"
      >
        Get your ADHD portrait
      </h1>
      <h3 className="max-w-[630px] !text-center !text-[18px] !leading-[23px] !tracking-[1.5#] !text-[#D7EAD6] !mb-[66px] md:!mb-[136px] mt-9 !font-medium">
        The WEISS questionnaire helps us understand how ADHD affects different
        areas of your life and is used to support the diagnostic process. Your
        responses will also enable us to create a personalized ADHD portrait,
        designed by an illustrator, just for you. Rest assured, all information
        you provide will be kept confidential and handled in line with privacy
        standards.
      </h3>
      {!submitted && !submitInProgress && (
        <>
          {sections.map((section, sectionIdx) => (
            <Section
              key={`section-${section.label}`}
              section={section}
              responses={responses}
              handleChange={handleChange}
              isActive={
                sectionIdx === 0 ||
                (sectionIdx &&
                  sectorsFilled.includes(sections[sectionIdx - 1].label))
              }
            />
          ))}
          <div className="flex flex-col mt-[30px]">
            <div className="form-line">
              <input
                className="input-field form w-input"
                maxLength="256"
                name="name"
                data-name="Name"
                placeholder="First name *"
                type="text"
                id="name"
                required=""
                value={userInfo.firstName}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
              />
              <input
                className="input-field form w-input"
                maxLength="256"
                name="Surname"
                data-name="Surname"
                placeholder="Surname *"
                type="text"
                id="Surname"
                required=""
                value={userInfo.surName}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, surName: e.target.value }));
                }}
              />
            </div>
            <div>
              <input
                className="input-field form w-input"
                value={userInfo.email}
                placeholder="Email *"
                maxLength="256"
                name="Email"
                data-name="Email"
                type="text"
                id="Email"
                required=""
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
            <div className="flex items-center mb-6 mt-4.5">
              <label className="relative inline-block h-[18px] w-[18px]">
                <input
                  id="privacy-policy"
                  className="peer appearance-none h-[18px] w-[18px] rounded-[4px] border border-[#D7EAD6] bg-transparent checked:bg-[#D7EAD6]"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                  }}
                  type="checkbox"
                ></input>
                <svg
                  className="absolute left-0 top-0 h-[18px] w-[18px] hidden peer-checked:block pointer-events-none"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2355 3.96993C13.3037 3.9003 13.3852 3.84498 13.4751 3.80722C13.565 3.76945 13.6615 3.75 13.759 3.75C13.8565 3.75 13.953 3.76945 14.0429 3.80722C14.1328 3.84498 14.2142 3.9003 14.2825 3.96993C14.5685 4.25893 14.5725 4.72593 14.2925 5.01993L8.37949 12.0099C8.31236 12.0837 8.23089 12.1429 8.14007 12.1841C8.04925 12.2252 7.95099 12.2474 7.8513 12.2493C7.75161 12.2511 7.65258 12.2327 7.56028 12.1949C7.46798 12.1572 7.38435 12.1011 7.31449 12.0299L3.71649 8.38393C3.57773 8.24242 3.5 8.05213 3.5 7.85393C3.5 7.65574 3.57773 7.46545 3.71649 7.32393C3.78474 7.2543 3.86619 7.19898 3.95608 7.16122C4.04597 7.12345 4.14249 7.104 4.23999 7.104C4.33749 7.104 4.43401 7.12345 4.5239 7.16122C4.61379 7.19898 4.69525 7.2543 4.76349 7.32393L7.81549 10.4169L13.2155 3.99193L13.2355 3.96993Z"
                    fill="#41553E"
                  />
                </svg>
              </label>

              <label
                htmlFor="privacy-policy"
                className="!text-[#D7EAD6] !ml-2 !leading-[18px] !tracking-[1.5%] !font-medium"
              >
                I have read and agree to the{" "}
                <a href="/privacy-policy">Privacy Policy.</a>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="rounded-full bg-[#D7EAD6] text-[18px] font-medium flex gap-2 items-center justify-between py-3 px-4 text-[#41553E] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none outline-none hover:outline-none"
              onClick={async (e) => {
                setSubmitInProgress(true);
                const scrollTarget = document.getElementById("title"); // The <h1 id="title"> element
                if (scrollTarget) {
                  scrollTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
                e.preventDefault();
                const levels = {};

                // 1. build a flat list of image paths in draw order
                const imagePaths = [
                  // "/Glava/Glava-RGB.png"
                  "https://cdn.prod.website-files.com/686ba13e73f8f7c44bdaf84e/686be89a32b4e100baee2d74_Glava-RGB.png",
                ];

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

                // console.log(imagePaths);
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
                link.download = "my-adhd-portrait.png";
                link.href = canvas.toDataURL("image/png");

                try {
                  const form = document.getElementById("wf-form-ADHD-portrait");
                  const ensureHiddenField = (name, value) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = name;
                    input["data-name"] = name;
                    form.appendChild(input);
                    input.value = value;
                  };
                  if (form) {
                    ensureHiddenField("First Name", userInfo.firstName);
                    ensureHiddenField("Surname", userInfo.surName);
                    ensureHiddenField("E-mail", userInfo.email);

                    Object.keys(responses).forEach((response) => {
                      Object.keys(responses[response]).forEach(
                        (responseKey) => {
                          ensureHiddenField(
                            `${response}-${responseKey}`,
                            responses[response][responseKey]
                          );
                        }
                      );
                    });
                    Object.keys(levels).forEach((level) => {
                      ensureHiddenField(`${level}-sum`, levels[level]);
                    });
                    if (form.requestSubmit) {
                      form.requestSubmit(); // preferred modern way
                    } else {
                      form.querySelector('input[type="submit"]').click(); // fallback
                    }
                  }
                } catch (e) {
                  console.error(e);
                }
                setSubmitted(true);
                setSubmitInProgress(false);
              }}
              disabled={
                buttonDisabled ||
                !agreed ||
                !userInfo.firstName ||
                !userInfo.surName ||
                !userInfo.email
              }
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
      {submitInProgress && (
        <div>
          <svg
            className="mr-3 -ml-1 size-10 animate-spin text-[#D7EAD6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <div
        className={submitted ? "flex gap-6 flex-col items-center" : "hidden"}
      >
        <h2 className="!text-[18px] !font-medium !text-[#D7EAD6] !leading-[23px] !tracking-[1.5%] !mt-0">
          Here is your portrait! Feel free to download, print or even bring to
          an appointment.
        </h2>
        <canvas
          className="w-full h-full bg-white max-w-[640px] max-h-[720px] object-contain"
          ref={canvasRef}
          height={3508}
          width={2481}
        ></canvas>
        <a
          id="download-portrait"
          download={"my-adhd-portrait.png"}
          className="rounded-full !bg-[#D7EAD6] !text-[18px] !font-medium flex gap-2 items-center justify-between py-3 px-4 !text-[#41553E] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none outline-none hover:outline-none"
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

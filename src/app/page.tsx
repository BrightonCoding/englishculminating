"use client";

import Hero from "@/components/Hero";
import Phase from "@/components/Phase";
import Reflection from "@/components/Reflection";
import Footer from "@/components/Footer";
import SlideContainer from "@/components/SlideContainer";

// Phase data with all images and captions
const phasesData = [
  {
    number: 1,
    title: "Love Received",
    subtitle: "Before I had to hold myself, I was held.",
    images: [
      { id: 1, caption: "On the Hong Kong MTR in traditional dress, clutching a toy Eiffel Tower. Even then, I was dreaming of somewhere else—not knowing that the journey itself would teach me more than any destination." },
      { id: 2, caption: "My mother and me, faces pressed together. This is what unconditional love looked like before I understood how rare it was." },
      { id: 3, caption: "A name tag pinned to my jacket, her arms wrapped around me. I belonged to someone, and that was enough." },
      { id: 4, caption: "Asleep on her shoulder during a bus ride home. I did not yet know the weight of exhaustion that comes from carrying yourself alone." },
      { id: 5, caption: "Pouting with a stuffed animal, learning that it was safe to feel disappointed. She never asked me to perform happiness I did not have." },
      { id: 6, caption: "My father kissing my cheek, my mother smiling beside us. A family, whole. This is the image I return to when I forget what I am working toward." },
    ],
  },
  {
    number: 2,
    title: "Belonging",
    subtitle: "I had a team, a place, a number.",
    images: [
      { id: 7, caption: "My handball team in Hong Kong—six boys who shared the same uniform and the same afternoons. I did not know then that belonging could be so easily lost." },
      { id: 8, caption: "A polaroid with a friend, edges already fading. Some people only stay in your life long enough to teach you how to miss them." },
      { id: 9, caption: "Arms around shoulders, masks on our faces. The last year before everything changed. We smiled like we had more time." },
    ],
  },
  {
    number: 3,
    title: "Uprooting",
    subtitle: "離港—Leaving Hong Kong.",
    images: [
      { id: 10, caption: "Standing beneath the departure sign at Hong Kong International Airport. Four of us, smiling for the camera. The sign above us said what we could not: this chapter was ending." },
    ],
  },
  {
    number: 4,
    title: "Replanting",
    subtitle: "A new country. A new self waiting to be built.",
    images: [
      { id: 11, caption: "My first photo in Canada—mouth open, eyes wide. The trees outside the window were a green I had never seen before. Everything was unfamiliar, including me." },
      { id: 12, caption: "Playing mahjong with family in our new home. Some things we carried with us. Some things stayed the same even when everything else did not." },
      { id: 13, caption: "Eating Chick-fil-A with cousins. We were learning how to be family in a new place, one meal at a time." },
      { id: 14, caption: "Laughing with new friends in a classroom. I was starting to fit into a shape I had not yet chosen." },
      { id: 15, caption: "Christmas lights, new friends, a holiday I was still learning to celebrate. A circle was forming again." },
      { id: 16, caption: "A mirror selfie at a competition in Toronto. I was building a version of myself that looked successful. I did not yet know the cost." },
      { id: 17, caption: "Wearing a suit at DECA, lanyard around my neck. This is what ambition looked like from the outside. I thought if I kept moving, I would not have to feel what I had left behind." },
    ],
  },
  {
    number: 5,
    title: "The First Fade",
    subtitle: "I started to disappear.",
    images: [
      { id: 18, caption: "Sitting alone in a classroom, arms crossed. The energy from the earlier photos is gone. I had stopped talking to people. I told myself I did not have time." },
      { id: 19, caption: "Bathroom mirror, hand in my hair. I was looking at myself but not recognizing what I saw. The stress was starting to show on my face." },
      { id: 20, caption: "Just my forehead and tired eyes. I was disappearing into my own ambition, and no one was close enough to notice." },
    ],
  },
  {
    number: 6,
    title: "The Reset",
    subtitle: "I shaved my head to start over.",
    images: [
      { id: 21, caption: "Headphones on, eating a croissant, a 2025 calendar in front of me. I had shaved my head—a reset, a declaration that I could begin again." },
      { id: 22, caption: "Standing in a suit at my first professional event. I looked confident, but I could not meet anyone's eyes. I was ashamed of how I looked after being made fun of, and I had no one to tell." },
      { id: 23, caption: "Holding boxes for Reviva Mart. 'Spent all my money on food.' I was building something real, but I was building it alone." },
    ],
  },
  {
    number: 7,
    title: "The Building",
    subtitle: "I found momentum. I also found exhaustion.",
    images: [
      { id: 24, caption: "Back in Hong Kong for a visit, pointing at a sign that read 'Life Journey.' I did not know how literally those words would come to define this year." },
      { id: 25, caption: "Standing beside my Reviva Mart poster in the school library. My first business. My first baby. I felt proud and terrified in equal measure." },
    ],
  },
  {
    number: 8,
    title: "The Burning",
    subtitle: "I drowned myself in work because I did not know how to ask for help.",
    images: [
      { id: 26, caption: "Laptop open, headphones on, a Reviva flyer pinned to my wall. I was always working. Rest felt like failure." },
      { id: 27, caption: "Messy hair, flat expression. I was burning out, but I did not have the words for it yet." },
      { id: 28, caption: "A photo showing only my wet hair and half-closed eyes. I could not see myself clearly anymore. The person in the mirror felt like a stranger." },
      { id: 29, caption: "Working at a coffee shop, headphones in, laptop glowing. I filled the emptiness with tasks. If I stopped moving, I would have to feel everything I had been avoiding." },
    ],
  },
  {
    number: 9,
    title: "The Breaking",
    subtitle: "The guilt from my family broke something inside me.",
    images: [
      { id: 30, caption: "Tears streaming down my face, earbuds in, city lights behind me. I finally broke. The weight of expectations—my own and my family's—became too heavy to carry alone." },
      { id: 31, caption: "Crying but trying to smile. My family's disappointment felt like a trap I could not escape. I did not know how to be both their son and myself." },
      { id: 32, caption: "Marks on my back from gua sha, but they looked like the stress I had been carrying. The pressure was no longer invisible—it lived in my body." },
      { id: 33, caption: "Walking alone on a street in the middle of the night. I had no destination. I just needed to move until I could breathe again." },
    ],
  },
  {
    number: 10,
    title: "The Opening",
    subtitle: "I started sharing—with friends, with family, with myself.",
    images: [],
    textContent: "This is the turning point. After watching Portraits from a Fire in English class, I saw myself in Tyler—a boy with an emotionally distant father, drowning in his own silence. The scene where the father finally hugs his son broke something open in me. I kept thinking about it. I started talking. First to myself. Then to friends. Then to my family. It was terrifying. It was also the first time I felt relief in months.",
  },
  {
    number: 11,
    title: "The Mending",
    subtitle: "A spontaneous trip. A family. A reason to keep going.",
    images: [
      { id: 34, caption: "Standing in front of the Columbia University subway sign with my parents. We took a last-minute trip to New York—no agenda, no expectations. Just us." },
      { id: 35, caption: "Smiling in front of Columbia Law School. For the first time in months, I felt light. I was not performing. I was just present." },
      { id: 36, caption: "Dinner with my family at a Korean restaurant in New York. Food on the table, everyone together. I remembered what I was building for—not achievements, but this. Connection. Belonging. Love." },
    ],
  },
];

export default function Home() {
  // Total slides: Hero (1) + Phases (11) + Reflection (1) + Footer (1) = 14
  const totalSlides = 1 + phasesData.length + 1 + 1;

  const slides = [
    <Hero key="hero" />,
    ...phasesData.map((phase) => (
      <Phase
        key={phase.number}
        number={phase.number}
        title={phase.title}
        subtitle={phase.subtitle}
        images={phase.images}
        textContent={phase.textContent}
      />
    )),
    <Reflection key="reflection" />,
    <Footer key="footer" />,
  ];

  return (
    <main className="w-screen h-screen">
      <SlideContainer totalSlides={totalSlides}>
        {slides}
      </SlideContainer>
      </main>
  );
}

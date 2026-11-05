// ============================================================
//  ✏️  EDIT ME — everything personal lives in this file
// ============================================================

export const NAME = "Paglu";
export const FROM = "Your Bestie"; // <- put your name here 💌

// Drop your three photos into  public/photos/  with these exact names.
// (Relative paths so it works on GitHub Pages project sites.)
export const PHOTOS = {
  smile: "photos/paglu-smile.jpg", // the big smiling selfie
  snow: "photos/paglu-snow.jpg", // the snow photo
  kid: "photos/paglu-kid.jpg", // the childhood photo
};

export type StorySlide = {
  id: string;
  photo?: string;
  pos?: string;
  label: string;
  title: string;
  caption: string;
  time: string;
  stickers: string[];
};

export const STORIES: StorySlide[] = [
  {
    id: "kid",
    photo: PHOTOS.kid,
    pos: "50% 30%",
    label: "Tiny Princess",
    title: "Princess in the making",
    caption: "Even back then, the crown was already yours 👑",
    time: "a long long time ago",
    stickers: ["✨", "🎀", "💖"],
  },
  {
    id: "smile",
    photo: PHOTOS.smile,
    pos: "50% 55%",
    label: "That Smile",
    title: "The smile of Enchancia",
    caption: "This smile could light up the whole kingdom ✨",
    time: "just now",
    stickers: ["😊", "🌸", "💫"],
  },
  {
    id: "snow",
    photo: PHOTOS.snow,
    pos: "50% 35%",
    label: "Snow Queen",
    title: "Snow day royalty",
    caption: "Adventure mode: ON. Cold? Never heard of her ❄️",
    time: "on top of the world",
    stickers: ["❄️", "😎", "✌️"],
  },
  {
    id: "wish",
    label: "My Wish",
    title: "Happy Birthday!",
    caption: "May your year be as magical as the Amulet of Avalor 💜",
    time: "with love",
    stickers: ["🎂", "🦋", "🎉"],
  },
];

// The "chat" — written as if from you to her. Make it yours!
export const CHAT: string[] = [
  "Heyyy Paglu 👀",
  "Guess what day it is?? 🎂",
  "Happy Birthday to the princess of my chat list 👑💖",
  "Thank you for every random snap, every blurry selfie and every midnight rant 😭💗",
  "Just like Sophia, you've got your own magic ✨ stay kind, stay brave, stay YOU.",
  "May this year bring royal adventures, endless snaps and zero bad filters 😌",
  "Also… don't you dare break our streak 🔥",
];

export const REPLIES = ["Aww 🥹", "Thank youuu 💖", "Streak forever 🔥", "Send cake 🎂"];

export const DECREES = [
  {
    icon: "amulet",
    title: "Carry your magic",
    text: "Like the Amulet of Avalor, the magic was always inside you. Never forget it.",
  },
  {
    icon: "heart",
    title: "Stay royally kind",
    text: "A true princess is brave, kind and a little bit chaotic. You've got all three covered.",
  },
  {
    icon: "crown",
    title: "Wear the crown",
    text: "Every selfie, every adventure, every day: you were born to sparkle.",
  },
] as const;

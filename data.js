/* ============================================================
   data.js — all content is easy to edit right here.
   ============================================================ */

const SITE_DATA = {
  name: "Ivan",

  orbitLabels: [
    "Ivan",
    "My Best Friend",
    "Best Friend",
    "3 Years Together",
    "Happy Birthday Ivan 🎉",
    "Happy Birthday Bro 🎂",
    "Happy Birthday Ivan 🎊",
    "HBD Ivan 🔥",
    "Best Friend Ever",
    "Partner in Crime",
  ],

  // Secret code to unlock page 2 (lock screen).
  secretCode: "1908",
  secretHint: "hint: your own birthday",

  birthdayTitle: "Happy Birthday, Ivan!",
  birthdayDate: "Happy Birthday, Bro",

  // Digital bouquet — each flower reveals one piece of the message
  bouquet: [
    "Happy birthday, Van 🥳",
    "Thanks for being such a fun friend to talk to, from TikTok all the way to now",
    "We've been friends for 3 years, and you're one of the best friends I've got",
    "Hope you keep crushing it and we keep having awesome moments together",
    "Whatever you're hoping for this year, I hope it comes true fast",
    "Thanks for always being around to chat and joke around with",
  ],

  letter: `HAPPY BIRTHDAY, IVAN!

Happy birthday, bro. Sorry I didn't have time to get you a real gift, so this is what you get for now — hope you like it.

I'm not exactly great with words, but I'm genuinely grateful to have met you and stayed friends this long. From meeting on TikTok to now, it's been 3 years of talking regularly, and I already consider you a true best friend, even though we met online.

I hope this new year of your life brings you more success, good health, and everything you're planning actually works out. I also hope we keep being friends and keep talking as much as we always have.

Once again, happy birthday, Van. Hope you have an awesome day!`,

  // Our journey — the friendship timeline
  timeline: [
    { label: "The Beginning", title: "First Met on TikTok", desc: "Didn't expect a random comment to turn into a friendship that's lasted this long." },
    { label: "First Chat", title: "Our First Conversation", desc: "Started as small talk, turned into never really stopping." },
    { label: "3 Years In", title: "Still Talking All the Time", desc: "Different cities, maybe never even met in person, but still close." },
    { label: "Still Going", title: "Now, and Onward", desc: "Hope our friendship keeps going strong, Van." },
  ],

  closingMessage: "Thanks for being such a great friend to talk to all this time, Van. Hope our friendship lasts. Happy birthday!",

  // Fun little quiz
  quiz: [
    {
      q: "Where did we first meet?",
      options: ["Instagram", "TikTok", "Discord", "WhatsApp"],
      correct: 1,
    },
    {
      q: "How long have we been friends?",
      options: ["1 Year", "2 Years", "3 Years", "5 Years"],
      correct: 2,
    },
    {
      q: "What do we usually do when we're bored?",
      options: ["Talk nonsense", "Play games together", "Argue about random stuff", "All of the above"],
      correct: 3,
    },
    {
      q: "What kind of friend do you think I am?",
      options: ["A bit weird", "Reliable", "Loves joking around", "All of the above"],
      correct: 3,
    },
  ],

  // TODO: add an mp3 link here for Ivan's favorite song / a song you both like
  musicSrc: "",
  musicTitle: "A Special Song for Ivan",

  // No real photos yet — showing memory/quote cards instead
  photos: SITE_MEMORIES,
};

// subset used for the orbit on page 1 (so it doesn't feel too crowded)
// no photos, so the photo orbit stays empty — only the word labels orbit
SITE_DATA.orbitPhotos = [];

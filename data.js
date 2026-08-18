/* ============================================================
   data.js — semua konten gampang diubah di sini.
   ============================================================ */

const SITE_DATA = {
  name: "Ivan",

  orbitLabels: [
    "Ivan",
    "Sahabat Gua",
    "Best Friend",
    "3 Tahun Bareng",
    "Happy Birthday Ivan 🎉",
    "Happy Birthday Bro 🎂",
    "Selamat Ulang Tahun Ivan 🎊",
    "HBD Ivan 🔥",
    "Sahabat Terbaik",
    "Rekan Receh",
  ],

  // Kode rahasia buat buka page 2 (lock screen).
  secretCode: "1908",
  secretHint: "petunjuk: tanggal ulang tahun lo sendiri",

  birthdayTitle: "Happy Birthday, Ivan!",
  birthdayDate: "Selamat Bertambah Usia, Bro",

  // Bunga digital — tiap bunga nampilin 1 potongan pesan pas diklik
  bouquet: [
    "Selamat ulang tahun ya, Van 🥳",
    "Makasih udah jadi sahabat yang asik diajak ngobrol dari TikTok sampe sekarang",
    "Udah 3 tahun kita temenan, dan lo salah satu sahabat terbaik gua",
    "Semoga makin sukses, makin gacor, dan makin banyak momen seru bareng",
    "Apapun yang lo pengen tahun ini, semoga cepet kesampaian",
    "Makasih udah selalu ada buat ngobrol & becanda bareng",
  ],

  letter: `HAPPY BIRTHDAY, IVAN!

Selamat ulang tahun ya bro, maaf gua gak sempet bikinin kado fisik, jadi ini aja dulu semoga lo suka.

Gua bukan orang yang jago ngerangkai kata-kata, tapi yang jelas gua bersyukur banget bisa kenal dan temenan sama lo. Dari awal kenal di TikTok sampe sekarang udah 3 tahun kita sering ngobrol, dan lo udah gua anggap kayak sahabat/best friend sendiri walau kita kenalnya online.

Semoga di umur yang baru ini lo makin sukses, makin sehat, dan segala rencana lo tahun ini bisa kesampaian. Semoga juga kita bisa terus temenan dan makin sering ngobrol kayak biasa.

Sekali lagi, happy birthday, Van. Semoga harimu menyenangkan!`,

  // Our journey — perjalanan pertemanan
  timeline: [
    { label: "Awal Mula", title: "Kenalan Pertama di TikTok", desc: "Gak nyangka awalnya cuma comment-commentan, eh malah jadi sahabat sampe sekarang." },
    { label: "Obrolan Pertama", title: "Chat Pertama Kita", desc: "Dari basa-basi doang, jadi keterusan ngobrol sampe sekarang." },
    { label: "3 Tahun Berjalan", title: "Masih Sering Ngobrol", desc: "Walau beda kota bahkan mungkin gak pernah ketemu langsung, tapi tetep deket." },
    { label: "Sampai Sekarang", title: "Masih, dan Akan Terus", desc: "Semoga pertemanan kita awet terus, Van." },
  ],

  closingMessage: "Makasih udah jadi sahabat yang seru diajak ngobrol selama ini, Van. Semoga persahabatan kita awet terus ya. Happy birthday!",

  // Kuis receh
  quiz: [
    {
      q: "Kita kenalan pertama kali lewat platform apa?",
      options: ["Instagram", "TikTok", "Discord", "WhatsApp"],
      correct: 1,
    },
    {
      q: "Udah berapa lama kita temenan?",
      options: ["1 Tahun", "2 Tahun", "3 Tahun", "5 Tahun"],
      correct: 2,
    },
    {
      q: "Kalo lagi bosen, biasanya kita ngapain?",
      options: ["Ngobrol receh", "Main game bareng", "Debat gak jelas", "Semua bener"],
      correct: 3,
    },
    {
      q: "Menurut lo, gua ini temen macam apa?",
      options: ["Rada absurd", "Bisa diandelin", "Suka becanda", "Semua bener juga"],
      correct: 3,
    },
  ],

  // TODO: ganti dengan link mp3 lagu pilihan lo (lagu favorit Ivan / lagu kalian sering dengerin)
  musicSrc: "",
  musicTitle: "Lagu Spesial Buat Ivan",

  // Gak ada foto — dipajang kartu kenangan/kata-kata aja
  photos: SITE_MEMORIES,
};

// subset dipakai buat orbit di page 1 (biar gak kepenuhan/berat)
// karena gak ada foto, orbit foto dikosongin — cuma label kata-kata yang orbit
SITE_DATA.orbitPhotos = [];

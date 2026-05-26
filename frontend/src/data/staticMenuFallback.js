export const STATIC_MENU_FALLBACK = [
  {
    titleID: "Tentang",
    path: "#",
    children: [
      { titleID: "Profil", path: "/profile" },
      { titleID: "Sejarah", path: "/sejarah" }
    ]
  },
  { titleID: "Dimensi", path: "/dimensi" },
  { titleID: "Agenda", path: "/event" },
  { titleID: "Katalog", path: "/katalog" },
  {
    titleID: "Fasilitas Publik",
    path: "#",
    children: [
      { titleID: "Sekolah", path: "/fasilitaspublik/sekolah" },
      { titleID: "Perpustakaan", path: "/fasilitaspublik/perpustakaan" },
      { titleID: "Beasiswa", path: "/fasilitaspublik/beasiswa" },
      { titleID: "WiFi Publik", path: "/fasilitaspublik/wifi" },
      { titleID: "Fasilitas Kesehatan", path: "/fasilitaspublik/kesehatan" }
    ]
  },
  { titleID: "Publikasi", path: "/publication" }
];
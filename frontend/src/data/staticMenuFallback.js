export const STATIC_MENU_FALLBACK = [
  {
    titleID: "Tentang",
    titleEN: "About", 
    path: "#",
    children: [
      { titleID: "Profil Daerah", titleEN: "Regional Profile", path: "/profile" },
      { titleID: "Profil Bupati", titleEN: "Regent Profile", path: "/bupati/profil" },
      { titleID: "Wakil Bupati", titleEN: "Vice Regent Profile", path: "/bupati/wakil" },
      { titleID: "Sejarah", titleEN: "History", path: "/sejarah" }
    ]
  },
  { titleID: "Dimensi", titleEN: "Dimensions", path: "/dimensi" },
  { titleID: "Agenda", titleEN: "Events", path: "/event" },
  { titleID: "Katalog", titleEN: "Catalog", path: "/katalog" },
  {
    titleID: "Fasilitas Publik", 
    titleEN: "Public Facilities",
    path: "#",
    children: [
      { titleID: "Sekolah", titleEN: "Schools", path: "/fasilitaspublik/sekolah" },
      { titleID: "Perpustakaan", titleEN: "Libraries", path: "/fasilitaspublik/perpustakaan" },
      { titleID: "Beasiswa", titleEN: "Scholarships", path: "/fasilitaspublik/beasiswa" },
      { titleID: "WiFi Publik", titleEN: "Public WiFi", path: "/fasilitaspublik/wifi" },
      { titleID: "Fasilitas Kesehatan", titleEN: "Health Facilities", path: "/fasilitaspublik/kesehatan" }
    ]
  },
  { titleID: "Publikasi", titleEN: "Publications", path: "/publication" }
];


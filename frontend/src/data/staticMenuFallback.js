export const STATIC_MENU_FALLBACK = [
  {
    titleID: "Tentang",
    titleEN: "About", 
    path: "#",
    children: [
      { titleID: "Profil", titleEN: "Profile", path: "/profile" },
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
      { titleID: "Sekolah", titleEN: "Schools", path: "/" },
      { titleID: "Perpustakaan", titleEN: "Libraries", path: "/" },
      { titleID: "Beasiswa", titleEN: "Scholarships", path: "/" },
      { titleID: "WiFi Publik", titleEN: "Public WiFi", path: "/" },
      { titleID: "Fasilitas Kesehatan", titleEN: "Health Facilities", path: "/" }
    ]
  },
  { titleID: "Publikasi", titleEN: "Publications", path: "/publication" }
];


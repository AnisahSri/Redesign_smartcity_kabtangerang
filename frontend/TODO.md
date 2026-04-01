# Fix Inovasi API di Smart Dimensi Pages

- [x] 1. Buat plan & konfirmasi user
- [x] 2. Edit 6 file Smart*.jsx: Replace fetch('/api/v1/inovasi') → apiEndpoints.inovasi.getAll()
  - Import apiEndpoints
  - Update fetchInovasi logic & error handling
- [x] 3. Test: npm run dev → buka /SmartGovernance/Inovasi tab → data muncul, no error
  (Dev server running)
- [ ] 4. Fix images /files/ jika broken (construct full URL seperti Publication)
- [ ] 5. Optional: Filter inovasi per dimensi ID
- [ ] 6. Complete

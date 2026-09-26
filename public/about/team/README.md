# Team photos — lives in public/about/team/ (served as /about/team/)

Current photos (all in use by the Team page — keep exact filenames,
Linux paths are case-sensitive):

  Ranjit.webp   → Ranjit Shah, Founder ("Where It All Began" + hero stack)
  Soma.webp     → Soma Shah, Co-Founder & CEO ("Where We're Going" + hero stack)
  Shadab.webp   → Shadab Ali, Engineering Manager (grid + hero stack)
  Udit.webp     → Udit Barman, Creative Design Lead (grid + hero stack)
  Prateek.webp  → Prateek Mehra, Frontend & UI/UX Developer (grid)
  Umer.webp     → Umer Qureshi, Senior Backend Engineer (grid)

Rules:
- Square crop works best (story portraits use 4:5, grid uses circles).
- To replace a photo, overwrite the same filename — no code change needed.
- To add/remove members, edit the `teamGrid` / `avatarStack` arrays in:
  app/(marketing)/about-us/team/TeamClient.tsx
- After adding images, hard-refresh (Ctrl+Shift+R) if they don't appear.

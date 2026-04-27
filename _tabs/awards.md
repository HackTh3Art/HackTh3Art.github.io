---
icon: fas fa-trophy
order: 5
---

<style>
.ht-awards-header {
  font-family: 'Courier New', monospace;
  border-left: 3px solid #00cc33;
  padding: 1rem 1.2rem;
  margin-bottom: 2rem;
  background: rgba(0,204,51,0.04);
}
.ht-awards-header .kicker {
  color: #00cc33;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.ht-awards-header .kicker::before { content: "> "; }
.ht-awards-header h1 {
  font-size: 1.6rem;
  margin: 0 0 0.4rem;
  color: #f0f0f0;
}
.ht-awards-header p { color: #c0c0c0; margin: 0; font-size: 0.9rem; }

.ht-year-block { margin-bottom: 2rem; }
.ht-year-label {
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #00cc33;
  border-bottom: 1px solid rgba(0,204,51,0.25);
  padding-bottom: 0.35rem;
  margin-bottom: 0.75rem;
}

.ht-award-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid rgba(0,204,51,0.15);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  background: rgba(0,0,0,0.25);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ht-award-row:hover {
  border-color: rgba(0,204,51,0.5);
  box-shadow: 0 0 8px rgba(0,204,51,0.12);
}
.ht-award-place {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0.2em 0.6em;
  border-radius: 3px;
  white-space: nowrap;
  min-width: 3.2rem;
  text-align: center;
}
.place-1st  { background: rgba(255,215,0,0.15);  color: #ffd700; border: 1px solid rgba(255,215,0,0.4); }
.place-2nd  { background: rgba(192,192,192,0.15); color: #c0c0c0; border: 1px solid rgba(192,192,192,0.4); }
.place-3rd  { background: rgba(205,127,50,0.15);  color: #cd7f32; border: 1px solid rgba(205,127,50,0.4); }
.place-top5 { background: rgba(0,204,51,0.1);     color: #00cc33; border: 1px solid rgba(0,204,51,0.3); }
.place-fin  { background: rgba(100,160,255,0.1);  color: #64a0ff; border: 1px solid rgba(100,160,255,0.3); }

.ht-award-name { flex: 1; color: #f0f0f0; font-size: 0.92rem; }
.ht-award-note { font-size: 0.78rem; color: #888; }
.ht-award-date { font-size: 0.75rem; color: #555; white-space: nowrap; }
</style>

<div class="ht-awards-header">
  <div class="kicker">Results</div>
  <h1>Awards</h1>
  <p>Competition results for 3xh4ck5 and it's members.</p>
</div>

<div class="ht-year-block">
  <div class="ht-year-label">2026</div>
  
  <div class="ht-award-row">
    <span class="ht-award-place place-1st">1st</span>
    <span class="ht-award-name">National Olympiad of Cybersecurity, county phase<span class="ht-award-note">1st place for th3mujd11, 12th grade</span></span>
    <span class="ht-award-date">2026-04-27</span>
  </div>

  <div class="ht-award-row">
    <span class="ht-award-place place-1st">1st</span>
    <span class="ht-award-name">National Olympiad of Cybersecurity, county phase<span class="ht-award-note">1st place for Alex, 11th grade</span></span>
    <span class="ht-award-date">2026-04-27</span>
  </div>

  <div class="ht-award-row">
    <span class="ht-award-place place-2nd">2nd</span>
    <span class="ht-award-name">National Olympiad of Cybersecurity, county phase<span class="ht-award-note">2nd place for Ducky Duck, 11th grade</span></span>
    <span class="ht-award-date">2026-04-27</span>
  </div>

  <div class="ht-award-row">
    <span class="ht-award-place place-fin">Finalist</span>
    <span class="ht-award-name">ROCSC<span class="ht-award-note">th3mujd11 qualified for the ROCSC finals, rank 24</span></span>
    <span class="ht-award-date">2026-04-27</span>
  </div>

</div>

<div class="ht-year-block">
  <div class="ht-year-label">2025</div>
  <!---
  <div class="ht-award-row">
    <span class="ht-award-place place-1st">1st</span>
    <span class="ht-award-name">Example CTF 2025 <span class="ht-award-note">— add your results here</span></span>
    <span class="ht-award-date">2025-01</span>
  </div>--->

</div>

<div class="ht-year-block">
  <div class="ht-year-label">2024</div>

  <!---<div class="ht-award-row">
    <span class="ht-award-place place-fin">Finals</span>
    <span class="ht-award-name">Example CTF 2024 <span class="ht-award-note">— add your results here</span></span>
    <span class="ht-award-date">2024-11</span>
  </div>
  --->
</div>

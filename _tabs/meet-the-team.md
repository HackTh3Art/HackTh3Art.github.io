---
icon: fas fa-users
order: 6
---

<style>
.ht-team-header {
  font-family: 'Courier New', monospace;
  border-left: 3px solid #00cc33;
  padding: 1rem 1.2rem;
  margin-bottom: 2rem;
  background: rgba(0,204,51,0.04);
}
.ht-team-header .kicker {
  color: #00cc33;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.ht-team-header .kicker::before { content: "> "; }
.ht-team-header h1 { font-size: 1.6rem; margin: 0 0 0.4rem; color: #f0f0f0; }
.ht-team-header p  { color: #c0c0c0; margin: 0; font-size: 0.9rem; }

.ht-section-label {
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #00cc33;
  border-bottom: 1px solid rgba(0,204,51,0.25);
  padding-bottom: 0.35rem;
  margin-bottom: 1.2rem;
}

.ht-team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.ht-member-card {
  border: 1px solid rgba(0,204,51,0.2);
  border-radius: 6px;
  background: rgba(0,0,0,0.3);
  padding: 1.2rem 1rem 1rem;
  font-family: 'Courier New', monospace;
  transition: border-color 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}
.ht-member-card:hover {
  border-color: rgba(0,204,51,0.55);
  box-shadow: 0 0 12px rgba(0,204,51,0.12);
}

.ht-avatar {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(0,204,51,0.1);
  border: 1px solid rgba(0,204,51,0.35);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 700; color: #00cc33;
  margin-bottom: 0.8rem;
  letter-spacing: 0.05em;
}
.ht-member-name { font-size: 0.95rem; color: #f0f0f0; font-weight: 700; margin: 0 0 0.1rem; }
.ht-member-role { font-size: 0.75rem; color: #00cc33; margin: 0 0 0.6rem; }
.ht-member-bio  { font-size: 0.78rem; color: #999; flex: 1; margin-bottom: 0.8rem; line-height: 1.4; }

.ht-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.8rem; }
.ht-tag {
  font-size: 0.65rem;
  padding: 0.15em 0.55em;
  border: 1px solid rgba(0,204,51,0.3);
  border-radius: 3px;
  color: #00cc33;
  letter-spacing: 0.05em;
}

.ht-links { display: flex; gap: 0.8rem; margin-top: auto; }
.ht-links a { color: #555; font-size: 0.85rem; transition: color 0.15s; text-decoration: none; }
.ht-links a:hover { color: #00cc33; }

.ht-badge {
  font-size: 0.62rem; padding: 0.15em 0.5em;
  border-radius: 3px; margin-left: 0.4rem; vertical-align: middle;
  background: rgba(0,204,51,0.12); color: #00cc33;
  border: 1px solid rgba(0,204,51,0.3); letter-spacing: 0.06em;
}
</style>

<div class="ht-team-header">
  <div class="kicker">People</div>
  <h1>Meet the Team</h1>
  <p>3xh4ck5 — high school CTF team from Romania focused on forensics, web, network, OSINT, and reverse engineering.</p>
</div>

<div class="ht-section-label">Core Team</div>
<div class="ht-team-grid">

  <div class="ht-member-card">
    <div class="ht-avatar">DD</div>
    <p class="ht-member-name">Ducky Duck <span class="ht-badge">Captain</span></p>
    <p class="ht-member-role">Team Leader</p>
    <p class="ht-member-bio">Founded the team in late 2024. Keeps the group moving across competitions, challenge ideas, and coordination.</p>
    <div class="ht-tags">
      <span class="ht-tag">Leadership</span>
      <span class="ht-tag">Misc</span>
    </div>
    <div class="ht-links">
      <a href="https://hackth3art.github.io" title="Website"><i class="fas fa-globe"></i></a>
    </div>
  </div>

  <div class="ht-member-card">
    <div class="ht-avatar">TM</div>
    <p class="ht-member-name">th3mujd11</p>
    <p class="ht-member-role">Forensics · Network · Web · Misc · OSINT</p>
    <p class="ht-member-bio">Insane enough to patch Whitespace files manually. DrDoofenshmirtz of challenge creation.</p>
    <div class="ht-tags">
      <span class="ht-tag">Python</span>
      <span class="ht-tag">Linux</span>
      <span class="ht-tag">Binary</span>
    </div>
    <div class="ht-links">
      <a href="https://github.com/th3mujd11" title="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://th3mujd11.github.io" title="Website"><i class="fas fa-globe"></i></a>
    </div>
  </div>

  <div class="ht-member-card">
    <div class="ht-avatar">AL</div>
    <p class="ht-member-name">Alex</p>
    <p class="ht-member-role">—</p>
    <p class="ht-member-bio">Update this with Alex's role and bio.</p>
    <div class="ht-tags">
      <span class="ht-tag">???</span>
    </div>
    <div class="ht-links">
      <a href="https://github.com/" title="GitHub"><i class="fab fa-github"></i></a>
    </div>
  </div>

  <div class="ht-member-card">
    <div class="ht-avatar">M4</div>
    <p class="ht-member-name">maria404</p>
    <p class="ht-member-role">—</p>
    <p class="ht-member-bio">Update this with maria404's role and bio.</p>
    <div class="ht-tags">
      <span class="ht-tag">???</span>
    </div>
    <div class="ht-links">
      <a href="https://github.com/" title="GitHub"><i class="fab fa-github"></i></a>
    </div>
  </div>

</div>

<!---<div class="ht-section-label">Other Members</div>
<div class="ht-team-grid">-->

  

</div>

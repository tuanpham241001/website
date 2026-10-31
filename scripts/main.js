const SITE = {
    name: "Tuan Anh Pham",
    lastUpdated: "25 Oct 2026",

    nav: [
        ["About", "index.html"],
        ["Research", "research.html"],
        ["Talks", "talks.html"],
        ["Conferences & Visits", "conferences.html"],
         ["Mentorship", "mentoring.html"],
        ["Teaching", "teaching.html"],
        ["CV", "files/Resume_Pham.pdf"],
    ],
};


const root = document.documentElement;

const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
function savedTheme() {
    try { return localStorage.getItem("theme") || "auto"; } catch (e) { return "auto"; }
}
function shownTheme(t) {
    return t === "auto" ? (systemDark.matches ? "dark" : "light") : t;
}
function applyTheme(t) {
    if (t === "auto") delete root.dataset.theme; else root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
    const next = shownTheme(t) === "dark" ? "light" : "dark";
    document.querySelectorAll(".theme-switch").forEach(b => {
        b.innerHTML = `<svg class="icon"><use href="#i-${shownTheme(t)}"/></svg>`;
        b.title = `Switch to ${next} mode`;
        b.setAttribute("aria-label", b.title);
    });
}
function toggleTheme() {
    const next = shownTheme(savedTheme()) === "dark" ? "light" : "dark";
    applyTheme(next === shownTheme("auto") ? "auto" : next);
}
systemDark.addEventListener("change", () => applyTheme(savedTheme()));
applyTheme(savedTheme());


const ICONS = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></symbol>
  <symbol id="i-scholar" viewBox="0 0 24 24"><path d="M2 9.5 12 4l10 5.5L12 15z"/><path d="M6 11.7V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.3"/><path d="M22 9.5V15"/></symbol>
  <symbol id="i-page" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></symbol>
  <symbol id="i-books" viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H19v-5"/></symbol>
  <symbol id="i-slides" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/></symbol>
  <symbol id="i-video" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/></symbol>
  <symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-up" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6"/></symbol>
  <symbol id="i-light" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
  <symbol id="i-dark" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></symbol>
  <symbol id="i-auto" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></symbol>
</svg>`;

// --- <my-header> ---
class MyHeader extends HTMLElement {
    connectedCallback() {
        const here = location.pathname.split("/").pop() || "index.html";
        const links = SITE.nav.map(([label, href]) =>
            `<li><a href="${href}"${href === here ? ' aria-current="page"' : ""}>${label}</a></li>`
        ).join("");
        this.innerHTML = `${ICONS}
        <header class="site-head" id="top">
            <h1 class="site-head__title"><a href="index.html">${SITE.name}</a></h1>
            <nav aria-label="Primary"><ul>${links}</ul></nav>
        </header>`;
    }
}
customElements.define("my-header", MyHeader);

// --- <my-footer> ---
class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <span class="timestamp">Last updated on ${SITE.lastUpdated}</span>
            <span class="footer-right">
                <button class="theme-switch" type="button"></button>
                <a href="#top" class="tag tag-plain"><svg class="icon"><use href="#i-up"/></svg>Back to top</a>
            </span>
        </footer>`;
        this.querySelector(".theme-switch").addEventListener("click", () => {
            toggleTheme();
        });
        applyTheme(savedTheme());
    }
}
customElements.define("my-footer", MyFooter);
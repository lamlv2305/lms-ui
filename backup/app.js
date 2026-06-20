const KRATOS = "/.ory/kratos";

// Read ?flow=<id> from the current URL.
function flowId() {
  return new URLSearchParams(location.search).get("flow");
}

// Render a Kratos self-service flow (login|registration) into #flow.
// We build a native <form> pointed at ui.action and let the browser POST it:
// Kratos sets cookies and 303-redirects on success/error. JS only renders.
async function renderFlow(kind) {
  const root = document.getElementById("flow");
  const id = flowId();
  if (!id) { location.href = `${KRATOS}/self-service/${kind}/browser`; return; }

  const res = await fetch(`${KRATOS}/self-service/${kind}/flows?id=${id}`, {
    headers: { Accept: "application/json" }, credentials: "include",
  });
  if (!res.ok) { location.href = `${KRATOS}/self-service/${kind}/browser`; return; }
  const flow = await res.json();

  const form = document.createElement("form");
  form.action = flow.ui.action;
  form.method = flow.ui.method;

  for (const m of flow.ui.messages || []) addMsg(form, m.text);

  for (const node of flow.ui.nodes) {
    const a = node.attributes;
    if (a.node_type !== "input") continue;
    if (a.type === "hidden") { form.appendChild(input(a)); continue; }
    if (a.type === "submit") {
      const b = document.createElement("button");
      b.type = "submit"; b.name = a.name; b.value = a.value;
      b.textContent = (node.meta.label && node.meta.label.text) || a.value;
      const wrap = document.createElement("div");
      if (a.name === "provider") wrap.className = "oidc";
      wrap.appendChild(b); form.appendChild(wrap);
      continue;
    }
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = (node.meta.label && node.meta.label.text) || a.name;
    div.appendChild(label); div.appendChild(input(a));
    for (const msg of node.messages || []) addMsg(div, msg.text);
    form.appendChild(div);
  }
  root.replaceChildren(form);
}

function input(a) {
  const el = document.createElement("input");
  el.name = a.name; el.type = a.type;
  if (a.value !== undefined) el.value = a.value;
  if (a.required) el.required = true;
  if (a.disabled) el.disabled = true;
  return el;
}

function addMsg(parent, text) {
  const p = document.createElement("p");
  p.className = "msg"; p.textContent = text; parent.appendChild(p);
}

// index.html: show session or login/register links.
async function whoami() {
  const root = document.getElementById("whoami");
  const res = await fetch(`${KRATOS}/sessions/whoami`, { credentials: "include" });
  if (!res.ok) {
    root.innerHTML =
      `<p class="muted">Not signed in.</p>
       <nav><a href="/login">Login</a><a href="/register">Register</a></nav>`;
    return;
  }
  const s = await res.json();
  const email = s.identity.traits.email || "(no email)";
  root.innerHTML = `<p>Signed in as <strong>${email}</strong></p>`;
  const b = document.createElement("button");
  b.textContent = "Logout"; b.onclick = logout;
  root.appendChild(b);
}

async function logout() {
  const res = await fetch(`${KRATOS}/self-service/logout/browser`, { credentials: "include" });
  const { logout_url } = await res.json();
  location.href = logout_url;
}

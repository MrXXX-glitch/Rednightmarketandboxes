// site.js - minimal demo logic for products & cart (no backend)
// WARNING: UI demo only. Do NOT use to collect card data in prod.

const PRODUCTS = [
    { id: "p1", title: "Practical Pentest Labs (eBook)", price: 29.99, desc: "Hands on labs for ethical pentesters." },
    { id: "p2", title: "Hardware Security Token (YubiKey-style)", price: 59.00, desc: "FIDO2 token for secure logins." },
    { id: "p3", title: "VPN 1-year subscription", price: 49.99, desc: "Privacy focused VPN for your lab." },
    { id: "p4", title: "Ethical Hacking Course (video)", price: 99.00, desc: "Beginner → intermediate course." },
    { id: "p5", title: "Network Monitoring Appliance (dev kit)", price: 179.00, desc: "Passive device for lab monitoring." }
];

function fmtEUR(n) { return "€" + n.toFixed(2) }

function loadProducts() {
    const container = document.getElementById("productList");
    if (!container) return;
    container.innerHTML = "";
    PRODUCTS.forEach(p => {
        const el = document.createElement("div");
        el.className = "product";
        el.innerHTML = `<div class="badge">Legal</div>
      <div class="title">${p.title}</div>
      <div class="small">${p.desc}</div>
      <div style="margin-top:8px;display:flex;align-items:center;justify-content:space-between">
        <div class="price">${fmtEUR(p.price)}</div>
        <div><button class="btn" onclick='addToCart("${p.id}")'>Add</button></div>
      </div>`;
        container.appendChild(el);
    });
}

function cartKey() { return "rn_demo_cart_v1" }
function getCart() { try { return JSON.parse(localStorage.getItem(cartKey()) || "[]") } catch (e) { return [] } }
function setCart(c) { localStorage.setItem(cartKey(), JSON.stringify(c)) }
function addToCart(id) {
    const c = getCart();
    c.push(id);
    setCart(c);
    updateCartUI();
    
}
function clearCart() { localStorage.removeItem(cartKey()); updateCartUI() }
function updateCartUI() {
    const box = document.getElementById("cartBox");
    const items = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const total = document.getElementById("cartTotal");
    if (!items) return;

    const c = getCart();
    count.innerText = `${c.length} items`;
    let html = "";
    let sum = 0;
    c.forEach((id, idx) => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return;
        sum += p.price;
        html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed rgba(255,255,255,0.02)">
      <div><strong>${p.title}</strong><div class="small">${fmtEUR(p.price)}</div></div>
      <div><button class="small btn ghost" onclick='removeFromCart(${idx})'>Remove</button></div>
    </div>`;
    });
    items.innerHTML = html || `<div class="small" style="opacity:0.8">Cart is empty</div>`;
    total.innerText = fmtEUR(sum);
    // update checkout summary if exists
    const summary = document.getElementById("summaryBox");
    if (summary) {
        summary.innerHTML = c.length ? html + `<div style="margin-top:8px"><strong>Total: ${fmtEUR(sum)}</strong></div>` : `<div class="small">Cart is empty</div>`;
    }
}
function removeFromCart(i) { const c = getCart(); c.splice(i, 1); setCart(c); updateCartUI() }
function openCart() { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }

function registerUser() {
    const data = {
        first: document.getElementById("firstName").value,
        last: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value
    };
    // do not send any sensitive data in this demo
    
}

function fakeLogin() {
    
}

function simulatePurchase() {
    
    clearCart();
    window.location = "shop.html";
}

// initialization
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartUI();
});

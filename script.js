/* ============================================================
   LifeLink — script.js  (Final Bulletproof Version)
   Navigation works via:
     1. window.goPage() — called by onclick attributes in HTML
     2. Event delegation fallback on data-page attributes
   ============================================================ */

/* ---- Page IDs ---- */
var PAGE_IDS = ['home', 'how', 'register', 'request', 'donors', 'about'];
var selectedUrgency = 'Critical';

/* ---- Demo Donors ---- */
var DEMO_DONORS = [
  { name:'Kavya R.',  blood:'O−',  city:'Chennai',    state:'Tamil Nadu',  age:26, available:true,  lastDon:'2024-10-12', donations:5  },
  { name:'Arjun M.',  blood:'A+',  city:'Mumbai',     state:'Maharashtra', age:34, available:true,  lastDon:'2024-11-03', donations:8  },
  { name:'Priya S.',  blood:'B+',  city:'Delhi',      state:'Delhi',       age:29, available:false, lastDon:'2025-01-20', donations:3  },
  { name:'Rohit K.',  blood:'AB+', city:'Bangalore',  state:'Karnataka',   age:31, available:true,  lastDon:'2024-09-05', donations:12 },
  { name:'Sneha T.',  blood:'O+',  city:'Hyderabad',  state:'Telangana',   age:24, available:true,  lastDon:'2024-12-18', donations:2  },
  { name:'Vikram J.', blood:'A−',  city:'Chennai',    state:'Tamil Nadu',  age:38, available:true,  lastDon:'2024-08-22', donations:7  },
  { name:'Meena P.',  blood:'B−',  city:'Pune',       state:'Maharashtra', age:27, available:false, lastDon:'2025-02-10', donations:1  },
  { name:'Suresh N.', blood:'AB−', city:'Coimbatore', state:'Tamil Nadu',  age:45, available:true,  lastDon:'2024-07-15', donations:15 }
];

/* ==============================================================
   MAIN NAVIGATION FUNCTION
   Exposed on window so HTML onclick="goPage('x')" always works
   regardless of script load order or IIFE scope.
============================================================== */
window.goPage = function(id) {
  if (!id || PAGE_IDS.indexOf(id) === -1) return;

  /* Hide every page */
  for (var i = 0; i < PAGE_IDS.length; i++) {
    var pg = document.getElementById('page-' + PAGE_IDS[i]);
    if (pg) pg.style.display = 'none';

    var nb = document.getElementById('nb-' + PAGE_IDS[i]);
    if (nb) nb.classList.remove('active');
  }

  /* Show target page */
  var target = document.getElementById('page-' + id);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }

  /* Mark nav button active */
  var activeNb = document.getElementById('nb-' + id);
  if (activeNb) activeNb.classList.add('active');

  /* Scroll to top */
  window.scrollTo(0, 0);

  /* Close mobile menu */
  var mob = document.getElementById('mobile-menu');
  if (mob) mob.classList.remove('open');

  /* Render donors if needed */
  if (id === 'donors') renderDonors();
};

/* ==============================================================
   TOAST
============================================================== */
window.showToast = function(msg, icon) {
  var t   = document.getElementById('toast');
  var tm  = document.getElementById('toast-msg');
  var ti  = document.getElementById('toast-icon');
  if (!t) return;
  if (tm) tm.textContent  = msg  || '';
  if (ti) ti.textContent  = icon || '✅';
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function() { t.classList.remove('show'); }, 3000);
};

/* ==============================================================
   HAMBURGER MENU
============================================================== */
window.toggleMenu = function() {
  var m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
};

/* ==============================================================
   URGENCY SELECTOR
============================================================== */
window.selectUrgency = function(el) {
  var opts = document.querySelectorAll('.urg-opt');
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove('selected');
  el.classList.add('selected');
  selectedUrgency = el.getAttribute('data-level') || 'Critical';
};

/* ==============================================================
   REGISTER FORM
============================================================== */
window.submitRegister = function() {
  var fname = getVal('f-fname');
  var lname = getVal('f-lname');
  var phone = getVal('f-phone');
  var blood = getVal('f-blood');
  var age   = getVal('f-age');
  var city  = getVal('f-city');
  var state = getVal('f-state');

  if (!fname || !lname || !phone || !blood || !age || !city || !state) {
    showToast('Please fill all required fields.', '⚠️'); return;
  }

  var donor = {
    name: fname + ' ' + lname, phone: phone, blood: blood,
    age: age, city: city, state: state,
    email:     getVal('f-email'),
    available: isChecked('f-available'),
    notify:    isChecked('f-notify'),
    lastDon:   getVal('f-lastdon'),
    ts: Date.now()
  };

  var list = safeGet('ll_donors');
  list.push(donor);
  safeSet('ll_donors', list);

  hideEl('reg-form-wrap');
  showEl('reg-success');
  showToast('Registered successfully! Welcome to LifeLink 💚', '🩸');
};

/* ==============================================================
   REQUEST BLOOD FORM
============================================================== */
window.submitRequest = function() {
  var name     = getVal('r-name');
  var blood    = getVal('r-blood');
  var hospital = getVal('r-hospital');
  var city     = getVal('r-city');
  var phone    = getVal('r-phone');

  if (!name || !blood || !hospital || !city || !phone) {
    showToast('Please fill all required fields.', '⚠️'); return;
  }

  var req = {
    name: name, blood: blood, hospital: hospital,
    city: city, phone: phone, urgency: selectedUrgency,
    age: getVal('r-age'), units: getVal('r-units'),
    notes: getVal('r-notes'), ts: Date.now()
  };

  var list = safeGet('ll_requests');
  list.push(req);
  safeSet('ll_requests', list);

  hideEl('req-form-wrap');
  showEl('req-success');
  showToast('Request posted! Alerting nearby donors...', '🚨');
};

/* ==============================================================
   DONORS PAGE
============================================================== */
window.filterDonors = function() { renderDonors(); };

function renderDonors() {
  var grid = document.getElementById('donors-grid');
  if (!grid) return;

  var bv = getVal('filter-blood');
  var cv = (document.getElementById('filter-city') || {}).value || '';
  cv = cv.trim().toLowerCase();

  var stored = safeGet('ll_donors');
  var all = DEMO_DONORS.slice();
  for (var i = 0; i < stored.length; i++) {
    var d = stored[i];
    all.push({ name:d.name, blood:d.blood, city:d.city, state:d.state,
               age:d.age, available:d.available, lastDon:d.lastDon, donations:0 });
  }

  if (bv) all = all.filter(function(d){ return d.blood === bv; });
  if (cv) all = all.filter(function(d){ return d.city.toLowerCase().indexOf(cv) !== -1; });

  if (all.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#7ecdc6;padding:48px;">No donors found. Try a different filter.</div>';
    return;
  }

  var html = '';
  for (var j = 0; j < all.length; j++) {
    var d = all[j];
    var initials = d.name.split(' ').map(function(w){ return w[0]||''; }).join('').slice(0,2).toUpperCase();
    var months   = Math.floor((Date.now() - new Date(d.lastDon||0)) / (1000*60*60*24*30));
    var lastStr  = !d.lastDon ? 'Never donated' : (months <= 0 ? 'This month' : (months===1 ? '1 month ago' : months+' months ago'));

    html += '<div class="donor-card">';
    html += '<div class="dc-top"><div class="dc-av">'+initials+'</div><div class="dc-blood">'+d.blood+'</div></div>';
    html += '<div class="dc-name">'+d.name+'</div>';
    html += '<div class="dc-loc">📍 '+d.city+', '+d.state+'</div>';
    html += '<div class="dc-tags"><span class="dc-tag">Age '+d.age+'</span>';
    if (d.donations) html += '<span class="dc-tag">🩸 '+d.donations+' donations</span>';
    html += '<span class="dc-tag">Last: '+lastStr+'</span></div>';
    html += '<div class="dc-status"><span class="'+(d.available?'dot-g':'dot-y')+'"></span>'+(d.available?'Available to donate':'Temporarily unavailable')+'</div>';
    if (d.available) {
      html += '<button class="btn-sm-p" style="width:100%;margin-top:12px;" onclick="showToast(\'Connecting with '+d.name+'...\',\'📞\')">Contact Donor</button>';
    }
    html += '</div>';
  }
  grid.innerHTML = html;
}

/* ==============================================================
   HELPERS
============================================================== */
function getVal(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function isChecked(id) {
  var el = document.getElementById(id);
  return el ? el.checked : false;
}
function showEl(id) {
  var el = document.getElementById(id);
  if (el) { el.style.display = 'block'; }
}
function hideEl(id) {
  var el = document.getElementById(id);
  if (el) { el.style.display = 'none'; }
}
function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { return []; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

/* ==============================================================
   INIT — runs on page load
============================================================== */
window.addEventListener('load', function() {
  /* Force show home page */
  goPage('home');
  renderDonors();
});

// Mokengeli · comptes et données partagées (Firebase Auth + Firestore).
// Chargé uniquement sur la version hébergée (site/). Se branche sur window.MK, exposé par mokengeli.html.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, getDocs, setDoc, updateDoc,
  deleteDoc, collection, query, where, orderBy, limit, onSnapshot, writeBatch, disableNetwork, enableNetwork,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// Configuration publique de l'application web (la sécurité repose sur les règles Firestore, pas sur cette clé).
const app = initializeApp({
  apiKey: 'AIzaSyBoLv9ZGELJhkXngvBPsvFZrsY9SzorS6A',
  authDomain: 'mokengeli-15ffi.firebaseapp.com',
  projectId: 'mokengeli-15ffi',
  storageBucket: 'mokengeli-15ffi.firebasestorage.app',
  messagingSenderId: '423530690887',
  appId: '1:423530690887:web:5a180b445299d211f87462',
});
const auth = getAuth(app);
auth.languageCode = 'fr';
const db = initializeFirestore(app, {localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()})});

const MK = window.MK;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/* ---------- Identifiant : e-mail ou numéro de téléphone ---------- */
// Beaucoup de gardiens n'ont pas d'e-mail : un numéro +243 sert d'identifiant (converti en adresse technique).
const PHONE_DOMAIN = 'tel.mokengeli-demo.netlify.app';
function toLogin(raw){
  const v = String(raw || '').trim();
  if (v.includes('@')) return v.toLowerCase();
  let d = v.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = '243' + d.slice(1);
  if (d.length === 9) d = '243' + d;
  if (d.length < 11 || d.length > 15) throw {code: 'mk/bad-login'};
  return `${d}@${PHONE_DOMAIN}`;
}
const isPhoneLogin = email => String(email || '').endsWith('@' + PHONE_DOMAIN);
const showLogin = email => isPhoneLogin(email) ? '+' + email.split('@')[0] : email;
function genCode(){
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(crypto.getRandomValues(new Uint32Array(6)), n => A[n % A.length]).join('');
}
function errText(e){
  const c = e?.code || '';
  return ({
    'mk/bad-login': "Entrez une adresse e-mail ou un numéro de téléphone valide (ex. 0812345678).",
    'mk/bad-code': "Ce code d'invitation n'existe pas. Vérifiez-le auprès de votre gérant.",
    'mk/no-name': 'Indiquez votre nom.',
    'mk/no-org': 'Indiquez le nom de votre société.',
    'auth/invalid-credential': 'Identifiant ou mot de passe incorrect.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/user-not-found': 'Aucun compte avec cet identifiant.',
    'auth/email-already-in-use': 'Un compte existe déjà avec cet identifiant. Connectez-vous plutôt.',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
    'auth/missing-password': 'Entrez un mot de passe.',
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez dans quelques minutes.',
    'auth/network-request-failed': 'Pas de connexion internet. Réessayez quand le réseau revient.',
    'auth/operation-not-allowed': "La connexion par e-mail n'est pas encore activée dans Firebase.",
    'auth/configuration-not-found': "La connexion par e-mail n'est pas encore activée dans Firebase.",
    'auth/requires-recent-login': 'Par sécurité, reconnectez-vous puis réessayez.',
    'permission-denied': "Action refusée : votre compte n'a pas ce droit.",
    'unavailable': 'Serveur injoignable pour le moment. Les saisies seront envoyées au retour du réseau.',
  })[c] || `Une erreur est survenue (${c || e?.message || 'inconnue'}).`;
}

/* ---------- Interface : bouton du compte, fenêtres Connexion et Mon compte ---------- */
document.head.insertAdjacentHTML('beforeend', `<style>
.acct-tabs{display:flex;gap:4px;background:var(--sunk);border:1px solid var(--line);border-radius:10px;padding:3px;flex-wrap:wrap}
.acct-tabs button{flex:1;border:0;background:none;border-radius:8px;padding:8px 10px;font-weight:700;font-size:13.5px;color:var(--muted);white-space:nowrap}
.acct-tabs button[aria-selected="true"]{background:var(--surface);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.acct-form{display:flex;flex-direction:column;gap:10px}
.acct-form .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.acct-msg{font-size:13.5px;font-weight:700;border-radius:8px;padding:9px 11px}
.acct-msg.err{background:var(--crit-soft);color:var(--crit)}
.acct-msg.ok{background:var(--ok-soft);color:var(--ok)}
.acct-help{margin:0;color:var(--muted);font-size:13px}
.linkbtn{border:0;background:none;color:var(--accent);font-weight:700;padding:0;font-size:13.5px;text-align:left}
.modal .box.acct{max-width:520px;max-height:calc(100vh - 32px);overflow-y:auto}
.acct-sec{border-top:1px solid var(--line);padding-top:14px;display:flex;flex-direction:column;gap:10px}
.acct-sec h3{font-size:15px}
.acct-row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line)}
.acct-row:last-child{border-bottom:0}
.acct-row b{display:block}
.acct-row span{font-size:12.5px;color:var(--muted)}
.code-big{font-family:var(--f-mono);font-size:28px;font-weight:600;letter-spacing:.18em;background:var(--accent-soft);color:var(--accent);border-radius:10px;padding:10px 14px;text-align:center}
.cloud-cta{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.cloud-cta p{margin:0;color:var(--muted)}
.cloud-cta .btns{display:flex;gap:8px;flex-wrap:wrap}
</style>`);

$('#mode-switch').insertAdjacentHTML('afterend', '<button class="btn primary" id="acct-btn" type="button">Se connecter</button>');
$('#mode-note').insertAdjacentHTML('afterend', `<div class="cloud-cta" id="cloud-cta">
  <b>Utiliser Mokengeli pour de vrai</b>
  <p>Créez le compte de votre société : vos gardiens rejoignent l'équipe avec un code, et chaque saisie arrive en direct sur votre tableau de bord.</p>
  <div class="btns"><button class="btn primary" type="button" data-open="org">Créer ma société</button><button class="btn" type="button" data-open="join">J'ai un code d'invitation</button><button class="btn" type="button" data-open="login">Se connecter</button></div>
</div>`);

document.body.insertAdjacentHTML('beforeend', `
<div class="modal" id="auth-modal" hidden>
  <div class="box acct" role="dialog" aria-modal="true" aria-labelledby="auth-title">
    <h2 id="auth-title" style="font-size:20px">Mon compte Mokengeli</h2>
    <div class="acct-tabs" role="tablist">
      <button type="button" role="tab" data-tab="login">Se connecter</button>
      <button type="button" role="tab" data-tab="org">Créer ma société</button>
      <button type="button" role="tab" data-tab="join">Rejoindre avec un code</button>
    </div>
    <div class="acct-msg" id="auth-msg" hidden></div>

    <form class="acct-form" id="f-login" data-pane="login" novalidate>
      <div class="fld"><label for="l-id">E-mail ou numéro de téléphone</label><input id="l-id" autocomplete="username" placeholder="ex. 0812345678 ou nom@exemple.com"></div>
      <div class="fld"><label for="l-pw">Mot de passe</label><input id="l-pw" type="password" autocomplete="current-password"></div>
      <button class="big-btn" type="submit">Se connecter</button>
      <button class="linkbtn" type="button" data-tab="forgot">Mot de passe oublié ?</button>
    </form>

    <form class="acct-form" id="f-forgot" data-pane="forgot" novalidate>
      <p class="acct-help">Entrez l'adresse e-mail de votre compte : vous recevrez un lien pour choisir un nouveau mot de passe.</p>
      <div class="fld"><label for="r-id">E-mail</label><input id="r-id" autocomplete="username"></div>
      <button class="big-btn" type="submit">Envoyer le lien</button>
      <button class="linkbtn" type="button" data-tab="login">Retour à la connexion</button>
    </form>

    <form class="acct-form" id="f-org" data-pane="org" novalidate>
      <p class="acct-help">Pour le gérant ou le responsable. Vous inviterez ensuite vos gardiens avec un code.</p>
      <div class="fld"><label for="o-org">Nom de la société</label><input id="o-org" placeholder="ex. Garde Sûre SARL"></div>
      <div class="fld"><label for="o-name">Votre nom</label><input id="o-name" autocomplete="name"></div>
      <div class="cred">
        <div class="fld"><label for="o-id">E-mail ou numéro de téléphone</label><input id="o-id" autocomplete="username"></div>
        <div class="fld" style="margin-top:10px"><label for="o-pw">Mot de passe (6 caractères minimum)</label><input id="o-pw" type="password" autocomplete="new-password"></div>
      </div>
      <div class="two">
        <div class="fld"><label for="o-site">Premier site</label><input id="o-site" placeholder="ex. Immeuble Kiyo"></div>
        <div class="fld"><label for="o-commune">Commune</label><input id="o-commune" placeholder="ex. Gombe"></div>
      </div>
      <div class="fld"><label for="o-type">Type de site</label><select id="o-type"><option value="immeuble">Immeuble / bureaux</option><option value="hotel">Hôtel / motel (fiche de police)</option><option value="residence">Résidence</option><option value="entrepot">Entrepôt / usine</option></select></div>
      <button class="big-btn" type="submit">Créer ma société</button>
    </form>

    <form class="acct-form" id="f-join" data-pane="join" novalidate>
      <p class="acct-help">Pour les gardiens. Demandez le code d'invitation à votre gérant.</p>
      <div class="fld"><label for="j-code">Code d'invitation</label><input id="j-code" autocomplete="off" style="text-transform:uppercase;font-family:var(--f-mono);letter-spacing:.12em" maxlength="12"></div>
      <div class="fld"><label for="j-name">Votre nom</label><input id="j-name" autocomplete="name"></div>
      <div class="cred">
        <div class="fld"><label for="j-id">Numéro de téléphone ou e-mail</label><input id="j-id" autocomplete="username" placeholder="ex. 0812345678"></div>
        <div class="fld" style="margin-top:10px"><label for="j-pw">Mot de passe (6 caractères minimum)</label><input id="j-pw" type="password" autocomplete="new-password"></div>
      </div>
      <button class="big-btn" type="submit">Rejoindre l'équipe</button>
    </form>

    <div class="btns" style="display:flex;justify-content:flex-end"><button class="btn" type="button" id="auth-close">Fermer</button></div>
  </div>
</div>

<div class="modal" id="me-modal" hidden>
  <div class="box acct" role="dialog" aria-modal="true" aria-labelledby="me-title">
    <h2 id="me-title" style="font-size:20px">Mon compte</h2>
    <div class="acct-msg" id="me-msg" hidden></div>
    <div id="me-body"></div>
    <div class="btns" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><button class="btn danger" type="button" id="me-logout">Se déconnecter</button><button class="btn" type="button" id="me-close">Fermer</button></div>
  </div>
</div>`);

const S = {user: null, profile: null, org: null, unsubs: [], signingUp: false, setup: false, team: []};

function msg(id, text, kind = 'err'){ const m = $(id); m.textContent = text; m.className = 'acct-msg ' + kind; m.hidden = !text; }
function busy(form, on){ form.querySelectorAll('button,input,select').forEach(el => el.disabled = on); }

function openAuth(tab = 'login'){
  msg('#auth-msg', '');
  $('#auth-modal').hidden = false;
  setAuthTab(tab);
}
function setAuthTab(tab){
  // En « finalisation » (compte créé mais pas encore relié à une société), on cache identifiant et mot de passe.
  document.querySelectorAll('#auth-modal [data-pane]').forEach(p => p.hidden = p.dataset.pane !== tab);
  document.querySelectorAll('#auth-modal .acct-tabs button').forEach(b => { b.setAttribute('aria-selected', String(b.dataset.tab === tab)); b.hidden = S.setup && b.dataset.tab === 'login'; });
  document.querySelectorAll('#auth-modal .cred').forEach(c => c.hidden = S.setup);
  $('#auth-title').textContent = S.setup ? 'Reliez votre compte à une société' : 'Mon compte Mokengeli';
  const first = $(`#auth-modal [data-pane="${tab}"] input`); if (first) setTimeout(() => first.focus(), 30);
}
$('#auth-modal').addEventListener('click', e => { const t = e.target.closest('[data-tab]'); if (t) { msg('#auth-msg', ''); setAuthTab(t.dataset.tab); } });
$('#auth-close').addEventListener('click', () => { $('#auth-modal').hidden = true; if (S.setup) signOut(auth); });
$('#cloud-cta').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openAuth(b.dataset.open); });
$('#acct-btn').addEventListener('click', () => S.profile ? openMe() : openAuth('login'));
$('#me-close').addEventListener('click', () => $('#me-modal').hidden = true);
$('#me-logout').addEventListener('click', async () => { $('#me-modal').hidden = true; await signOut(auth); MK.toast('Vous êtes déconnecté.'); });

// Bouton « Gérer les sites » dans le tableau de bord, pour le gérant connecté.
document.querySelector('#a-sites').closest('.panel').querySelector('header').insertAdjacentHTML('beforeend', '<button class="btn primary" type="button" id="a-manage-sites" hidden>Ajouter ou gérer les sites</button>');
$('#a-manage-sites').addEventListener('click', () => { openMe(); setTimeout(() => $('#ms-name')?.scrollIntoView({block: 'center'}), 300); });

MK.onRender = () => {
  $('#a-manage-sites').hidden = S.profile?.role !== 'gerant';
  const btn = $('#acct-btn');
  btn.textContent = S.profile ? `Mon compte · ${S.profile.name.split(' ')[0]}` : 'Se connecter';
  btn.classList.toggle('primary', !S.profile);
  $('#cloud-cta').hidden = !!S.profile;
};
MK.renderAll();

/* ---------- Connexion, inscription, mot de passe oublié ---------- */
$('#f-login').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; busy(f, true); msg('#auth-msg', '');
  try { await signInWithEmailAndPassword(auth, toLogin($('#l-id').value), $('#l-pw').value); }
  catch (err) { msg('#auth-msg', errText(err)); }
  finally { busy(f, false); }
});

$('#f-forgot').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; busy(f, true);
  try {
    const login = toLogin($('#r-id').value);
    if (isPhoneLogin(login)) msg('#auth-msg', "Les comptes créés avec un numéro de téléphone n'ont pas d'e-mail. Demandez à votre gérant de vous retirer de l'équipe, puis recréez votre compte avec le code d'invitation.");
    else { await sendPasswordResetEmail(auth, login); msg('#auth-msg', 'Lien envoyé. Regardez votre boîte e-mail (et les courriers indésirables).', 'ok'); }
  } catch (err) { msg('#auth-msg', err?.code === 'auth/user-not-found' ? 'Lien envoyé si ce compte existe.' : errText(err), err?.code === 'auth/user-not-found' ? 'ok' : 'err'); }
  finally { busy(f, false); }
});

// Crée l'identifiant Firebase (sauf en finalisation), puis le profil. En cas d'échec, l'identifiant à moitié créé est supprimé.
async function withNewAccount(idField, pwField, buildProfile){
  S.signingUp = true;
  let created = null;
  try {
    let user = auth.currentUser;
    if (!S.setup) { created = (await createUserWithEmailAndPassword(auth, toLogin($(idField).value), $(pwField).value)).user; user = created; }
    await buildProfile(user);
    S.setup = false;
    await enter(user);
  } catch (err) {
    if (created) await created.delete().catch(() => signOut(auth));
    throw err;
  } finally { S.signingUp = false; }
}

$('#f-org').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; busy(f, true); msg('#auth-msg', '');
  try {
    const orgName = $('#o-org').value.trim(), name = $('#o-name').value.trim();
    if (!orgName) throw {code: 'mk/no-org'};
    if (!name) throw {code: 'mk/no-name'};
    if (!S.setup) toLogin($('#o-id').value);
    await withNewAccount('#o-id', '#o-pw', async user => {
      const orgRef = doc(collection(db, 'orgs')), code = genCode();
      const b = writeBatch(db);
      b.set(orgRef, {name: orgName, ownerUid: user.uid, joinCode: code, createdAt: Date.now()});
      b.set(doc(db, 'users', user.uid), {orgId: orgRef.id, role: 'gerant', name, login: user.email, createdAt: Date.now()});
      b.set(doc(db, 'joinCodes', code), {orgId: orgRef.id});
      await b.commit();
      const siteName = $('#o-site').value.trim();
      if (siteName) await setDoc(doc(db, 'orgs', orgRef.id, 'siteconf', newId()), siteDoc(siteName, $('#o-commune').value, $('#o-type').value, '', ''));
    });
    f.reset();
    MK.toast('Société créée. Invitez vos gardiens depuis « Mon compte ».');
  } catch (err) { msg('#auth-msg', errText(err)); }
  finally { busy(f, false); }
});

$('#f-join').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; busy(f, true); msg('#auth-msg', '');
  try {
    const code = $('#j-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, ''), name = $('#j-name').value.trim();
    if (!code) throw {code: 'mk/bad-code'};
    if (!name) throw {code: 'mk/no-name'};
    if (!S.setup) toLogin($('#j-id').value);
    await withNewAccount('#j-id', '#j-pw', async user => {
      const jc = await getDoc(doc(db, 'joinCodes', code));
      if (!jc.exists()) throw {code: 'mk/bad-code'};
      await setDoc(doc(db, 'users', user.uid), {orgId: jc.data().orgId, role: 'gardien', name, joinCode: code, login: user.email, createdAt: Date.now()});
    });
    f.reset();
    MK.toast("Bienvenue dans l'équipe. Choisissez votre site dans la liste.");
  } catch (err) { msg('#auth-msg', errText(err)); }
  finally { busy(f, false); }
});

/* ---------- Session ---------- */
async function enter(user){
  const p = await getDoc(doc(db, 'users', user.uid));
  if (!p.exists()) return false;
  S.user = user; S.profile = {uid: user.uid, ...p.data()};
  const o = await getDoc(doc(db, 'orgs', S.profile.orgId));
  S.org = o.exists() ? {id: o.id, ...o.data()} : {id: S.profile.orgId, name: 'Ma société'};
  stopSubs();
  MK.enterCloud({uid: user.uid, name: S.profile.name, role: S.profile.role, orgId: S.profile.orgId, login: user.email}, S.org);
  subscribe(S.profile.orgId);
  $('#auth-modal').hidden = true;
  try { localStorage.setItem('mk-standalone', JSON.stringify('cloud')); } catch {}
  return true;
}
function stopSubs(){ S.unsubs.forEach(u => u()); S.unsubs = []; }

function subscribe(orgId){
  const col = name => collection(db, 'orgs', orgId, name);
  const fail = err => MK.toast(errText(err));
  const into = name => snap => {
    MK.D[name] = new Map(snap.docs.map(d => [d.id, {...d.data(), id: d.id, _pending: d.metadata.hasPendingWrites}]));
    MK.renderAll();
  };
  const meta = {includeMetadataChanges: true};
  S.unsubs.push(
    onSnapshot(query(col('entries'), where('in', '>=', Date.now() - 7 * 864e5), orderBy('in', 'desc'), limit(1000)), meta, into('entries'), fail),
    onSnapshot(col('alerts'), meta, into('alerts'), fail),
    onSnapshot(col('watch'), meta, into('watch'), fail),
    onSnapshot(col('sites'), meta, into('sites'), fail),
    onSnapshot(col('residents'), meta, into('residents'), fail),
    onSnapshot(col('siteconf'), snap => {
      MK.setSites(snap.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)));
      if (!$('#me-modal').hidden) renderMe();
    }, fail),
    onSnapshot(doc(db, 'orgs', orgId), s => {
      if (!s.exists()) return;
      S.org = {id: s.id, ...s.data()}; MK.G.org = S.org; MK.renderAll();
      if (!$('#me-modal').hidden) renderMe();
    }, fail),
    onSnapshot(doc(db, 'users', S.user.uid), s => {
      if (!s.exists()) { MK.toast("Votre accès à cette société a été retiré par le gérant."); signOut(auth); return; }
      S.profile = {uid: s.id, ...s.data()}; MK.G.user = {...MK.G.user, name: S.profile.name}; MK.renderAll();
    }, fail),
  );
}

// Écriture vers la société connectée. Sans réseau, Firestore garde l'écriture sur l'appareil et l'envoie plus tard :
// on n'attend donc pas la réponse du serveur.
MK.cloud = {
  write(op){
    const ref = doc(db, 'orgs', S.profile.orgId, op.coll, op.id);
    (op.data ? setDoc(ref, op.data) : deleteDoc(ref)).catch(err => MK.toast(errText(err)));
    return Promise.resolve();
  },
  setNetwork(on){ return on ? enableNetwork(db) : disableNetwork(db); },
  // Sonnerie : document public lisible par l'habitant grâce à son identifiant secret (dans le lien envoyé).
  ring(data){ setDoc(doc(db, 'rings', data.id), data).catch(err => MK.toast(errText(err))); },
  watchRing(id, cb){ return onSnapshot(doc(db, 'rings', id), s => { if (s.exists()) cb(s.data()); }, err => MK.toast(errText(err))); },
};

/* ---------- Page de réponse de l'habitant : …/#reponse-<identifiant> ---------- */
async function showRingAnswer(id){
  document.body.insertAdjacentHTML('beforeend', `<div id="ring-answer" style="position:fixed;inset:0;z-index:200;background:var(--bg);overflow:auto;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) 24px max(16px,env(safe-area-inset-left,0px))">
    <div style="max-width:440px;margin:0 auto;display:flex;flex-direction:column;gap:16px;padding-top:24px">
      <div style="display:flex;align-items:center;gap:10px"><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect x="1" y="1" width="32" height="32" rx="8" fill="var(--accent)"/><path d="M10 9h14v16H10zM13 9v16" fill="none" stroke="var(--on-accent)" stroke-width="2"/></svg><b style="font-family:var(--f-display);font-size:20px">Mokengeli</b></div>
      <div id="ra-body" class="panel" style="padding:20px;display:flex;flex-direction:column;gap:14px"><p style="margin:0">Chargement…</p></div>
    </div></div>`);
  const body = $('#ra-body');
  const paint = r => {
    const fresh = Date.now() - (r.createdAt || 0) < 30 * 60000;
    const head = `<span class="eyebrow">${esc(r.siteName)}${r.unit ? ' · ' + esc(r.unit) : ''}</span>
      <h1 style="font-size:26px">${esc(r.visitor)} est à l'entrée</h1>
      <p style="margin:0;color:var(--muted)">Bonjour ${esc(r.resident)}, le gardien ${esc(r.by || '')} vous demande si vous acceptez cette visite.</p>`;
    if (r.status === 'accepted') body.innerHTML = head + '<div class="ring-status accepted"><span class="ring-dot"></span>Vous avez accepté. Le gardien laisse entrer votre visiteur.</div>';
    else if (r.status === 'refused') body.innerHTML = head + '<div class="ring-status refused"><span class="ring-dot"></span>Vous avez refusé. Le gardien ne laissera pas entrer.</div>';
    else if (!fresh) body.innerHTML = head + '<div class="ring-status refused"><span class="ring-dot"></span>Cette demande a expiré. Appelez le poste de garde si besoin.</div>';
    else body.innerHTML = head + `<div style="display:grid;gap:10px">
        <button class="big-btn" type="button" data-answer="accepted" style="background:var(--ok)">Laisser entrer</button>
        <button class="big-btn" type="button" data-answer="refused" style="background:var(--crit)">Refuser</button></div>`;
  };
  try {
    const ref = doc(db, 'rings', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) { body.innerHTML = '<p style="margin:0">Ce lien n\'est plus valable.</p>'; return; }
    let r = snap.data(); paint(r);
    body.addEventListener('click', async e => {
      const b = e.target.closest('[data-answer]'); if (!b) return;
      body.querySelectorAll('button').forEach(x => x.disabled = true);
      try { await updateDoc(ref, {status: b.dataset.answer, answeredAt: Date.now()}); r = {...r, status: b.dataset.answer}; paint(r); }
      catch (err) { body.insertAdjacentHTML('beforeend', `<div class="acct-msg err">${esc(errText(err))}</div>`); body.querySelectorAll('button').forEach(x => x.disabled = false); }
    });
  } catch (err) { body.innerHTML = `<p style="margin:0">${esc(errText(err))}</p>`; }
}
const ringHash = location.hash.match(/^#reponse-([a-f0-9]{32})$/);
if (ringHash) showRingAnswer(ringHash[1]);

onAuthStateChanged(auth, async user => {
  if (!user) {
    stopSubs(); S.user = S.profile = S.org = null; S.setup = false;
    if (MK.G.mode === 'cloud') MK.setStandalone('demo', false);
    MK.renderAll();
    return;
  }
  if (S.signingUp || S.profile?.uid === user.uid) return;
  try {
    if (!(await enter(user))) { S.setup = true; openAuth('org'); msg('#auth-msg', "Ce compte n'est relié à aucune société. Créez la vôtre ou rejoignez une équipe avec un code.", 'err'); }
  } catch (err) { MK.toast(errText(err)); }
});

/* ---------- Mon compte ---------- */
function siteDoc(name, commune, type, guard, cps){
  const points = String(cps || '').split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
  return {name: name.trim(), commune: String(commune || '').trim(), type: type || 'immeuble', guard: String(guard || '').trim(),
    cps: points.length ? points : ['Portail principal', 'Parking', 'Arrière du bâtiment'], createdAt: Date.now()};
}
async function loadTeam(){
  if (S.profile?.role !== 'gerant') return;
  try {
    const snap = await getDocs(query(collection(db, 'users'), where('orgId', '==', S.profile.orgId)));
    S.team = snap.docs.map(d => ({uid: d.id, ...d.data()})).sort((a, b) => (a.role === 'gerant' ? -1 : 1) - (b.role === 'gerant' ? -1 : 1) || a.name.localeCompare(b.name));
  } catch (err) { S.team = []; msg('#me-msg', errText(err)); }
  renderMe();
}
function openMe(){ msg('#me-msg', ''); $('#me-modal').hidden = false; renderMe(); loadTeam(); }
function renderMe(){
  const p = S.profile; if (!p) return;
  const isMgr = p.role === 'gerant';
  const joinLink = `${location.origin}${location.pathname}#rejoindre-${S.org?.joinCode || ''}`;
  $('#me-body').innerHTML = `
    <div class="acct-sec" style="border-top:0;padding-top:0">
      <h3>Profil</h3>
      <div class="acct-row"><div><b>${esc(p.name)}</b><span>${isMgr ? 'Gérant' : 'Gardien'} · ${esc(S.org?.name || '')}</span></div></div>
      <div class="acct-row"><div><span>Identifiant de connexion</span><b class="mono">${esc(showLogin(S.user?.email))}</b></div></div>
      <form class="acct-form" id="me-name-f"><div class="fld"><label for="me-name">Nom affiché</label><input id="me-name" value="${esc(p.name)}" maxlength="80"></div><button class="btn" type="submit">Enregistrer le nom</button></form>
    </div>
    <div class="acct-sec">
      <h3>Mot de passe</h3>
      <form class="acct-form" id="me-pw-f">
        <div class="two"><div class="fld"><label for="me-pw0">Actuel</label><input id="me-pw0" type="password" autocomplete="current-password"></div>
        <div class="fld"><label for="me-pw1">Nouveau</label><input id="me-pw1" type="password" autocomplete="new-password"></div></div>
        <button class="btn" type="submit">Changer le mot de passe</button>
      </form>
    </div>
    ${isMgr ? `
    <div class="acct-sec">
      <h3>Inviter des gardiens</h3>
      <p class="acct-help">Le gardien ouvre ce site sur son téléphone, choisit « J'ai un code d'invitation » et entre ce code. Il peut aussi ouvrir directement le lien ci-dessous.</p>
      <div class="code-big" id="me-code">${esc(S.org?.joinCode || '—')}</div>
      <div class="acct-row"><span class="mono" style="word-break:break-all">${esc(joinLink)}</span></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" type="button" id="me-copy">Copier le lien</button><button class="btn" type="button" id="me-regen">Nouveau code</button></div>
      <p class="acct-help">« Nouveau code » rend l'ancien inutilisable. Les gardiens déjà inscrits gardent leur accès.</p>
    </div>
    <div class="acct-sec">
      <h3>Sites (${currentSites().length})</h3>
      <div>${currentSites().map(s => `<div class="acct-row"><div><b>${esc(s.name)}</b><span>${esc(s.commune || '')}${s.guard ? ' · ' + esc(s.guard) : ''} · ${s.cps.length} point(s) de ronde</span></div><button class="btn" type="button" data-delsite="${esc(s.id)}">Supprimer</button></div>`).join('') || '<p class="acct-help">Aucun site pour le moment.</p>'}</div>
      <form class="acct-form" id="me-site-f">
        <div class="two"><div class="fld"><label for="ms-name">Nom du site</label><input id="ms-name" placeholder="ex. Hôtel Mwinda"></div>
        <div class="fld"><label for="ms-commune">Commune</label><input id="ms-commune" placeholder="ex. Limete"></div></div>
        <div class="two"><div class="fld"><label for="ms-type">Type</label><select id="ms-type"><option value="immeuble">Immeuble / bureaux</option><option value="hotel">Hôtel / motel</option><option value="residence">Résidence</option><option value="entrepot">Entrepôt / usine</option></select></div>
        <div class="fld"><label for="ms-guard">Gardien en poste</label><input id="ms-guard" placeholder="facultatif"></div></div>
        <div class="fld"><label for="ms-cps">Points de ronde (séparés par des virgules)</label><input id="ms-cps" placeholder="ex. Portail, Parking, Toit"></div>
        <button class="btn primary" type="submit">Ajouter le site</button>
      </form>
    </div>
    <div class="acct-sec">
      <h3>Équipe</h3>
      <div>${S.team.length ? S.team.map(m => `<div class="acct-row"><div><b>${esc(m.name)}</b><span>${m.role === 'gerant' ? 'Gérant' : 'Gardien'} · ${esc(showLogin(m.login))}</span></div>${m.role === 'gardien' ? `<button class="btn" type="button" data-kick="${esc(m.uid)}" data-kickname="${esc(m.name)}">Retirer</button>` : ''}</div>`).join('') : '<p class="acct-help">Chargement de l\'équipe…</p>'}</div>
    </div>` : ''}`;
}
const currentSites = () => MK.G.mode === 'cloud' ? MK.sites() : [];

$('#me-modal').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target; busy(f, true); msg('#me-msg', '');
  try {
    if (f.id === 'me-name-f') {
      const name = $('#me-name').value.trim(); if (!name) throw {code: 'mk/no-name'};
      await updateDoc(doc(db, 'users', S.user.uid), {name});
      msg('#me-msg', 'Nom enregistré.', 'ok');
    }
    if (f.id === 'me-pw-f') {
      await reauthenticateWithCredential(S.user, EmailAuthProvider.credential(S.user.email, $('#me-pw0').value));
      await updatePassword(S.user, $('#me-pw1').value);
      f.reset(); msg('#me-msg', 'Mot de passe changé.', 'ok');
    }
    if (f.id === 'me-site-f') {
      const name = $('#ms-name').value.trim(); if (!name) throw {code: 'mk/no-name'};
      await setDoc(doc(db, 'orgs', S.profile.orgId, 'siteconf', newId()), siteDoc(name, $('#ms-commune').value, $('#ms-type').value, $('#ms-guard').value, $('#ms-cps').value));
      msg('#me-msg', `Site « ${name} » ajouté.`, 'ok');
    }
  } catch (err) { msg('#me-msg', errText(err)); }
  finally { busy(f, false); }
});

let armed = null;
$('#me-modal').addEventListener('click', async e => {
  const b = e.target.closest('button'); if (!b || b.closest('form')) return;
  try {
    if (b.id === 'me-copy') {
      const link = `${location.origin}${location.pathname}#rejoindre-${S.org.joinCode}`;
      navigator.clipboard.writeText(link).then(() => msg('#me-msg', 'Lien copié : envoyez-le à vos gardiens par WhatsApp.', 'ok'), () => msg('#me-msg', 'Copiez le lien affiché ci-dessus.', 'ok'));
    }
    if (b.id === 'me-regen') {
      if (armed !== 'regen') { armed = 'regen'; b.textContent = "Confirmer : remplacer le code"; b.classList.add('danger'); return; }
      armed = null;
      const code = genCode(), old = S.org.joinCode, batch = writeBatch(db);
      if (old) batch.delete(doc(db, 'joinCodes', old));
      batch.set(doc(db, 'joinCodes', code), {orgId: S.profile.orgId});
      batch.update(doc(db, 'orgs', S.profile.orgId), {joinCode: code});
      await batch.commit();
      msg('#me-msg', `Nouveau code : ${code}`, 'ok');
    }
    if (b.dataset.delsite) {
      if (armed !== 'site:' + b.dataset.delsite) { armed = 'site:' + b.dataset.delsite; b.textContent = 'Confirmer'; b.classList.add('danger'); return; }
      armed = null;
      await deleteDoc(doc(db, 'orgs', S.profile.orgId, 'siteconf', b.dataset.delsite));
      msg('#me-msg', 'Site supprimé. Son historique reste dans le journal.', 'ok');
    }
    if (b.dataset.kick) {
      if (armed !== 'kick:' + b.dataset.kick) { armed = 'kick:' + b.dataset.kick; b.textContent = 'Confirmer'; b.classList.add('danger'); return; }
      armed = null;
      await deleteDoc(doc(db, 'users', b.dataset.kick));
      msg('#me-msg', `${b.dataset.kickname} n'a plus accès à la société.`, 'ok');
      loadTeam();
    }
  } catch (err) { msg('#me-msg', errText(err)); }
});

/* ---------- Liens directs : #connexion, #inscription, #rejoindre-CODE ---------- */
function handleHash(){
  const h = location.hash.slice(1);
  if (S.profile) return;
  if (h === 'connexion') openAuth('login');
  else if (h === 'inscription') openAuth('org');
  else if (h.startsWith('rejoindre')) { openAuth('join'); const c = h.split('-')[1]; if (c) $('#j-code').value = c.toUpperCase(); }
}
window.addEventListener('hashchange', handleHash);
setTimeout(handleHash, 0);

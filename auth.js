// auth.js - simple auth using localStorage (no backend)

const AUTH_STORAGE_KEYS = {
  USERS: 'auth_users_v1',
  SESSION: 'auth_session_v1'
};

// Akun admin bawaan
const DEFAULT_ADMINS = [
  { username: 'admin1', password: 'admin1' },
  { username: 'admin7', password: 'admin67' }
];

function _loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEYS.USERS)) || [];
  } catch {
    return [];
  }
}

function _saveUsers(users) {
  localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Pastikan akun admin bawaan selalu ada
function _ensureDefaultAdmins() {
  const users = _loadUsers();
  let changed = false;
  DEFAULT_ADMINS.forEach(admin => {
    const exists = users.some(u => (u.username || '').toLowerCase() === admin.username.toLowerCase());
    if (!exists) {
      users.push({ username: admin.username, password: admin.password });
      changed = true;
    }
  });
  if (changed) {
    _saveUsers(users);
  }
}


function _setSession(username, role) {
  const payload = {
    username,
    role: role || (username && (username.toLowerCase() === 'admin' || username.toLowerCase() === 'admin7') ? 'admin' : 'user'),
    createdAt: Date.now()
  };
  localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(payload));
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEYS.SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
}

// Hapus semua data user yang tersimpan (untuk reset)
function clearAllUsers() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.USERS);
  localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
}

// Pastikan akun admin bawaan tersedia saat login
_ensureDefaultAdmins();

function registerUser(username, password) {
  username = (username || '').trim();
  password = (password || '').trim();

  if (!username || !password) {
    return { ok: false, message: 'Username dan password wajib diisi.' };
  }

  const users = _loadUsers();
  const exists = users.some(u => (u.username || '').toLowerCase() === username.toLowerCase());
  if (exists) {
    return { ok: false, message: 'Username sudah terdaftar.' };
  }

  users.push({
    username,
    password // NOTE: plain text for demo only
  });
  _saveUsers(users);

  // auto login
  _setSession(username, 'user');
  return { ok: true };
}

function loginUser(username, password) {
  username = (username || '').trim();
  password = (password || '').trim();


  if (!username || !password) {
    return { ok: false, message: 'Username dan password wajib diisi.' };
  }

  const users = _loadUsers();
  const user = users.find(u =>
    (u.username || '').toLowerCase() === username.toLowerCase() && (u.password || '') === password
  );

  if (!user) {
    return { ok: false, message: 'Username atau password salah.' };
  }

  const uname = (user.username || '').toLowerCase();
  const role = (uname === 'admin1' || uname === 'admin7') ? 'admin' : 'user';
  _setSession(user.username, role);
  return { ok: true };
}


function requireAuth(options = {}) {
  const {
    loginUrl = 'login.html',
    redirectBack = true
  } = options;

  const session = getCurrentUser();
  if (!session || !session.username) {
    if (redirectBack) {
      const params = new URLSearchParams(window.location.search);
      params.set('next', window.location.pathname + window.location.search);
      window.location.href = loginUrl + '?' + params.toString();
    } else {
      window.location.href = loginUrl;
    }
    return false;
  }
  return true;
}

function getNextUrl() {
  const params = new URLSearchParams(window.location.search);
  const explicit = params.get('next');
  if (explicit) return explicit;

  // Redirect berdasarkan role
  const session = getCurrentUser();
  if (session && (session.role === 'admin' || (session.username || '').toLowerCase() === 'admin1' || (session.username || '').toLowerCase() === 'admin7')) {
    return 'admin-pinjam.html';
  }
  return 'pinjam.html';
}



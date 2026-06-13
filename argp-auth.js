/* ARGP Demo — 角色登录与界面权限 */
(function () {
  var STORAGE_KEY = 'argp_demo_user';

  var TEACHER_CAPS = {
    mentor: {
      id: 'mentor',
      label: '导师',
      name: '张明远',
      avatar: '张',
      dept: '计算机学院 · 教授',
      home: 'index.html#mentor',
      includes: ['mentor']
    },
    expert: {
      id: 'expert',
      label: '评审专家',
      name: '陈建平',
      avatar: '陈',
      dept: '人工智能学院 · 教授',
      home: 'review.html#expert',
      includes: ['expert']
    },
    chair: {
      id: 'chair',
      label: '评审组长',
      name: '李国华',
      avatar: '李',
      dept: '学术委员会 · 评审组组长',
      home: 'review.html#chair',
      includes: ['expert', 'chair']
    }
  };

  var ROLES = {
    student: {
      id: 'student',
      label: '学生',
      name: '李同学',
      avatar: '李',
      dept: '计算机科学与技术学院 · 2022级',
      home: 'index.html',
      indexDefault: 'home'
    },
    teacher: {
      id: 'teacher',
      label: '教师',
      name: '张明远',
      avatar: '张',
      dept: '计算机学院 · 教授',
      home: 'index.html#mentor',
      indexDefault: 'mentor-list'
    },
    secretary: {
      id: 'secretary',
      label: '秘书处',
      name: '王秘书',
      avatar: '王',
      dept: '学术委员会秘书处',
      home: 'review.html',
      indexDefault: null
    }
  };

  var PAGE_ACCESS = {
    'index.html': ['student', 'teacher', 'secretary'],
    'review.html': ['teacher', 'secretary'],
    'governance.html': ['teacher', 'secretary']
  };

  var REVIEW_HASH_CAPS = {
    '#expert': 'expert',
    '#defense': 'expert',
    '#vote': 'expert',
    '#chair': 'chair',
    '#gov-review': 'chair'
  };

  function getPageKey() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function getUser() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function getRole() {
    var u = getUser();
    return u && u.role ? u.role : null;
  }

  function getTeacherCap() {
    var u = getUser();
    if (!u || u.role !== 'teacher') return null;
    return u.teacherCap && TEACHER_CAPS[u.teacherCap] ? u.teacherCap : 'mentor';
  }

  function getEffectiveCaps() {
    var cap = getTeacherCap();
    if (!cap) return [];
    return TEACHER_CAPS[cap].includes || [cap];
  }

  function canAccessReview() {
    var caps = getEffectiveCaps();
    return caps.indexOf('expert') !== -1 || caps.indexOf('chair') !== -1;
  }

  function applyTeacherPersona(user, capId) {
    var cap = TEACHER_CAPS[capId];
    if (!cap) return user;
    return Object.assign({}, user, {
      teacherCap: capId,
      name: cap.name,
      avatar: cap.avatar,
      dept: cap.dept,
      capLabel: cap.label
    });
  }

  function persistUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function login(roleId) {
    var role = ROLES[roleId];
    if (!role) return;
    var user = {
      role: roleId,
      name: role.name,
      avatar: role.avatar,
      label: role.label,
      loginAt: Date.now()
    };
    if (roleId === 'teacher') {
      user = applyTeacherPersona(user, 'mentor');
    }
    persistUser(user);
    window.location.href = roleId === 'teacher' ? TEACHER_CAPS.mentor.home : role.home;
  }

  function switchTeacherCap(capId) {
    if (!TEACHER_CAPS[capId]) return;
    var user = getUser();
    if (!user || user.role !== 'teacher') return;
    user = applyTeacherPersona(user, capId);
    persistUser(user);
    window.location.href = TEACHER_CAPS[capId].home;
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    window.location.href = 'login.html';
  }

  function requireAuth() {
    if (getPageKey() === 'login.html') return;
    if (!getUser()) {
      window.location.replace('login.html');
      return false;
    }
    return true;
  }

  function guardPageAccess() {
    var page = getPageKey();
    if (page === 'login.html') return;
    var role = getRole();
    if (!role) return;
    var allowed = PAGE_ACCESS[page];
    if (allowed && allowed.indexOf(role) === -1) {
      window.location.replace(ROLES[role].home);
      return;
    }
    if (page === 'review.html' && role === 'teacher' && !canAccessReview()) {
      window.location.replace(TEACHER_CAPS.mentor.home);
      return;
    }
    if (page === 'review.html' && role === 'teacher') {
      var hash = window.location.hash;
      var needed = REVIEW_HASH_CAPS[hash];
      if (needed && getEffectiveCaps().indexOf(needed) === -1) {
        window.location.replace(TEACHER_CAPS[getTeacherCap()].home);
      }
    }
  }

  function hasRole(rolesAttr) {
    if (!rolesAttr) return true;
    var role = getRole();
    if (!role) return false;
    return rolesAttr.split(',').map(function (s) { return s.trim(); }).indexOf(role) !== -1;
  }

  function hasTeacherCap(capsAttr) {
    if (!capsAttr) return true;
    if (getRole() !== 'teacher') return false;
    var needed = capsAttr.split(',').map(function (s) { return s.trim(); });
    var effective = getEffectiveCaps();
    for (var i = 0; i < needed.length; i++) {
      if (effective.indexOf(needed[i]) !== -1) return true;
    }
    return false;
  }

  function isElementVisible(el) {
    if (!hasRole(el.getAttribute('data-roles'))) return false;
    if (el.hasAttribute('data-teacher-caps') && !hasTeacherCap(el.getAttribute('data-teacher-caps'))) return false;
    return true;
  }

  function setRoleElementVisible(el, visible) {
    if (visible) el.classList.remove('role-hidden');
    else el.classList.add('role-hidden');
  }

  function renderTeacherCapSwitcher(user) {
    var wrap = document.getElementById('acc-cap-wrap');
    var list = document.getElementById('acc-cap-list');
    if (!wrap || !list) return;
    if (user.role !== 'teacher') {
      wrap.style.display = 'none';
      return;
    }
    wrap.style.display = '';
    var current = getTeacherCap();
    list.innerHTML = '';
    Object.keys(TEACHER_CAPS).forEach(function (capId) {
      var cap = TEACHER_CAPS[capId];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'acc-cap-item' + (capId === current ? ' active' : '');
      btn.setAttribute('data-cap', capId);
      btn.innerHTML = '<span class="acc-cap-name">' + cap.label + '</span><span class="acc-cap-person">' + cap.name + '</span>';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (capId !== getTeacherCap()) switchTeacherCap(capId);
      });
      list.appendChild(btn);
    });
  }

  function applyRoleUI() {
    var user = getUser();
    if (!user) return;
    var role = ROLES[user.role];
    if (!role) return;

    if (user.role === 'teacher' && !user.teacherCap) {
      user = applyTeacherPersona(user, 'mentor');
      persistUser(user);
    }

    document.querySelectorAll('[data-roles]').forEach(function (el) {
      setRoleElementVisible(el, isElementVisible(el));
    });

    document.querySelectorAll('[data-role-home]').forEach(function (el) {
      setRoleElementVisible(el, el.getAttribute('data-role-home') === user.role);
    });

    document.querySelectorAll('[data-teacher-cap-home]').forEach(function (el) {
      var show = user.role === 'teacher' && getTeacherCap() === el.getAttribute('data-teacher-cap-home');
      setRoleElementVisible(el, show);
    });

    document.querySelectorAll('.nav-group').forEach(function (group) {
      var items = group.querySelectorAll('.nav-item');
      if (!items.length) return;
      var anyVisible = false;
      items.forEach(function (item) {
        if (!item.classList.contains('role-hidden')) anyVisible = true;
      });
      setRoleElementVisible(group, anyVisible);
    });

    var cap = user.role === 'teacher' ? TEACHER_CAPS[getTeacherCap()] : null;
    var displayName = user.name || role.name;
    var displayLabel = user.role === 'teacher' && cap ? ('教师 · ' + cap.label) : role.label;

    var avatar = document.querySelector('.gh-avatar');
    var userWrap = document.querySelector('.gh-user');
    if (avatar) avatar.textContent = user.avatar || role.avatar;
    if (userWrap) userWrap.setAttribute('title', displayName + ' · ' + displayLabel);

    var roleBadge = document.getElementById('gh-role-badge');
    if (roleBadge) roleBadge.textContent = displayLabel;

    var accName = document.getElementById('acc-name');
    var accRole = document.getElementById('acc-role');
    var accDept = document.getElementById('acc-dept');
    if (accName) accName.textContent = displayName;
    if (accRole) accRole.textContent = displayLabel;
    if (accDept) accDept.textContent = user.dept || role.dept;

    document.body.setAttribute('data-user-role', user.role);
    document.body.setAttribute('data-teacher-cap', user.role === 'teacher' ? getTeacherCap() : '');

    renderTeacherCapSwitcher(user);

    if (window.ARGP_UI && window.ARGP_UI.refreshFeed) {
      window.ARGP_UI.refreshFeed();
    }
  }

  function initIndexLanding() {
    if (getPageKey() !== 'index.html') return;
    var role = getRole();
    if (!role || !ROLES[role]) return;

    var hash = window.location.hash;

    if (role === 'student' && hash === '#proj-list') {
      if (typeof window.showPage === 'function') window.showPage('my-proj');
      if (typeof window.updateBreadcrumb === 'function') window.updateBreadcrumb('my-proj');
      document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
      var myNav = document.querySelector('.nav-item[data-nav="my-proj"]');
      if (myNav) myNav.classList.add('active');
      return;
    }

    if (role === 'student' && window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
      window.ARGP_MOCK.initStudentProjects();
    }

    if (role === 'teacher') {
      var cap = getTeacherCap();
      if (hash === '#proj-list') {
        if (typeof window.showPage === 'function') window.showPage('proj-list');
        if (typeof window.updateBreadcrumb === 'function') window.updateBreadcrumb('proj-list');
        document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        var listNav = document.querySelector('.nav-item[data-nav="proj-list"]');
        if (listNav) listNav.classList.add('active');
        return;
      }
      if (hash === '#mentor' && cap === 'mentor') {
        if (typeof window.showPage === 'function') window.showPage('mentor-list');
        if (typeof window.updateBreadcrumb === 'function') window.updateBreadcrumb('mentor-list');
        document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        var mentorNav = document.querySelector('.nav-item[data-nav="mentor-list"]');
        if (mentorNav) mentorNav.classList.add('active');
        return;
      }
      if (cap !== 'mentor') {
        window.location.replace(TEACHER_CAPS[cap].home);
        return;
      }
    }

    if (role === 'secretary') {
      var listPage = hash === '#proj-list' || role === 'secretary' ? 'proj-list' : null;
      if (listPage && typeof window.showPage === 'function') {
        window.showPage(listPage);
        if (typeof window.updateBreadcrumb === 'function') window.updateBreadcrumb(listPage);
        document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        var secListNav = document.querySelector('.nav-item[data-nav="proj-list"]');
        if (secListNav) secListNav.classList.add('active');
      }
      return;
    }

    var def = ROLES[role].indexDefault;
    if (!def || def === 'home') return;

    if (typeof window.showPage === 'function') {
      window.showPage(def);
      if (typeof window.updateBreadcrumb === 'function') window.updateBreadcrumb(def);
      document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
      var navEl = document.querySelector('.nav-item[data-nav="' + def + '"]');
      if (navEl) navEl.classList.add('active');
    }
  }

  function initReviewLanding() {
    if (getPageKey() !== 'review.html') return;
    var role = getRole();
    if (role === 'secretary') return;

    if (role === 'teacher') {
      var hash = window.location.hash;
      var pageMap = {
        '#expert': 'expert-list',
        '#defense': 'defense-list',
        '#vote': 'vote',
        '#chair': 'chair'
      };
      var pageId = pageMap[hash];
      if (pageId && typeof window.showPage === 'function') {
        window.showPage(pageId);
        return;
      }
      var cap = getTeacherCap();
      var capHome = TEACHER_CAPS[cap];
      if (capHome && capHome.home.indexOf('review.html') === 0) {
        var capHash = capHome.split('#')[1];
        if (capHash && typeof window.showPage === 'function') {
          var defaultPage = pageMap['#' + capHash];
          if (defaultPage) window.showPage(defaultPage);
        }
      }
    }
  }

  function initAccountPanel() {
    var userBtn = document.getElementById('gh-user-btn');
    var panel = document.getElementById('gh-account-panel');
    if (!userBtn || !panel) return;

    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
      var feed = document.getElementById('gh-feed-panel');
      var more = document.getElementById('gh-more-panel');
      if (feed) feed.classList.remove('open');
      if (more) more.classList.remove('open');
    });

    panel.addEventListener('click', function (e) { e.stopPropagation(); });

    var logoutBtn = document.getElementById('acc-logout');
    var switchBtn = document.getElementById('acc-switch');
    if (logoutBtn) logoutBtn.addEventListener('click', function (e) { e.preventDefault(); logout(); });
    if (switchBtn) switchBtn.addEventListener('click', function (e) { e.preventDefault(); logout(); });

    document.addEventListener('click', function () {
      panel.classList.remove('open');
    });
  }

  window.ARGP_AUTH = {
    ROLES: ROLES,
    TEACHER_CAPS: TEACHER_CAPS,
    getUser: getUser,
    getRole: getRole,
    getTeacherCap: getTeacherCap,
    hasTeacherCap: hasTeacherCap,
    switchTeacherCap: switchTeacherCap,
    login: login,
    logout: logout
  };

  window.initArgpAuth = function () {
    if (getPageKey() === 'login.html') return;
    if (!requireAuth()) return;
    guardPageAccess();
    applyRoleUI();
    initAccountPanel();
    initIndexLanding();
    initReviewLanding();
  };

})();

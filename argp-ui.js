/* ARGP shared UI — 站内信预览 & 消息 Drawer */
(function () {
  var feedFilter = 'all';
  var drawerCategory = 'flow';
  var drawerEl = null;
  var overlayEl = null;

  function tagClass(type) {
    return { flow: 'ft-blue', warn: 'ft-orange', pub: 'ft-green', obj: 'ft-red', sys: 'ft-gray' }[type] || 'ft-gray';
  }

  function getMsgApi() {
    return window.ARGP_MESSAGES;
  }

  function getFeedItems() {
    var api = getMsgApi();
    if (!api) return [];
    var list = api.getMessages();
    if (feedFilter === 'flow') {
      list = list.filter(function (m) { return m.category === 'flow'; });
    } else if (feedFilter === 'pub') {
      list = list.filter(function (m) { return m.category === 'pub'; });
    } else if (feedFilter === 'obj') {
      list = list.filter(function (m) { return m.category === 'obj'; });
    }
    return list.slice(0, 5);
  }

  function updateFeedBadge() {
    var badge = document.getElementById('gh-feed-badge');
    var api = getMsgApi();
    if (!badge || !api) return;
    var n = api.getUnreadCount();
    if (n > 0) {
      badge.textContent = n > 9 ? '9+' : String(n);
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }

  function updateFeedTabs() {
    var role = window.ARGP_AUTH && window.ARGP_AUTH.getRole();
    document.querySelectorAll('.gh-feed-tab').forEach(function (tab) {
      var tabRoles = tab.getAttribute('data-roles');
      if (!tabRoles) return;
      var show = tabRoles.split(',').map(function (s) { return s.trim(); }).indexOf(role) !== -1;
      tab.classList.toggle('role-hidden', !show);
      if (!show && tab.classList.contains('active')) {
        tab.classList.remove('active');
        feedFilter = 'all';
        var allTab = document.querySelector('.gh-feed-tab[data-filter="all"]');
        if (allTab) allTab.classList.add('active');
      }
    });
  }

  function resolveDrawerCategory(filterOrCategory) {
    if (filterOrCategory === 'obj' || filterOrCategory === 'pub' || filterOrCategory === 'flow' || filterOrCategory === 'sys') {
      return filterOrCategory;
    }
    if (filterOrCategory === 'all') return 'flow';
    return filterOrCategory || 'flow';
  }

  function renderFeedList() {
    var list = document.getElementById('gh-feed-list');
    if (!list) return;
    var items = getFeedItems();
    list.innerHTML = items.map(function (it) {
      var projAttr = it.projId ? ' data-proj-id="' + it.projId + '"' : '';
      var pubProjAttr = it.pubProjId ? ' data-pub-proj-id="' + it.pubProjId + '"' : '';
      var focusDisputeAttr = it.focusDispute ? ' data-focus-dispute="1"' : '';
      var actionAttr = it.actionFn ? ' data-action-fn="1"' : '';
      var msgIdAttr = it.id ? ' data-msg-id="' + it.id + '"' : '';
      return '<a class="gh-feed-item' + (it.unread ? ' unread' : '') + '" href="#" data-msg-cat="' + it.category + '"' + projAttr + pubProjAttr + focusDisputeAttr + actionAttr + msgIdAttr + '">' +
        '<div class="gh-feed-item-hd"><span class="gh-feed-tag ' + tagClass(it.category) + '">' + it.tag + '</span>' +
        '<span class="gh-feed-time">' + it.time + '</span></div>' +
        '<div class="gh-feed-item-title">' + it.title + '</div>' +
        '<div class="gh-feed-item-desc">' + it.desc + '</div></a>';
    }).join('');
    if (!items.length) {
      list.innerHTML = '<div class="gh-feed-empty">暂无消息</div>';
    }
    updateFeedTabs();
    updateFeedBadge();
  }

  function bindFeedItemClicks() {
    var list = document.getElementById('gh-feed-list');
    if (!list || list.getAttribute('data-bound') === '1') return;
    list.setAttribute('data-bound', '1');
    list.addEventListener('click', function (e) {
      var item = e.target.closest('.gh-feed-item[data-msg-cat]');
      if (!item) return;
      e.preventDefault();
      e.stopPropagation();
      var projId = item.getAttribute('data-proj-id');
      var pubProjId = item.getAttribute('data-pub-proj-id');
      var msgId = item.getAttribute('data-msg-id');
      if (pubProjId && window.ARGP_MOCK && window.ARGP_MOCK.openPubProjectDetail) {
        var pubOpts = item.getAttribute('data-focus-dispute') === '1' ? { focusDispute: true } : {};
        window.ARGP_MOCK.openPubProjectDetail(pubProjId, pubOpts);
        closeAllPanels();
        return;
      }
      if (projId && window.ARGP_MOCK && window.ARGP_MOCK.openProjectDetail) {
        window.ARGP_MOCK.openProjectDetail(projId);
        if (item.getAttribute('data-focus-dispute') === '1') {
          setTimeout(function () {
            if (window.ARGP_APPEAL && window.ARGP_APPEAL.focusDisputeTab) {
              window.ARGP_APPEAL.focusDisputeTab();
            }
          }, 80);
        }
        closeAllPanels();
        return;
      }
      openMsgDrawer(item.getAttribute('data-msg-cat'));
    });
  }

  var CAT_SVG = {
    sys: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a2 2 0 100 4 2 2 0 000-4zM3 9h10l1 5H2l1-5z"/></svg>',
    flow: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v2H2V3zm0 4h8v6H2V7zm10 0h2v6h-2V7z"/></svg>',
    pub: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.3 5.3l-4 4a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4L7 8.6l3.3-3.3a1 1 0 011.4 1.4z"/></svg>',
    obj: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L1 13h14L8 1zm0 3l4.5 7h-9L8 4zm0 6a1 1 0 100 2 1 1 0 000-2z"/></svg>'
  };

  function ensureDrawer() {
    if (drawerEl) return;
    overlayEl = document.createElement('div');
    overlayEl.className = 'msg-drawer-overlay';
    overlayEl.id = 'msg-drawer-overlay';
    overlayEl.addEventListener('click', closeMsgDrawer);

    drawerEl = document.createElement('aside');
    drawerEl.className = 'msg-drawer';
    drawerEl.id = 'msg-drawer';
    drawerEl.setAttribute('aria-label', '消息中心');
    drawerEl.innerHTML =
      '<div class="msg-drawer-hd">' +
        '<div class="msg-drawer-hd-brand">' +
          '<div class="msg-drawer-hd-icon" aria-hidden="true">' +
            '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a6 6 0 00-6 6v.5L1 10h14l-1-2.5V7a6 6 0 00-6-6zm-1.5 13a1.5 1.5 0 003 0h-3z"/></svg>' +
          '</div>' +
          '<div>' +
            '<div class="msg-drawer-hd-title">消息中心</div>' +
            '<div class="msg-drawer-hd-sub">通知 · 公示 · 流程提醒</div>' +
          '</div>' +
        '</div>' +
        '<div class="msg-drawer-hd-actions">' +
          '<span class="msg-drawer-unread-pill" id="msg-drawer-unread-summary">0 条未读</span>' +
          '<button type="button" class="btn btn-sm msg-drawer-mark-read" id="msg-drawer-mark-read">全部已读</button>' +
          '<button type="button" class="msg-drawer-close" id="msg-drawer-close" aria-label="关闭">' +
            '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="msg-drawer-body">' +
        '<div class="msg-drawer-nav-wrap">' +
          '<div class="msg-drawer-nav-label">消息分类</div>' +
          '<div class="msg-drawer-nav" id="msg-drawer-nav"></div>' +
        '</div>' +
        '<div class="msg-drawer-content" id="msg-drawer-content"></div>' +
      '</div>';

    document.body.appendChild(overlayEl);
    document.body.appendChild(drawerEl);

    document.getElementById('msg-drawer-close').addEventListener('click', closeMsgDrawer);
    document.getElementById('msg-drawer-mark-read').addEventListener('click', function () {
      if (typeof window.showToast === 'function') {
        window.showToast('已全部标为已读', 'success');
      }
      updateDrawerHeader();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawerEl && drawerEl.classList.contains('open')) {
        closeMsgDrawer();
      }
    });
  }

  function updateDrawerHeader() {
    var api = getMsgApi();
    var el = document.getElementById('msg-drawer-unread-summary');
    if (!el || !api) return;
    var n = api.getUnreadCount();
    el.textContent = n > 0 ? (n + ' 条未读') : '全部已读';
    el.classList.toggle('is-clear', n === 0);
  }

  function renderDrawerNav() {
    var nav = document.getElementById('msg-drawer-nav');
    var api = getMsgApi();
    if (!nav || !api) return;
    var cats = api.getVisibleCategories();
    if (cats.indexOf(drawerCategory) === -1 && cats.length) {
      drawerCategory = cats[0];
    }
    nav.innerHTML = cats.map(function (cat) {
      var meta = api.CATEGORIES[cat];
      var unread = api.getCategoryUnread(cat);
      var total = api.getMessages({ category: cat }).length;
      var active = cat === drawerCategory ? ' active' : '';
      return '<button type="button" class="msg-drawer-nav-item' + active + '" data-cat="' + cat + '">' +
        '<span class="msg-drawer-nav-ic msg-drawer-nav-ic-' + cat + '" style="background:' + meta.iconBg + ';color:' + meta.accent + '">' +
          (CAT_SVG[cat] || CAT_SVG.flow) +
        '</span>' +
        '<span class="msg-drawer-nav-text">' +
          '<span class="msg-drawer-nav-label">' + meta.label + '</span>' +
          '<span class="msg-drawer-nav-hint">' + meta.hint + '</span>' +
        '</span>' +
        '<span class="msg-drawer-nav-meta">' +
          (unread ? '<span class="msg-drawer-count">' + unread + '</span>' : '') +
          '<span class="msg-drawer-total">' + total + '</span>' +
        '</span>' +
      '</button>';
    }).join('');

    nav.querySelectorAll('.msg-drawer-nav-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        drawerCategory = btn.getAttribute('data-cat');
        renderDrawerNav();
        renderDrawerContent();
      });
    });
  }

  function renderMessageActions(it) {
    if (it.actionFn) {
      return '<div class="msg-card-actions"><button type="button" class="btn btn-sm btn-primary" onclick="' + it.actionFn + ';ARGP_UI.closeMsgDrawer();">' + (it.actionLabel || '查看') + '</button></div>';
    }
    if (it.pubProjId && window.ARGP_MOCK && window.ARGP_MOCK.openPubProjectDetail) {
      var pubFocus = it.focusDispute ? ', { focusDispute: true }' : '';
      return '<div class="msg-card-actions"><button type="button" class="btn btn-sm btn-primary" onclick="ARGP_MOCK.openPubProjectDetail(\'' + it.pubProjId + '\'' + pubFocus + ');ARGP_UI.closeMsgDrawer();">' + (it.actionLabel || '查看详情') + '</button></div>';
    }
    if (it.projId && window.ARGP_MOCK && window.ARGP_MOCK.openProjectDetail) {
      var focusFn = it.focusDispute ? ';setTimeout(function(){if(window.ARGP_APPEAL)ARGP_APPEAL.focusDisputeTab()},80)' : '';
      return '<div class="msg-card-actions"><button type="button" class="btn btn-sm btn-primary" onclick="ARGP_MOCK.openProjectDetail(\'' + it.projId + '\')' + focusFn + ';ARGP_UI.closeMsgDrawer();">' + (it.actionLabel || '查看项目') + '</button></div>';
    }
    if (it.actionLabel && it.href && it.href !== '#') {
      return '<div class="msg-card-actions"><a class="btn btn-sm btn-secondary" href="' + it.href + '">' + it.actionLabel + '</a></div>';
    }
    if (it.href && it.href !== '#') {
      var label = it.category === 'pub' ? '查看公示详情' : '查看相关页面';
      return '<div class="msg-card-actions"><a class="btn btn-sm btn-primary" href="' + it.href + '">' + label + '</a></div>';
    }
    return '';
  }

  function renderMessageCard(it, meta) {
    var unreadCls = it.unread ? ' unread' : '';
    var actions = renderMessageActions(it);
    if (it.category === 'pub') {
      return '<article class="msg-card msg-card-pub' + unreadCls + '">' +
        '<div class="msg-card-pub-icon" style="background:' + meta.bg + ';color:' + meta.accent + '">' + (CAT_SVG.pub || '') + '</div>' +
        '<div class="msg-card-main">' +
          '<div class="msg-card-hd"><span class="gh-feed-tag ft-green">' + it.tag + '</span><span class="msg-card-time">' + it.time + '</span></div>' +
          '<h4 class="msg-card-title">' + it.title + '</h4>' +
          '<p class="msg-card-desc">' + it.desc + '</p>' +
          actions +
        '</div>' +
      '</article>';
    }
    if (it.category === 'obj') {
      return '<article class="msg-card msg-card-obj' + unreadCls + '">' +
        '<div class="msg-card-accent" style="background:' + meta.accent + '"></div>' +
        '<div class="msg-card-main">' +
          '<div class="msg-card-hd"><span class="gh-feed-tag ft-red">' + it.tag + '</span>' +
            (it.unread ? '<span class="msg-card-status">待处理</span>' : '<span class="msg-card-status is-done">已读</span>') +
          '</div>' +
          '<h4 class="msg-card-title">' + it.title + '</h4>' +
          '<p class="msg-card-desc">' + it.desc + '</p>' +
          actions +
          '<div class="msg-card-foot"><span class="msg-card-time">' + it.time + '</span></div>' +
        '</div>' +
      '</article>';
    }
    return '<article class="msg-card msg-card-' + it.category + unreadCls + '">' +
      '<div class="msg-card-accent" style="background:' + meta.accent + '"></div>' +
      '<div class="msg-card-main">' +
        '<div class="msg-card-hd">' +
          '<span class="gh-feed-tag ' + tagClass(it.category) + '">' + it.tag + '</span>' +
          '<span class="msg-card-time">' + it.time + '</span>' +
        '</div>' +
        '<h4 class="msg-card-title">' + it.title + '</h4>' +
        '<p class="msg-card-desc">' + it.desc + '</p>' +
        actions +
      '</div>' +
    '</article>';
  }

  function renderDrawerContent() {
    var content = document.getElementById('msg-drawer-content');
    var api = getMsgApi();
    if (!content || !api) return;
    var items = api.getMessages({ category: drawerCategory });
    var meta = api.CATEGORIES[drawerCategory] || {};
    var unreadCount = api.getCategoryUnread(drawerCategory);

    if (!items.length) {
      content.innerHTML =
        '<div class="msg-drawer-content-inner">' +
          '<div class="msg-drawer-toolbar"><div><h3 class="msg-drawer-cat-title">' + (meta.label || '') + '</h3>' +
          '<p class="msg-drawer-cat-sub">' + (meta.hint || '') + '</p></div></div>' +
          '<div class="msg-drawer-empty">' +
            '<div class="msg-drawer-empty-ic" style="background:' + (meta.bg || '#f5f5f5') + ';color:' + (meta.accent || '#8c8c8c') + '">' + (CAT_SVG[drawerCategory] || CAT_SVG.flow) + '</div>' +
            '<div class="msg-drawer-empty-title">暂无' + (meta.label || '消息') + '</div>' +
            '<div class="msg-drawer-empty-desc">当前分类下没有新消息</div>' +
          '</div>' +
        '</div>';
      return;
    }

    var html =
      '<div class="msg-drawer-content-inner">' +
        '<div class="msg-drawer-toolbar">' +
          '<div class="msg-drawer-toolbar-text">' +
            '<h3 class="msg-drawer-cat-title">' + meta.label + '</h3>' +
            '<p class="msg-drawer-cat-sub">共 ' + items.length + ' 条' +
              (unreadCount ? ' · <strong>' + unreadCount + ' 条未读</strong>' : ' · 全部已读') +
            '</p>' +
          '</div>' +
          '<div class="msg-drawer-cat-badge" style="background:' + meta.bg + ';color:' + meta.accent + '">' +
            (CAT_SVG[drawerCategory] || '') +
          '</div>' +
        '</div>' +
        '<div class="msg-drawer-list">';
    items.forEach(function (it) {
      html += renderMessageCard(it, meta);
    });
    html += '</div></div>';
    content.innerHTML = html;
  }

  function openMsgDrawer(category) {
    ensureDrawer();
    if (category) drawerCategory = resolveDrawerCategory(category);
    updateDrawerHeader();
    renderDrawerNav();
    renderDrawerContent();
    overlayEl.classList.add('open');
    drawerEl.classList.add('open');
    document.body.classList.add('msg-drawer-open');
    var feed = document.getElementById('gh-feed-panel');
    if (feed) feed.classList.remove('open');
  }

  function closeMsgDrawer() {
    if (!drawerEl) return;
    overlayEl.classList.remove('open');
    drawerEl.classList.remove('open');
    document.body.classList.remove('msg-drawer-open');
  }

  function closeAllPanels() {
    var feed = document.getElementById('gh-feed-panel');
    var more = document.getElementById('gh-more-panel');
    if (feed) feed.classList.remove('open');
    if (more) more.classList.remove('open');
  }

  function togglePanel(id) {
    var panel = document.getElementById(id);
    var other = id === 'gh-feed-panel' ? 'gh-more-panel' : 'gh-feed-panel';
    var otherEl = document.getElementById(other);
    if (otherEl) otherEl.classList.remove('open');
    if (panel) panel.classList.toggle('open');
  }

  function initFeedTabs() {
    document.querySelectorAll('.gh-feed-tab').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.gh-feed-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        feedFilter = tab.getAttribute('data-filter') || 'all';
        renderFeedList();
      });
    });

    var viewAll = document.getElementById('gh-feed-view-all');
    if (viewAll) {
      viewAll.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openMsgDrawer(resolveDrawerCategory(feedFilter));
      });
    }

    bindFeedItemClicks();
  }

  function filterTab(el) {
    var tabsEl = el.closest('.tabs');
    if (!tabsEl) return;
    var group = tabsEl.getAttribute('data-tab-group');
    var filter = el.getAttribute('data-filter') || 'all';

    tabsEl.querySelectorAll('.tab-item').forEach(function (t) {
      t.classList.remove('active');
    });
    el.classList.add('active');

    if (!group) return;

    if (group === 'proj-list' && window.ARGP_BATCHES) {
      window.ARGP_BATCHES.applyProjListFilter();
      return;
    }

    var page = tabsEl.closest('.page') || document;
    var panel = page.querySelector('[data-tab-panel="' + group + '"]');
    if (!panel) {
      var sib = tabsEl.nextElementSibling;
      while (sib && sib.classList && sib.classList.contains('tabs')) {
        sib = sib.nextElementSibling;
      }
      panel = sib;
    }
    if (!panel) return;

    var visible = 0;
    panel.querySelectorAll('[data-tab]').forEach(function (item) {
      var tab = item.getAttribute('data-tab');
      var show = filter === 'all' || tab === filter;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    var emptyEl = panel.querySelector('[data-tab-empty]');
    if (emptyEl) {
      emptyEl.style.display = visible === 0 ? '' : 'none';
    }
  }

  function activeTab(el) {
    var tabsEl = el.closest('.tabs');
    if (!tabsEl) return;
    if (tabsEl.getAttribute('data-tab-group')) {
      filterTab(el);
      return;
    }
    tabsEl.querySelectorAll('.tab-item').forEach(function (t) {
      t.classList.remove('active');
    });
    el.classList.add('active');
  }

  function initTabGroups(root) {
    (root || document).querySelectorAll('.tabs[data-tab-group]').forEach(function (tabsEl) {
      var active = tabsEl.querySelector('.tab-item.active') || tabsEl.querySelector('.tab-item');
      if (active) filterTab(active);
    });
  }

  window.filterTab = filterTab;
  window.activeTab = activeTab;

  window.ARGP_UI = {
    refreshFeed: renderFeedList,
    refreshMsgBadge: updateFeedBadge,
    openMsgDrawer: openMsgDrawer,
    closeMsgDrawer: closeMsgDrawer,
    initTabGroups: initTabGroups
  };

  window.initArgpUI = function () {
    var feedBtn = document.getElementById('gh-feed-btn');
    var moreBtn = document.getElementById('gh-more-btn');
    if (feedBtn) {
      feedBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePanel('gh-feed-panel');
      });
    }
    if (moreBtn) {
      moreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePanel('gh-more-panel');
      });
    }
    document.addEventListener('click', closeAllPanels);
    var feedPanel = document.getElementById('gh-feed-panel');
    var morePanel = document.getElementById('gh-more-panel');
    if (feedPanel) feedPanel.addEventListener('click', function (e) { e.stopPropagation(); });
    if (morePanel) morePanel.addEventListener('click', function (e) { e.stopPropagation(); });

    initFeedTabs();
    renderFeedList();
    bindFeedItemClicks();
    initTabGroups();
    if (window.ARGP_AUTH && window.ARGP_AUTH.getRole && window.ARGP_AUTH.getRole() === 'student' &&
        window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
      window.ARGP_MOCK.initStudentProjects();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initArgpUI);
  } else {
    window.initArgpUI();
  }
})();

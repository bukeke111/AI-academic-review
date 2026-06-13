/* ARGP Demo — 申报批次 Mock 与项目列表批次过滤 */
(function () {
  var STORAGE_KEY = 'argp_selected_batch';

  var BATCHES = [
    {
      id: 'batch-2026-spring-2',
      name: '2026年春季 · 第二批次',
      shortName: '2026春二批',
      season: '2026年春季',
      period: '第二批次',
      status: 'active',
      statusLabel: '进行中',
      applyStart: '2026-01-10',
      applyEnd: '2026-02-28',
      reviewEnd: '2026-04-30',
      projectCount: 12,
      desc: '当前主评审批次，含受理、评审与答辩全流程'
    },
    {
      id: 'batch-2026-fall-1',
      name: '2026年秋季 · 第一批次',
      shortName: '2026秋一批',
      season: '2026年秋季',
      period: '第一批次',
      status: 'closed',
      statusLabel: '已结束',
      applyStart: '2026-09-01',
      applyEnd: '2026-10-15',
      reviewEnd: '2026-12-20',
      projectCount: 28,
      desc: '已完成公示与归档，数据仅供查询'
    },
    {
      id: 'batch-2026-spring-3',
      name: '2026年春季 · 第三批次',
      shortName: '2026春三批',
      season: '2026年春季',
      period: '第三批次',
      status: 'upcoming',
      statusLabel: '筹备中',
      applyStart: '2026-04-01',
      applyEnd: '2026-05-15',
      reviewEnd: '2026-07-31',
      projectCount: 0,
      desc: '批次参数已配置，尚未开放申报'
    }
  ];

  var STATUS_BADGE = {
    active: 'b-review',
    closed: 'b-archived',
    upcoming: 'b-submitted'
  };

  function getSelectedBatch() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || 'batch-2026-spring-2';
    } catch (e) {
      return 'batch-2026-spring-2';
    }
  }

  function setSelectedBatch(id) {
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch (e) { /* ignore */ }
  }

  function getBatchById(id) {
    return BATCHES.filter(function (b) { return b.id === id; })[0] || null;
  }

  function countVisibleInBatch(batchId) {
    var panel = document.querySelector('[data-tab-panel="proj-list"]');
    if (!panel) return 0;
    var n = 0;
    panel.querySelectorAll('tbody tr[data-tab][data-batch]').forEach(function (row) {
      if (batchId === 'all' || row.getAttribute('data-batch') === batchId) n++;
    });
    return n;
  }

  function applyProjListFilter() {
    var panel = document.querySelector('[data-tab-panel="proj-list"]');
    var tabsEl = document.querySelector('[data-tab-group="proj-list"]');
    if (!panel || !tabsEl) return;

    var batch = getSelectedBatch();
    var activeTab = tabsEl.querySelector('.tab-item.active');
    var statusFilter = activeTab ? (activeTab.getAttribute('data-filter') || 'all') : 'all';
    var visible = 0;

    panel.querySelectorAll('tbody tr[data-tab]').forEach(function (row) {
      var rowBatch = row.getAttribute('data-batch');
      var rowTab = row.getAttribute('data-tab');
      var batchMatch = batch === 'all' || rowBatch === batch;
      var statusMatch = statusFilter === 'all' || rowTab === statusFilter;
      var show = batchMatch && statusMatch;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    var emptyEl = panel.querySelector('[data-tab-empty]');
    if (emptyEl) emptyEl.style.display = visible === 0 ? '' : 'none';

    updateProjListSubtitle(batch, visible);
    updateBatchPills();
  }

  function updateProjListSubtitle(batchId, visible) {
    var sub = document.getElementById('proj-list-sub');
    if (!sub) return;
    if (batchId === 'all') {
      sub.textContent = '全部批次 · 当前显示 ' + visible + ' 项';
      return;
    }
    var b = getBatchById(batchId);
    sub.textContent = b ? (b.name + ' · 共 ' + visible + ' 项') : ('共 ' + visible + ' 项');
  }

  function renderBatchBar() {
    var wrap = document.getElementById('proj-batch-pills');
    if (!wrap) return;
    var selected = getSelectedBatch();

    var html = '<button type="button" class="batch-pill' + (selected === 'all' ? ' active' : '') + '" data-batch="all">' +
      '全部批次</button>';

    BATCHES.forEach(function (b) {
      var active = selected === b.id ? ' active' : '';
      html += '<button type="button" class="batch-pill' + active + '" data-batch="' + b.id + '">' +
        b.shortName +
        '<span class="batch-pill-tag batch-tag-' + b.status + '">' + b.statusLabel + '</span>' +
        '</button>';
    });

    wrap.innerHTML = html;
    wrap.querySelectorAll('.batch-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-batch');
        setSelectedBatch(id);
        applyProjListFilter();
      });
    });
  }

  function updateBatchPills() {
    var selected = getSelectedBatch();
    document.querySelectorAll('#proj-batch-pills .batch-pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-batch') === selected);
    });
  }

  function renderBatchManagePanel() {
    var body = document.getElementById('batch-manage-body');
    if (!body) return;
    var selected = getSelectedBatch();

    body.innerHTML = BATCHES.map(function (b) {
      var isCurrent = selected === b.id;
      var badgeCls = STATUS_BADGE[b.status] || 'b-submitted';
      return '<div class="batch-card' + (isCurrent ? ' batch-card-current' : '') + '">' +
        '<div class="batch-card-hd">' +
          '<div><div class="batch-card-title">' + b.name + '</div>' +
          '<div class="batch-card-desc">' + b.desc + '</div></div>' +
          '<span class="badge ' + badgeCls + '">' + b.statusLabel + '</span>' +
        '</div>' +
        '<div class="batch-card-meta">' +
          '<div><span class="batch-meta-k">申报窗口</span><span class="batch-meta-v">' + b.applyStart + ' ~ ' + b.applyEnd + '</span></div>' +
          '<div><span class="batch-meta-k">评审截止</span><span class="batch-meta-v">' + b.reviewEnd + '</span></div>' +
          '<div><span class="batch-meta-k">项目数量</span><span class="batch-meta-v">' + b.projectCount + ' 项</span></div>' +
        '</div>' +
        '<div class="batch-card-actions">' +
          (b.status === 'active'
            ? '<button type="button" class="btn btn-sm btn-primary" onclick="ARGP_BATCHES.selectBatch(\'' + b.id + '\')">切换到此批次</button>'
            : '') +
          (b.status === 'upcoming'
            ? '<button type="button" class="btn btn-sm btn-secondary" onclick="showToast(\'批次已保存（Demo）\',\'success\')">编辑配置</button>'
            : '') +
          (b.status === 'closed'
            ? '<button type="button" class="btn btn-sm btn-secondary" onclick="ARGP_BATCHES.selectBatch(\'' + b.id + '\')">查看项目</button>'
            : '') +
          (isCurrent ? '<span class="batch-current-mark">当前筛选</span>' : '') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function selectBatch(id) {
    setSelectedBatch(id);
    renderBatchBar();
    applyProjListFilter();
    renderBatchManagePanel();
    var panel = document.getElementById('batch-manage-panel');
    if (panel && panel.classList.contains('open')) {
      /* keep open */
    }
    if (typeof window.showToast === 'function') {
      var b = getBatchById(id);
      if (b) window.showToast('已切换至「' + b.shortName + '」', 'success');
    }
  }

  function toggleBatchPanel() {
    var panel = document.getElementById('batch-manage-panel');
    if (!panel) return;
    var open = panel.classList.toggle('open');
    panel.style.display = open ? '' : 'none';
    if (open) renderBatchManagePanel();
  }

  function populateNewProjBatchSelect() {
    var sel = document.getElementById('proj-new-batch-select');
    if (!sel || sel.getAttribute('data-populated') === '1') return;
    sel.setAttribute('data-populated', '1');
    var active = getBatchById('batch-2026-spring-2');
    var upcoming = getBatchById('batch-2026-spring-3');
    sel.innerHTML =
      '<option value="" disabled>请选择申报批次</option>' +
      (active ? '<option value="' + active.id + '" selected>' + active.name + '（进行中）</option>' : '') +
      (upcoming ? '<option value="' + upcoming.id + '">' + upcoming.name + '（筹备中）</option>' : '');
  }

  function initBatches() {
    renderBatchBar();
    populateNewProjBatchSelect();
    applyProjListFilter();
  }

  window.toggleBatchPanel = toggleBatchPanel;

  window.ARGP_BATCHES = {
    BATCHES: BATCHES,
    getSelectedBatch: getSelectedBatch,
    setSelectedBatch: setSelectedBatch,
    getBatchById: getBatchById,
    selectBatch: selectBatch,
    applyProjListFilter: applyProjListFilter,
    renderBatchBar: renderBatchBar,
    renderBatchManagePanel: renderBatchManagePanel,
    toggleBatchPanel: toggleBatchPanel,
    initBatches: initBatches
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBatches);
  } else {
    initBatches();
  }
})();

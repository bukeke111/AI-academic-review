/* ARGP Demo — 公示异议 & 评审结果申诉（秘书处 + 学生端） */
(function () {
  var APPEAL_REASONS = [
    { id: 'procedure', label: '评审程序违规（如未通知答辩、专家数量不足）' },
    { id: 'conflict', label: '存在应回避而未回避的专家关系' },
    { id: 'material', label: '关键评审材料未纳入评议范围' },
    { id: 'other', label: '其他程序性问题' }
  ];

  var OBJECTION_TYPES = {
    grade: '对立项等级有异议',
    process: '对评审过程有异议',
    expert: '对评审专家资质有异议'
  };

  var OBJECTION_REQUESTS = [
    {
      id: 'OBJ-001',
      projId: 'PROJ-2026-0029',
      projTitle: '量子计算在密码学中的应用探索',
      applicant: '孙杰',
      objector: '同批次申请人（匿名）',
      type: 'grade',
      typeLabel: '对立项等级有异议',
      reason: '认为本项目综合评分与答辩表现应评定为校级而非国家级，请求复核评分权重与等级投票记录。',
      time: '3天前',
      status: 'pending'
    },
    {
      id: 'OBJ-002',
      projId: 'PROJ-2026-0031',
      projTitle: '多模态情感分析系统设计',
      applicant: '赵磊',
      objector: '陈某（同批次申请人）',
      type: 'grade',
      typeLabel: '对立项等级有异议',
      reason: '公示结果标注院级立项，但答辩现场综合评分高于部分校级项目，质疑等级投票程序是否合规。',
      time: '5天前',
      status: 'processing'
    }
  ];

  var APPEAL_REQUESTS = [
    {
      id: 'APL-SEED-1',
      projId: 'PROJ-2026-0078',
      title: '基于深度学习的医学影像分割研究',
      applicant: '李明',
      type: 'procedure',
      typeLabel: '评审程序违规（如未通知答辩、专家数量不足）',
      reason: '答辩通知于答辩前仅 1 个工作日送达，不符合至少 3 个工作日的程序要求；请求启动复议流程。',
      time: '2小时前',
      status: 'pending'
    }
  ];

  var _currentAppealProjId = null;
  var _disputesTab = 'objection';

  function getProject(id) {
    if (!window.ARGP_MOCK || !window.ARGP_MOCK.STUDENT_PROJECTS) return null;
    var list = window.ARGP_MOCK.STUDENT_PROJECTS;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function getAvoidanceCount() {
    if (window.ARGP_SECRETARY && window.ARGP_SECRETARY.getAvoidanceCount) {
      return window.ARGP_SECRETARY.getAvoidanceCount();
    }
    return 0;
  }

  function countPendingObjections() {
    return OBJECTION_REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
  }

  function countPendingAppeals() {
    return APPEAL_REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
  }

  function getDisputeCounts() {
    return {
      objections: countPendingObjections(),
      objectionsTotal: OBJECTION_REQUESTS.length,
      appeals: countPendingAppeals(),
      appealsTotal: APPEAL_REQUESTS.length,
      avoidance: getAvoidanceCount()
    };
  }

  function refreshAllDisputeViews() {
    renderSecretaryDisputesSummary();
    renderSecretaryAppealsPanel();
    renderSecretaryObjectionsPanel();
    var page = document.getElementById('page-sec-disputes');
    if (page && page.classList.contains('active')) {
      renderSecretaryDisputesPage();
    }
    updateDisputesNavBadge();
  }

  function updateDisputesNavBadge() {
    var badge = document.getElementById('nav-disputes-badge');
    if (!badge) return;
    var n = countPendingObjections() + countPendingAppeals() + getAvoidanceCount();
    badge.textContent = String(n);
    badge.style.display = n > 0 ? '' : 'none';
  }

  function canSubmitAppeal(p) {
    if (!p || p.status !== 'failed') return false;
    if (p.appealStatus === 'pending' || p.appealStatus === 'reviewing' || p.appealStatus === 'closed') {
      return false;
    }
    return true;
  }

  function openAppealPage(projId) {
    if (!projId && window.ARGP_MOCK && window.ARGP_MOCK.getCurrentDetailId) {
      projId = window.ARGP_MOCK.getCurrentDetailId();
    }
    var p = getProject(projId);
    if (!p) {
      if (typeof showToast === 'function') showToast('项目不存在', 'warn');
      return;
    }
    if (!canSubmitAppeal(p)) {
      if (p.appealStatus === 'pending' || p.appealStatus === 'reviewing') {
        if (typeof showToast === 'function') showToast('申诉已提交，请等待秘书处受理', 'info');
      } else if (p.appealStatus === 'closed') {
        if (typeof showToast === 'function') showToast('申诉已结案，不可重复提交', 'info');
      }
      if (window.ARGP_MOCK && window.ARGP_MOCK.openProjectDetail) {
        window.ARGP_MOCK.openProjectDetail(projId);
      }
      return;
    }
    _currentAppealProjId = projId;
    if (typeof window.showPage === 'function') window.showPage('proj-appeal');
  }

  function renderAppealPage() {
    var root = document.getElementById('page-proj-appeal');
    if (!root) return;
    var projId = _currentAppealProjId;
    if (!projId && window.ARGP_MOCK && window.ARGP_MOCK.getCurrentDetailId) {
      projId = window.ARGP_MOCK.getCurrentDetailId();
    }
    var p = getProject(projId);
    if (!p || p.status !== 'failed') {
      root.innerHTML = '<p class="text-muted">暂无可申诉的评审结果。</p>';
      return;
    }
    _currentAppealProjId = p.id;
    var reasonOpts = APPEAL_REASONS.map(function (r) {
      return '<option value="' + r.id + '">' + r.label + '</option>';
    }).join('');

    root.innerHTML =
      '<div class="breadcrumb">' +
        '<span class="bc-link" onclick="showPage(\'my-proj\')">我的项目</span>' +
        '<span class="bc-sep">›</span>' +
        '<span class="bc-link" onclick="ARGP_MOCK.openProjectDetail(\'' + p.id + '\')">' + p.title + '</span>' +
        '<span class="bc-sep">›</span><span>评审结果申诉</span></div>' +
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">评审结果申诉</div>' +
        '<div style="display:flex;gap:8px;margin-top:5px;flex-wrap:wrap;">' +
          '<span class="mono text-xs text-muted">' + p.id + '</span>' +
          '<span class="my-proj-status st-failed">不予立项</span></div></div>' +
      '<div class="detail-layout"><div>' +
        '<div class="form-card">' +
          '<div class="form-section-title">评审结果通知</div>' +
          '<div style="font-size:13px;line-height:1.75;color:var(--text-secondary);margin-bottom:14px;">' +
            (p.resultNotice || '经评审委员会审议，本项目未准予立项。') + '</div>' +
          '<div class="form-grid form-grid-2">' +
            '<div><div class="form-label">综合评分</div><div class="mono text-danger" style="margin-top:4px;font-size:15px;">' +
              (p.finalScore != null ? p.finalScore : '—') + ' 分</div></div>' +
            '<div><div class="form-label">申诉截止</div><div style="margin-top:4px;font-size:13px;">' +
              (p.appealDeadline || '结果通知后 7 个工作日内') + '</div></div></div></div>' +
        '<div class="form-card">' +
          '<div class="form-section-title">填写申诉申请</div>' +
          '<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:var(--radius);padding:10px 13px;font-size:12.5px;color:#991b1b;line-height:1.65;margin-bottom:14px;">' +
            '<strong>受理范围说明：</strong>申诉仅受理<strong>程序性问题</strong>，不接受对学术判断本身的异议。</div>' +
          '<div class="form-grid form-grid-1" style="margin-bottom:12px;">' +
            '<div><label class="form-label">申诉类型 <span style="color:#dc2626;">*</span></label>' +
              '<select class="form-select" id="appeal-reason-type">' +
                '<option value="">请选择申诉类型</option>' + reasonOpts + '</select></div>' +
            '<div><label class="form-label">申诉理由 <span style="color:#dc2626;">*</span></label>' +
              '<textarea class="form-textarea" id="appeal-reason-text" style="min-height:120px;" ' +
                'placeholder="请详细说明程序问题及可核查依据…"></textarea></div></div>' +
          '<div class="btn-group">' +
            '<button class="btn btn-ghost" type="button" onclick="ARGP_MOCK.openProjectDetail(\'' + p.id + '\')">返回项目</button>' +
            '<button class="btn btn-primary" type="button" onclick="ARGP_APPEAL.submitAppeal()">提交申诉</button></div></div></div>' +
      '<div><div class="meta-card">' +
        '<div class="meta-title">复议流程</div>' +
        '<div style="font-size:12.5px;line-height:1.8;color:var(--text-secondary);">' +
          '<p style="margin:0 0 8px;"><strong>1.</strong> 秘书处审核是否符合受理条件</p>' +
          '<p style="margin:0 0 8px;"><strong>2.</strong> 组建 3 位新专家复议小组</p>' +
          '<p style="margin:0 0 8px;"><strong>3.</strong> 15 个工作日内出具复议意见</p>' +
          '<p style="margin:0;"><strong>4.</strong> 结果写入 Governance Graph</p></div></div></div></div>';
  }

  function submitAppeal() {
    var p = getProject(_currentAppealProjId);
    if (!p || !canSubmitAppeal(p)) return;
    var typeEl = document.getElementById('appeal-reason-type');
    var textEl = document.getElementById('appeal-reason-text');
    var type = typeEl ? typeEl.value : '';
    var text = textEl ? textEl.value.trim() : '';
    if (!type || !text) {
      if (typeof showToast === 'function') showToast(type ? '请填写申诉理由' : '请选择申诉类型', 'warn');
      return;
    }
    var typeLabel = type;
    APPEAL_REASONS.forEach(function (r) {
      if (r.id === type) typeLabel = r.label;
    });
    p.appealStatus = 'pending';
    p.appealSubmittedAt = '2026-03-17';
    APPEAL_REQUESTS.push({
      id: 'APL-' + Date.now(),
      projId: p.id,
      title: p.title,
      applicant: '李明',
      type: type,
      typeLabel: typeLabel,
      reason: text,
      time: '刚刚',
      status: 'pending'
    });
    if (window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
      window.ARGP_MOCK.initStudentProjects();
    }
    refreshAllDisputeViews();
    if (typeof showToast === 'function') {
      showToast('申诉已提交，秘书处将在 3 个工作日内审核受理条件', 'success');
    }
    if (window.ARGP_MOCK && window.ARGP_MOCK.openProjectDetail) {
      window.ARGP_MOCK.openProjectDetail(p.id);
    }
  }

  function registerObjection(data) {
    OBJECTION_REQUESTS.unshift({
      id: 'OBJ-' + Date.now(),
      projId: data.projId || '—',
      projTitle: data.projTitle || data.projId,
      applicant: data.applicant || '—',
      objector: data.objector || '公示期申请人',
      type: data.type || 'grade',
      typeLabel: data.typeLabel || OBJECTION_TYPES[data.type] || data.type,
      reason: data.reason,
      time: '刚刚',
      status: 'pending'
    });
    refreshAllDisputeViews();
  }

  function renderDisputeItemHtml(r, kind) {
    var statusBadge = r.status === 'pending'
      ? '<span class="badge b-yellow">待处理</span>'
      : (r.status === 'processing' || r.status === 'reviewing'
        ? '<span class="badge b-blue">处理中</span>'
        : '<span class="badge b-green">已结案</span>');
    var actions = '';
    if (r.status === 'pending') {
      if (kind === 'objection') {
        actions =
          '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_APPEAL.acceptObjection(\'' + r.id + '\')">受理核查</button>' +
          '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_APPEAL.dismissObjection(\'' + r.id + '\')">驳回</button>';
      } else {
        actions =
          '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_APPEAL.acceptAppeal(\'' + r.id + '\')">受理复议</button>' +
          '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_APPEAL.dismissAppeal(\'' + r.id + '\')">驳回</button>';
      }
    } else if (r.status === 'processing' || r.status === 'reviewing') {
      actions = '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_APPEAL.closeDispute(\'' + kind + '\',\'' + r.id + '\')">标记结案</button>';
    }
    var meta = kind === 'objection'
      ? '异议人：' + r.objector + ' · 类型：' + r.typeLabel + ' · ' + r.time
      : '申请人：' + r.applicant + ' · 类型：' + r.typeLabel + ' · ' + r.time;
    return '<div class="sec-avoid-item">' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">' +
          '<div style="font-weight:600;font-size:13.5px;">' + r.projId + ' · ' + (r.projTitle || r.title) + '</div>' +
          statusBadge + '</div>' +
        '<div class="text-xs text-muted" style="margin-bottom:6px;">' + meta + '</div>' +
        '<div class="text-xs" style="line-height:1.55;color:var(--text-2);">' + r.reason + '</div></div>' +
      '<div style="display:flex;gap:6px;flex-shrink:0;flex-direction:column;">' + actions + '</div></div>';
  }

  function renderSecretaryObjectionsPanel() {
    var el = document.getElementById('sec-objections-wrap');
    if (!el) return;
    if (!OBJECTION_REQUESTS.length) {
      el.innerHTML = '';
      return;
    }
    el.innerHTML =
      '<div class="panel" style="margin-top:16px;">' +
        '<div class="panel-hd"><div class="panel-title">公示异议 · 待处理</div>' +
          '<span class="badge b-yellow">' + countPendingObjections() + ' 条</span>' +
          '<a class="section-action" style="margin-left:auto;" onclick="ARGP_APPEAL.openDisputesPage(\'objection\')">进入处理台 →</a></div>' +
        '<div style="padding:0 14px 14px;">' +
          OBJECTION_REQUESTS.slice(0, 2).map(function (r) { return renderDisputeItemHtml(r, 'objection'); }).join('') +
        '</div></div>';
  }

  function renderSecretaryAppealsPanel() {
    var el = document.getElementById('sec-appeals-wrap');
    if (!el) return;
    if (!APPEAL_REQUESTS.length) {
      el.innerHTML = '';
      return;
    }
    el.innerHTML =
      '<div class="panel" style="margin-top:16px;">' +
        '<div class="panel-hd"><div class="panel-title">评审结果申诉 · 待受理</div>' +
          '<span class="badge b-yellow">' + countPendingAppeals() + ' 条</span>' +
          '<a class="section-action" style="margin-left:auto;" onclick="ARGP_APPEAL.openDisputesPage(\'appeal\')">进入处理台 →</a></div>' +
        '<div style="padding:0 14px 14px;">' +
          APPEAL_REQUESTS.filter(function (r) { return r.status === 'pending'; }).slice(0, 2)
            .map(function (r) { return renderDisputeItemHtml(r, 'appeal'); }).join('') +
        '</div></div>';
  }

  function renderSecretaryDisputesSummary() {
    var el = document.getElementById('sec-disputes-summary-wrap');
    if (!el) return;
    var c = getDisputeCounts();
    el.innerHTML =
      '<div class="panel" style="margin-bottom:16px;">' +
        '<div class="panel-hd">' +
          '<div class="panel-title">异议与申诉</div>' +
          '<a class="section-action" onclick="ARGP_APPEAL.openDisputesPage()">进入处理台 →</a></div>' +
        '<div style="padding:12px 16px 14px;">' +
          '<div class="stats-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:12px;">' +
            '<div class="stat-card c-blue" style="padding:12px 14px;cursor:pointer;" onclick="ARGP_APPEAL.openDisputesPage(\'objection\')">' +
              '<div class="stat-num" style="font-size:22px;">' + c.objections + '</div>' +
              '<div class="stat-lbl">公示异议待办</div>' +
              '<div class="stat-hint">共 ' + c.objectionsTotal + ' 条记录</div></div>' +
            '<div class="stat-card c-red" style="padding:12px 14px;cursor:pointer;" onclick="ARGP_APPEAL.openDisputesPage(\'appeal\')">' +
              '<div class="stat-num" style="font-size:22px;">' + c.appeals + '</div>' +
              '<div class="stat-lbl">结果申诉待办</div>' +
              '<div class="stat-hint">共 ' + c.appealsTotal + ' 条记录</div></div>' +
            '<div class="stat-card c-teal" style="padding:12px 14px;cursor:pointer;" onclick="ARGP_APPEAL.openDisputesPage(\'avoidance\')">' +
              '<div class="stat-num" style="font-size:22px;">' + c.avoidance + '</div>' +
              '<div class="stat-lbl">专家回避待审</div>' +
              '<div class="stat-hint">进度监控同步</div></div></div>' +
          '<p class="text-xs text-muted" style="margin:0;line-height:1.6;">' +
            '公示异议：公示期内对<strong>他人项目立项等级</strong>提出异议；结果申诉：申请人对<strong>本人未通过</strong>结果提出程序性复议申请。</p></div></div>';
  }

  function openDisputesPage(tab) {
    if (tab) _disputesTab = tab;
    if (typeof showPage === 'function') showPage('sec-disputes');
  }

  function setDisputesTab(el, tab) {
    _disputesTab = tab;
    renderSecretaryDisputesPage();
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.tab-item').forEach(function (t) {
        t.classList.toggle('active', t === el);
      });
    }
  }

  function renderSecretaryDisputesPage() {
    var root = document.getElementById('page-sec-disputes');
    if (!root) return;
    var c = getDisputeCounts();
    var avoidanceHtml = '';
    if (window.ARGP_SECRETARY && window.ARGP_SECRETARY.renderAvoidanceDisputeList) {
      avoidanceHtml = window.ARGP_SECRETARY.renderAvoidanceDisputeList();
    }

    var tabContent = '';
    if (_disputesTab === 'objection') {
      tabContent = OBJECTION_REQUESTS.length
        ? OBJECTION_REQUESTS.map(function (r) { return renderDisputeItemHtml(r, 'objection'); }).join('')
        : '<div class="tab-empty-cell" style="padding:24px;text-align:center;color:var(--text-3);">暂无公示异议记录</div>';
    } else if (_disputesTab === 'appeal') {
      tabContent = APPEAL_REQUESTS.length
        ? APPEAL_REQUESTS.map(function (r) { return renderDisputeItemHtml(r, 'appeal'); }).join('')
        : '<div class="tab-empty-cell" style="padding:24px;text-align:center;color:var(--text-3);">暂无评审结果申诉</div>';
    } else {
      tabContent = avoidanceHtml || '<div class="tab-empty-cell" style="padding:24px;text-align:center;color:var(--text-3);">暂无专家回避申请</div>';
    }

    root.innerHTML =
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">异议与申诉处理台</div>' +
        '<div class="page-sub">公示异议 · 评审结果申诉 · 专家回避 — 秘书处统一受理</div></div>' +
      '<div class="stats-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px;">' +
        '<div class="stat-card c-blue"><div class="stat-num">' + c.objections + '</div><div class="stat-lbl">公示异议待办</div></div>' +
        '<div class="stat-card c-red"><div class="stat-num">' + c.appeals + '</div><div class="stat-lbl">结果申诉待办</div></div>' +
        '<div class="stat-card c-teal"><div class="stat-num">' + c.avoidance + '</div><div class="stat-lbl">专家回避待审</div></div></div>' +
      '<div class="tabs" id="sec-disputes-tabs">' +
        '<div class="tab-item' + (_disputesTab === 'objection' ? ' active' : '') + '" onclick="ARGP_APPEAL.setDisputesTab(this,\'objection\')">公示异议 (' + c.objectionsTotal + ')</div>' +
        '<div class="tab-item' + (_disputesTab === 'appeal' ? ' active' : '') + '" onclick="ARGP_APPEAL.setDisputesTab(this,\'appeal\')">结果申诉 (' + c.appealsTotal + ')</div>' +
        '<div class="tab-item' + (_disputesTab === 'avoidance' ? ' active' : '') + '" onclick="ARGP_APPEAL.setDisputesTab(this,\'avoidance\')">专家回避 (' + c.avoidance + ')</div></div>' +
      '<div class="panel" style="margin-top:0;border-top:none;border-radius:0 0 var(--radius-lg) var(--radius-lg);">' +
        '<div style="padding:14px 16px;">' + tabContent + '</div></div>' +
      '<div class="form-card" style="margin-top:16px;">' +
        '<div class="form-section-title">处理说明</div>' +
        '<div style="font-size:13px;line-height:1.75;color:var(--text-secondary);">' +
          '<p style="margin:0 0 8px;"><strong>公示异议</strong>：公示期（7 天）内受理，由学术委员会审查，10 个工作日内答复。</p>' +
          '<p style="margin:0 0 8px;"><strong>结果申诉</strong>：仅受理程序性问题；符合条件时组建 3 位新专家复议，15 个工作日内出具终局意见。</p>' +
          '<p style="margin:0;"><strong>专家回避</strong>：专家主动申报利益冲突，秘书处 24 小时内审核并重新分配。</p></div></div>';
  }

  function acceptObjection(id) {
    OBJECTION_REQUESTS.forEach(function (r) {
      if (r.id === id) r.status = 'processing';
    });
    refreshAllDisputeViews();
    if (typeof showToast === 'function') showToast('已受理公示异议，进入学术委员会核查流程', 'success');
  }

  function dismissObjection(id) {
    OBJECTION_REQUESTS = OBJECTION_REQUESTS.filter(function (r) { return r.id !== id; });
    refreshAllDisputeViews();
    if (typeof showToast === 'function') showToast('已驳回异议并通知提出人', 'info');
  }

  function acceptAppeal(id) {
    APPEAL_REQUESTS.forEach(function (r) {
      if (r.id === id) {
        r.status = 'reviewing';
        var p = getProject(r.projId);
        if (p) p.appealStatus = 'reviewing';
      }
    });
    refreshAllDisputeViews();
    if (window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
      window.ARGP_MOCK.initStudentProjects();
    }
    if (typeof showToast === 'function') showToast('已受理申诉，将组建复议专家小组', 'success');
  }

  function dismissAppeal(id) {
    var projId = null;
    APPEAL_REQUESTS = APPEAL_REQUESTS.filter(function (r) {
      if (r.id === id) projId = r.projId;
      return r.id !== id;
    });
    if (projId) {
      var p = getProject(projId);
      if (p && p.appealStatus === 'pending') p.appealStatus = null;
    }
    refreshAllDisputeViews();
    if (window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
      window.ARGP_MOCK.initStudentProjects();
    }
    if (typeof showToast === 'function') showToast('已驳回申诉并通知申请人', 'info');
  }

  function closeDispute(kind, id) {
    if (kind === 'objection') {
      OBJECTION_REQUESTS.forEach(function (r) {
        if (r.id === id) r.status = 'closed';
      });
    } else if (kind === 'appeal') {
      APPEAL_REQUESTS.forEach(function (r) {
        if (r.id === id) {
          r.status = 'closed';
          var p = getProject(r.projId);
          if (p) p.appealStatus = 'closed';
        }
      });
      if (window.ARGP_MOCK && window.ARGP_MOCK.initStudentProjects) {
        window.ARGP_MOCK.initStudentProjects();
      }
    }
    refreshAllDisputeViews();
    if (typeof showToast === 'function') showToast('已标记结案并写入 Governance Graph 记录', 'success');
  }

  function initSecretaryDisputes() {
    refreshAllDisputeViews();
  }

  window.ARGP_APPEAL = {
    openAppealPage: openAppealPage,
    renderAppealPage: renderAppealPage,
    submitAppeal: submitAppeal,
    canSubmitAppeal: canSubmitAppeal,
    registerObjection: registerObjection,
    renderSecretaryAppealsPanel: renderSecretaryAppealsPanel,
    renderSecretaryObjectionsPanel: renderSecretaryObjectionsPanel,
    renderSecretaryDisputesSummary: renderSecretaryDisputesSummary,
    renderSecretaryDisputesPage: renderSecretaryDisputesPage,
    openDisputesPage: openDisputesPage,
    setDisputesTab: setDisputesTab,
    initSecretaryDisputes: initSecretaryDisputes,
    refreshAllDisputeViews: refreshAllDisputeViews,
    acceptAppeal: acceptAppeal,
    dismissAppeal: dismissAppeal,
    acceptObjection: acceptObjection,
    dismissObjection: dismissObjection,
    closeDispute: closeDispute,
    getDisputeCounts: getDisputeCounts,
    OBJECTION_REQUESTS: OBJECTION_REQUESTS,
    APPEAL_REQUESTS: APPEAL_REQUESTS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.ARGP_AUTH && window.ARGP_AUTH.getRole && window.ARGP_AUTH.getRole() === 'secretary') {
        initSecretaryDisputes();
      }
    });
  } else if (window.ARGP_AUTH && window.ARGP_AUTH.getRole && window.ARGP_AUTH.getRole() === 'secretary') {
    initSecretaryDisputes();
  }
})();

/* ARGP Demo — 专家评审工作台 */
(function () {
  var CONFLICT_TYPES = [
    { id: 'none', label: '无冲突 — 与申请人及导师不存在系统未检测到的利益冲突关系' },
    { id: 'coauthor', label: '合著关系' },
    { id: 'teacher_student', label: '师生关系' },
    { id: 'same_inst', label: '同机构' },
    { id: 'other', label: '其他（须补充说明）' }
  ];

  var REJECT_REASONS = [
    { id: 'mismatch', label: '研究方向不匹配' },
    { id: 'time', label: '时间冲突' },
    { id: 'other', label: '其他' }
  ];

  var CONFLICT_LABELS = {
    none: '无冲突',
    coauthor: '合著关系',
    teacher_student: '师生关系',
    same_inst: '同机构',
    other: '其他'
  };

  var EXPERT_TASKS = [
    {
      id: 'PROJ-2026-0087',
      title: '强化学习在机器人路径规划中的应用研究',
      type: '校级项目',
      fields: ['强化学习', '机器人'],
      deadline: '5天后',
      deadlineDate: '2026-03-25',
      status: 'invite_pending',
      applicant: '王明',
      mentor: '张教授',
      aiScore: 72,
      version: 'v1'
    },
    {
      id: 'PROJ-2026-0055',
      title: '智能合约形式化验证方法',
      type: '院级重点',
      fields: ['区块链', '形式化验证'],
      deadline: '10天后',
      deadlineDate: '2026-03-30',
      status: 'invite_pending',
      applicant: '陈某',
      mentor: '李教授',
      aiScore: 68,
      version: 'v1'
    },
    {
      id: 'PROJ-2026-0031',
      title: '多模态情感分析系统设计',
      type: '国创计划',
      fields: ['NLP', '多模态'],
      deadline: '3天后',
      deadlineDate: '2026-03-20',
      status: 'review_pending',
      applicant: '赵磊',
      mentor: '陈教授',
      aiScore: 61,
      version: 'v2'
    },
    {
      id: 'PROJ-2026-0045',
      title: '联邦学习框架下的数据隐私保护',
      type: '国创计划',
      fields: ['联邦学习', '隐私'],
      deadline: '7天后',
      deadlineDate: '2026-03-24',
      status: 'review_pending',
      applicant: '李华',
      mentor: '王教授',
      aiScore: 74,
      version: 'v2'
    },
    {
      id: 'PROJ-2026-0063',
      title: '基于Transformer的中文医学文本理解',
      type: '校级项目',
      fields: ['NLP'],
      deadline: '2026-03-08',
      deadlineDate: '2026-03-08',
      status: 'submitted',
      applicant: '周敏',
      mentor: '刘教授',
      aiScore: 78,
      version: 'v2'
    },
    {
      id: 'PROJ-2026-0062',
      title: '深度学习对抗样本防御机制',
      type: '院级重点',
      fields: ['安全'],
      deadline: '2026-03-01',
      deadlineDate: '2026-03-01',
      status: 'submitted',
      applicant: '孙强',
      mentor: '赵教授',
      aiScore: 70,
      version: 'v1'
    }
  ];

  var _currentProjectId = 'PROJ-2026-0031';
  var _currentInviteId = null;
  var _selectedConflict = null;
  var _rejectPanelOpen = false;

  function getTask(id) {
    for (var i = 0; i < EXPERT_TASKS.length; i++) {
      if (EXPERT_TASKS[i].id === id) return EXPERT_TASKS[i];
    }
    return null;
  }

  function getReviewProject() {
    var task = getTask(_currentProjectId) || getTask('PROJ-2026-0031');
    return {
      id: task.id,
      title: task.title,
      applicant: task.applicant,
      mentor: task.mentor,
      type: task.type,
      deadline: task.deadline,
      aiScore: task.aiScore,
      version: task.version
    };
  }

  function fieldsTagsHtml(fields) {
    return fields.map(function (f) {
      return '<span class="tag" style="background:var(--blue-100);color:var(--blue-800);">' + f + '</span>';
    }).join('');
  }

  function statusBadge(status) {
    if (status === 'invite_pending') return '<span class="badge b-blue">待确认邀请</span>';
    if (status === 'review_pending') return '<span class="badge b-yellow">待评审</span>';
    if (status === 'avoidance_pending') return '<span class="badge b-yellow">回避审核中</span>';
    if (status === 'submitted') return '<span class="badge b-green">已提交</span>';
    if (status === 'rejected') return '<span class="badge b-red">已拒绝邀请</span>';
    return '<span class="badge">—</span>';
  }

  function isPendingStatus(s) {
    return s === 'invite_pending' || s === 'review_pending' || s === 'avoidance_pending';
  }

  function pendingCount() {
    return EXPERT_TASKS.filter(function (t) { return isPendingStatus(t.status); }).length;
  }

  function doneCount() {
    return EXPERT_TASKS.filter(function (t) { return t.status === 'submitted' || t.status === 'rejected'; }).length;
  }

  function renderExpertList() {
    var root = document.getElementById('page-expert-list');
    if (!root) return;
    var pending = EXPERT_TASKS.filter(function (t) { return isPendingStatus(t.status); });
    var done = EXPERT_TASKS.filter(function (t) { return t.status === 'submitted' || t.status === 'rejected'; });

    function rowHtml(t, tab) {
      var rowBg = tab === 'pending' && (t.status === 'invite_pending' || t.status === 'review_pending') ? ' style="background:#fffbeb;"' : '';
      var nameCell;
      if (t.status === 'invite_pending') {
        nameCell = '<div class="td-name" onclick="ARGP_EXPERT.openInvite(\'' + t.id + '\')">' + t.title + '</div>' +
          '<div class="td-id">' + t.id + '</div>';
      } else {
        nameCell = '<div class="td-name" onclick="ARGP_EXPERT.openReview(\'' + t.id + '\')">' + t.title + '</div>' +
          '<div class="td-id">' + t.id + '</div>';
      }
      var deadlineCls = (t.deadline && t.deadline.indexOf('天') >= 0 && parseInt(t.deadline, 10) <= 3) ? 'text-danger' : 'text-muted';
      var action;
      if (t.status === 'invite_pending') {
        action = '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_EXPERT.openInvite(\'' + t.id + '\')">响应邀请</button>';
      } else if (t.status === 'review_pending') {
        action = '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_EXPERT.openReview(\'' + t.id + '\')">进入评审</button>';
      } else if (t.status === 'avoidance_pending') {
        action = '<button class="btn btn-sm btn-secondary" type="button" disabled>等待秘书处审核</button>';
      } else if (t.status === 'submitted') {
        action = '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_EXPERT.openReview(\'' + t.id + '\')">查看意见</button>';
      } else {
        action = '<span class="text-xs text-muted">—</span>';
      }
      return '<tr data-tab="' + tab + '"' + rowBg + '>' +
        '<td>' + nameCell + '</td>' +
        '<td class="text-xs">' + t.type + '</td>' +
        '<td>' + fieldsTagsHtml(t.fields) + '</td>' +
        '<td><span class="mono text-xs ' + deadlineCls + '">' + t.deadline + '</span></td>' +
        '<td>' + statusBadge(t.status) + '</td>' +
        '<td>' + action + '</td></tr>';
    }

    root.innerHTML =
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">专家评审工作台</div>' +
        '<div class="page-sub">我的评审任务 · 共 ' + EXPERT_TASKS.length + ' 项</div></div>' +
      '<div class="tabs" data-tab-group="expert-desk">' +
        '<div class="tab-item active" data-filter="pending" onclick="activeTab(this)">待处理 (' + pending.length + ')</div>' +
        '<div class="tab-item" data-filter="done" onclick="activeTab(this)">已处理 (' + done.length + ')</div></div>' +
      '<div class="data-table-wrap" data-tab-panel="expert-desk">' +
        '<table class="data-table">' +
          '<thead><tr><th>项目信息</th><th>申报类型</th><th>研究方向</th><th>截止时间</th><th>状态</th><th>操作</th></tr></thead>' +
          '<tbody>' +
            pending.map(function (t) { return rowHtml(t, 'pending'); }).join('') +
            done.map(function (t) { return rowHtml(t, 'done'); }).join('') +
            '<tr class="tab-empty-row" data-tab-empty style="display:none;"><td colspan="6" class="tab-empty-cell">该分类下暂无任务</td></tr>' +
          '</tbody></table></div>';

    if (window.ARGP_UI && window.ARGP_UI.initTabGroups) {
      window.ARGP_UI.initTabGroups(root);
    }
  }

  function renderConflictOptions() {
    return CONFLICT_TYPES.map(function (c) {
      var sel = _selectedConflict === c.id ? ' is-selected' : '';
      return '<div class="er-conflict-opt' + sel + '" onclick="ARGP_EXPERT.selectConflict(\'' + c.id + '\')">' +
        '<input type="radio" name="er-conflict" value="' + c.id + '"' + (_selectedConflict === c.id ? ' checked' : '') + '>' +
        '<label>' + c.label + '</label></div>';
    }).join('');
  }

  function hasDeclaredConflict() {
    return !!(_selectedConflict && _selectedConflict !== 'none');
  }

  function renderInviteActionButtons() {
    if (hasDeclaredConflict()) {
      return '<div class="btn-group" style="margin-bottom:0;" id="er-invite-actions">' +
        '<button class="btn btn-danger" type="button" onclick="ARGP_EXPERT.submitAvoidance()">提交回避申请</button>' +
        '<button class="btn btn-ghost" type="button" onclick="ARGP_EXPERT.clearConflictSelection()">重新选择</button></div>';
    }
    return '<div class="btn-group" style="margin-bottom:0;" id="er-invite-actions">' +
      '<button class="btn btn-primary" type="button" onclick="ARGP_EXPERT.acceptInvite()">接受邀请</button>' +
      '<button class="btn btn-ghost" type="button" onclick="ARGP_EXPERT.toggleRejectPanel()">拒绝邀请</button></div>';
  }

  function renderRejectPanelHtml() {
    if (!_rejectPanelOpen || hasDeclaredConflict()) return '';
    return '<div class="er-reject-panel" id="er-reject-panel">' +
      '<div class="form-section-title" style="margin-bottom:10px;">拒绝邀请 · 请选择原因</div>' +
      '<p class="text-xs text-muted" style="margin:0 0 10px;line-height:1.6;">因利益冲突无法评审时，请在上方「利益声明」中选择具体关系类型并提交回避申请，无需在此重复填写。</p>' +
      '<div class="er-reject-reason">' + renderRejectReasons() + '</div>' +
      '<label class="form-label">补充说明（选填）</label>' +
      '<textarea class="form-textarea" id="er-reject-note" style="min-height:72px;margin-bottom:12px;" placeholder="简要说明，帮助系统优化后续匹配…"></textarea>' +
      '<div class="btn-group">' +
        '<button class="btn btn-ghost" type="button" onclick="ARGP_EXPERT.cancelRejectPanel()">取消</button>' +
        '<button class="btn btn-danger" type="button" onclick="ARGP_EXPERT.confirmRejectInvite()">确认拒绝</button></div></div>';
  }

  function updateInviteActionArea() {
    var actions = document.getElementById('er-invite-actions');
    if (actions) {
      actions.outerHTML = renderInviteActionButtons();
    }
    var existingPanel = document.getElementById('er-reject-panel');
    if (hasDeclaredConflict()) {
      _rejectPanelOpen = false;
      if (existingPanel) existingPanel.remove();
      return;
    }
    if (_rejectPanelOpen && !existingPanel) {
      var card = document.querySelector('#page-expert-invite .form-card');
      if (card) card.insertAdjacentHTML('beforeend', renderRejectPanelHtml());
    } else if (!_rejectPanelOpen && existingPanel) {
      existingPanel.remove();
    }
  }

  function renderRejectReasons() {
    return REJECT_REASONS.map(function (r) {
      return '<label><input type="radio" name="er-reject-reason" value="' + r.id + '"> ' + r.label + '</label>';
    }).join('');
  }

  function renderExpertInvite() {
    var root = document.getElementById('page-expert-invite');
    if (!root) return;
    var task = getTask(_currentInviteId);
    if (!task) {
      root.innerHTML = '<p class="text-muted">邀请不存在或已失效。</p>';
      return;
    }
    var savedConflictNote = '';
    var savedRejectNote = '';
    var conflictNoteEl = document.getElementById('er-conflict-note');
    var rejectNoteEl = document.getElementById('er-reject-note');
    if (conflictNoteEl) savedConflictNote = conflictNoteEl.value;
    if (rejectNoteEl) savedRejectNote = rejectNoteEl.value;
    if (hasDeclaredConflict()) _rejectPanelOpen = false;

    var conflictWarn = hasDeclaredConflict()
      ? '<div class="er-invite-warn" id="er-conflict-warn">' +
          '<strong>存在利益冲突：</strong>请填写关系说明后点击下方「提交回避申请」。系统将自动通知秘书处审核并重新分配专家；审核期间您无法查看本项目材料。' +
        '</div>'
      : '<div id="er-conflict-warn" style="display:none;"></div>';

    root.innerHTML =
      '<div class="breadcrumb">' +
        '<span class="bc-link" onclick="showPage(\'expert-list\')">专家评审</span>' +
        '<span class="bc-sep">›</span><span>邀请响应</span></div>' +
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">' + task.title + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:5px;flex-wrap:wrap;">' +
          '<span class="mono text-xs text-muted">' + task.id + '</span>' +
          '<span class="badge b-blue">待确认邀请</span></div></div>' +
      '<div class="er-invite-wrap">' +
        '<div class="form-card">' +
          '<div class="form-section-title">本次评审基本信息</div>' +
          '<div class="er-invite-meta">' +
            '<div><div class="meta-k">项目标题</div><div class="meta-v">' + task.title + '</div></div>' +
            '<div><div class="meta-k">项目编号</div><div class="meta-v mono">' + task.id + '</div></div>' +
            '<div><div class="meta-k">申请人</div><div class="meta-v">' + task.applicant + '</div></div>' +
            '<div><div class="meta-k">指导导师</div><div class="meta-v">' + task.mentor + '</div></div>' +
            '<div><div class="meta-k">项目类型</div><div class="meta-v">' + task.type + '</div></div>' +
            '<div><div class="meta-k">研究领域</div><div class="meta-v">' + fieldsTagsHtml(task.fields) + '</div></div>' +
            '<div><div class="meta-k">评审时限</div><div class="meta-v">' + task.deadline + ' <span class="text-xs text-muted">（截止 ' + task.deadlineDate + '）</span></div></div>' +
          '</div>' +
          '<div class="form-section-title">利益声明 <span style="color:#dc2626;">*</span></div>' +
          '<p class="text-xs text-muted" style="margin-bottom:12px;line-height:1.6;">请声明与申请人及其导师是否存在系统未检测到的利益冲突关系。<strong>若存在冲突，请选择具体类型并提交回避申请</strong>；若无冲突，可选择「无冲突」后接受邀请。</p>' +
          '<div class="er-conflict-list" id="er-conflict-list">' + renderConflictOptions() + '</div>' +
          conflictWarn +
          '<label class="form-label" id="er-conflict-note-label">关系说明 / 补充说明' + (hasDeclaredConflict() ? ' <span style="color:#dc2626;">*</span>' : '') + '</label>' +
          '<textarea class="form-textarea" id="er-conflict-note" style="min-height:80px;margin-bottom:16px;" placeholder="' +
            (hasDeclaredConflict()
              ? '请详细说明与申请人/导师的具体关系（如合著论文、同院系等）'
              : '选择「其他」或存在冲突时须填写；无冲突时可留空') +
          '"></textarea>' +
          renderInviteActionButtons() +
          renderRejectPanelHtml() +
        '</div></div>';

    var newConflictNoteEl = document.getElementById('er-conflict-note');
    if (newConflictNoteEl && savedConflictNote) newConflictNoteEl.value = savedConflictNote;
    var newRejectNoteEl = document.getElementById('er-reject-note');
    if (newRejectNoteEl && savedRejectNote) newRejectNoteEl.value = savedRejectNote;
  }

  function selectConflict(id) {
    _selectedConflict = id;
    if (hasDeclaredConflict()) _rejectPanelOpen = false;
    var list = document.getElementById('er-conflict-list');
    if (list) list.innerHTML = renderConflictOptions();
    var warn = document.getElementById('er-conflict-warn');
    if (warn) {
      if (hasDeclaredConflict()) {
        warn.style.display = '';
        warn.innerHTML = '<strong>存在利益冲突：</strong>请填写关系说明后点击下方「提交回避申请」。系统将自动通知秘书处审核并重新分配专家；审核期间您无法查看本项目材料。';
      } else {
        warn.style.display = 'none';
      }
    }
    var noteLabel = document.getElementById('er-conflict-note-label');
    if (noteLabel) {
      noteLabel.innerHTML = '关系说明 / 补充说明' + (hasDeclaredConflict() ? ' <span style="color:#dc2626;">*</span>' : '');
    }
    var noteEl = document.getElementById('er-conflict-note');
    if (noteEl) {
      noteEl.placeholder = hasDeclaredConflict()
        ? '请详细说明与申请人/导师的具体关系（如合著论文、同院系等）'
        : '选择「其他」或存在冲突时须填写；无冲突时可留空';
    }
    updateInviteActionArea();
  }

  function clearConflictSelection() {
    _selectedConflict = null;
    _rejectPanelOpen = false;
    renderExpertInvite();
  }

  function toggleRejectPanel() {
    if (hasDeclaredConflict()) {
      if (typeof showToast === 'function') {
        showToast('您已声明存在利益冲突，请填写说明后点击「提交回避申请」', 'warn');
      }
      return;
    }
    _rejectPanelOpen = !_rejectPanelOpen;
    updateInviteActionArea();
  }

  function cancelRejectPanel() {
    _rejectPanelOpen = false;
    updateInviteActionArea();
  }

  function submitAvoidance() {
    if (!hasDeclaredConflict()) {
      if (typeof showToast === 'function') showToast('请先在利益声明中选择冲突类型', 'warn');
      return;
    }
    var noteEl = document.getElementById('er-conflict-note');
    var note = noteEl ? noteEl.value.trim() : '';
    if (!note) {
      if (typeof showToast === 'function') showToast('存在利益冲突时须详细说明关系类型', 'warn');
      return;
    }
    var task = getTask(_currentInviteId);
    if (task) task.status = 'avoidance_pending';
    if (window.ARGP_SECRETARY && window.ARGP_SECRETARY.registerAvoidanceRequest) {
      window.ARGP_SECRETARY.registerAvoidanceRequest({
        projId: _currentInviteId,
        conflictType: _selectedConflict,
        conflictLabel: CONFLICT_LABELS[_selectedConflict] || _selectedConflict,
        supplement: note,
        fields: task ? task.fields.join('、') : ''
      });
    }
    _selectedConflict = null;
    _rejectPanelOpen = false;
    if (typeof showToast === 'function') showToast('回避申请已提交，秘书处将审核并重新分配专家', 'info');
    if (typeof showPage === 'function') showPage('expert-list');
  }

  function acceptInvite() {
    if (!_selectedConflict) {
      if (typeof showToast === 'function') showToast('请完成利益声明（必选）', 'warn');
      return;
    }
    if (hasDeclaredConflict()) {
      submitAvoidance();
      return;
    }
    if (_selectedConflict === 'other') {
      var noteEl = document.getElementById('er-conflict-note');
      var note = noteEl ? noteEl.value.trim() : '';
      if (!note) {
        if (typeof showToast === 'function') showToast('选择「其他」时请补充说明', 'warn');
        return;
      }
    }
    var t = getTask(_currentInviteId);
    if (t) t.status = 'review_pending';
    _selectedConflict = null;
    _rejectPanelOpen = false;
    if (typeof showToast === 'function') showToast('已接受邀请，可开始评审', 'success');
    openReview(_currentInviteId);
  }

  function confirmRejectInvite() {
    if (hasDeclaredConflict()) {
      if (typeof showToast === 'function') {
        showToast('利益冲突请通过上方「提交回避申请」处理，无需重复拒绝', 'warn');
      }
      return;
    }
    var picked = document.querySelector('input[name="er-reject-reason"]:checked');
    if (!picked) {
      if (typeof showToast === 'function') showToast('请选择拒绝原因', 'warn');
      return;
    }
    var rejectNoteEl = document.getElementById('er-reject-note');
    var rejectNote = rejectNoteEl ? rejectNoteEl.value.trim() : '';
    var task = getTask(_currentInviteId);
    if (task) {
      task.status = 'rejected';
      task.rejectReason = picked.value;
      task.rejectNote = rejectNote;
    }
    _selectedConflict = null;
    _rejectPanelOpen = false;
    if (typeof showToast === 'function') showToast('已拒绝评审邀请，系统将优化后续匹配', 'info');
    if (typeof showPage === 'function') showPage('expert-list');
  }

  function openInvite(projId) {
    _currentInviteId = projId;
    _selectedConflict = null;
    _rejectPanelOpen = false;
    if (typeof showPage === 'function') showPage('expert-invite');
  }

  function markCurrentSubmitted() {
    var task = getTask(_currentProjectId);
    if (task && task.status === 'review_pending') task.status = 'submitted';
  }

  function openReview(projId) {
    var task = getTask(projId);
    if (!task) return;
    if (task.status === 'invite_pending') {
      openInvite(projId);
      return;
    }
    if (task.status === 'avoidance_pending') {
      if (typeof showToast === 'function') showToast('回避申请审核中，暂不可查看材料', 'warn');
      return;
    }
    _currentProjectId = projId;
    if (typeof showPage === 'function') showPage('expert-review');
    resetReviewState();
    renderExpertReview();
  }

  var AI_SUMMARY = [
    { lbl: '项目摘要', text: '本项目构建多模态情感分析系统，融合文本、语音、面部表情三类信号，使用 Transformer 架构进行跨模态融合，在公开数据集上达到 SOTA 精度。' },
    { lbl: '创新点提取', text: '1. 提出跨模态注意力门控机制\n2. 设计情感-语义解耦表征方法\n3. 构建中文多模态情感数据集' },
    { lbl: '风险提示', text: '第3章假设与绪论存在逻辑矛盾；数据集规模（5000条）是否足够支撑实验结论存疑。' },
    { lbl: '研究价值', text: '在智能客服、心理健康监测领域有明确应用前景，与当前学院研究重点高度契合。' }
  ];

  var ATTACHMENTS = [
    { id: 'main', name: '申请书正文', type: 'doc', contentKey: 'main' },
    { id: 'att1', name: '附件1：技术路线图', type: 'pdf', preview: '<h3>技术路线图</h3><p>数据采集 → 特征提取 → 跨模态融合 → 模型训练 → 实验验证 → 系统部署</p><p class="text-xs text-muted">PDF 预览（Demo）</p>' },
    { id: 'att2', name: '附件2：实验预期数据', type: 'xls', preview: '<h3>实验预期数据表</h3><p>CMU-MOSI Acc-2 目标 ≥86%；CMU-MOSEI F1 目标 ≥82%。</p><p class="text-xs text-muted">Excel 预览（Demo）</p>' }
  ];

  var DOC_ORIGINAL =
    '<h3>一、研究背景与意义</h3>' +
    '<p>情感计算（Affective Computing）是人机交互领域的重要研究方向，旨在使计算机能够识别、理解和表达人类情感。随着深度学习技术的迅猛发展，基于多模态融合的情感分析方法因其能够综合利用文本、语音、面部表情等多源信息，受到学界的广泛关注。</p>' +
    '<p>当前多模态情感分析研究存在以下主要挑战：（1）跨模态信息融合方式粗糙，难以捕捉模态间细粒度交互；（2）中文多模态情感数据集匮乏；（3）模型可解释性不足，限制了实际应用部署。</p>' +
    '<h3>二、研究目标与内容</h3>' +
    '<p>本研究目标为：（1）构建基于 Transformer 架构的跨模态融合框架；（2）设计跨模态注意力门控机制，实现细粒度模态交互；（3）构建包含5000条标注数据的中文多模态情感数据集；（4）在公开基准数据集 CMU-MOSI 和 CMU-MOSEI 上进行实验验证。</p>' +
    '<h3>三、研究假设</h3>' +
    '<p>H1：单模态方法在复杂情境下存在信息盲区，多模态融合能够显著提升情感识别精度。</p>' +
    '<p>H2：基于注意力门控的跨模态交互机制能够比简单拼接或加权平均方法更有效地建模模态间语义关系。</p>' +
    '<h3>四、创新点</h3>' +
    '<p>（1）跨模态注意力门控机制：提出一种新型注意力门控结构，自适应控制不同模态信息的融合权重。</p>' +
    '<p>（2）情感-语义解耦表征：设计双路编码器分别提取情感特征与语义特征，通过对比学习约束特征解耦程度。</p>' +
    '<h3>五、预期成果</h3>' +
    '<p>在 CMU-MOSI 数据集上达到 Acc-2≥86%；发表 CCF-B 以上级别期刊/会议论文1篇；开源模型代码及数据集；申请发明专利1项。</p>' +
    '<h3>参考文献</h3>' +
    '<p class="er-ref-line">[1] Devlin J, et al. BERT: Pre-training of Deep Bidirectional Transformers. NAACL, 2019.</p>' +
    '<p class="er-ref-line">[2] Tsai Y, et al. Multimodal Transformer for Unaligned Multimodal Language Sequences. ACL, 2019.</p>' +
    '<p class="er-ref-line">[3] Zhang L, et al. Affective Computing Survey. IEEE TAFFC, 2020.</p>';

  var DOC_ANNOTATED =
    '<h3>一、研究背景与意义</h3>' +
    '<p>情感计算（Affective Computing）是人机交互领域的重要研究方向，旨在使计算机能够识别、理解和表达人类情感。随着深度学习技术的迅猛发展，基于多模态融合的情感分析方法因其能够综合利用文本、语音、面部表情等多源信息，受到学界的广泛关注。</p>' +
    '<p>当前多模态情感分析研究存在以下主要挑战：（1）<span class="er-ai-mark er-ai-yellow" data-annot-id="y1" tabindex="0">跨模态信息融合方式粗糙，难以捕捉模态间细粒度交互</span>；（2）中文多模态情感数据集匮乏；（3）模型可解释性不足，限制了实际应用部署。</p>' +
    '<h3>二、研究目标与内容</h3>' +
    '<p>本研究目标为：（1）构建基于 Transformer 架构的跨模态融合框架；（2）设计跨模态注意力门控机制，实现细粒度模态交互；（3）构建包含5000条标注数据的中文多模态情感数据集；（4）在公开基准数据集 CMU-MOSI 和 CMU-MOSEI 上进行实验验证。</p>' +
    '<h3>三、研究假设</h3>' +
    '<p><span class="er-ai-mark er-ai-red" data-annot-id="r1" tabindex="0">H1：单模态方法在复杂情境下存在信息盲区，多模态融合能够显著提升情感识别精度。</span></p>' +
    '<p>H2：基于注意力门控的跨模态交互机制能够比简单拼接或加权平均方法更有效地建模模态间语义关系。</p>' +
    '<h3>四、创新点</h3>' +
    '<p>（1）跨模态注意力门控机制：提出一种新型注意力门控结构，自适应控制不同模态信息的融合权重。</p>' +
    '<p>（2）情感-语义解耦表征：设计双路编码器分别提取情感特征与语义特征，通过对比学习约束特征解耦程度。</p>' +
    '<h3>五、预期成果</h3>' +
    '<p>在 CMU-MOSI 数据集上达到 Acc-2≥86%；发表 CCF-B 以上级别期刊/会议论文1篇；开源模型代码及数据集；申请发明专利1项。</p>' +
    '<h3>参考文献</h3>' +
    '<p class="er-ref-line">[1] Devlin J, et al. BERT: Pre-training of Deep Bidirectional Transformers. NAACL, 2019.</p>' +
    '<p class="er-ref-line"><span class="er-ai-mark er-ai-red er-ref-mark" data-annot-id="ref1" tabindex="0">[2] Tsai Y, et al. Multimodal Transformer for Unaligned Multimodal Language Sequences. ACL, 2019.</span></p>' +
    '<p class="er-ref-line">[3] Zhang L, et al. Affective Computing Survey. IEEE TAFFC, 2020.</p>';

  var ANNOTATIONS = {
    y1: {
      type: 'yellow',
      reason: '融合方式描述过于笼统，未说明与现有 SOTA 方法的具体差距，建议补充对比实验设计。',
      confidence: 0.78,
      basis: 'Review Agent：该表述缺少定量对比支撑，属于表述完整性预警。'
    },
    r1: {
      type: 'red',
      reason: 'H1 声称单模态存在"信息盲区"，但绪论第1段强调多模态方法"受到学界广泛关注"，隐含现有方法已较成熟，立场不一致。',
      confidence: 0.91,
      basis: 'Review Agent：逻辑一致性检测 — 绪论与假设章节对单模态/多模态评价立场矛盾。',
      paraA: '绪论：「基于多模态融合的情感分析方法……受到学界的广泛关注。」',
      paraB: '假设 H1：「单模态方法在复杂情境下存在信息盲区……」'
    },
    ref1: {
      type: 'red',
      reason: '该文献摘要与引用语境语义不符：正文引用此处论证中文数据集匮乏，但该文献讨论的是英文多模态对齐，未涉及中文数据集。',
      confidence: 0.84,
      basis: 'Academic Agent：引用-语境匹配度 0.32，低于阈值 0.55。',
      isRef: true
    }
  };

  var SCORE_DIMS = [
    { id: 'innov', label: '创新性', value: 75, color: '#b45309' },
    { id: 'value', label: '研究价值', value: 82, color: 'var(--primary)' },
    { id: 'feas', label: '可行性', value: 70, color: '#0891b2' },
    { id: 'norm', label: '学术规范', value: 65, color: '#dc2626' },
    { id: 'team', label: '团队能力', value: 80, color: '#7c3aed' }
  ];

  var COVERAGE_DIMS = [
    { key: 'innov', label: '创新性评价', keywords: ['创新', '创新点', '差异化'] },
    { key: 'feas', label: '可行性分析', keywords: ['可行', '实验', '数据集', '验证'] },
    { key: 'risk', label: '风险问题回应', keywords: ['矛盾', '风险', '问题', 'H1', '假设'] },
    { key: 'team', label: '研究团队评价', keywords: ['团队', '能力', '成员'] }
  ];

  var DRAFT_TEXT =
    '本项目研究方向明确，多模态情感分析在智能服务领域有较强应用价值。主要问题：\n\n' +
    '1. 第3章研究假设 H1 与绪论表述存在逻辑矛盾，建议统一对单模态/多模态方法的评价立场；\n' +
    '2. 数据集规模（5000条）相对偏小，建议扩充或提供更强的实验验证方案；\n' +
    '3. 创新点中的「跨模态注意力门控机制」描述过于笼统，建议补充技术细节与基线对比。\n\n' +
    '综合建议：通过院级立项，建议进一步扩充数据规模后争取校级。';

  var INVALID_ANNOT_REASONS = [
    { id: 'misunderstand', label: '理解偏差' },
    { id: 'context', label: '语境特殊' },
    { id: 'wrong', label: '确实是误判' },
    { id: 'other', label: '其他' }
  ];

  var _pendingInvalidAnnotId = null;
  var _selectedInvalidReason = null;
  var _draftGenerated = false;
  var _invalidAnnots = {};
  var _activeAttachment = 'main';
  var _scoreValues = {};
  var _hoverCloseTimer = null;
  var _pinnedAnnotId = null;

  function initScoreValues() {
    SCORE_DIMS.forEach(function (d) {
      _scoreValues[d.id] = d.value;
    });
  }
  initScoreValues();

  function calcTotal() {
    var ids = SCORE_DIMS.map(function (d) { return d.id; });
    var sum = 0;
    ids.forEach(function (id) { sum += _scoreValues[id] || 0; });
    return Math.round(sum / ids.length);
  }

  function renderAiSummaryHtml() {
    return '<div class="ai-block expert-ai-block">' +
      '<div class="ai-block-hd">' +
        '<div class="ai-icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.5 4a.5.5 0 011 0v3.5l2.5 1.5a.5.5 0 01-.5.866L8 9.268V5z"/></svg></div>' +
        '<div class="ai-block-title">Review Agent · AI 摘要</div>' +
        '<span class="ai-tag">AI 生成 · 仅供参考</span></div>' +
      '<div class="expert-ai-stack">' +
        AI_SUMMARY.map(function (c) {
          return '<div class="ai-cell"><div class="ai-cell-lbl">' + c.lbl + '</div>' + c.text.replace(/\n/g, '<br>') + '</div>';
        }).join('') +
      '</div></div>';
  }

  function getDocHtml() {
    if (_activeAttachment !== 'main') {
      var att = ATTACHMENTS.filter(function (a) { return a.id === _activeAttachment; })[0];
      return att && att.preview ? att.preview : '<p class="text-muted">暂无预览</p>';
    }
    if (_docMode === 'annotated') return DOC_ANNOTATED;
    return DOC_ORIGINAL;
  }

  function getInvalidReasonLabel(reasonId) {
    for (var i = 0; i < INVALID_ANNOT_REASONS.length; i++) {
      if (INVALID_ANNOT_REASONS[i].id === reasonId) return INVALID_ANNOT_REASONS[i].label;
    }
    return reasonId || '—';
  }

  function renderDocBody() {
    var body = document.getElementById('er-doc-body');
    if (!body) return;
    body.innerHTML = getDocHtml();
    if (_docMode === 'annotated' && _activeAttachment === 'main') {
      body.querySelectorAll('.er-ai-mark').forEach(function (el) {
        var id = el.getAttribute('data-annot-id');
        var ann = ANNOTATIONS[id];
        if (_invalidAnnots[id]) {
          el.classList.add('is-invalid');
          var info = _invalidAnnots[id];
          var reasonLbl = getInvalidReasonLabel(info.reason);
          var metaText = '反馈原因：' + reasonLbl + (info.note ? ' · ' + info.note : '');
          var card = document.createElement('div');
          card.className = 'er-annot-card is-invalid';
          card.setAttribute('data-annot-id', id);
          card.innerHTML =
            '<div class="er-annot-card-inner">' +
              '<span class="er-annot-card-tag">标注已被标记为误判</span>' +
              '<span class="er-annot-card-meta text-xs text-muted">' + metaText + '</span>' +
            '</div>';
          if (el.nextSibling) el.parentNode.insertBefore(card, el.nextSibling);
          else el.parentNode.appendChild(card);
          el.setAttribute('title', '已标记为误判 · ' + reasonLbl);
          return;
        }
        if (!ann) return;
        if (ann.type === 'yellow') {
          el.setAttribute('title', ann.reason);
        }
      });
    }
  }

  function renderAttachBarHtml() {
    return '<div class="er-attach-bar">' +
      '<span class="er-attach-bar-label">附件材料</span>' +
      '<div class="er-attach-list er-attach-list-horizontal">' +
        ATTACHMENTS.map(function (a) {
          var active = _activeAttachment === a.id ? ' active' : '';
          return '<button type="button" class="er-attach-btn' + active + '" onclick="ARGP_EXPERT.openAttachment(\'' + a.id + '\')">' +
            '<span class="er-attach-type">' + a.type.toUpperCase() + '</span>' + a.name + '</button>';
        }).join('') +
      '</div></div>';
  }

  function renderScoreSection() {
    var el = document.getElementById('er-score-section');
    if (!el) return;
    var total = calcTotal();
    var rows = SCORE_DIMS.map(function (d) {
      var v = _scoreValues[d.id];
      return '<div class="score-bar-row er-score-row">' +
        '<div class="sbl">' + d.label + '</div>' +
        '<input type="range" class="er-score-range" min="0" max="100" value="' + v + '" data-dim="' + d.id + '" oninput="ARGP_EXPERT.onScoreInput(this)">' +
        '<input type="number" class="er-score-num" min="0" max="100" value="' + v + '" data-dim="' + d.id + '" oninput="ARGP_EXPERT.onScoreNumInput(this)">' +
      '</div>';
    }).join('');
    el.innerHTML =
      '<div class="form-section-title">评分（各维度 1–100 分）</div>' +
      rows +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 13px;background:var(--bg-2);border-radius:var(--radius);margin-top:6px;">' +
        '<span class="text-muted">综合得分</span>' +
        '<span class="mono text-warn fw-6" id="er-total-score" style="font-size:24px;">' + total + '</span></div>';
  }

  function renderCoverage() {
    var el = document.getElementById('er-coverage');
    if (!el) return;
    var ta = document.getElementById('er-opinion-text');
    var text = ta ? ta.value : '';
    var html = COVERAGE_DIMS.map(function (d) {
      var covered = d.keywords.some(function (kw) { return text.indexOf(kw) >= 0; });
      return '<div class="' + (covered ? 'text-green' : 'text-muted') + '">' +
        (covered ? '✓ 已覆盖：' : '— 未覆盖：') + d.label + '</div>';
    }).join('');
    el.innerHTML = html;
  }

  function getOpinionText() {
    var ta = document.getElementById('er-opinion-text');
    return ta ? ta.value : '';
  }

  function renderOpinionSection() {
    var wrap = document.getElementById('er-opinion-section');
    if (!wrap) return;
    var existingText = getOpinionText();
    wrap.innerHTML =
      '<div class="form-section-title er-opinion-hd">' +
        '<span>评审意见</span>' +
        '<button class="btn btn-sm btn-secondary er-draft-btn" type="button" id="er-gen-draft-btn" onclick="ARGP_EXPERT.generateDraft()">AI 生成草稿</button>' +
      '</div>' +
      '<div class="form-grid form-grid-1" style="margin-bottom:14px;">' +
        '<div><label class="form-label">意见正文 <span style="color:#dc2626;">*</span></label>' +
        '<textarea class="form-textarea" id="er-opinion-text" style="min-height:160px;" oninput="ARGP_EXPERT.onOpinionInput()">' +
          existingText + '</textarea></div></div>' +
      '<div style="background:var(--blue-50);border:1px solid var(--blue-200);border-radius:var(--radius);padding:10px 13px;margin-bottom:10px;">' +
        '<div style="font-size:12px;font-weight:600;color:var(--blue-800);margin-bottom:7px;">意见覆盖度检测 ' +
          '<span style="font-size:10px;color:var(--text-3);font-family:\'DM Mono\',monospace;font-weight:400;margin-left:6px;">AI 生成 · 仅供参考</span></div>' +
        '<div id="er-coverage" style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:12px;"></div></div>' +
      '<div class="btn-group">' +
        '<button class="btn btn-ghost" type="button" onclick="showToast(\'评审意见草稿已保存\',\'success\')">保存草稿</button>' +
        '<button class="btn btn-primary" type="button" onclick="submitExpertReview()">提交评审意见</button></div>';
    renderCoverage();
  }

  function renderExpertReview() {
    var root = document.getElementById('page-expert-review');
    if (!root) return;
    var p = getReviewProject();
    root.innerHTML =
      '<div class="breadcrumb">' +
        '<span class="bc-link" onclick="showPage(\'expert-list\')">专家评审</span>' +
        '<span class="bc-sep">›</span><span>线上评审工作台</span></div>' +
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">线上评审工作台</div>' +
        '<div style="display:flex;gap:8px;margin-top:5px;">' +
          '<span class="mono text-xs text-muted">' + p.id + '</span>' +
          '<span class="badge b-yellow">待提交意见</span></div></div>' +
      '<div class="expert-review-layout">' +
        '<div class="expert-review-main">' +
          '<div class="doc-viewer">' +
            '<div class="doc-viewer-toolbar er-doc-toolbar">' +
              '<div class="doc-viewer-title" id="er-doc-title">申请书全文</div>' +
              '<span class="text-xs text-muted mono">' + p.id + ' · ' + p.version + '</span>' +
              '<div class="er-ver-switch" id="er-ver-switch">' +
                '<button type="button" class="er-ver-btn active" data-mode="original" onclick="ARGP_EXPERT.switchDocMode(\'original\')">原始版本</button>' +
                '<button type="button" class="er-ver-btn" data-mode="annotated" onclick="ARGP_EXPERT.switchDocMode(\'annotated\')">AI 标注版本</button>' +
              '</div></div>' +
            '<div id="er-attach-bar-wrap">' + renderAttachBarHtml() + '</div>' +
            '<div class="doc-body er-doc-body" id="er-doc-body"></div></div>' +
          '<div class="form-card" id="er-score-section"></div>' +
          '<div class="form-card" id="er-opinion-section"></div>' +
        '</div>' +
        '<div class="expert-review-sidebar">' +
          renderAiSummaryHtml() +
          '<div class="meta-card">' +
            '<div class="meta-title">项目信息</div>' +
            '<div class="meta-row"><span class="meta-k">申请人</span><span class="meta-v">' + p.applicant + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">指导导师</span><span class="meta-v">' + p.mentor + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">申报类型</span><span class="meta-v text-xs">' + p.type + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">评审截止</span><span class="meta-v text-danger">' + p.deadline + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">AI质量分</span><span class="meta-v mono text-warn">' + p.aiScore + '分</span></div></div>' +
          '<div class="meta-card" style="background:var(--warn-bg);border-color:#fcd34d;">' +
            '<div class="meta-title" style="color:var(--warn);">评审隔离提示</div>' +
            '<div class="text-xs" style="color:#78350f;line-height:1.65;">本工作台仅显示您个人的 AI 洞察。其他专家的评审意见在答辩前不可见。</div></div></div></div>' +
      '<div class="er-annot-popover" id="er-annot-popover" style="display:none;"></div>';

    renderDocBody();
    renderScoreSection();
    renderOpinionSection();
    bindAnnotEvents();
  }

  function switchDocMode(mode) {
    if (_activeAttachment !== 'main') {
      openAttachment('main');
    }
    _docMode = mode;
    document.querySelectorAll('.er-ver-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });
    var title = document.getElementById('er-doc-title');
    if (title) title.textContent = mode === 'annotated' ? '申请书 · AI 标注版本' : '申请书全文';
    closeAnnotPopover();
    renderDocBody();
    bindAnnotEvents();
  }

  function openAttachment(id) {
    _activeAttachment = id;
    var att = ATTACHMENTS.filter(function (a) { return a.id === id; })[0];
    var title = document.getElementById('er-doc-title');
    var verSwitch = document.getElementById('er-ver-switch');
    var attachWrap = document.getElementById('er-attach-bar-wrap');
    if (title) title.textContent = att ? att.name : '附件预览';
    if (verSwitch) verSwitch.style.display = id === 'main' ? '' : 'none';
    if (attachWrap) attachWrap.innerHTML = renderAttachBarHtml();
    closeAnnotPopover();
    renderDocBody();
    if (id === 'main') bindAnnotEvents();
  }

  function onScoreInput(el) {
    var id = el.getAttribute('data-dim');
    _scoreValues[id] = parseInt(el.value, 10) || 0;
    var num = document.querySelector('.er-score-num[data-dim="' + id + '"]');
    if (num) num.value = _scoreValues[id];
    var totalEl = document.getElementById('er-total-score');
    if (totalEl) totalEl.textContent = String(calcTotal());
  }

  function onScoreNumInput(el) {
    var v = Math.min(100, Math.max(0, parseInt(el.value, 10) || 0));
    el.value = v;
    var id = el.getAttribute('data-dim');
    _scoreValues[id] = v;
    var range = document.querySelector('.er-score-range[data-dim="' + id + '"]');
    if (range) range.value = v;
    var totalEl = document.getElementById('er-total-score');
    if (totalEl) totalEl.textContent = String(calcTotal());
  }

  function generateDraft() {
    var btn = document.getElementById('er-gen-draft-btn');
    if (btn) { btn.disabled = true; btn.textContent = '生成中…'; }
    if (typeof showToast === 'function') showToast('Review Agent 正在生成意见草稿…', 'info');
    setTimeout(function () {
      var ta = document.getElementById('er-opinion-text');
      if (ta) ta.value = DRAFT_TEXT;
      _draftGenerated = true;
      renderCoverage();
      if (btn) { btn.disabled = false; btn.textContent = 'AI 生成草稿'; }
      if (typeof showToast === 'function') showToast('意见草稿已生成，请核对后提交', 'success');
    }, 3000);
  }

  function onOpinionInput() {
    renderCoverage();
  }

  function closeAnnotPopover() {
    var pop = document.getElementById('er-annot-popover');
    if (pop) pop.style.display = 'none';
    _pinnedAnnotId = null;
  }

  function scheduleClosePopover() {
    if (_pinnedAnnotId) return;
    if (_hoverCloseTimer) clearTimeout(_hoverCloseTimer);
    _hoverCloseTimer = setTimeout(closeAnnotPopover, 200);
  }

  function cancelClosePopover() {
    if (_hoverCloseTimer) {
      clearTimeout(_hoverCloseTimer);
      _hoverCloseTimer = null;
    }
  }

  function showAnnotPopover(markEl, ann, pin) {
    var pop = document.getElementById('er-annot-popover');
    if (!pop || !markEl) return;
    cancelClosePopover();
    if (pin) _pinnedAnnotId = markEl.getAttribute('data-annot-id');
    var rect = markEl.getBoundingClientRect();
    var dismissLabel = '标记无效';
    var html =
      '<div class="er-pop-hd">' +
        '<span class="er-pop-tag ' + (ann.type === 'red' ? 'er-pop-red' : 'er-pop-yellow') + '">' +
          (ann.type === 'red' ? (ann.isRef ? '引用异常' : '红色预警') : '黄色预警') + '</span>' +
        '<span class="er-pop-conf mono">confidence: ' + ann.confidence.toFixed(2) + '</span>' +
        '<button type="button" class="er-pop-close" onclick="ARGP_EXPERT.closeAnnotPopover()">×</button></div>' +
      '<div class="er-pop-reason">' + ann.reason + '</div>';
    if (ann.type === 'red' && ann.paraA && ann.paraB) {
      html +=
        '<div class="er-pop-compare">' +
          '<div class="er-pop-para"><div class="er-pop-para-lbl">段落 A</div>' + ann.paraA + '</div>' +
          '<div class="er-pop-para"><div class="er-pop-para-lbl">段落 B</div>' + ann.paraB + '</div></div>';
    }
    html +=
      '<div class="er-pop-basis"><strong>AI 判断依据：</strong>' + ann.basis + '</div>' +
      '<button type="button" class="btn btn-sm btn-ghost er-pop-dismiss" onclick="ARGP_EXPERT.markAnnotInvalid(\'' +
        markEl.getAttribute('data-annot-id') + '\')">' + dismissLabel + '</button>';
    pop.innerHTML = html;
    pop.onmouseenter = cancelClosePopover;
    pop.onmouseleave = scheduleClosePopover;
    pop.style.display = 'block';
    pop.style.top = Math.min(rect.bottom + 8, window.innerHeight - 320) + 'px';
    pop.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - 380)) + 'px';
  }

  function openInvalidReasonModal(id) {
    _pendingInvalidAnnotId = id;
    _selectedInvalidReason = null;
    closeAnnotPopover();
    var modal = document.getElementById('er-invalid-reason-modal');
    if (modal) {
      modal.querySelectorAll('.er-invalid-reason-opt').forEach(function (opt) {
        opt.classList.remove('is-selected');
        var input = opt.querySelector('input[type="radio"]');
        if (input) input.checked = false;
      });
      var otherTa = document.getElementById('er-invalid-reason-other');
      if (otherTa) otherTa.value = '';
      var otherWrap = document.getElementById('er-invalid-reason-other-wrap');
      if (otherWrap) otherWrap.style.display = 'none';
      modal.classList.add('open');
    }
  }

  function closeInvalidReasonModal() {
    var modal = document.getElementById('er-invalid-reason-modal');
    if (modal) modal.classList.remove('open');
    _pendingInvalidAnnotId = null;
    _selectedInvalidReason = null;
  }

  function selectInvalidReason(reasonId) {
    _selectedInvalidReason = reasonId;
    var modal = document.getElementById('er-invalid-reason-modal');
    if (!modal) return;
    modal.querySelectorAll('.er-invalid-reason-opt').forEach(function (opt) {
      var rid = opt.getAttribute('data-reason');
      var selected = rid === reasonId;
      opt.classList.toggle('is-selected', selected);
      var input = opt.querySelector('input[type="radio"]');
      if (input) input.checked = selected;
    });
    var otherWrap = document.getElementById('er-invalid-reason-other-wrap');
    if (otherWrap) otherWrap.style.display = reasonId === 'other' ? '' : 'none';
  }

  function submitInvalidAnnotReason() {
    if (!_pendingInvalidAnnotId) return;
    if (!_selectedInvalidReason) {
      if (typeof showToast === 'function') showToast('请选择反馈原因', 'warn');
      return;
    }
    var note = '';
    if (_selectedInvalidReason === 'other') {
      var otherTa = document.getElementById('er-invalid-reason-other');
      note = (otherTa && otherTa.value.trim()) || '';
    }
    _invalidAnnots[_pendingInvalidAnnotId] = { reason: _selectedInvalidReason, note: note };
    closeInvalidReasonModal();
    renderDocBody();
    bindAnnotEvents();
    if (typeof showToast === 'function') showToast('反馈已记录，感谢您帮助改进 AI', 'success');
  }

  function markAnnotInvalid(id) {
    openInvalidReasonModal(id);
  }

  function showInvalidAnnotPopover(markEl, ann, info) {
    var pop = document.getElementById('er-annot-popover');
    if (!pop || !markEl) return;
    cancelClosePopover();
    var reasonLbl = getInvalidReasonLabel(info.reason);
    pop.innerHTML =
      '<div class="er-pop-hd">' +
        '<span class="er-pop-tag er-pop-invalid">已标记为误判</span>' +
        '<button type="button" class="er-pop-close" onclick="ARGP_EXPERT.closeAnnotPopover()">×</button></div>' +
      '<div class="er-pop-reason text-muted">该 AI 标注已被您标记为无效，不影响正文阅读。</div>' +
      '<div class="text-xs text-muted">反馈原因：' + reasonLbl +
        (info.note ? '（' + info.note + '）' : '') + '</div>';
    pop.onmouseenter = cancelClosePopover;
    pop.onmouseleave = scheduleClosePopover;
    pop.style.display = 'block';
    var rect = markEl.getBoundingClientRect();
    pop.style.top = Math.min(rect.bottom + 8, window.innerHeight - 200) + 'px';
    pop.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - 380)) + 'px';
  }

  function bindAnnotEvents() {
    var body = document.getElementById('er-doc-body');
    if (!body || _docMode !== 'annotated' || _activeAttachment !== 'main') return;
    body.querySelectorAll('.er-ai-mark').forEach(function (el) {
      var id = el.getAttribute('data-annot-id');
      var ann = ANNOTATIONS[id];
      if (!ann && !_invalidAnnots[id]) return;
      if (_invalidAnnots[id]) {
        var info = _invalidAnnots[id];
        el.onmouseenter = function () { showInvalidAnnotPopover(el, ann, info); };
        el.onmouseleave = scheduleClosePopover;
        el.onclick = function (e) {
          e.stopPropagation();
          _pinnedAnnotId = id;
          showInvalidAnnotPopover(el, ann, info);
        };
        return;
      }
      el.onmouseenter = function () {
        showAnnotPopover(el, ann, false);
      };
      el.onmouseleave = scheduleClosePopover;
      el.onclick = function (e) {
        e.stopPropagation();
        showAnnotPopover(el, ann, true);
      };
    });
  }

  function resetReviewState() {
    _docMode = 'original';
    _draftGenerated = false;
    _invalidAnnots = {};
    _activeAttachment = 'main';
    _pinnedAnnotId = null;
    closeInvalidReasonModal();
    cancelClosePopover();
    closeAnnotPopover();
    initScoreValues();
  }

  window.ARGP_EXPERT = {
    renderExpertList: renderExpertList,
    renderExpertInvite: renderExpertInvite,
    renderExpertReview: renderExpertReview,
    resetReviewState: resetReviewState,
    openInvite: openInvite,
    openReview: openReview,
    markCurrentSubmitted: markCurrentSubmitted,
    selectConflict: selectConflict,
    clearConflictSelection: clearConflictSelection,
    toggleRejectPanel: toggleRejectPanel,
    cancelRejectPanel: cancelRejectPanel,
    submitAvoidance: submitAvoidance,
    acceptInvite: acceptInvite,
    confirmRejectInvite: confirmRejectInvite,
    switchDocMode: switchDocMode,
    openAttachment: openAttachment,
    onScoreInput: onScoreInput,
    onScoreNumInput: onScoreNumInput,
    generateDraft: generateDraft,
    onOpinionInput: onOpinionInput,
    closeAnnotPopover: closeAnnotPopover,
    markAnnotInvalid: markAnnotInvalid,
    openInvalidReasonModal: openInvalidReasonModal,
    closeInvalidReasonModal: closeInvalidReasonModal,
    selectInvalidReason: selectInvalidReason,
    submitInvalidAnnotReason: submitInvalidAnnotReason
  };

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.er-ai-mark') && !e.target.closest('#er-annot-popover') && !e.target.closest('#er-invalid-reason-modal')) {
      _pinnedAnnotId = null;
      closeAnnotPopover();
    }
  });
})();

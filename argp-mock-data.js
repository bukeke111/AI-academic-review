/* ARGP Demo — 学生「我的项目」Mock 数据 */
(function () {
  var STATUS = {
    draft:     { badge: 'b-draft',     label: '草稿',   cls: 'st-draft' },
    guidance:  { badge: 'b-guidance',  label: '指导中', cls: 'st-guidance' },
    submitted: { badge: 'b-submitted', label: '已提交', cls: 'st-submitted' },
    review:    { badge: 'b-review',    label: '已评审', cls: 'st-review' },
    defense:   { badge: 'b-defense',   label: '已答辩', cls: 'st-defense' },
    pub:       { badge: 'b-pub',       label: '已公示', cls: 'st-pub' },
    archived:  { badge: 'b-pub',       label: '已公示', cls: 'st-pub' },
    failed:    { badge: 'b-red',       label: '不予立项', cls: 'st-failed' }
  };

  var PRE_GUIDANCE = { draft: 1, submitted: 1 };

  var STUDENT_PROJECTS = [
    {
      id: 'PROJ-2026-0087',
      title: '强化学习在机器人路径规划中的应用研究',
      mentor: '张明远 教授',
      status: 'guidance',
      stage: '导师审阅',
      aiScore: 82,
      updated: '2026-03-14',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0063',
      title: '基于Transformer的中文医学文本理解',
      mentor: '刘教授',
      status: 'review',
      stage: '专家评审',
      aiScore: 91,
      updated: '2026-03-10',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0045',
      title: '联邦学习框架下的数据隐私保护',
      mentor: '王教授',
      status: 'defense',
      stage: '答辩',
      aiScore: 88,
      updated: '2026-03-08',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0029',
      title: '量子计算在密码学中的应用探索',
      mentor: '张教授',
      status: 'pub',
      stage: '公示',
      aiScore: 93,
      updated: '2026-03-01',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0091',
      title: '知识图谱驱动的科研文献推荐系统',
      mentor: '张明远 教授',
      status: 'draft',
      stage: '撰写中',
      aiScore: null,
      updated: '2026-03-16',
      hasAiReport: false,
      showOnHome: false
    },
    {
      id: 'PROJ-2026-0110',
      title: '边缘计算下的物联网安全协议研究',
      mentor: '王教授',
      status: 'submitted',
      stage: '待导师审核',
      aiScore: 78,
      updated: '2026-03-15',
      hasAiReport: true,
      showOnHome: false
    },
    {
      id: 'PROJ-2026-0041',
      title: '基于图神经网络的知识推理研究',
      mentor: '张教授',
      status: 'submitted',
      stage: '秘书处受理',
      aiScore: 48,
      updated: '2026-03-15',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0099',
      title: '边缘计算环境下的任务调度优化',
      mentor: '王教授',
      status: 'draft',
      stage: '秘书处退件 · 请修改后重提',
      returnSource: 'secretary',
      rejectNotice: '材料不完整：缺少导师签字确认扫描件、技术路线图与实验方案文件。第三章「研究假设」章节内容空缺。请补齐材料并修正正文后重新提交。',
      aiScore: 55,
      updated: '2026-03-16',
      hasAiReport: true,
      showOnHome: true
    },
    {
      id: 'PROJ-2026-0078',
      title: '基于深度学习的医学影像分割研究',
      mentor: '刘教授',
      status: 'failed',
      stage: '不予立项',
      resultNotice: '经答辩评审与现场投票，本项目综合评定为不予立项。主要意见：实验设计缺乏对照组设置，创新性论证不足，答辩中对数据集规模问题未能给出充分回应。',
      finalScore: 62,
      appealDeadline: '2026-03-24（剩余 7 个工作日）',
      appealStatus: 'pending',
      aiScore: 58,
      updated: '2026-03-16',
      hasAiReport: true,
      showOnHome: true
    }
  ];

  function scoreClass(score) {
    if (score == null) return 'text-muted';
    if (score >= 85) return 'text-green';
    if (score >= 70) return 'text-warn';
    return 'text-danger';
  }

  function scoreBarColor(score) {
    if (score == null) return '#d1d5db';
    if (score >= 85) return '#059669';
    if (score >= 70) return '#b45309';
    return '#dc2626';
  }

  function isPreGuidance(p) {
    return !!(PRE_GUIDANCE[p.status]);
  }

  function canStudentEdit(p) {
    if (!p) return false;
    if (p.status === 'draft') return true;
    if (p.status === 'guidance' && p.returnSource === 'mentor') return true;
    return false;
  }

  function renderProjDetailNotice(p, el) {
    if (!el) return;
    var html = '';
    var show = false;
    if (p.returnSource === 'secretary') {
      show = true;
      var notice = p.rejectNotice || '秘书处已退回您的申请材料，请按说明修改。';
      html =
        '<strong style="color:#b91c1c;">秘书处退件</strong> · ' + notice +
        '<div style="margin-top:8px;font-size:12px;">请修改后重新提交导师审核，通过后将触发完整新一轮受理与评审流程。</div>';
      el.style.background = 'var(--danger-bg)';
      el.style.borderLeft = '3px solid #b91c1c';
      el.style.color = '#7f1d1d';
    } else if (p.returnSource === 'mentor') {
      show = true;
      html =
        '<strong style="color:#b45309;">导师退回修改</strong> · 导师已附批注意见，请修改后重新提交导师审核。' +
        '<div style="margin-top:8px;font-size:12px;">退回后仍须导师再审通过，方可进入秘书处受理。</div>';
      el.style.background = 'var(--warn-bg)';
      el.style.borderLeft = '3px solid #b45309';
      el.style.color = '#78350f';
    } else if (p.status === 'failed') {
      show = true;
      var notice = p.resultNotice || '经评审委员会审议，本项目未准予立项。';
      if (p.appealStatus === 'pending' || p.appealStatus === 'reviewing') {
        html =
          '<strong style="color:#b45309;">申诉受理中</strong> · 您的评审结果申诉已由秘书处受理，正在审核是否符合复议条件。' +
          '<div style="margin-top:8px;font-size:12px;">受理后将组建 3 位未参与原评审的专家进行复议，请留意消息通知。</div>';
        el.style.background = 'var(--warn-bg)';
        el.style.borderLeft = '3px solid #b45309';
        el.style.color = '#78350f';
      } else if (p.appealStatus === 'closed') {
        html =
          '<strong style="color:#6b7280;">申诉已结案</strong> · ' + notice +
          '<div style="margin-top:8px;font-size:12px;">复议结果为终局结论，已写入 Governance Graph 申诉记录。</div>';
        el.style.background = '#f5f5f5';
        el.style.borderLeft = '3px solid #d9d9d9';
        el.style.color = 'var(--text-secondary)';
      } else {
        html =
          '<strong style="color:#b91c1c;">评审未通过</strong> · ' + notice +
          '<div style="margin-top:8px;font-size:12px;">如对<strong>程序性问题</strong>有异议，可在 ' +
          (p.appealDeadline || '结果通知后 7 个工作日内') + ' 通过右侧「申诉」入口提交。</div>';
        el.style.background = 'var(--danger-bg)';
        el.style.borderLeft = '3px solid #b91c1c';
        el.style.color = '#7f1d1d';
      }
    } else if (p.status === 'guidance') {
      show = true;
      html = '本项目已进入导师指导环节，申请材料已锁定。如需修改请等待导师审阅或使用「退回修改」。';
      el.style.background = '#f5f5f5';
      el.style.borderLeft = '3px solid #d9d9d9';
      el.style.color = 'var(--text-secondary)';
    } else if (!isPreGuidance(p)) {
      show = true;
      html = '本项目已进入评审或答辩环节，申请材料已锁定。如需调整请联系秘书处申诉流程。';
      el.style.background = '#f5f5f5';
      el.style.borderLeft = '3px solid #d9d9d9';
      el.style.color = 'var(--text-secondary)';
    }
    el.classList.toggle('role-hidden', !show);
    if (show) el.innerHTML = html;
  }

  function renderProjDetailAppealSlot(p) {
    var slot = document.getElementById('proj-detail-appeal-slot');
    if (!slot) return;
    if (!p || p.status !== 'failed') {
      slot.classList.add('role-hidden');
      return;
    }
    var inner = '';
    if (p.appealStatus === 'pending' || p.appealStatus === 'reviewing') {
      inner =
        '<span style="color:#b45309;">●</span> 申诉受理中 · 秘书处正在审核是否符合复议条件';
    } else if (p.appealStatus === 'closed') {
      inner = '申诉已结案 · 复议结果为终局结论';
    } else if (window.ARGP_APPEAL && window.ARGP_APPEAL.canSubmitAppeal(p)) {
      inner =
        '对评审结果有程序性异议？' +
        '<a class="section-action" style="margin-left:4px;" href="#" onclick="ARGP_APPEAL.openAppealPage(\'' + p.id + '\');return false;">提交申诉</a>' +
        '<span style="display:block;margin-top:4px;font-size:11px;color:var(--text-3);">截止 ' +
        (p.appealDeadline || '结果通知后 7 个工作日') + '</span>';
    } else {
      slot.classList.add('role-hidden');
      return;
    }
    slot.classList.remove('role-hidden');
    slot.innerHTML = inner;
  }

  function canShowAiReport(p) {
    return isPreGuidance(p) && p.hasAiReport;
  }

  var _currentDetailId = 'PROJ-2026-0087';
  var _studentCompareVersionId = null;
  var _studentCompareReturnTo = 'list';

  function getProjectById(id) {
    for (var i = 0; i < STUDENT_PROJECTS.length; i++) {
      if (STUDENT_PROJECTS[i].id === id) return STUDENT_PROJECTS[i];
    }
    return null;
  }

  function openProjectDetail(projId) {
    if (projId) _currentDetailId = projId;
    if (window.ARGP_AI && window.ARGP_AI.setCurrentProjId) {
      window.ARGP_AI.setCurrentProjId(_currentDetailId);
    }
    if (typeof window.showPage === 'function') {
      window.showPage('proj-detail');
    }
  }

  function applyProjDetailView() {
    var p = getProjectById(_currentDetailId) || STUDENT_PROJECTS[0];
    if (!p) return;
    _currentDetailId = p.id;
    var st = STATUS[p.status] || STATUS.draft;
    var pre = isPreGuidance(p);
    var showAi = !!p.hasAiReport;

    var title = document.getElementById('proj-detail-title');
    var idEl = document.getElementById('proj-detail-id');
    var statusEl = document.getElementById('proj-detail-status');
    var aiBanner = document.getElementById('proj-detail-ai-banner');
    var guidanceNote = document.getElementById('proj-detail-guidance-note');
    var btnEdit = document.getElementById('proj-detail-btn-edit');
    var btnAi = document.getElementById('proj-detail-btn-ai');
    var aiScore = document.getElementById('proj-detail-ai-score');

    if (title) title.textContent = p.title;
    if (idEl) idEl.textContent = p.id;
    if (statusEl) {
      var disp = getStudentStatusDisplay(p);
      statusEl.textContent = disp.label;
      statusEl.className = 'my-proj-status ' + disp.cls;
    }
    if (aiScore && p.aiScore != null) aiScore.textContent = p.aiScore;

    if (aiBanner) {
      aiBanner.classList.toggle('role-hidden', !showAi);
      if (showAi) {
        var bannerStrong = aiBanner.querySelector('strong');
        if (bannerStrong) {
          bannerStrong.textContent = pre ? 'AI 质量自检（提交导师前）' : 'AI 质量自检（历史报告）';
        }
      }
    }
    if (guidanceNote) renderProjDetailNotice(p, guidanceNote);
    if (btnEdit) btnEdit.classList.toggle('role-hidden', !canStudentEdit(p));
    if (btnAi) btnAi.classList.toggle('role-hidden', !showAi);
    renderProjDetailAppealSlot(p);

    if (window.ARGP_MOCK.closeVersionDetail) closeVersionDetail();
    renderVersionList();
  }

  function getStudentStatusDisplay(p) {
    var st = STATUS[p.status] || STATUS.draft;
    if (p.returnSource === 'secretary') {
      return { label: '秘书处退件', cls: 'st-rejected' };
    }
    if (p.returnSource === 'mentor') {
      return { label: '导师退回', cls: 'st-guidance' };
    }
    if (p.status === 'failed') {
      if (p.appealStatus === 'pending' || p.appealStatus === 'reviewing') {
        return { label: '申诉受理中', cls: 'st-appeal' };
      }
      if (p.appealStatus === 'closed') {
        return { label: '申诉已结案', cls: 'st-failed' };
      }
      return { label: '不予立项', cls: 'st-failed' };
    }
    return { label: st.label, cls: st.cls };
  }

  function getStudentListTab(p) {
    if (p.returnSource === 'secretary') return 'rejected';
    if (p.status === 'failed') return 'failed';
    if (p.status === 'draft') return 'draft';
    if (p.status === 'guidance') return 'guidance';
    if (p.status === 'submitted' || p.status === 'review') return 'submitted';
    if (p.status === 'defense') return 'defense';
    if (p.status === 'pub' || p.status === 'archived') return 'pub';
    return 'all';
  }

  function countStudentListTab(tabKey) {
    if (tabKey === 'all') return STUDENT_PROJECTS.length;
    return STUDENT_PROJECTS.filter(function (p) { return getStudentListTab(p) === tabKey; }).length;
  }

  function renderMyProjTabs() {
    var el = document.getElementById('my-proj-tabs');
    if (!el) return;
    var rejectedN = STUDENT_PROJECTS.filter(function (p) { return p.returnSource === 'secretary'; }).length;
    var defs = [
      { key: 'all', label: '所有' },
      { key: 'rejected', label: '退件待改' },
      { key: 'draft', label: '草稿' },
      { key: 'guidance', label: '指导中' },
      { key: 'submitted', label: '已提交' },
      { key: 'defense', label: '已答辩' },
      { key: 'pub', label: '已公示' }
    ];
    el.innerHTML = defs.map(function (d) {
      var n = countStudentListTab(d.key);
      var active = rejectedN > 0 ? d.key === 'rejected' : d.key === 'all';
      return '<div class="tab-item' + (active ? ' active' : '') + '" data-filter="' + d.key + '" onclick="activeTab(this)">' +
        d.label + ' (' + n + ')</div>';
    }).join('');
  }

  function renderMyProjCard(p) {
    var disp = getStudentStatusDisplay(p);
    var tab = getStudentListTab(p);
    var stageHint = p.stage ? '<span class="text-xs text-muted">' + p.stage + '</span>' : '';
    var rejectBorder = p.returnSource === 'secretary' ? ' style="border-left:3px solid #dc2626;"' : '';
    return '<div class="my-proj-card" data-tab="' + tab + '"' + rejectBorder + ' role="button" tabindex="0" data-proj-id="' + p.id + '" onclick="ARGP_MOCK.openProjectDetail(\'' + p.id + '\')">' +
      '<div class="my-proj-card-main">' +
        '<div class="my-proj-card-title">' + p.title + '</div>' +
        '<div class="my-proj-card-meta"><span class="mono">' + p.id + '</span><span>' + p.updated + '</span>' + stageHint + '</div>' +
      '</div>' +
      '<span class="my-proj-status ' + disp.cls + '">' + disp.label + '</span>' +
    '</div>';
  }

  function renderSummaryItem(p) {
    var disp = getStudentStatusDisplay(p);
    var rejectBorder = p.returnSource === 'secretary' ? ' style="border-left:3px solid #dc2626;"' : '';
    return '<div class="my-proj-card my-proj-card-compact"' + rejectBorder + ' role="button" tabindex="0" onclick="ARGP_MOCK.openProjectDetail(\'' + p.id + '\')">' +
      '<div class="my-proj-card-main">' +
        '<div class="my-proj-card-title">' + p.title + '</div>' +
        '<div class="my-proj-card-meta mono">' + p.id + '</div>' +
      '</div>' +
      '<span class="my-proj-status ' + disp.cls + '">' + disp.label + '</span>' +
    '</div>';
  }

  function renderMyProjList() {
    var el = document.getElementById('my-proj-list');
    if (!el) return;
    var sorted = STUDENT_PROJECTS.slice().sort(function (a, b) {
      if (a.returnSource === 'secretary' && b.returnSource !== 'secretary') return -1;
      if (b.returnSource === 'secretary' && a.returnSource !== 'secretary') return 1;
      return b.updated.localeCompare(a.updated);
    });
    el.innerHTML = sorted.map(renderMyProjCard).join('');
    if (window.ARGP_UI && window.ARGP_UI.initTabGroups) {
      var page = document.getElementById('page-my-proj');
      if (page) window.ARGP_UI.initTabGroups(page);
    }
  }

  function renderMyProjRejectBanner() {
    var banner = document.getElementById('my-proj-reject-banner');
    var countEl = document.getElementById('my-proj-reject-count');
    if (!banner) return;
    var rejectedN = STUDENT_PROJECTS.filter(function (p) { return p.returnSource === 'secretary'; }).length;
    banner.style.display = rejectedN > 0 ? '' : 'none';
    if (countEl) countEl.textContent = String(rejectedN);
  }

  function renderStudentProjectSummary() {
    var el = document.getElementById('home-my-proj-list');
    if (!el) return;
    var items = STUDENT_PROJECTS.filter(function (p) {
      return p.showOnHome || p.returnSource === 'secretary' || (p.status === 'failed' && !p.appealStatus);
    }).sort(function (a, b) {
      if (a.status === 'failed' && b.status !== 'failed') return -1;
      if (b.status === 'failed' && a.status !== 'failed') return 1;
      if (a.returnSource === 'secretary' && b.returnSource !== 'secretary') return -1;
      if (b.returnSource === 'secretary' && a.returnSource !== 'secretary') return 1;
      return b.updated.localeCompare(a.updated);
    });
    el.innerHTML = items.map(renderSummaryItem).join('');
  }

  function renderStudentReturnTodos() {
    var el = document.getElementById('home-todo-list');
    if (!el) return;
    var rejectItems = STUDENT_PROJECTS.filter(function (p) {
      return p.returnSource === 'secretary' || p.returnSource === 'mentor';
    });
    var staticHtml = [
      { dot: '#2563eb', title: '待导师审核 · 《强化学习路径规划》', meta: '已提交 · 指导导师：张明远教授 · 待审阅', action: 'showPage(\'proj-detail\')', label: '查看进度' },
      { dot: '#7c3aed', title: '待参加答辩 · 《联邦学习隐私保护框架》', meta: '答辩时间：2026-03-22 14:00 · 第三会议室', action: 'openAiAssistant(\'defense\',\'PROJ-2026-0045\')', label: '查看安排' },
      { dot: '#059669', title: 'AI自检完成 · 《强化学习路径规划》发现 2 处黄色风险', meta: '建议修改后提交导师审核', action: 'openAiAssistant(\'quality\',\'PROJ-2026-0087\',true)', label: '查看报告' }
    ];
    var html = rejectItems.map(function (p) {
      var isSec = p.returnSource === 'secretary';
      var shortTitle = p.title.length > 22 ? p.title.slice(0, 22) + '…' : p.title;
      return '<div class="todo-item">' +
        '<div class="todo-dot" style="background:' + (isSec ? '#dc2626' : '#b45309') + '"></div>' +
        '<div class="todo-body">' +
          '<div class="todo-title">' + (isSec ? '秘书处退件 · 《' : '导师退回 · 《') + shortTitle + '》</div>' +
          '<div class="todo-meta">' + (p.stage || p.id) + '</div>' +
        '</div>' +
        '<button class="todo-cta" type="button" onclick="ARGP_MOCK.openProjectDetail(\'' + p.id + '\')">' +
          (isSec ? '修改材料' : '查看意见') +
        '</button></div>';
    }).join('');
    html += staticHtml.map(function (t) {
      return '<div class="todo-item">' +
        '<div class="todo-dot" style="background:' + t.dot + '"></div>' +
        '<div class="todo-body"><div class="todo-title">' + t.title + '</div>' +
        '<div class="todo-meta">' + t.meta + '</div></div>' +
        '<button class="todo-cta" type="button" onclick="' + t.action + '">' + t.label + '</button></div>';
    }).join('');
    el.innerHTML = html;
    var countEl = document.getElementById('home-todo-count');
    if (countEl) countEl.textContent = String(rejectItems.length + staticHtml.length);
    var statTodo = document.getElementById('home-stat-todo-num');
    if (statTodo) statTodo.textContent = String(rejectItems.length + staticHtml.length);
  }

  function updateMyProjMeta() {
    var sub = document.getElementById('my-proj-sub');
    var user = window.ARGP_AUTH && window.ARGP_AUTH.getUser();
    var name = user ? user.name : '李同学';
    if (sub) sub.textContent = name + ' · 共 ' + STUDENT_PROJECTS.length + ' 项';
  }

  function countByStatus() {
    var counts = {};
    STUDENT_PROJECTS.forEach(function (p) {
      if (p.returnSource === 'secretary') return;
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }

  function renderStudentHomeBoard() {
    var counts = countByStatus();
    var rejectedN = STUDENT_PROJECTS.filter(function (p) { return p.returnSource === 'secretary'; }).length;
    var activeStatuses = ['draft', 'guidance', 'submitted', 'review', 'defense'];
    var activeTotal = rejectedN;
    activeStatuses.forEach(function (s) {
      activeTotal += counts[s] || 0;
    });
    var activeEl = document.getElementById('home-active-count');
    var hintEl = document.getElementById('home-active-hint');
    if (activeEl) activeEl.textContent = String(activeTotal);
    if (hintEl) {
      var parts = [];
      if (rejectedN) parts.push('退件待改 ' + rejectedN);
      if (counts.guidance) parts.push('指导中 ' + counts.guidance);
      if (counts.submitted) parts.push('待审核 ' + counts.submitted);
      if (counts.review) parts.push('评审 ' + counts.review);
      if (counts.defense) parts.push('答辩 ' + counts.defense);
      if (counts.draft) parts.push('草稿 ' + counts.draft);
      hintEl.textContent = parts.length ? parts.join(' · ') : '暂无进行中项目';
    }
    var boardEl = document.getElementById('home-stage-board-body');
    if (!boardEl) return;
    var chips = [
      { status: 'draft', hint: '撰写与自检' },
      { status: 'submitted', hint: '待导师审核' },
      { status: 'guidance', hint: '导师指导中' },
      { status: 'review', hint: '专家评审' },
      { status: 'defense', hint: '答辩环节' },
      { status: 'pub', hint: '已立项公示' }
    ];
    var rejectedChip = rejectedN
      ? '<button type="button" class="stage-chip" style="border-color:#fecaca;background:#fef2f2;" onclick="showPage(\'my-proj\')">' +
          '<span class="stage-chip-num" style="color:#b91c1c;">' + rejectedN + '</span>' +
          '<span class="stage-chip-lbl">退件待改</span>' +
          '<span class="stage-chip-hint">秘书处退回</span>' +
        '</button>'
      : '';
    boardEl.innerHTML = rejectedChip + chips.map(function (c) {
      var st = STATUS[c.status] || STATUS.draft;
      var n = counts[c.status] || 0;
      if (c.status === 'pub') n += counts.archived || 0;
      return '<button type="button" class="stage-chip" onclick="showPage(\'my-proj\')">' +
        '<span class="stage-chip-num">' + n + '</span>' +
        '<span class="stage-chip-lbl">' + st.label + '</span>' +
        '<span class="stage-chip-hint">' + c.hint + '</span>' +
      '</button>';
    }).join('');
  }

  function syncAfterSubmitToMentor(projId) {
    var p = getProjectById(projId);
    if (p && p.status === 'draft') {
      p.status = 'submitted';
      p.stage = '待导师审核';
      p.returnSource = null;
      p.rejectNotice = null;
      p.updated = '2026-03-17';
      p.hasAiReport = true;
    }
    initStudentProjects();
  }

  function syncAfterMentorApprove(projId, mentorProj) {
    var p = getProjectById(projId);
    if (p) {
      p.status = 'submitted';
      p.stage = '秘书处受理';
      p.returnSource = null;
      p.rejectNotice = null;
      p.updated = '2026-03-17';
    }
    if (window.ARGP_SECRETARY && window.ARGP_SECRETARY.upsertPendingFromMentor) {
      window.ARGP_SECRETARY.upsertPendingFromMentor(projId, {
        title: p ? p.title : (mentorProj ? mentorProj.title : projId),
        type: mentorProj ? mentorProj.type : '—',
        applicant: mentorProj ? mentorProj.student : '—',
        grade: mentorProj ? mentorProj.grade : '—'
      });
    }
    initStudentProjects();
  }

  function syncAfterMentorReject(projId) {
    var p = getProjectById(projId);
    if (p) {
      p.status = 'guidance';
      p.stage = '导师退回 · 修改中';
      p.returnSource = 'mentor';
      p.updated = '2026-03-17';
    }
    initStudentProjects();
  }

  function syncAfterSecretaryIntake(projId) {
    var p = getProjectById(projId);
    if (p) {
      p.status = 'review';
      p.stage = '专家评审';
      p.updated = '2026-03-17';
    }
    initStudentProjects();
  }

  function syncAfterSecretaryReject(projId, rejectNotice) {
    var p = getProjectById(projId);
    if (p) {
      p.status = 'draft';
      p.stage = '秘书处退件 · 请修改后重提';
      p.returnSource = 'secretary';
      p.rejectNotice = rejectNotice || '';
      p.updated = '2026-03-17';
      p.hasAiReport = true;
    }
    initStudentProjects();
  }

  function activateRejectedTabIfNeeded() {
    var rejectedN = STUDENT_PROJECTS.filter(function (p) { return p.returnSource === 'secretary'; }).length;
    if (!rejectedN) return;
    var tab = document.querySelector('#my-proj-tabs .tab-item[data-filter="rejected"]');
    if (tab && typeof window.activeTab === 'function') {
      window.activeTab(tab);
    }
  }

  function initStudentProjects() {
    renderStudentReturnTodos();
    renderStudentProjectSummary();
    renderMyProjRejectBanner();
    renderMyProjTabs();
    renderMyProjList();
    updateMyProjMeta();
    renderStudentHomeBoard();
  }

  function getCurrentDetailId() {
    return _currentDetailId;
  }

  var VERSION_HISTORY = {
    'PROJ-2026-0087': [
      {
        id: 'v3',
        current: true,
        locked: true,
        note: '修复逻辑矛盾问题，更新第三章假设表述',
        meta: '2026-03-14 09:45 · 李明',
        title: '申请书正文 · v3',
        content:
          '<h3>一、研究背景与意义</h3>' +
          '<p>近年来，随着深度强化学习技术的快速发展，智能机器人在复杂动态环境中的自主导航能力得到了显著提升。<span class="hl-yellow">传统路径规划算法在静态已知地图上表现良好，但在动态障碍物频繁出现的真实场景中存在明显局限性（路径重规划延迟平均 &gt; 200ms）</span>。</p>' +
          '<div class="annotation a-blue">导师批注：定量数据已补充，表述改善</div>' +
          '<h3>二、研究目标与内容</h3>' +
          '<p>本项目研究目标为：（1）构建基于近端策略优化（PPO）的机器人路径规划框架；（2）设计融合环境感知的奖励函数体系；（3）在ROS仿真环境及真实机器人平台上验证方法有效性。</p>' +
          '<h3>三、研究假设</h3>' +
          '<p><span class="hl-yellow">H2：现有深度强化学习方法在高度动态障碍环境下避障成功率不足 70%</span>，需要本研究提出的新型课程学习策略加以改进。</p>' +
          '<div class="annotation">AI检测：逻辑一致性已改善，与绪论立场统一</div>' +
          '<h3>四、创新点</h3>' +
          '<p>创新点：提出多目标奖励函数动态平衡机制；设计课程学习驱动的分阶段训练策略。预期成果：发表EI/SCI论文1篇；开源路径规划工具包。</p>'
      },
      {
        id: 'v2',
        current: false,
        locked: false,
        note: '补充创新点说明，修改参考文献格式',
        meta: '2026-03-12 16:20 · 李明',
        title: '申请书正文 · v2',
        content:
          '<h3>一、研究背景与意义</h3>' +
          '<p>近年来，随着深度强化学习技术的快速发展，智能机器人在复杂动态环境中的自主导航能力得到了显著提升。传统路径规划算法在静态已知地图上表现良好，但在动态障碍物频繁出现的真实场景中存在明显局限性。</p>' +
          '<h3>二、研究目标与内容</h3>' +
          '<p>构建 PPO 路径规划框架；设计奖励函数体系；ROS 仿真验证。</p>' +
          '<h3>三、研究假设</h3>' +
          '<p><span class="hl-red">H2：现有深度强化学习方法无法有效处理动态障碍物避障问题</span>（与绪论表述矛盾，v3 已修订）</p>' +
          '<h3>四、创新点</h3>' +
          '<p>多目标奖励函数；课程学习训练策略。（本版补充了创新点详细描述）</p>'
      },
      {
        id: 'v1',
        current: false,
        locked: false,
        note: '初稿提交',
        meta: '2026-03-10 11:00 · 李明',
        title: '申请书正文 · v1',
        content:
          '<h3>一、研究背景与意义</h3>' +
          '<p>深度强化学习在机器人路径规划领域应用广泛，现有方法表现优秀。</p>' +
          '<h3>二、研究目标与内容</h3>' +
          '<p>构建强化学习路径规划系统。（初稿，内容较简略）</p>' +
          '<h3>三、研究假设</h3>' +
          '<p>H2：现有方法无法处理动态障碍物。</p>' +
          '<h3>四、创新点</h3>' +
          '<p>（待补充）</p>'
      }
    ]
  };

  var SAMPLE_PAPERS = [
    {
      id: 'sample-app-rl',
      type: '范例申请书',
      typeCls: 'sample-type-app',
      title: '2026年国创优秀项目申请书范例 · 强化学习方向',
      desc: '含完整章节结构、创新点表述与参考文献格式示范，适合国创计划申报参考。',
      meta: '计算机学院 · 匿名范例 · PDF 28页',
      content:
        '<h3>【范例】一、研究背景与意义</h3>' +
        '<p>本范例展示国创优秀项目的背景论述结构：先概述领域现状（附引用），再指出具体瓶颈（附数据），最后阐明本项目的研究价值与应用场景。</p>' +
        '<h3>【范例】二、研究目标与内容</h3>' +
        '<p>目标应可量化、可验证。范例采用"（1）（2）（3）"分条列举，每条对应一个可交付成果。</p>' +
        '<h3>【范例】三、技术路线</h3>' +
        '<p>建议配合技术路线图附件，正文简述各阶段输入输出与验证指标。</p>' +
        '<h3>【范例】四、创新点与预期成果</h3>' +
        '<p>创新点需与文献差异化对比；预期成果区分论文、专利、开源等类型并给出可考核指标。</p>'
    },
    {
      id: 'sample-paper-rl',
      type: '参考论文',
      typeCls: 'sample-type-paper',
      title: 'Deep Reinforcement Learning for Mobile Robot Navigation: A Survey',
      desc: '机器人路径规划领域综述论文，可作为研究现状与创新点对比的参考文献示范。',
      meta: 'IEEE T-RO · 2023 · 引用格式示范',
      content:
        '<h3>摘要（示范）</h3>' +
        '<p>本文系统综述了深度强化学习在移动机器人导航中的应用，涵盖价值型、策略梯度型及模型型方法，并讨论了 sim-to-real 迁移、安全约束与样本效率等开放问题。</p>' +
        '<h3>1. Introduction</h3>' +
        '<p>Mobile robot navigation in dynamic environments remains a fundamental challenge…</p>' +
        '<h3>2. Background</h3>' +
        '<p>强化学习框架、马尔可夫决策过程、PPO 与 SAC 等算法简介……</p>' +
        '<h3>3. Applications</h3>' +
        '<p>室内导航、仓储物流、服务机器人等场景应用案例……</p>' +
        '<p class="text-xs text-muted" style="margin-top:16px;">注：本文为 Demo 摘录示范，完整 PDF 请在图书馆数据库查阅。</p>'
    }
  ];

  function getVersionHistory(projId) {
    return VERSION_HISTORY[projId] || VERSION_HISTORY['PROJ-2026-0087'] || [];
  }

  function getVersionById(projId, versionId) {
    var list = getVersionHistory(projId);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === versionId) return list[i];
    }
    return null;
  }

  function getSamplePaper(id) {
    for (var i = 0; i < SAMPLE_PAPERS.length; i++) {
      if (SAMPLE_PAPERS[i].id === id) return SAMPLE_PAPERS[i];
    }
    return null;
  }

  function renderVersionStatusPills(v) {
    var html = '';
    if (v.current) {
      html += '<span class="version-status-pill is-current">当前版本</span>';
    } else {
      html += '<span class="version-status-pill is-history">历史版本</span>';
    }
    if (v.locked) {
      html += '<span class="version-status-pill is-locked">已锁定</span>';
    }
    return html;
  }

  function renderVersionList() {
    var listEl = document.getElementById('version-list-container');
    var sampleEl = document.getElementById('sample-paper-list');
    if (!listEl) return;
    var versions = getVersionHistory(_currentDetailId);
    if (!versions.length) {
      listEl.innerHTML = '<div class="ai-cap-empty" style="padding:24px;margin-bottom:12px;">该项目暂无版本记录</div>';
      return;
    }
    listEl.innerHTML = versions.map(function (v) {
      var actions = '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_MOCK.openVersionDetail(\'' + v.id + '\')">查看详情</button>';
      if (!v.current) {
        actions += '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_MOCK.openVersionCompare(\'' + v.id + '\',\'list\')">对比</button>';
        actions += '<button class="btn btn-sm btn-ghost" type="button" onclick="showToast(\'已恢复至 ' + v.id + '（Demo）\',\'success\')">恢复此版本</button>';
      }
      return '<div class="version-item">' +
        '<span class="version-tag">' + v.id + '</span>' +
        '<div class="v-info"><div class="v-note">' + v.note + '</div><div class="v-meta">' + v.meta + '</div></div>' +
        '<div class="v-status-group">' + renderVersionStatusPills(v) + '</div>' +
        '<div class="v-actions">' + actions + '</div></div>';
    }).join('');
    if (sampleEl) {
      sampleEl.innerHTML = SAMPLE_PAPERS.map(function (s) {
        return '<div class="sample-paper-item">' +
          '<div class="sample-paper-icon">' + (s.type === '参考论文' ? 'PDF' : 'DOC') + '</div>' +
          '<div class="sample-paper-body">' +
            '<div class="sample-paper-title">' + s.title + '</div>' +
            '<div class="sample-paper-desc">' + s.desc + '</div>' +
            '<div class="sample-paper-meta">' + s.meta + '</div>' +
          '</div>' +
          '<div class="sample-paper-actions">' +
            '<span class="sample-type-tag">' + s.type + '</span>' +
            '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_MOCK.openSamplePaper(\'' + s.id + '\')">查看详情</button>' +
          '</div></div>';
      }).join('');
    }
  }

  function openVersionDetail(versionId) {
    var v = getVersionById(_currentDetailId, versionId);
    if (!v) return;
    _studentCompareVersionId = null;
    _studentCompareReturnTo = 'list';
    var listView = document.getElementById('version-list-view');
    var detailView = document.getElementById('version-detail-view');
    var diffView = document.getElementById('version-diff-view');
    if (listView) listView.style.display = 'none';
    if (detailView) detailView.style.display = '';
    if (diffView) diffView.style.display = 'none';
    var titleEl = document.getElementById('version-detail-title');
    var metaEl = document.getElementById('version-detail-meta');
    var bodyEl = document.getElementById('version-detail-body');
    var badgesEl = document.getElementById('version-detail-badges');
    var actionsEl = document.getElementById('version-detail-actions');
    if (titleEl) titleEl.textContent = v.title;
    if (metaEl) metaEl.textContent = v.meta;
    if (bodyEl) bodyEl.innerHTML = v.content;
    if (badgesEl) badgesEl.innerHTML = '<span class="version-tag">' + v.id + '</span>' + renderVersionStatusPills(v);
    if (actionsEl) {
      var btns = '<button class="btn btn-secondary" type="button" onclick="ARGP_MOCK.closeVersionDetail()">返回列表</button>';
      if (!v.current) {
        btns += '<button class="btn btn-ghost" type="button" onclick="ARGP_MOCK.openVersionCompare(\'' + v.id + '\',\'detail\')">与当前版本对比</button>';
        btns += '<button class="btn btn-primary" type="button" onclick="showToast(\'已恢复至 ' + v.id + '（Demo）\',\'success\')">恢复此版本</button>';
      }
      actionsEl.innerHTML = btns;
    }
    window._openVersionId = versionId;
  }

  function closeVersionDetail() {
    closeVersionCompare(true);
    var listView = document.getElementById('version-list-view');
    var detailView = document.getElementById('version-detail-view');
    if (listView) listView.style.display = '';
    if (detailView) detailView.style.display = 'none';
    window._openVersionId = null;
  }

  function getCurrentVersionRecord(projId) {
    var versions = getVersionHistory(projId);
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].current) return versions[i];
    }
    return versions[0] || null;
  }

  function openVersionCompare(versionId, returnTo) {
    returnTo = returnTo || 'list';
    var currentV = getCurrentVersionRecord(_currentDetailId);
    if (!currentV || versionId === currentV.id) {
      if (typeof showToast === 'function') showToast('请选择历史版本与当前版本对比', 'warn');
      return;
    }
    if (!window.ARGP_MENTOR || !window.ARGP_MENTOR.buildVersionDiffHtml) {
      if (typeof showToast === 'function') showToast('版本对比功能暂不可用', 'warn');
      return;
    }
    _studentCompareVersionId = versionId;
    _studentCompareReturnTo = returnTo;
    var listView = document.getElementById('version-list-view');
    var detailView = document.getElementById('version-detail-view');
    var diffView = document.getElementById('version-diff-view');
    if (listView) listView.style.display = 'none';
    if (detailView) detailView.style.display = 'none';
    if (diffView) diffView.style.display = '';
    var badgesEl = document.getElementById('version-diff-badges');
    if (badgesEl) {
      badgesEl.innerHTML =
        '<span class="version-tag mono">' + versionId + ' ↔ ' + currentV.id + '</span>' +
        '<span class="version-status-pill is-history">版本对比</span>';
    }
    var bodyEl = document.getElementById('version-diff-body');
    if (bodyEl) {
      bodyEl.innerHTML = window.ARGP_MENTOR.buildVersionDiffHtml(_currentDetailId, versionId);
    }
    if (typeof showToast === 'function') showToast('已开启与 ' + versionId + ' 的版本对比', 'info');
  }

  function closeVersionCompare(silent) {
    if (!_studentCompareVersionId) return;
    var returnTo = _studentCompareReturnTo;
    var versionId = _studentCompareVersionId;
    _studentCompareVersionId = null;
    _studentCompareReturnTo = 'list';
    var diffView = document.getElementById('version-diff-view');
    if (diffView) diffView.style.display = 'none';
    if (silent) {
      var listView = document.getElementById('version-list-view');
      var detailView = document.getElementById('version-detail-view');
      if (detailView) detailView.style.display = 'none';
      if (listView) listView.style.display = '';
      return;
    }
    if (returnTo === 'detail' && versionId) {
      openVersionDetail(versionId);
    } else {
      var listView2 = document.getElementById('version-list-view');
      if (listView2) listView2.style.display = '';
    }
  }

  function openSamplePaper(paperId) {
    var s = getSamplePaper(paperId);
    if (!s) return;
    var listView = document.getElementById('version-list-view');
    var detailView = document.getElementById('version-detail-view');
    if (listView) listView.style.display = 'none';
    if (detailView) detailView.style.display = '';
    var titleEl = document.getElementById('version-detail-title');
    var metaEl = document.getElementById('version-detail-meta');
    var bodyEl = document.getElementById('version-detail-body');
    var badgesEl = document.getElementById('version-detail-badges');
    var actionsEl = document.getElementById('version-detail-actions');
    if (titleEl) titleEl.textContent = s.title;
    if (metaEl) metaEl.textContent = s.meta;
    if (bodyEl) bodyEl.innerHTML = s.content;
    if (badgesEl) {
      badgesEl.innerHTML = '<span class="sample-type-tag">' + s.type + '</span><span class="version-status-pill is-history">仅供参考</span>';
    }
    if (actionsEl) {
      actionsEl.innerHTML = '<button class="btn btn-secondary" type="button" onclick="ARGP_MOCK.closeVersionDetail()">返回列表</button>' +
        '<button class="btn btn-ghost" type="button" onclick="showToast(\'范例文件下载（Demo）\',\'info\')">下载 PDF</button>';
    }
    window._openVersionId = 'sample:' + paperId;
  }

  window.ARGP_MOCK = {
    STUDENT_PROJECTS: STUDENT_PROJECTS,
    STATUS: STATUS,
    PRE_GUIDANCE: PRE_GUIDANCE,
    isPreGuidance: isPreGuidance,
    canStudentEdit: canStudentEdit,
    canShowAiReport: canShowAiReport,
    getCurrentDetailId: getCurrentDetailId,
    getVersionHistory: getVersionHistory,
    renderVersionList: renderVersionList,
    openVersionDetail: openVersionDetail,
    closeVersionDetail: closeVersionDetail,
    openVersionCompare: openVersionCompare,
    closeVersionCompare: closeVersionCompare,
    openSamplePaper: openSamplePaper,
    openProjectDetail: openProjectDetail,
    applyProjDetailView: applyProjDetailView,
    getStudentListTab: getStudentListTab,
    syncAfterSubmitToMentor: syncAfterSubmitToMentor,
    syncAfterMentorApprove: syncAfterMentorApprove,
    syncAfterMentorReject: syncAfterMentorReject,
    syncAfterSecretaryIntake: syncAfterSecretaryIntake,
    syncAfterSecretaryReject: syncAfterSecretaryReject,
    initStudentProjects: initStudentProjects,
    renderMyProjList: renderMyProjList,
    renderMyProjTabs: renderMyProjTabs,
    renderStudentProjectSummary: renderStudentProjectSummary,
    renderStudentHomeBoard: renderStudentHomeBoard,
    activateRejectedTabIfNeeded: activateRejectedTabIfNeeded,
    getStudentStatusDisplay: getStudentStatusDisplay
  };
})();

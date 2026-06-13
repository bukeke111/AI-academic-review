/* ARGP Demo — 秘书受理台 Mock 数据与交互 */
(function () {
  var AVOIDANCE_REQUESTS = [];

  var SECRETARY_PROJECTS = [
    { id: 'PROJ-2026-0031', title: '多模态情感分析系统设计', type: '国创计划', applicant: '赵磊', grade: '研二', status: 'pending', risk: 'yellow', risks: '逻辑矛盾 · 引用不足', material: '完整', materialOk: true, submitted: '今天 09:15', highlight: true, intakeConfirmed: false, expertsInvited: false, intakeResult: null },
    { id: 'PROJ-2026-0041', title: '基于图神经网络的知识推理研究', type: '校级项目', applicant: '刘洋', grade: '研一', status: 'pending', risk: 'red', risks: '材料不完整', material: '缺少附件', materialOk: false, submitted: '今天 08:40', highlight: true, intakeConfirmed: false, expertsInvited: false, intakeResult: null },
    { id: 'PROJ-2026-0055', title: '智能合约形式化验证方法', type: '国创计划', applicant: '黄晨', grade: '研三', status: 'pending', risk: 'green', risks: '无重大风险', material: '完整', materialOk: true, submitted: '昨天 17:30', intakeConfirmed: false, expertsInvited: false, intakeResult: null },
    { id: 'PROJ-2026-0062', title: '深度学习对抗样本防御机制', type: '院级重点', applicant: '吴雪', grade: '研二', status: 'pending', risk: 'green', risks: '无重大风险', material: '完整', materialOk: true, submitted: '昨天 14:20', intakeConfirmed: false, expertsInvited: false, intakeResult: null },
    { id: 'PROJ-2026-0045', title: '联邦学习框架下的数据隐私保护', type: '国创计划', applicant: '陈浩', grade: '研三', status: 'accepted', risk: 'green', risks: '专家已邀请 · 待接受', material: '完整', materialOk: true, submitted: '03-05 10:20', intakeConfirmed: true, expertsInvited: true, intakeResult: 'approved' },
    { id: 'PROJ-2026-0063', title: '基于Transformer的中文医学文本理解', type: '校级项目', applicant: '王芳', grade: '研三', status: 'accepted', risk: 'green', risks: '待分配专家', material: '完整', materialOk: true, submitted: '03-02 14:00', intakeConfirmed: true, expertsInvited: false, intakeResult: 'approved' },
    { id: 'PROJ-2026-0099', title: '边缘计算环境下的任务调度优化', type: '院级重点', applicant: '郑凯', grade: '研二', status: 'accepted', risk: 'yellow', risks: '已退件', material: '不完整', materialOk: false, submitted: '03-01 11:20', intakeConfirmed: false, expertsInvited: false, intakeResult: 'rejected' },
    { id: 'PROJ-2026-0087', title: '强化学习在机器人路径规划中的应用研究', type: '国创计划', applicant: '李明', grade: '研二', status: 'reviewing', risk: 'green', risks: '专家评审 2/3', material: '完整', materialOk: true, submitted: '02-25 16:30', intakeConfirmed: true, expertsInvited: true, intakeResult: 'approved' },
    { id: 'PROJ-2026-0198', title: '量子计算在密码学中的应用', type: '校级项目', applicant: '孙杰', grade: '已毕业', status: 'done', risk: 'green', risks: '—', material: '完整', materialOk: true, submitted: '2026-12-18', intakeConfirmed: true, expertsInvited: true, intakeResult: 'approved' },
    { id: 'PROJ-2026-0176', title: '深度学习图像分割新方法研究', type: '院级重点', applicant: '林晓', grade: '已毕业', status: 'done', risk: 'green', risks: '—', material: '完整', materialOk: true, submitted: '2026-11-30', intakeConfirmed: true, expertsInvited: true, intakeResult: 'approved' }
  ];

  var MANUAL_EXPERT_POOL = [
    { id: 'zhao', name: '赵文静 教授', av: '赵', avBg: '#0891b2', college: '计算机学院', dept: '计算机视觉、医学影像', match: 88, avoid: '无冲突', avoidCls: 'green', load: '2项（低）' },
    { id: 'sun', name: '孙立新 副教授', av: '孙', avBg: '#7c3aed', college: '人工智能学院', dept: 'NLP、多模态学习', match: 79, avoid: '建议关注', avoidCls: 'warn', avoidDetail: '与申请人导师存在同机构关系，非强制回避。', load: '3项（中）' },
    { id: 'zhou', name: '周建国 教授', av: '周', avBg: '#dc2626', college: '软件学院', dept: '软件工程', match: 62, avoid: '强制回避', avoidCls: 'danger', avoidDetail: '曾为申请人本科毕设指导教师。', load: '—', disabled: true },
    { id: 'xu', name: '徐明 研究员', av: '徐', avBg: 'var(--primary)', college: '信息学院', dept: '联邦学习、隐私计算', match: 84, avoid: '无冲突', avoidCls: 'green', load: '1项（低）' },
    { id: 'he', name: '何佳 副教授', av: '何', avBg: '#059669', college: '计算机学院', dept: '情感计算、深度学习', match: 91, avoid: '无冲突', avoidCls: 'green', load: '4项（中）' },
    { id: 'lin', name: '林海涛 教授', av: '林', avBg: '#0d9488', college: '电子工程学院', dept: '嵌入式系统、边缘计算', match: 76, avoid: '无冲突', avoidCls: 'green', load: '2项（低）' },
    { id: 'yang', name: '杨雪 副教授', av: '杨', avBg: '#d97706', college: '数学学院', dept: '优化理论、图论', match: 68, avoid: '无冲突', avoidCls: 'green', load: '1项（低）' },
    { id: 'ma', name: '马志强 教授', av: '马', avBg: '#6366f1', college: '人工智能学院', dept: '知识图谱、推理', match: 82, avoid: '建议关注', avoidCls: 'warn', avoidDetail: '与申请人同课题组，建议关注评审独立性。', load: '3项（中）' },
    { id: 'wu', name: '吴芳 副教授', av: '吴', avBg: '#ec4899', college: '信息学院', dept: '数据挖掘、推荐系统', match: 74, avoid: '无冲突', avoidCls: 'green', load: '2项（低）' },
    { id: 'feng', name: '冯磊 教授', av: '冯', avBg: '#14b8a6', college: '软件学院', dept: '区块链、智能合约', match: 86, avoid: '无冲突', avoidCls: 'green', load: '5项（高）' },
    { id: 'gao', name: '高宁 研究员', av: '高', avBg: '#8b5cf6', college: '电子工程学院', dept: '机器人控制、强化学习', match: 80, avoid: '无冲突', avoidCls: 'green', load: '2项（低）' },
    { id: 'han', name: '韩冰 副教授', av: '韩', avBg: '#f43f5e', college: '数学学院', dept: '统计学习、概率图模型', match: 71, avoid: '无冲突', avoidCls: 'green', load: '3项（中）' }
  ];

  var _manualExpertCollegeFilter = 'all';
  var _manualExpertSearchQuery = '';

  var SEC_DETAIL = {
    'PROJ-2026-0031': {
      title: '多模态情感分析系统设计',
      applicant: '赵磊',
      mentor: '陈教授',
      projType: '国家级创新训练',
      submitted: '今天 09:15',
      aiScore: 61,
      risk: 'yellow',
      riskLabel: '黄色预警',
      riskHint: '建议人工复审',
      riskDesc: 'AI预审识别出2处中等风险问题。材料完整性检查通过，无缺失文件。建议人工确认逻辑矛盾问题后再决定是否受理。',
      academicSummary: 'Academic Agent 自检结论：综合得分 61 分（黄色预警）。第3章假设 H1 与绪论第1段存在表述矛盾；参考文献仅 9 篇，低于建议阈值（≥15篇）。重复率 3.8%，通过学术诚信检测。',
      overallRisk: '整体风险等级为黄色：存在可修正的逻辑一致性问题，材料齐全，建议在确认问题可接受或学生承诺修改后受理。',
      dimensions: [
        { id: 'logic', label: '逻辑一致性', level: 'warn', count: 1, basis: '第3章 H1「单模态存在信息盲区」与绪论「多模态方法已广泛受到关注」的表述立场不一致，AI 判定为中等风险。', confidence: 0.86 },
        { id: 'cite', label: '引用规范', level: 'warn', count: 1, basis: '参考文献 9 篇，低于国创申请书建议密度；近3年核心文献占比 44%，略低于 50% 参考线。', confidence: 0.79 },
        { id: 'format', label: '格式规范', level: 'ok', count: 0, basis: '章节结构、字体字号、页眉页脚均符合学院模板要求。', confidence: 0.94 },
        { id: 'integrity', label: '学术诚信', level: 'ok', count: 0, basis: '查重率 3.8%，未发现不当引用或自我抄袭风险。', confidence: 0.97 }
      ],
      tags: [
        { text: '逻辑矛盾 (1处)', cls: 'warn' },
        { text: '引用不足 (1处)', cls: 'warn' },
        { text: '材料完整', cls: 'ok' },
        { text: '格式规范', cls: 'ok' }
      ],
      materials: [
        { name: '申请书正文', ok: true },
        { name: '导师签字确认', ok: true },
        { name: '技术路线图', ok: true },
        { name: '参考文献列表', ok: true },
        { name: '实验方案文件', ok: true },
        { name: '预算申请表（可选）', optional: true }
      ],
      rejectDraft: '同学您好：\n\n您提交的项目「多模态情感分析系统设计」（PROJ-2026-0031）经秘书处预审，存在以下需修改问题：\n\n1. 第3章研究假设 H1 与绪论表述存在逻辑矛盾，请统一立场后重新提交；\n2. 参考文献数量不足（当前9篇，建议≥15篇）。\n\n请在 5 个工作日内修改并重新提交。如有疑问请联系秘书处。\n\n学术委员会秘书处',
      experts: [
        {
          id: 'chen', name: '陈志远 教授', av: '陈', avBg: 'var(--primary)', match: 94, tag: '推荐首选', tagCls: 'ok',
          dept: '计算机学院 · 自然语言处理、多模态学习 · 历史评审质量 92分',
          avoid: '无冲突', avoidCls: 'green', load: '2项（低）', selected: true, disabled: false,
          matchDetail: '语义相似度 82%（研究方向关键词：多模态、情感计算、Transformer 高度重叠）+ 图谱相似度 92%（近3年6篇相关高引论文）+ 历史质量 88%（意见充分率96%）',
          avoidDetail: null
        },
        {
          id: 'wang', name: '王秀芳 副教授', av: '王', avBg: '#7c3aed', match: 88, tag: null, tagCls: '',
          dept: '信息学院 · 情感计算、深度学习 · 历史评审质量 88分',
          avoid: '建议关注', avoidCls: 'warn', load: '3项（中）', selected: false, disabled: false,
          matchDetail: '语义相似度 78%（情感计算方向匹配）+ 图谱相似度 85%（4篇合著关联论文）+ 历史质量 86%（意见充分率91%）',
          avoidDetail: '二度合著：王秀芳 → 同课题组（2022 ICCV 合作论文）→ 申请人导师陈教授。非强制回避，建议秘书处关注评审独立性。'
        },
        {
          id: 'liu', name: '刘宇航 副教授', av: '刘', avBg: '#0891b2', match: 85, tag: null, tagCls: '',
          dept: '人工智能学院 · 多模态学习、情感计算 · 历史评审质量 86分',
          avoid: '无冲突', avoidCls: 'green', load: '4项（中）', selected: false, disabled: false,
          matchDetail: '语义相似度 76% + 图谱相似度 88%（多模态融合子领域）+ 历史质量 84%（意见充分率93%）',
          avoidDetail: null
        },
        {
          id: 'li', name: '李明辉 教授', av: '李', avBg: '#dc2626', match: 71, tag: '强制回避', tagCls: 'danger',
          dept: '软件学院 · 软件工程',
          avoid: '导师-学生历史关系', avoidCls: 'danger', load: '—', selected: false, disabled: true,
          matchDetail: '语义相似度 45%（研究方向偏离）',
          avoidDetail: '直接回避：李明辉曾为申请人本科毕设指导教师（2022-2023）。'
        }
      ]
    },
    'PROJ-2026-0041': {
      title: '基于图神经网络的知识推理研究',
      applicant: '刘洋',
      mentor: '张教授',
      projType: '校级科研项目',
      submitted: '今天 08:40',
      aiScore: 48,
      risk: 'red',
      riskLabel: '红色预警',
      riskHint: '建议退件或补正',
      riskDesc: 'AI预审识别到材料完整性严重缺失，且存在高风险学术规范问题。在补齐材料并修正正文前，不建议进入评审流程。',
      academicSummary: 'Academic Agent 自检结论：综合得分 48 分（红色预警）。研究假设章节缺失；参考文献格式混乱（3处 GB/T 7714 不符合）；查重率 12.6%，存在段落重复风险。材料包缺少导师签字扫描件与技术路线图。',
      overallRisk: '整体风险等级为红色：材料不完整 + 学术规范高风险，建议退件并要求补齐材料后重新提交。',
      dimensions: [
        { id: 'material', label: '材料完整性', level: 'danger', count: 2, basis: '缺少导师签字确认扫描件、技术路线图附件；实验方案为空白模板未填写。', confidence: 0.98 },
        { id: 'logic', label: '逻辑一致性', level: 'danger', count: 1, basis: '第三章「研究假设」章节标题存在但正文为空，与摘要中「提出3项假设」矛盾。', confidence: 0.91 },
        { id: 'cite', label: '引用规范', level: 'warn', count: 3, basis: '参考文献 3 处格式不符合 GB/T 7714；2 篇近5年文献缺失 DOI。', confidence: 0.84 },
        { id: 'integrity', label: '学术诚信', level: 'warn', count: 1, basis: '查重率 12.6%，第2章与网络公开综述存在大段相似（相似度 78%）。', confidence: 0.88 }
      ],
      tags: [
        { text: '材料缺失 (2项)', cls: 'danger' },
        { text: '章节空缺 (1处)', cls: 'danger' },
        { text: '引用格式 (3处)', cls: 'warn' },
        { text: '查重偏高', cls: 'warn' }
      ],
      materials: [
        { name: '申请书正文', ok: true },
        { name: '导师签字确认', ok: false },
        { name: '技术路线图', ok: false },
        { name: '参考文献列表', ok: true },
        { name: '实验方案文件', ok: false },
        { name: '预算申请表', ok: false }
      ],
      rejectDraft: '同学您好：\n\n您提交的项目「基于图神经网络的知识推理研究」（PROJ-2026-0041）经秘书处预审未通过受理，原因如下：\n\n【材料缺失】\n· 导师签字确认扫描件（未上传）\n· 技术路线图（未上传）\n· 实验方案文件（空白模板，未填写）\n\n【正文问题】\n· 第三章「研究假设」章节内容空缺，与摘要描述矛盾\n· 参考文献 3 处格式不符合 GB/T 7714 规范\n\n请补齐上述材料并修正正文后重新提交。如有疑问请联系秘书处。\n\n学术委员会秘书处',
      experts: []
    }
  };

  var PROGRESS_PROJECTS = [
    {
      id: 'PROJ-2026-0045',
      title: '联邦学习框架下的数据隐私保护',
      tab: 'reviewing',
      phase: '专家评审中',
      deadline: addDays(3),
      experts: [
        { code: '专家 A', status: 'submitted', label: '已提交' },
        { code: '专家 B', status: 'submitted', label: '已提交' },
        { code: '专家 C', status: 'invited', label: '待接受评审邀请' }
      ],
      submitted: 2,
      total: 3,
      overdue: false
    },
    {
      id: 'PROJ-2026-0031',
      title: '多模态情感分析系统设计',
      tab: 'reviewing',
      phase: '专家评审中',
      deadline: addDays(5),
      experts: [
        { code: '专家 A', status: 'submitted', label: '已提交' },
        { code: '专家 B', status: 'invited', label: '待接受评审邀请' },
        { code: '专家 C', status: 'pending', label: '待评审' }
      ],
      submitted: 1,
      total: 3,
      overdue: false
    },
    {
      id: 'PROJ-2026-0087',
      title: '强化学习在机器人路径规划中的应用研究',
      tab: 'reviewing',
      phase: '专家评审中',
      deadline: addDays(1),
      experts: [
        { code: '专家 A', status: 'submitted', label: '已提交' },
        { code: '专家 B', status: 'submitted', label: '已提交' },
        { code: '专家 C', status: 'pending', label: '待评审' }
      ],
      submitted: 2,
      total: 3,
      overdue: false
    },
    {
      id: 'PROJ-2026-0063',
      title: '基于Transformer的中文医学文本理解',
      tab: 'defense',
      phase: '专家评审完成',
      deadline: null,
      experts: [
        { code: '专家 A', status: 'submitted', label: '已提交' },
        { code: '专家 B', status: 'submitted', label: '已提交' },
        { code: '专家 C', status: 'submitted', label: '已提交' }
      ],
      submitted: 3,
      total: 3,
      overdue: false
    },
    {
      id: 'PROJ-2026-0055',
      title: '智能合约形式化验证方法',
      tab: 'assign',
      phase: '等待专家接受邀请',
      deadline: addDays(10),
      experts: [
        { code: '专家 A', status: 'invited', label: '待接受评审邀请' },
        { code: '专家 B', status: 'invited', label: '待接受评审邀请' },
        { code: '专家 C', status: 'invited', label: '待接受评审邀请' }
      ],
      submitted: 0,
      total: 3,
      overdue: false
    },
    {
      id: 'PROJ-2026-0041',
      title: '基于图神经网络的知识推理研究',
      tab: 'overdue',
      phase: '评审超期',
      deadline: addDays(-2),
      experts: [
        { code: '专家 A', status: 'submitted', label: '已提交' },
        { code: '专家 B', status: 'pending', label: '待评审' },
        { code: '专家 C', status: 'pending', label: '待评审' }
      ],
      submitted: 1,
      total: 3,
      overdue: true,
      canProceed: false
    }
  ];

  var REMINDER_LOGS = [
    { time: '2026-03-15 09:00', proj: 'PROJ-2026-0045', type: 'auto', text: '系统自动催办：距截止 3 天，已向未完成评审任务的专家发送提醒（不暴露专家身份）' },
    { time: '2026-03-14 18:30', proj: 'PROJ-2026-0087', type: 'auto', text: '系统自动催办：距截止 2 天，已向 1 位未完成专家发送提醒' },
    { time: '2026-03-14 10:15', proj: 'PROJ-2026-0031', type: 'manual', text: '秘书处手动催办：已向未完成评审任务的专家发送标准模板通知' },
    { time: '2026-03-13 09:00', proj: 'PROJ-2026-0045', type: 'auto', text: '系统自动催办：距截止 5 天，预提醒已发送' }
  ];

  var _currentDetailId = 'PROJ-2026-0031';
  var _pendingRemindProjId = null;
  var _pendingOverdueProjId = null;
  var _reminderLogOpen = false;

  function addDays(n) {
    var d = new Date(2026, 2, 15);
    d.setDate(d.getDate() + n);
    return d;
  }

  function formatDate(d) {
    if (!d) return '—';
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function formatDateForInput(d) {
    return formatDate(d);
  }

  function parseInputDate(value) {
    if (!value) return null;
    var parts = value.split('-');
    if (parts.length !== 3) return null;
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function demoToday() {
    return new Date(2026, 2, 15);
  }

  function daysUntil(d) {
    if (!d) return null;
    var now = demoToday();
    return Math.ceil((d - now) / 86400000);
  }

  function findProgressProject(id) {
    for (var i = 0; i < PROGRESS_PROJECTS.length; i++) {
      if (PROGRESS_PROJECTS[i].id === id) return PROGRESS_PROJECTS[i];
    }
    return null;
  }

  function countProgressTabs() {
    var c = { reviewing: 0, defense: 0, assign: 0, overdue: 0 };
    PROGRESS_PROJECTS.forEach(function (p) {
      if (c[p.tab] != null) c[p.tab]++;
    });
    return c;
  }

  function renderProgressTabs(activeFilter) {
    var tabs = document.querySelector('#page-sec-progress .tabs[data-tab-group="sec-progress"]');
    if (!tabs) return activeFilter || 'reviewing';
    var c = countProgressTabs();
    if (!activeFilter) {
      var active = tabs.querySelector('.tab-item.active');
      activeFilter = active ? active.getAttribute('data-filter') : 'reviewing';
    }
    tabs.innerHTML =
      '<div class="tab-item' + (activeFilter === 'reviewing' ? ' active' : '') + '" data-filter="reviewing" onclick="activeTab(this)">专家评审中 (' + c.reviewing + ')</div>' +
      '<div class="tab-item' + (activeFilter === 'defense' ? ' active' : '') + '" data-filter="defense" onclick="activeTab(this)">待答辩 (' + c.defense + ')</div>' +
      '<div class="tab-item' + (activeFilter === 'assign' ? ' active' : '') + '" data-filter="assign" onclick="activeTab(this)">待分配 (' + c.assign + ')</div>' +
      '<div class="tab-item' + (activeFilter === 'overdue' ? ' active' : '') + '" data-filter="overdue" onclick="activeTab(this)">超期 (' + c.overdue + ')</div>';
    return activeFilter;
  }

  function refreshProgressView(activeFilter) {
    activeFilter = renderProgressTabs(activeFilter);
    renderProgressBoard(activeFilter);
  }

  function riskBadge(risk) {
    var map = { green: 'b-green', yellow: 'b-yellow', red: 'b-red' };
    var labels = { green: '绿色通过', yellow: '黄色预警', red: '红色预警' };
    return '<span class="badge ' + (map[risk] || 'b-done') + '">' + (labels[risk] || risk) + '</span>';
  }

  function projectListTab(p) {
    if (p.status === 'pending') return 'pending';
    if (p.status === 'accepted') return 'accepted';
    return p.status;
  }

  function intakeStatusLabel(p) {
    if (p.intakeResult === 'rejected') return '已退件';
    if (p.status === 'accepted') return p.risks || '已受理';
    if (p.status === 'reviewing') return '评审中';
    if (p.status === 'done') return '已完成';
    return p.risks || '—';
  }

  function reapplySecretaryTabFilter() {
    var tabs = document.querySelector('#page-secretary .tabs[data-tab-group="sec-desk"]');
    var active = tabs && tabs.querySelector('.tab-item.active');
    if (active && window.filterTab) {
      window.filterTab(active);
    }
  }

  function computeLiveMatchScore(expert, projId) {
    var seed = (projId || '').split('').reduce(function (s, c) { return s + c.charCodeAt(0); }, 0);
    var delta = (seed + expert.id.charCodeAt(0)) % 7 - 3;
    return Math.min(99, Math.max(40, expert.match + delta));
  }

  function getManualExpertColleges() {
    var seen = {};
    var list = [];
    MANUAL_EXPERT_POOL.forEach(function (e) {
      if (e.college && !seen[e.college]) {
        seen[e.college] = true;
        list.push(e.college);
      }
    });
    return list;
  }

  function filterManualExpertPool() {
    var q = (_manualExpertSearchQuery || '').trim().toLowerCase();
    var college = _manualExpertCollegeFilter;
    return MANUAL_EXPERT_POOL.filter(function (e) {
      if (college !== 'all' && e.college !== college) return false;
      if (!q) return true;
      var hay = (e.name + e.college + e.dept).toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  function renderManualCollegeFilters() {
    var box = document.getElementById('sec-manual-college-filters');
    if (!box) return;
    var colleges = getManualExpertColleges();
    var html = '<button type="button" class="sec-manual-college-btn' + (_manualExpertCollegeFilter === 'all' ? ' active' : '') + '" onclick="ARGP_SECRETARY.onManualExpertCollegeFilter(\'all\')">全部学院</button>';
    colleges.forEach(function (c) {
      html += '<button type="button" class="sec-manual-college-btn' + (_manualExpertCollegeFilter === c ? ' active' : '') + '" onclick="ARGP_SECRETARY.onManualExpertCollegeFilter(\'' + c + '\')">' + c + '</button>';
    });
    box.innerHTML = html;
  }

  function renderManualExpertRow(e) {
    var liveMatch = computeLiveMatchScore(e, _currentDetailId);
    var avoidCls = e.avoidCls === 'green' ? 'text-green' : (e.avoidCls === 'warn' ? 'text-warn' : 'text-danger');
    var matchCls = liveMatch >= 85 ? 'match-high' : 'match-mid';
    var d = getDetail();
    var already = d && d.experts && d.experts.some(function (x) { return x.id === e.id; });
    var btn = e.disabled || already
      ? '<button class="btn btn-sm btn-ghost" disabled>' + (already ? '已添加' : '不可选') + '</button>'
      : '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_SECRETARY.addManualExpert(\'' + e.id + '\')">添加</button>';
    return '<div class="sec-manual-result">' +
      '<div class="expert-av" style="background:' + e.avBg + ';width:36px;height:36px;font-size:13px;">' + e.av + '</div>' +
      '<div class="sec-manual-result-body">' +
        '<div class="sec-manual-result-hd">' +
          '<span style="font-weight:600;font-size:13px;">' + e.name + '</span>' +
          '<span class="sec-manual-match-badge ' + matchCls + '">匹配 ' + liveMatch + '%</span>' +
          '<span class="sec-manual-avoid-badge ' + avoidCls + '">' + e.avoid + '</span>' +
        '</div>' +
        '<div class="text-xs text-muted">' + e.college + ' · ' + e.dept + '</div>' +
        '<div class="text-xs text-muted" style="margin-top:2px;">负荷 ' + e.load + '</div>' +
        (e.avoidDetail ? '<div class="text-xs text-warn" style="margin-top:4px;">' + e.avoidDetail + '</div>' : '') +
      '</div>' + btn + '</div>';
  }

  function renderManualSearchResults() {
    var box = document.getElementById('sec-manual-expert-results');
    if (!box) return;
    var list = filterManualExpertPool();
    if (!list.length) {
      box.innerHTML = '<div class="sec-manual-empty text-xs text-muted">未找到匹配专家，请调整筛选或搜索条件</div>';
      return;
    }
    box.innerHTML = list.map(renderManualExpertRow).join('');
  }

  function onManualExpertSearch(value) {
    _manualExpertSearchQuery = value || '';
    renderManualSearchResults();
  }

  function onManualExpertCollegeFilter(college) {
    _manualExpertCollegeFilter = college || 'all';
    renderManualCollegeFilters();
    renderManualSearchResults();
  }

  function openManualExpertModal() {
    var proj = findSecretaryProject(_currentDetailId);
    if (proj && proj.status === 'pending' && !proj.intakeConfirmed) {
      if (typeof showToast === 'function') showToast('请先点击上方「确认受理」后再选择专家', 'warn');
      return;
    }
    _manualExpertCollegeFilter = 'all';
    _manualExpertSearchQuery = '';
    var input = document.getElementById('sec-manual-expert-input');
    if (input) input.value = '';
    renderManualCollegeFilters();
    renderManualSearchResults();
    var modal = document.getElementById('sec-manual-expert-modal');
    if (modal) modal.classList.add('open');
  }

  function closeManualExpertModal() {
    var modal = document.getElementById('sec-manual-expert-modal');
    if (modal) modal.classList.remove('open');
  }

  function addManualExpert(poolId) {
    var proj = findSecretaryProject(_currentDetailId);
    if (proj && proj.status === 'pending' && !proj.intakeConfirmed) {
      if (typeof showToast === 'function') showToast('请先点击上方「确认受理」后再添加专家', 'warn');
      return;
    }
    var pool = MANUAL_EXPERT_POOL.filter(function (e) { return e.id === poolId; })[0];
    var d = getDetail();
    if (!pool || !d || !d.experts) return;
    if (d.experts.some(function (e) { return e.id === poolId; })) {
      if (typeof showToast === 'function') showToast('该专家已在列表中', 'info');
      return;
    }
    var liveMatch = computeLiveMatchScore(pool, _currentDetailId);
    d.experts.push({
      id: pool.id,
      name: pool.name,
      av: pool.av,
      avBg: pool.avBg,
      match: liveMatch,
      tag: '手动添加',
      tagCls: 'ok',
      dept: pool.college + ' · ' + pool.dept,
      avoid: pool.avoid,
      avoidCls: pool.avoidCls,
      load: pool.load,
      selected: false,
      disabled: !!pool.disabled,
      matchDetail: '手动检索添加 · 即时匹配度 ' + liveMatch + '%（基于当前申请书语义相似度实时计算）',
      avoidDetail: pool.avoidDetail || null
    });
    var list = document.getElementById('sec-expert-list');
    if (list) list.innerHTML = renderExpertCards(d.experts);
    updateExpertCount();
    renderManualSearchResults();
    if (typeof showToast === 'function') showToast('已添加专家：' + pool.name, 'success');
  }

  function countByStatus() {
    var c = { all: SECRETARY_PROJECTS.length, pending: 0, accepted: 0, reviewing: 0, done: 0 };
    SECRETARY_PROJECTS.forEach(function (p) {
      if (c[p.status] != null) c[p.status]++;
    });
    return c;
  }

  function renderSecretaryListTabs() {
    var tabs = document.querySelector('#page-secretary .tabs[data-tab-group="sec-desk"]');
    if (!tabs) return;
    var c = countByStatus();
    tabs.innerHTML =
      '<div class="tab-item" data-filter="all" onclick="activeTab(this)">所有项目 (' + c.all + ')</div>' +
      '<div class="tab-item active" data-filter="pending" onclick="activeTab(this)">待受理 (' + c.pending + ')</div>' +
      '<div class="tab-item" data-filter="accepted" onclick="activeTab(this)">已受理 (' + c.accepted + ')</div>' +
      '<div class="tab-item" data-filter="reviewing" onclick="activeTab(this)">评审中 (' + c.reviewing + ')</div>' +
      '<div class="tab-item" data-filter="done" onclick="activeTab(this)">已完成 (' + c.done + ')</div>';
  }

  function findSecretaryProject(id) {
    for (var i = 0; i < SECRETARY_PROJECTS.length; i++) {
      if (SECRETARY_PROJECTS[i].id === id) return SECRETARY_PROJECTS[i];
    }
    return null;
  }

  function upsertPendingFromMentor(projId, meta) {
    var existing = findSecretaryProject(projId);
    if (existing) {
      if (existing.status === 'done') return;
      existing.status = 'pending';
      existing.highlight = true;
      existing.risk = existing.risk || 'green';
      existing.risks = '导师已签字 · 待受理';
      existing.material = '完整';
      existing.materialOk = true;
      existing.submitted = '今天';
      existing.intakeConfirmed = false;
      existing.expertsInvited = false;
      existing.intakeResult = null;
      return;
    }
    SECRETARY_PROJECTS.unshift({
      id: projId,
      title: meta.title || projId,
      type: meta.type || '—',
      applicant: meta.applicant || '—',
      grade: meta.grade || '—',
      status: 'pending',
      risk: 'green',
      risks: '导师已签字 · 待受理',
      material: '完整',
      materialOk: true,
      submitted: '今天',
      highlight: true,
      intakeConfirmed: false,
      expertsInvited: false,
      intakeResult: null
    });
    renderSecretaryListTabs();
  }

  function renderSecretaryListRows() {
    var tbody = document.getElementById('sec-desk-tbody');
    if (!tbody) return;
    if (!SECRETARY_PROJECTS.length) {
      tbody.innerHTML = '<tr class="tab-empty-row" data-tab-empty><td colspan="7" class="tab-empty-cell">该分类下暂无项目</td></tr>';
      return;
    }
    tbody.innerHTML = SECRETARY_PROJECTS.map(function (p) {
      var tab = projectListTab(p);
      var bg = p.highlight && p.status === 'pending' ? (p.risk === 'red' ? ' style="background:#fff5f5;"' : ' style="background:#fffbeb;"') : '';
      var matCls = p.materialOk ? 'text-green' : 'text-danger';
      var statusLbl = intakeStatusLabel(p);
      var statusCls = p.intakeResult === 'rejected' ? 'text-danger' : (p.status === 'accepted' ? 'text-primary' : '');
      var actions = '';
      if (p.status === 'pending') {
        actions += '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_SECRETARY.openDetail(\'' + p.id + '\')">' + (p.risk === 'red' ? '详情' : '受理详情') + '</button>';
        if (p.risk === 'red') {
          actions += '<button class="btn btn-sm btn-danger" type="button" title="退回至草稿，学生须重新走导师审核与受理流程" onclick="ARGP_SECRETARY.openRejectModal(\'' + p.id + '\')">退件</button>';
        }
      } else if (p.status === 'accepted') {
        actions = '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_SECRETARY.openDetail(\'' + p.id + '\')">' + (p.intakeResult === 'rejected' ? '查看' : '分配专家') + '</button>';
      } else if (p.status === 'reviewing') {
        actions = '<button class="btn btn-sm btn-secondary" type="button" onclick="showPage(\'sec-progress\')">进度</button>';
      } else {
        actions = '<button class="btn btn-sm btn-secondary" type="button">归档</button>';
      }
      return '<tr data-tab="' + tab + '"' + bg + '>' +
        '<td><div class="td-name" onclick="ARGP_SECRETARY.openDetail(\'' + p.id + '\')">' + p.title + '</div><div class="td-id">' + p.id + ' · ' + p.type + '</div></td>' +
        '<td>' + p.applicant + ' <span class="text-xs text-muted">' + p.grade + '</span></td>' +
        '<td>' + riskBadge(p.risk) + '</td>' +
        '<td class="text-xs ' + statusCls + '">' + statusLbl + '</td>' +
        '<td class="text-xs ' + matCls + '">' + p.material + '</td>' +
        '<td class="text-xs text-muted">' + p.submitted + '</td>' +
        '<td><div style="display:flex;gap:5px;flex-wrap:wrap;">' + actions + '</div></td></tr>';
    }).join('') +
      '<tr class="tab-empty-row" data-tab-empty style="display:none;"><td colspan="7" class="tab-empty-cell">该分类下暂无项目</td></tr>';
    reapplySecretaryTabFilter();
  }

  function renderSecretaryDesk() {
    renderSecretaryListTabs();
    renderSecretaryListRows();
    if (window.ARGP_APPEAL && window.ARGP_APPEAL.renderSecretaryDisputesSummary) {
      window.ARGP_APPEAL.renderSecretaryDisputesSummary();
    }
    if (window.ARGP_UI && window.ARGP_UI.initTabGroups) {
      var page = document.getElementById('page-secretary');
      if (page) window.ARGP_UI.initTabGroups(page);
    }
  }

  function renderRiskDimensions(dims) {
    return dims.map(function (d, i) {
      var lvlCls = d.level === 'danger' ? 'danger' : (d.level === 'warn' ? 'warn' : 'ok');
      return '<div class="sec-risk-dim">' +
        '<button type="button" class="sec-risk-dim-hd" onclick="ARGP_SECRETARY.toggleRiskDim(this)">' +
          '<span class="sec-risk-dim-lbl">' + d.label + (d.count ? ' (' + d.count + '处)' : '') + '</span>' +
          '<span class="sec-risk-dim-meta">' +
            '<span class="sec-risk-lvl is-' + lvlCls + '">' + (d.level === 'danger' ? '高风险' : (d.level === 'warn' ? '中风险' : '正常')) + '</span>' +
            '<span class="sec-risk-chevron">›</span></span></button>' +
        '<div class="sec-risk-dim-body">' +
          '<div class="sec-risk-basis">' + d.basis + '</div>' +
          '<div class="sec-risk-conf mono">置信度 confidence: ' + d.confidence.toFixed(2) + ' · Academic Agent</div>' +
        '</div></div>';
    }).join('') +
      '<div class="tab-empty-msg" data-tab-empty style="display:none;">该分类下暂无项目</div>';
  }

  function renderMaterials(materials, isRed) {
    return materials.map(function (m) {
      if (m.optional) {
        return '<div class="sec-mat-item"><span class="text-muted">—</span> ' + m.name + '</div>';
      }
      var icon = m.ok ? '<span class="text-green">✓</span>' : '<span class="text-danger">✗</span>';
      return '<div class="sec-mat-item">' + icon + ' ' + m.name + '</div>';
    }).join('');
  }

  function renderExpertCards(experts) {
    if (!experts.length) {
      return '<div class="text-xs text-muted" style="padding:12px;">红色预警项目需先补齐材料并通过预审后，方可分配专家。</div>';
    }
    return experts.map(function (e) {
      var cardCls = 'expert-card' + (e.selected ? ' expert-selected' : '') + (e.disabled ? ' is-disabled' : '');
      var tagHtml = e.tag ? '<span class="tag" style="background:' + (e.tagCls === 'ok' ? 'var(--success-bg);color:var(--success)' : 'var(--danger-bg);color:var(--danger)') + ';">' + e.tag + '</span>' : '';
      var avoidSpan = '<span class="' + (e.avoidCls === 'green' ? 'text-green' : (e.avoidCls === 'warn' ? 'text-warn' : 'text-danger')) + '">' + e.avoid + '</span>';
      var btn = e.disabled
        ? '<button class="btn btn-sm btn-ghost" disabled>不可选</button>'
        : '<button class="btn btn-sm ' + (e.selected ? 'btn-primary' : 'btn-secondary') + '" type="button" onclick="ARGP_SECRETARY.toggleExpert(this)">' + (e.selected ? '已选' : '选用') + '</button>';
      var expandHtml = '';
      if (e.matchDetail) {
        expandHtml += '<button type="button" class="sec-exp-link" onclick="ARGP_SECRETARY.toggleExpertPanel(this,\'match\')">查看匹配依据</button>' +
          '<div class="sec-exp-panel" data-panel="match">' + e.matchDetail + '</div>';
      }
      if (e.avoidDetail) {
        expandHtml += '<button type="button" class="sec-exp-link is-warn" onclick="ARGP_SECRETARY.toggleExpertPanel(this,\'avoid\')">回避检测详情</button>' +
          '<div class="sec-exp-panel is-warn" data-panel="avoid">' + e.avoidDetail + '</div>';
      } else if (e.avoidCls === 'danger' && e.avoidDetail !== null) {
        expandHtml += '<div class="text-xs text-danger" style="margin-top:4px;">' + (e.avoidDetail || '') + '</div>';
      }
      return '<div class="' + cardCls + '" data-expert="' + e.id + '">' +
        '<div class="expert-av" style="background:' + e.avBg + ';">' + e.av + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">' +
            '<span style="font-weight:600;font-size:13.5px;">' + e.name + '</span>' +
            '<span class="match-high">匹配度 ' + e.match + '%</span>' + tagHtml + '</div>' +
          '<div class="text-xs text-muted">' + e.dept + '</div>' +
          '<div class="text-xs" style="margin-top:4px;">回避检测：' + avoidSpan + ' · 当前负荷：' + e.load + '</div>' +
          expandHtml +
        '</div>' + btn + '</div>';
    }).join('');
  }

  function renderDetailPage(projId) {
    var d = SEC_DETAIL[projId] || SEC_DETAIL['PROJ-2026-0031'];
    _currentDetailId = projId;
    var page = document.getElementById('page-sec-detail');
    if (!page) return;
    var isRed = d.risk === 'red';
    var riskBg = isRed ? 'var(--danger-bg)' : 'var(--warn-bg)';
    var riskBorder = isRed ? '#fca5a5' : '#fcd34d';
    var riskColor = isRed ? 'var(--danger)' : 'var(--warn)';
    var riskIcon = isRed ? '!!' : '!';

    page.innerHTML =
      '<div class="breadcrumb">' +
        '<span class="bc-link" onclick="showPage(\'secretary\')">秘书受理台</span>' +
        '<span class="bc-sep">›</span><span>受理详情</span></div>' +
      '<div style="margin-bottom:18px;">' +
        '<div class="page-title">受理详情 · ' + d.title + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:5px;">' +
          '<span class="mono text-xs text-muted">' + projId + '</span>' + riskBadge(d.risk) +
        '</div></div>' +
      '<div class="detail-layout">' +
        '<div>' +
          '<div class="form-card">' +
            '<div class="form-section-title">AI 预审结果（Secretary Agent）' +
              '<span style="float:right;font-size:10px;color:var(--text-3);font-family:\'DM Mono\',monospace;font-weight:400;">AI 生成 · 仅供参考</span></div>' +
            '<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;">' +
              '<div style="text-align:center;padding:14px 16px;background:' + riskBg + ';border-radius:var(--radius-lg);min-width:96px;border:1px solid ' + riskBorder + ';">' +
                '<div style="font-size:28px;font-weight:700;color:' + riskColor + ';">' + riskIcon + '</div>' +
                '<div style="font-size:12.5px;font-weight:600;color:' + riskColor + ';">' + d.riskLabel + '</div>' +
                '<div style="font-size:11px;color:var(--text-3);margin-top:2px;">' + d.riskHint + '</div></div>' +
              '<div style="flex:1;">' +
                '<div style="font-size:13px;color:var(--text);line-height:1.7;margin-bottom:10px;">' + d.riskDesc + '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                  d.tags.map(function (t) {
                    var bg = t.cls === 'ok' ? 'var(--success-bg)' : (t.cls === 'danger' ? 'var(--danger-bg)' : 'var(--warn-bg)');
                    var fg = t.cls === 'ok' ? 'var(--success)' : (t.cls === 'danger' ? 'var(--danger)' : 'var(--warn)');
                    return '<span class="tag" style="background:' + bg + ';color:' + fg + ';">' + t.text + '</span>';
                  }).join('') +
                '</div></div></div>' +
            '<div class="sec-academic-card">' +
              '<div class="sec-academic-hd">Academic Agent · 内容质量摘要</div>' +
              '<p class="sec-academic-body">' + d.academicSummary + '</p></div>' +
            '<div class="sec-overall-risk">' +
              '<div class="sec-overall-risk-lbl">整体风险等级说明</div>' +
              '<p>' + d.overallRisk + '</p></div>' +
            '<div class="sec-risk-dims">' + renderRiskDimensions(d.dimensions) + '</div>' +
            '<div style="background:var(--bg-2);border-radius:var(--radius);padding:13px;border:1px solid var(--border-2);margin-top:14px;">' +
              '<div style="font-size:12.5px;font-weight:600;margin-bottom:8px;color:var(--ink-2);">材料完整性检查</div>' +
              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:12.5px;">' +
                renderMaterials(d.materials, isRed) +
              '</div></div></div>' +
          renderIntakeActionBar(projId, isRed) +
          renderExpertSection(d, findSecretaryProject(projId), isRed) +
          '<div class="btn-group" style="border-top:none;padding-top:0;margin-top:14px;">' +
            '<button class="btn btn-ghost" type="button" onclick="showPage(\'secretary\')">返回列表</button>' +
          '</div></div>' +
        '<div>' +
          '<div class="meta-card">' +
            '<div class="meta-title">项目信息</div>' +
            '<div class="meta-row"><span class="meta-k">申请人</span><span class="meta-v">' + d.applicant + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">申报类型</span><span class="meta-v text-xs">' + d.projType + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">导师</span><span class="meta-v">' + d.mentor + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">提交时间</span><span class="meta-v text-xs">' + d.submitted + '</span></div>' +
            '<div class="meta-row"><span class="meta-k">AI质量分</span><span class="meta-v mono ' + (isRed ? 'text-danger' : 'text-warn') + '">' + d.aiScore + '分</span></div></div>' +
          '<div class="meta-card">' +
            '<div class="meta-title">风险维度速览 <span style="float:right;font-size:10px;color:var(--text-3);font-family:\'DM Mono\',monospace;font-weight:400;">AI 生成</span></div>' +
            renderRiskDimensions(d.dimensions.slice(0, 3)) +
          '</div></div></div>';
    updateExpertCount();
  }

  function renderIntakeActionBar(projId, isRed) {
    var proj = findSecretaryProject(projId);
    if (!proj || proj.status !== 'pending') {
      if (proj && proj.status === 'accepted') {
        var lbl = proj.intakeResult === 'rejected' ? '已退件' : intakeStatusLabel(proj);
        var cls = proj.intakeResult === 'rejected' ? 'var(--danger-bg)' : 'var(--success-bg)';
        return '<div class="form-card" style="margin-bottom:14px;padding:14px 16px;background:' + cls + ';">' +
          '<div class="form-section-title" style="margin-bottom:6px;">受理状态</div>' +
          '<div class="text-sm" style="font-weight:500;">' + lbl + '</div></div>';
      }
      return '';
    }
    var confirmedNote = proj.intakeConfirmed
      ? '<span class="text-xs text-green" style="margin-left:8px;">✓ 已确认受理，请选用专家</span>'
      : '';
    return '<div class="form-card sec-intake-actions" style="margin-bottom:14px;">' +
      '<div class="form-section-title">受理操作' + confirmedNote + '</div>' +
      '<div class="btn-group" style="border-top:none;padding-top:0;margin:0;">' +
        (!isRed ? '<button class="btn btn-primary" type="button"' + (proj.intakeConfirmed ? ' disabled' : '') + ' onclick="ARGP_SECRETARY.confirmIntakeAccept()">确认受理</button>' : '') +
        '<button class="btn ' + (isRed ? 'btn-danger' : 'btn-secondary') + '" type="button" title="退回至草稿，学生须重新走导师审核与受理流程" onclick="ARGP_SECRETARY.openRejectModal(\'' + projId + '\')">退件</button>' +
      '</div></div>';
  }

  function renderExpertSection(d, proj, isRed) {
    if (proj && proj.status === 'accepted' && proj.intakeResult === 'rejected') return '';
    if (!d.experts.length) return '';
    var locked = proj && proj.status === 'pending' && !proj.intakeConfirmed;
    var lockedAttr = locked ? ' style="opacity:0.55;pointer-events:none;"' : '';
    var canFinalize = !!(proj && proj.status === 'pending' && proj.intakeConfirmed && proj.expertsInvited && proj.intakeResult !== 'rejected');
    var finalizeHint = '请先确认受理，再选用专家并发送邀请';
    if (proj && proj.intakeConfirmed && !proj.expertsInvited) finalizeHint = '请选用 3 位专家并点击「确认专家并发起评审」发送邀请';
    else if (canFinalize) finalizeHint = '专家邀请已发送，可完成受理归档至「已受理」列表';

    return '<div class="form-card">' +
      '<div class="form-section-title">AI 专家匹配与选用' +
        '<span style="float:right;font-size:10px;color:var(--text-3);font-family:\'DM Mono\',monospace;font-weight:400;">AI 生成 · 仅供参考</span></div>' +
      (locked ? '<div class="text-xs text-warn" style="margin-bottom:12px;padding:8px 10px;background:var(--warn-bg);border-radius:var(--radius);">请先点击上方「确认受理」后再选用专家</div>' : '') +
      '<div style="font-size:12.5px;color:var(--text-2);margin-bottom:14px;">推荐依据：研究方向匹配度 · 历史评审质量 · 当前工作负荷 · 回避关系分析</div>' +
      '<div id="sec-expert-list"' + lockedAttr + '>' + renderExpertCards(d.experts) + '</div>' +
      '<div style="margin-top:10px;"' + lockedAttr + '>' +
        '<button class="btn btn-sm btn-secondary sec-manual-pick-btn" type="button" onclick="ARGP_SECRETARY.openManualExpertModal()">+ 手动选择专家</button>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border-2);margin-top:12px;"' + lockedAttr + '>' +
        '<span class="text-xs text-muted" id="expert-count">已选 1/3 位专家</span>' +
        '<button class="btn btn-primary btn-sm" type="button" onclick="ARGP_SECRETARY.openExpertConfirmModal()">确认专家并发起评审</button>' +
      '</div>' +
      (proj && proj.status === 'pending' ? (
      '<div class="sec-finalize-bar" style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border-2);">' +
        '<div class="text-xs text-muted" style="margin-bottom:10px;" id="sec-finalize-hint">' + finalizeHint + '</div>' +
        '<button class="btn btn-primary" type="button" id="sec-finalize-btn"' + (canFinalize ? '' : ' disabled') + ' onclick="ARGP_SECRETARY.finalizeIntake()">确认完成受理</button>' +
      '</div>'
      ) : '') +
    '</div>';
  }

  function deadlineBadge(days, overdue, deadline) {
    var badge;
    if (overdue || days < 0) badge = '<span class="badge b-red">已超期 ' + Math.abs(days) + ' 天</span>';
    else if (days <= 1) badge = '<span class="badge b-red">剩余 ' + days + ' 天</span>';
    else if (days <= 3) badge = '<span class="badge b-yellow">剩余 ' + days + ' 天</span>';
    else badge = '<span class="badge b-done">剩余 ' + days + ' 天</span>';
    return '<div class="sec-deadline-wrap">' + badge +
      '<span class="sec-deadline-date mono">截止 ' + formatDate(deadline) + '</span></div>';
  }

  function expertStatusTag(st) {
    var map = { submitted: 'b-green', pending: 'b-yellow', invited: 'b-blue', declined: 'b-red' };
    return map[st] || 'b-done';
  }

  function renderProgressBoard(filter) {
    var panel = document.getElementById('sec-progress-board');
    if (!panel) return;
    filter = filter || 'reviewing';
    panel.innerHTML = PROGRESS_PROJECTS.map(function (p) {
      var days = p.deadline ? daysUntil(p.deadline) : null;
      var pct = p.total ? Math.round((p.submitted / p.total) * 100) : 0;
      var barColor = p.overdue ? '#dc2626' : (days != null && days <= 3 ? 'var(--warn)' : 'var(--primary)');
      var expertsHtml = p.experts.length
        ? '<div class="sec-prog-experts">' + p.experts.map(function (e) {
            return '<span class="sec-prog-exp"><span class="mono">' + e.code + '</span> <span class="badge ' + expertStatusTag(e.status) + '">' + e.label + '</span></span>';
          }).join('') + '</div>'
        : '<div class="text-xs text-muted">尚未分配专家</div>';
      var actions = '';
      if (p.tab === 'assign') {
        actions = '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_SECRETARY.openDetail(\'PROJ-2026-0055\')">分配专家</button>';
      } else if (p.tab === 'defense') {
        actions = '<button class="btn btn-sm btn-success" type="button" onclick="showPage(\'defense-list\')">进入答辩</button>';
      } else {
        actions = '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_SECRETARY.openRemindModal(\'' + p.id + '\')">手动催办</button>';
        if (p.overdue) {
          actions += '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_SECRETARY.openOverdueModal(\'' + p.id + '\')">超期处理</button>';
        }
      }
      return '<div class="sec-prog-group" data-tab="' + p.tab + '">' +
        '<div class="sec-prog-group-hd">' +
          '<div><div class="sec-prog-title">' + p.title + '</div>' +
            '<div class="td-id">' + p.id + ' · ' + p.phase + '</div></div>' +
          (days != null ? deadlineBadge(days, p.overdue, p.deadline) : '<span class="badge b-green">全部完成</span>') +
        '</div>' +
        expertsHtml +
        '<div class="sec-prog-bar-row">' +
          '<div style="flex:1;"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;"><span class="text-muted">评审进度</span><span class="mono">' + p.submitted + '/' + p.total + '</span></div>' +
            '<div class="prog-wrap"><div class="prog-fill" style="width:' + pct + '%;background:' + barColor + ';"></div></div></div>' +
          '<div class="sec-prog-actions">' + actions + '</div></div></div>';
    }).join('');
  }

  function renderReminderLogs() {
    var el = document.getElementById('sec-reminder-log');
    if (!el) return;
    el.innerHTML = REMINDER_LOGS.map(function (log) {
      return '<div class="sec-remind-item">' +
        '<span class="mono text-xs text-muted">' + log.time + '</span>' +
        '<span class="sec-remind-tag ' + (log.type === 'auto' ? 'is-auto' : 'is-manual') + '">' + (log.type === 'auto' ? '自动' : '手动') + '</span>' +
        '<span class="mono text-xs">' + log.proj + '</span>' +
        '<span class="sec-remind-text">' + log.text + '</span></div>';
    }).join('');
    var countEl = document.getElementById('sec-remind-count');
    if (countEl) countEl.textContent = REMINDER_LOGS.length + ' 条记录';
    updateReminderLogPanel();
  }

  function updateReminderLogPanel() {
    var panel = document.getElementById('sec-remind-panel');
    var body = document.getElementById('sec-reminder-log-wrap');
    var chevron = document.getElementById('sec-remind-chevron');
    if (panel) panel.classList.toggle('is-open', _reminderLogOpen);
    if (body) body.style.display = _reminderLogOpen ? '' : 'none';
    if (chevron) chevron.textContent = '›';
  }

  function toggleReminderLog() {
    _reminderLogOpen = !_reminderLogOpen;
    updateReminderLogPanel();
  }

  function getAvoidanceCount() {
    return AVOIDANCE_REQUESTS.length;
  }

  function renderAvoidanceDisputeList() {
    if (!AVOIDANCE_REQUESTS.length) return '';
    return AVOIDANCE_REQUESTS.map(function (r) {
      return '<div class="sec-avoid-item">' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-weight:600;font-size:13.5px;margin-bottom:4px;">' + r.projId + ' · ' + (r.fields || '—') + '</div>' +
          '<div class="text-xs text-muted" style="margin-bottom:6px;">冲突类型：' + r.conflictLabel + ' · ' + r.time + '</div>' +
          '<div class="text-xs" style="line-height:1.55;color:var(--text-2);">' + r.supplement + '</div></div>' +
        '<div style="display:flex;gap:6px;flex-shrink:0;flex-direction:column;">' +
          '<button class="btn btn-sm btn-primary" type="button" onclick="ARGP_SECRETARY.approveAvoidance(\'' + r.id + '\')">确认回避</button>' +
          '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_SECRETARY.dismissAvoidance(\'' + r.id + '\')">驳回</button></div></div>';
    }).join('');
  }

  function renderAvoidancePanel() {
    var el = document.getElementById('sec-avoidance-wrap');
    if (!el) return;
    if (!AVOIDANCE_REQUESTS.length) {
      el.innerHTML = '';
      return;
    }
    el.innerHTML =
      '<div class="panel" style="margin-bottom:14px;">' +
        '<div class="panel-hd">' +
          '<div class="panel-title">专家回避申请 · 待秘书处审核</div>' +
          '<span class="panel-count">' + AVOIDANCE_REQUESTS.length + ' 项</span></div>' +
        '<div style="padding:12px 16px;">' +
          AVOIDANCE_REQUESTS.map(function (r) {
            return '<div class="sec-avoid-item">' +
              '<div style="flex:1;min-width:0;">' +
                '<div style="font-weight:600;font-size:13.5px;margin-bottom:4px;">' + r.projId + ' · ' + (r.fields || '—') + '</div>' +
                '<div class="text-xs text-muted" style="margin-bottom:6px;">冲突类型：' + r.conflictLabel + ' · ' + r.time + '</div>' +
                '<div class="text-xs" style="line-height:1.55;color:var(--text-2);">' + r.supplement + '</div></div>' +
              '<div style="display:flex;gap:6px;flex-shrink:0;">' +
                '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_SECRETARY.approveAvoidance(\'' + r.id + '\')">确认回避</button>' +
                '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_SECRETARY.dismissAvoidance(\'' + r.id + '\')">驳回</button></div></div>';
          }).join('') +
        '</div></div>';
  }

  function registerAvoidanceRequest(req) {
    AVOIDANCE_REQUESTS.push({
      id: 'AVD-' + Date.now(),
      projId: req.projId,
      conflictType: req.conflictType,
      conflictLabel: req.conflictLabel,
      supplement: req.supplement,
      fields: req.fields || '',
      time: '刚刚',
      status: 'pending'
    });
    renderAvoidancePanel();
    if (window.ARGP_APPEAL && window.ARGP_APPEAL.refreshAllDisputeViews) {
      window.ARGP_APPEAL.refreshAllDisputeViews();
    }
  }

  function approveAvoidance(id) {
    AVOIDANCE_REQUESTS = AVOIDANCE_REQUESTS.filter(function (r) { return r.id !== id; });
    renderAvoidancePanel();
    if (window.ARGP_APPEAL && window.ARGP_APPEAL.refreshAllDisputeViews) {
      window.ARGP_APPEAL.refreshAllDisputeViews();
    }
    if (typeof showToast === 'function') showToast('已确认回避，将重新分配评审专家', 'success');
  }

  function dismissAvoidance(id) {
    AVOIDANCE_REQUESTS = AVOIDANCE_REQUESTS.filter(function (r) { return r.id !== id; });
    renderAvoidancePanel();
    if (window.ARGP_APPEAL && window.ARGP_APPEAL.refreshAllDisputeViews) {
      window.ARGP_APPEAL.refreshAllDisputeViews();
    }
    if (typeof showToast === 'function') showToast('已驳回回避申请，专家可继续评审', 'info');
  }

  function renderProgressPage() {
    renderProgressTabs('reviewing');
    renderAvoidancePanel();
    if (window.ARGP_APPEAL) {
      if (window.ARGP_APPEAL.renderSecretaryAppealsPanel) window.ARGP_APPEAL.renderSecretaryAppealsPanel();
      if (window.ARGP_APPEAL.renderSecretaryObjectionsPanel) window.ARGP_APPEAL.renderSecretaryObjectionsPanel();
    }
    renderProgressBoard('reviewing');
    renderReminderLogs();
    if (window.ARGP_UI && window.ARGP_UI.initTabGroups) {
      var page = document.getElementById('page-sec-progress');
      if (page) window.ARGP_UI.initTabGroups(page);
    }
  }

  function onProgressTabFilter(el) {
    if (!el) return;
    renderProgressBoard(el.getAttribute('data-filter') || 'reviewing');
  }

  function openDetail(projId) {
    _currentDetailId = projId;
    if (typeof showPage === 'function') showPage('sec-detail');
    renderDetailPage(projId);
  }

  function toggleRiskDim(btn) {
    var dim = btn.closest('.sec-risk-dim');
    if (dim) dim.classList.toggle('open');
  }

  function toggleExpertPanel(btn, type) {
    var panel = btn.nextElementSibling;
    if (panel && panel.classList.contains('sec-exp-panel')) {
      panel.classList.toggle('open');
      btn.classList.toggle('open');
    }
  }

  function toggleExpert(btn) {
    var proj = findSecretaryProject(_currentDetailId);
    if (proj && proj.status === 'pending' && !proj.intakeConfirmed) {
      if (typeof showToast === 'function') showToast('请先点击上方「确认受理」后再选用专家', 'warn');
      return;
    }
    var card = btn.closest('.expert-card');
    if (!card || card.classList.contains('is-disabled')) return;
    var selected = card.classList.toggle('expert-selected');
    btn.className = 'btn btn-sm ' + (selected ? 'btn-primary' : 'btn-secondary');
    btn.textContent = selected ? '已选' : '选用';
    updateExpertCount();
  }

  function updateExpertCount() {
    var n = document.querySelectorAll('#sec-expert-list .expert-card.expert-selected').length;
    var el = document.getElementById('expert-count');
    if (el) el.textContent = '已选 ' + n + '/3 位专家';
  }

  function getDetail() {
    return SEC_DETAIL[_currentDetailId] || SEC_DETAIL['PROJ-2026-0031'];
  }

  function openRejectModal(projId) {
    if (projId) _currentDetailId = projId;
    var d = getDetail();
    var modal = document.getElementById('sec-reject-modal');
    var ta = document.getElementById('sec-reject-draft');
    if (ta) ta.value = d.rejectDraft || '';
    if (modal) modal.classList.add('open');
  }

  function closeRejectModal() {
    var modal = document.getElementById('sec-reject-modal');
    if (modal) modal.classList.remove('open');
  }

  function refreshFinalizeBar() {
    var proj = findSecretaryProject(_currentDetailId);
    var btn = document.getElementById('sec-finalize-btn');
    var hint = document.getElementById('sec-finalize-hint');
    if (!btn || !hint || !proj || proj.status !== 'pending') return;
    var canFinalize = !!(proj.intakeConfirmed && proj.expertsInvited && proj.intakeResult !== 'rejected');
    btn.disabled = !canFinalize;
    if (canFinalize) hint.textContent = '专家邀请已发送，可完成受理归档至「已受理」列表';
    else if (proj.intakeConfirmed && !proj.expertsInvited) hint.textContent = '请选用 3 位专家并点击「确认专家并发起评审」发送邀请';
    else hint.textContent = '请先确认受理，再选用专家并发送邀请';
  }

  function confirmIntakeAccept() {
    var proj = findSecretaryProject(_currentDetailId);
    if (!proj || proj.status !== 'pending') return;
    var d = getDetail();
    if (d.risk === 'red') {
      if (typeof showToast === 'function') showToast('红色预警项目请使用退件流程', 'warn');
      return;
    }
    proj.intakeConfirmed = true;
    if (typeof showToast === 'function') showToast('已确认受理，请选用专家并发送邀请', 'success');
    renderDetailPage(_currentDetailId);
  }

  function finalizeIntake() {
    var proj = findSecretaryProject(_currentDetailId);
    if (!proj || proj.status !== 'pending' || !proj.intakeConfirmed || !proj.expertsInvited) {
      if (typeof showToast === 'function') showToast('请先确认受理并发送专家邀请', 'warn');
      return;
    }
    proj.status = 'accepted';
    proj.intakeResult = 'approved';
    proj.highlight = false;
    proj.risks = '专家已邀请 · 待接受';
    if (window.ARGP_MOCK && window.ARGP_MOCK.syncAfterSecretaryIntake) {
      window.ARGP_MOCK.syncAfterSecretaryIntake(_currentDetailId);
    }
    renderSecretaryListTabs();
    if (typeof showToast === 'function') showToast('受理完成，项目已归档至「已受理」', 'success');
    setTimeout(function () { showPage('secretary'); renderSecretaryDesk(); }, 1000);
  }

  function sendRejectNotice() {
    var proj = findSecretaryProject(_currentDetailId);
    var ta = document.getElementById('sec-reject-draft');
    var body = ta ? ta.value.trim() : '';
    var d = getDetail();
    if (proj) {
      proj.status = 'accepted';
      proj.intakeResult = 'rejected';
      proj.highlight = false;
      proj.risks = '已退件';
    }
    if (window.ARGP_MOCK && window.ARGP_MOCK.syncAfterSecretaryReject) {
      window.ARGP_MOCK.syncAfterSecretaryReject(_currentDetailId, body);
    }
    if (window.ARGP_MESSAGES && window.ARGP_MESSAGES.pushSecretaryRejectNotice) {
      window.ARGP_MESSAGES.pushSecretaryRejectNotice(
        _currentDetailId,
        d.title || (proj ? proj.title : _currentDetailId),
        body
      );
    }
    closeRejectModal();
    if (typeof showToast === 'function') showToast('退件通知已发送至申请人（' + _currentDetailId + '）', 'warn');
    setTimeout(function () { showPage('secretary'); renderSecretaryDesk(); }, 1000);
  }

  function openExpertConfirmModal() {
    var proj = findSecretaryProject(_currentDetailId);
    if (proj && proj.status === 'pending' && !proj.intakeConfirmed) {
      if (typeof showToast === 'function') showToast('请先点击上方「确认受理」后再选用专家', 'warn');
      return;
    }
    var n = document.querySelectorAll('#sec-expert-list .expert-card.expert-selected').length;
    if (n < 3) {
      if (typeof showToast === 'function') showToast('请选择 3 位专家（当前已选 ' + n + ' 位）', 'warn');
      return;
    }
    var names = [];
    document.querySelectorAll('#sec-expert-list .expert-card.expert-selected').forEach(function (c) {
      var nm = c.querySelector('[style*="font-weight:600"]');
      if (nm) names.push(nm.textContent.trim());
    });
    var preview = document.getElementById('sec-invite-preview');
    if (preview) {
      preview.value = '尊敬的评审专家：\n\n您好！学术委员会邀请您参与以下项目的线上评审：\n\n项目：' + getDetail().title + '（' + _currentDetailId + '）\n评审截止：2026-03-22\n\n评审材料已通过平台发送，请在截止日前提交评审意见。评审过程严格保密，请勿与申请人或导师讨论评审内容。\n\n感谢您的支持！\n\n学术委员会秘书处\n2026-03-15';
    }
    var modal = document.getElementById('sec-invite-modal');
    if (modal) modal.classList.add('open');
  }

  function closeExpertConfirmModal() {
    var modal = document.getElementById('sec-invite-modal');
    if (modal) modal.classList.remove('open');
  }

  function sendExpertInvites() {
    var proj = findSecretaryProject(_currentDetailId);
    if (proj && proj.status === 'pending') {
      proj.expertsInvited = true;
    }
    closeExpertConfirmModal();
    if (typeof showToast === 'function') showToast('评审邀请已发送至 3 位专家', 'success');
    refreshFinalizeBar();
  }

  function confirmIntake() {
    confirmIntakeAccept();
  }

  function quickAccept(id) {
    var proj = findSecretaryProject(id);
    if (proj) {
      proj.status = 'accepted';
      proj.highlight = false;
      proj.risks = '待分配专家';
    }
    renderSecretaryListTabs();
    if (typeof showToast === 'function') showToast('已一键受理 ' + id + '，请分配评审专家', 'success');
    setTimeout(function () { openDetail(id); }, 800);
  }

  function openRemindModal(projId) {
    _pendingRemindProjId = projId;
    var modal = document.getElementById('sec-remind-modal');
    var body = document.getElementById('sec-remind-body');
    if (body) {
      body.textContent = '将向「' + projId + '」项目中尚未完成评审任务的专家发送标准催办通知。通知内容不包含专家身份信息，申请方不可见。确认发送？';
    }
    if (modal) modal.classList.add('open');
  }

  function closeRemindModal() {
    var modal = document.getElementById('sec-remind-modal');
    if (modal) modal.classList.remove('open');
    _pendingRemindProjId = null;
  }

  function confirmRemind() {
    var id = _pendingRemindProjId;
    closeRemindModal();
    REMINDER_LOGS.unshift({
      time: '2026-03-15 ' + String(new Date().getHours()).padStart(2, '0') + ':' + String(new Date().getMinutes()).padStart(2, '0'),
      proj: id,
      type: 'manual',
      text: '秘书处手动催办：已向未完成评审任务的专家发送标准模板通知（不暴露专家身份）'
    });
    renderReminderLogs();
    if (typeof showToast === 'function') showToast('催办通知已发送', 'success');
  }

  function openOverdueModal(projId) {
    _pendingOverdueProjId = projId;
    var p = findProgressProject(projId);
    var proceedBtn = document.getElementById('sec-overdue-proceed');
    if (proceedBtn) {
      proceedBtn.disabled = !(p && p.submitted >= Math.ceil(p.total / 2));
      proceedBtn.title = proceedBtn.disabled ? '需半数以上专家已提交方可推进' : '';
    }
    var desc = document.getElementById('sec-overdue-desc');
    if (desc && p) {
      desc.textContent = '该项目已超过评审截止日期（原截止 ' + formatDate(p.deadline) + '）。请重设截止日期或选择其他处理方式。';
    }
    var dateInput = document.getElementById('sec-overdue-date');
    if (dateInput) {
      var minDate = addDays(1);
      dateInput.min = formatDateForInput(minDate);
      var defaultDate = addDays(7);
      if (p && p.deadline && p.deadline > demoToday()) {
        defaultDate = p.deadline;
      }
      if (defaultDate <= demoToday()) defaultDate = minDate;
      dateInput.value = formatDateForInput(defaultDate);
    }
    var modal = document.getElementById('sec-overdue-modal');
    if (modal) modal.classList.add('open');
  }

  function closeOverdueModal() {
    var modal = document.getElementById('sec-overdue-modal');
    if (modal) modal.classList.remove('open');
    _pendingOverdueProjId = null;
  }

  function confirmOverdueExtend() {
    var id = _pendingOverdueProjId;
    if (!id) return;
    var dateInput = document.getElementById('sec-overdue-date');
    if (!dateInput || !dateInput.value) {
      if (typeof showToast === 'function') showToast('请选择新的截止日期', 'warn');
      return;
    }
    var newDate = parseInputDate(dateInput.value);
    if (!newDate) {
      if (typeof showToast === 'function') showToast('日期格式无效', 'warn');
      return;
    }
    var today = demoToday();
    if (newDate <= today) {
      if (typeof showToast === 'function') showToast('新截止日期须晚于今日', 'warn');
      return;
    }
    var p = findProgressProject(id);
    if (p) {
      p.deadline = newDate;
      var days = daysUntil(newDate);
      p.overdue = days < 0;
      if (!p.overdue) {
        p.tab = 'reviewing';
        if (p.phase === '评审超期') p.phase = '专家评审中';
      }
    }
    REMINDER_LOGS.unshift({
      time: '2026-03-15 ' + String(new Date().getHours()).padStart(2, '0') + ':' + String(new Date().getMinutes()).padStart(2, '0'),
      proj: id,
      type: 'manual',
      text: '秘书处延期处理：评审截止日已重设为 ' + formatDate(newDate) + '，已向相关专家发送更新通知'
    });
    var activeFilter = p && p.overdue ? 'overdue' : 'reviewing';
    closeOverdueModal();
    refreshProgressView(activeFilter);
    renderReminderLogs();
    if (typeof showToast === 'function') showToast('已延期至 ' + formatDate(newDate) + '，专家将收到更新通知', 'success');
  }

  function confirmOverdueProceed() {
    closeOverdueModal();
    if (typeof showToast === 'function') showToast('已以现有 ' + _pendingOverdueProjId + ' 评审意见推进至下一环节', 'success');
  }

  window.ARGP_SECRETARY = {
    renderSecretaryDesk: renderSecretaryDesk,
    renderSecretaryListRows: renderSecretaryListRows,
    renderDetailPage: renderDetailPage,
    renderProgressPage: renderProgressPage,
    onProgressTabFilter: onProgressTabFilter,
    openDetail: openDetail,
    toggleRiskDim: toggleRiskDim,
    toggleExpertPanel: toggleExpertPanel,
    toggleExpert: toggleExpert,
    openRejectModal: openRejectModal,
    closeRejectModal: closeRejectModal,
    sendRejectNotice: sendRejectNotice,
    openExpertConfirmModal: openExpertConfirmModal,
    closeExpertConfirmModal: closeExpertConfirmModal,
    sendExpertInvites: sendExpertInvites,
    confirmIntake: confirmIntake,
    confirmIntakeAccept: confirmIntakeAccept,
    finalizeIntake: finalizeIntake,
    onManualExpertSearch: onManualExpertSearch,
    onManualExpertCollegeFilter: onManualExpertCollegeFilter,
    openManualExpertModal: openManualExpertModal,
    closeManualExpertModal: closeManualExpertModal,
    addManualExpert: addManualExpert,
    quickAccept: quickAccept,
    openRemindModal: openRemindModal,
    closeRemindModal: closeRemindModal,
    confirmRemind: confirmRemind,
    openOverdueModal: openOverdueModal,
    closeOverdueModal: closeOverdueModal,
    confirmOverdueExtend: confirmOverdueExtend,
    confirmOverdueProceed: confirmOverdueProceed,
    toggleReminderLog: toggleReminderLog,
    registerAvoidanceRequest: registerAvoidanceRequest,
    renderAvoidancePanel: renderAvoidancePanel,
    renderAvoidanceDisputeList: renderAvoidanceDisputeList,
    getAvoidanceCount: getAvoidanceCount,
    approveAvoidance: approveAvoidance,
    dismissAvoidance: dismissAvoidance,
    upsertPendingFromMentor: upsertPendingFromMentor,
    findSecretaryProject: findSecretaryProject
  };
})();

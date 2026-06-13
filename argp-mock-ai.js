/* ARGP Demo — 学生 AI 助手 Mock 数据 */
(function () {
  var DEFAULT_PROJ = 'PROJ-2026-0087';

  var QUALITY_REPORTS = {
    'PROJ-2026-0087': {
      title: '强化学习在机器人路径规划中的应用研究',
      total: 82,
      summary: '整体质量良好，存在2处中等风险问题需要关注：第3章研究假设与绪论背景存在潜在逻辑矛盾；参考文献部分存在1处格式不规范。已通过学术诚信检测，无重复率风险。建议修改后提交。',
      checkedAt: '2026-03-14 16:42',
      redCount: 1,
      yellowCount: 2,
      greenCount: 2,
      dims: [
        { name: '学术质量', val: 82, cls: 'sv-gold' },
        { name: '创新性', val: 75, cls: 'sv-gold' },
        { name: '逻辑一致性', val: 78, cls: 'sv-gold' },
        { name: '引用规范', val: 90, cls: 'sv-green' },
        { name: '格式规范', val: 95, cls: 'sv-green' }
      ],
      issues: [
        {
          id: 'iss-ref12',
          level: 'red',
          title: '【学术诚信】参考文献 [12] 疑似不当引用，需人工核实',
          desc: '系统检测到参考文献 [12] 与已有成果高度相似（相似度 89%），存在不当引用风险。提交前须确认引用来源并知悉风险。',
          actions: ['定位原文'],
          locateSection: 'bg',
          detail: {
            method: '引用溯源 Agent 对参考文献条目进行语义向量比对，并交叉验证 OpenAlex / CrossRef 元数据与正文引用上下文的一致性。',
            evidence: '参考文献 [12] 与 Zhang et al. (2021) 预印本 arXiv:2103.xxxxx 摘要及方法段重合相似度 89%；正文第 2 章第 3 段未标注直接引述出处。',
            confidence: '87%',
            limitations: '无法访问部分付费数据库全文；相似度阈值基于段落级匹配，逐句人工核对仍必要。'
          }
        },
        {
          id: 'iss-logic',
          level: 'yellow',
          title: '【逻辑一致性】第3章研究假设与绪论存在潜在矛盾',
          desc: '绪论第2段提出"现有深度学习方法在动态环境中表现优秀"，而第3章假设H2却指出"现有方法无法处理动态障碍物"。建议统一表述立场。',
          actions: ['定位原文'],
          locateSection: 'goal',
          detail: {
            method: 'ConsistencyService 对申请书全文进行立场抽取与假设-论据链一致性校验，识别跨章节语义冲突。',
            evidence: '绪论段落实体「深度学习方法→表现优秀」与假设 H2「无法处理动态障碍物」构成直接对立；共现置信冲突评分 0.82（阈值 0.65）。',
            confidence: '82%',
            limitations: '未区分「部分场景优秀」与「全面优秀」的限定语义，建议结合上下文人工判断。'
          }
        },
        {
          id: 'iss-cite7',
          level: 'yellow',
          title: '【引用规范】参考文献 [7] 格式不完整',
          desc: '参考文献第7条缺少出版年份和DOI信息，建议补充完整以符合学院规范。',
          actions: ['定位原文'],
          locateSection: 'bg',
          detail: {
            method: 'CitationAgent 依据学院 IEEE 引用模板对参考文献列表进行字段完整性检测。',
            evidence: '条目 [7] 缺少 publicationYear、DOI 字段；作者姓名字段格式为「名 姓」，与模板要求的「姓, 名缩写」不一致。',
            confidence: '94%',
            limitations: '无法自动补全缺失 DOI，需作者手动查询并填写。'
          }
        },
        {
          id: 'iss-innov',
          level: 'green',
          title: '【创新性分析】研究方向具有较好创新潜力',
          desc: '基于知识图谱分析，课程学习与强化学习结合的研究在本院近5年项目中尚属首次。识别到2个已有相似研究，建议在文中进行差异化对比说明。',
          actions: [],
          detail: {
            method: 'InnovationAgent 基于学院近 5 年项目知识图谱与公开文献库进行研究方向相似度聚类。',
            evidence: '本院历史项目中无「课程学习 + 强化学习 + 路径规划」三元组合；外部相似工作 2 篇，差异化空间明确。',
            confidence: '76%',
            limitations: '知识图谱覆盖范围限于本院与公开摘要数据，未包含未公开在研项目。'
          }
        },
        {
          id: 'iss-dup',
          level: 'green',
          title: '【学术诚信】通过重复率检测',
          desc: '全文学术重复率 4.2%，低于 15% 警戒线，通过检测。',
          actions: [],
          detail: {
            method: 'IntegrityService 对全文进行学术重复率检测，比对来源包括期刊库、学位论文库及互联网公开资源。',
            evidence: '全文重复率 4.2%；最高单源相似段落占比 1.8%（研究背景部分），属合理引用范围。',
            confidence: '96%',
            limitations: '未检测图片、公式等非文本内容；预印本库更新可能存在延迟。'
          }
        }
      ]
    },
    'PROJ-2026-0063': {
      title: '基于Transformer的中文医学文本理解',
      total: 91,
      summary: '整体质量优秀，逻辑结构清晰，引用规范良好。建议补充与通用 NLP 模型的对比实验说明。',
      checkedAt: '2026-03-10 09:30',
      redCount: 0,
      yellowCount: 1,
      greenCount: 3,
      dims: [
        { name: '学术质量', val: 91, cls: 'sv-green' },
        { name: '创新性', val: 88, cls: 'sv-green' },
        { name: '逻辑一致性', val: 92, cls: 'sv-green' },
        { name: '引用规范', val: 90, cls: 'sv-green' },
        { name: '格式规范', val: 94, cls: 'sv-green' }
      ],
      issues: [
        { level: 'yellow', title: '【实验设计】对比基线描述不够充分', desc: '建议在第4章补充与 BERT、RoBERTa 等基线模型的定量对比表格。', actions: ['定位原文'] },
        { level: 'green', title: '【创新性分析】医学 NLP 方向契合度高', desc: '与学院智慧医疗研究方向高度契合，创新点表述清晰。', actions: [] },
        { level: 'green', title: '【学术诚信】通过重复率检测', desc: '全文学术重复率 3.1%，通过检测。', actions: [] },
        { level: 'green', title: '【格式规范】章节结构完整', desc: '符合学院申请书格式要求。', actions: [] }
      ]
    },
    'PROJ-2026-0045': {
      title: '联邦学习框架下的数据隐私保护',
      total: 88,
      summary: '技术路线成熟，论证充分。隐私保护方案设计合理，已通过学术诚信检测。',
      checkedAt: '2026-03-08 14:15',
      redCount: 0,
      yellowCount: 0,
      greenCount: 4,
      dims: [
        { name: '学术质量', val: 88, cls: 'sv-green' },
        { name: '创新性', val: 85, cls: 'sv-green' },
        { name: '逻辑一致性', val: 90, cls: 'sv-green' },
        { name: '引用规范', val: 87, cls: 'sv-green' },
        { name: '格式规范', val: 92, cls: 'sv-green' }
      ],
      issues: [
        { level: 'green', title: '【研究价值】应用场景明确', desc: '医疗数据联邦学习场景具有较强现实意义。', actions: [] },
        { level: 'green', title: '【可行性】实验方案完整', desc: '已规划跨机构联邦实验与安全性评估指标。', actions: [] },
        { level: 'green', title: '【学术诚信】通过重复率检测', desc: '全文学术重复率 2.8%，通过检测。', actions: [] },
        { level: 'green', title: '【引用规范】参考文献充分', desc: '共引用 22 篇，覆盖领域核心文献。', actions: [] }
      ]
    },
    'PROJ-2026-0029': {
      title: '量子计算在密码学中的应用探索',
      total: 93,
      summary: '论证严谨，创新性强，格式与引用均符合规范。',
      checkedAt: '2026-03-01 11:00',
      redCount: 0,
      yellowCount: 0,
      greenCount: 3,
      dims: [
        { name: '学术质量', val: 93, cls: 'sv-green' },
        { name: '创新性', val: 95, cls: 'sv-green' },
        { name: '逻辑一致性', val: 91, cls: 'sv-green' },
        { name: '引用规范', val: 92, cls: 'sv-green' },
        { name: '格式规范', val: 94, cls: 'sv-green' }
      ],
      issues: [
        { level: 'green', title: '【创新性分析】前沿方向', desc: '量子密码学为学院重点支持方向。', actions: [] },
        { level: 'green', title: '【学术诚信】通过重复率检测', desc: '重复率 1.9%。', actions: [] },
        { level: 'green', title: '【团队能力】导师指导经验丰富', desc: '指导教师在该领域有连续3年相关项目产出。', actions: [] }
      ]
    },
    'PROJ-2026-0110': {
      title: '边缘计算下的物联网安全协议研究',
      total: 78,
      summary: '基本框架完整，存在1处逻辑表述待完善，引用格式需微调。',
      checkedAt: '2026-03-15 10:22',
      redCount: 0,
      yellowCount: 2,
      greenCount: 2,
      dims: [
        { name: '学术质量', val: 78, cls: 'sv-gold' },
        { name: '创新性', val: 72, cls: 'sv-gold' },
        { name: '逻辑一致性', val: 74, cls: 'sv-gold' },
        { name: '引用规范', val: 80, cls: 'sv-gold' },
        { name: '格式规范', val: 85, cls: 'sv-green' }
      ],
      issues: [
        { level: 'yellow', title: '【逻辑一致性】安全模型假设需进一步明确', desc: '威胁模型描述与实验环境假设存在轻微不一致。', actions: ['定位原文'] },
        { level: 'yellow', title: '【引用规范】2处引用格式待修正', desc: 'IEEE 格式缺少页码信息。', actions: ['查看引用'] },
        { level: 'green', title: '【可行性】技术路线可行', desc: '边缘节点仿真方案设计合理。', actions: [] },
        { level: 'green', title: '【学术诚信】通过重复率检测', desc: '重复率 5.1%。', actions: [] }
      ]
    }
  };

  var WRITING_ASSIST = {
    'PROJ-2026-0087': {
      locked: false,
      sections: [
        { id: 'bg', label: '研究背景与意义', text: '近年来，随着深度强化学习技术的快速发展，智能机器人在复杂动态环境中的自主导航能力得到了显著提升。传统路径规划算法在静态已知地图上表现良好，但在动态障碍物频繁出现的真实场景中存在明显局限性。' },
        { id: 'goal', label: '研究目标与内容', text: '本项目研究目标为：（1）构建基于近端策略优化（PPO）的机器人路径规划框架；（2）设计融合环境感知的奖励函数体系；（3）在ROS仿真环境及真实机器人平台上验证方法有效性。' },
        { id: 'innov', label: '创新点与预期成果', text: '创新点：提出多目标奖励函数动态平衡机制；设计课程学习驱动的分阶段训练策略。预期成果：发表EI/SCI论文1篇；开源路径规划工具包。' }
      ],
      suggestions: {
        optimize: '【优化表达】建议将"得到了显著提升"改为"在若干基准任务上取得了可量化的性能提升（如成功率提升12%-18%）"，以增强学术表述的客观性与可验证性。',
        cite: '【补充引用】推荐补充以下文献：Schulman et al. (2017) PPO 原始论文；Kober et al. (2013) 机器人强化学习综述；Andrychowicz et al. (2017) 课程学习相关研究。',
        logic: '【逻辑检查】检测到潜在矛盾：第一章称"现有深度学习方法表现优秀"，第三章假设H2称"无法有效处理动态障碍物"。建议统一为"在部分静态场景表现良好，但在高动态障碍环境下仍存在局限"。'
      },
      lastAction: 'logic',
      lastAt: '2026-03-14 15:20'
    },
    'PROJ-2026-0091': {
      locked: false,
      sections: [
        { id: 'bg', label: '研究背景与意义', text: '科研文献推荐系统能够帮助研究者快速发现相关成果，知识图谱可提供结构化语义关联……' },
        { id: 'goal', label: '研究目标与内容', text: '（撰写中）构建基于知识图谱的文献推荐模型……' },
        { id: 'innov', label: '创新点与预期成果', text: '（待补充）' }
      ],
      suggestions: {
        optimize: '【优化表达】背景段落可补充具体数据，如"年均发表文献超过300万篇"以强化研究动机。',
        cite: '【补充引用】建议引用知识图谱推荐领域代表性工作：Wang et al. (2020)、Zhang et al. (2021)。',
        logic: '【逻辑检查】当前内容过短，暂无法进行全面逻辑一致性分析，建议先完成研究目标章节。'
      },
      lastAction: 'cite',
      lastAt: '2026-03-16 09:10'
    },
    'PROJ-2026-0063': {
      locked: true,
      sections: [
        { id: 'bg', label: '研究背景与意义', text: '中文医学文本理解对于临床决策支持具有重要意义……（材料已锁定）' },
        { id: 'goal', label: '研究目标与内容', text: '构建面向中文电子病历的 Transformer 理解模型……' },
        { id: 'innov', label: '创新点与预期成果', text: '提出医学领域预训练与微调策略……' }
      ],
      suggestions: {
        optimize: '【历史建议】已优化临床场景描述的学术表述，当前版本为导师确认稿。',
        cite: '【历史建议】已补充 5 篇医学 NLP 核心引用。',
        logic: '【历史建议】逻辑一致性检查通过，无待处理项。'
      },
      lastAction: 'optimize',
      lastAt: '2026-03-09 14:00'
    }
  };

  var DEFENSE_ASSIST = {
    'PROJ-2026-0045': {
      time: '2026-03-22 14:30',
      room: '第三会议室',
      duration: '20 分钟陈述 + 10 分钟问答',
      summary: '联邦学习隐私保护框架，差分隐私与安全聚合结合，在医疗数据场景验证有效性。核心创新：自适应噪声注入、轻量级安全聚合协议。',
      innovation: '1. 自适应噪声注入策略<br>2. 轻量级安全聚合协议<br>3. 跨机构联邦实验平台',
      reviewHint: '专家关注隐私-效用权衡实验设计；线上评审均分 85',
      questions: [
        '请说明差分隐私参数 ε 的选择依据及对模型精度的影响。',
        '与现有联邦学习框架（如 TensorFlow Federated）相比，本方案的核心差异是什么？',
        '跨机构实验中的数据异构性如何处理？',
        '安全聚合协议的计算开销是否满足边缘设备部署需求？',
        '若某参与方恶意上传污染梯度，系统如何检测与隔离？'
      ],
      checklist: [
        '准备 15 页答辩 PPT（含架构图与实验对比表）',
        '预演陈述，控制在 18 分钟内',
        '准备隐私-效用权衡曲线图备用',
        '熟悉参考文献 [3][7][12] 核心结论',
        '准备 Demo 视频或截图（若网络不稳定）'
      ]
    },
    'PROJ-2026-0063': {
      time: '待定（专家评审阶段）',
      room: '—',
      duration: '—',
      summary: '基于 Transformer 的中文医学文本理解，面向电子病历结构化与辅助诊断。',
      innovation: '1. 医学领域预训练策略<br>2. 中文病历语义解析<br>3. 临床实体关系抽取',
      reviewHint: '线上评审均分 91，答辩安排待秘书处通知',
      questions: [
        '医学领域数据标注成本如何控制？',
        '模型在罕见病文本上的泛化能力如何？',
        '与通用中文预训练模型相比的性能提升量化指标？'
      ],
      checklist: [
        '关注秘书处答辩通知',
        '整理专家评审意见回复要点',
        '准备实验结果可视化图表'
      ]
    }
  };

  var WRITING_ACTIONS = {
    optimize: '优化表达',
    cite: '补充引用',
    logic: '逻辑检查'
  };

  function getProject(id) {
    if (!window.ARGP_MOCK || !window.ARGP_MOCK.STUDENT_PROJECTS) return null;
    var list = window.ARGP_MOCK.STUDENT_PROJECTS;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function getQualityReport(projId) {
    return QUALITY_REPORTS[projId] || null;
  }

  function canRerunQuality(proj) {
    if (!proj) return false;
    return proj.status === 'draft' || proj.status === 'submitted';
  }

  function hasQualityReport(proj) {
    return !!(proj && proj.hasAiReport && QUALITY_REPORTS[proj.id]);
  }

  function getWritingAssist(projId) {
    var base = WRITING_ASSIST[projId];
    var p = getProject(projId);
    var editable = p && window.ARGP_MOCK && window.ARGP_MOCK.canStudentEdit
      ? window.ARGP_MOCK.canStudentEdit(p)
      : !!(p && p.status === 'draft');
    if (base) {
      return Object.assign({}, base, { locked: !editable });
    }
    if (!p) return null;
    return {
      locked: !editable,
      sections: [
        { id: 'bg', label: '研究背景与意义', text: '（该项目暂无详细写作草稿，请前往项目申请填写）' },
        { id: 'goal', label: '研究目标与内容', text: '' },
        { id: 'innov', label: '创新点与预期成果', text: '' }
      ],
      suggestions: {
        optimize: '请先完成申请书正文后再使用 AI 辅助写作。',
        cite: '请先完成申请书正文后再使用 AI 辅助写作。',
        logic: '请先完成申请书正文后再使用 AI 辅助写作。'
      },
      lastAction: null,
      lastAt: '—'
    };
  }

  function hasDefenseAssist(proj) {
    if (!proj) return false;
    return (proj.status === 'review' || proj.status === 'defense') && !!DEFENSE_ASSIST[proj.id];
  }

  function getDefenseAssist(projId) {
    return DEFENSE_ASSIST[projId] || null;
  }

  function scoreTotalClass(score) {
    if (score >= 85) return 'text-green';
    if (score >= 70) return 'text-warn';
    return 'text-danger';
  }

  function renderIssueActions(actions) {
    if (!actions || !actions.length) return '';
    return '<div style="margin-top:7px;display:flex;gap:6px;flex-wrap:wrap;">' +
      actions.map(function (a) {
        return '<button class="btn btn-sm btn-secondary" type="button" onclick="showToast(\'已定位（Demo）\',\'info\')">' + a + '</button>';
      }).join('') + '</div>';
  }

  function renderQualityReportHtml(report, projId) {
    if (!report) return '';
    var p = getProject(projId);
    var title = p ? p.title : report.title;
    var dimsHtml = report.dims.map(function (d) {
      return '<div class="score-cell"><div class="score-val ' + d.cls + '">' + d.val + '</div><div class="score-name">' + d.name + '</div></div>';
    }).join('');
    var issuesHtml = report.issues.map(function (iss) {
      return '<div class="issue-item i-' + iss.level + '">' +
        '<div class="issue-dot id-' + iss.level + '"></div>' +
        '<div class="issue-text">' +
          '<div class="issue-title">' + iss.title + '</div>' +
          '<div class="issue-desc">' + iss.desc + '</div>' +
          renderIssueActions(iss.actions) +
        '</div></div>';
    }).join('');
    var totalCls = scoreTotalClass(report.total);
    return '<div class="report-card">' +
      '<div class="report-hd">' +
        '<div><div class="report-hd-title">AI 学术质量自检报告</div>' +
        '<div class="report-hd-sub">' + title + ' · ' + projId + '</div></div>' +
        '<div style="margin-left:auto;text-align:right;">' +
          '<div class="ai-quality-total ' + totalCls + '">' + report.total + '</div>' +
          '<div style="font-size:11px;color:var(--text-secondary);">综合质量得分</div></div></div>' +
      '<div class="ai-report-summary">' + report.summary + '</div>' +
      '<div class="score-strip">' + dimsHtml + '</div>' +
      '<div style="padding:16px 20px;">' +
        '<div style="font-size:12.5px;font-weight:600;margin-bottom:10px;">详细问题清单</div>' +
        issuesHtml + '</div>' +
      '<div class="ai-report-meta">' +
        '<span>Academic Agent · ConsistencyService</span>' +
        '<span>检测时间：' + report.checkedAt + '</span>' +
        '<span>AI 生成 · 仅供参考</span></div></div>';
  }

  function renderQualitySummaryHtml(report, projId) {
    if (!report) return '';
    var totalCls = scoreTotalClass(report.total);
    return '<div class="ai-quality-summary-card">' +
      '<div class="ai-quality-summary-hd">' +
        '<div><div style="font-weight:600;font-size:14px;">最近一次自检</div>' +
        '<div class="text-xs text-muted" style="margin-top:4px;">' + report.checkedAt + '</div></div>' +
        '<div class="ai-quality-total-sm ' + totalCls + '">' + report.total + '<span>分</span></div></div>' +
      '<div class="ai-quality-risk-row">' +
        '<span class="badge b-red">' + report.redCount + ' 红色</span>' +
        '<span class="badge b-yellow">' + report.yellowCount + ' 黄色</span>' +
        '<span class="badge b-green">' + report.greenCount + ' 绿色</span></div>' +
      '<p class="text-xs text-muted" style="line-height:1.6;margin:12px 0 0;">' + report.summary + '</p></div>';
  }

  var _currentProjId = DEFAULT_PROJ;
  var _currentTab = 'writing';
  var _qualityDetail = false;
  var _writingSection = 'bg';
  var _writingAction = null;
  var _applyWritingSection = null;
  var _applyWritingAction = null;
  var _expandedIssues = {};
  var _redAcks = {};
  var _submitAt = null;

  var LEVEL_LABELS = { red: '红色', yellow: '黄色', green: '绿色' };

  function normalizeIssue(iss, idx, projId) {
    var id = iss.id || (projId + '-iss-' + idx);
    var detail = iss.detail || {
      method: 'Academic Agent 多维度质量检测流水线对该项进行自动分析。',
      evidence: iss.desc || '—',
      confidence: iss.level === 'red' ? '85%' : iss.level === 'yellow' ? '78%' : '92%',
      limitations: 'AI 检测结果仅供参考，最终结论须由人工审核确认。'
    };
    return {
      id: id,
      level: iss.level,
      title: iss.title,
      desc: iss.desc,
      actions: iss.actions || [],
      locateSection: iss.locateSection || null,
      detail: detail
    };
  }

  function formatNow() {
    var d = new Date();
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  function resetAiCheckState() {
    _expandedIssues = {};
    _redAcks = {};
  }

  function canSubmitFromAiCheck() {
    var report = getQualityReport(_currentProjId);
    var p = getProject(_currentProjId);
    if (!report || !p) return false;
    if (p.status === 'review' || p.status === 'defense' || p.status === 'archived') return false;
    var redIssues = report.issues.filter(function (i) { return i.level === 'red'; });
    if (!redIssues.length) return true;
    return redIssues.every(function (iss, idx) {
      var n = normalizeIssue(iss, idx, _currentProjId);
      return !!_redAcks[n.id];
    });
  }

  function renderIssueCard(iss, idx, projId) {
    var n = normalizeIssue(iss, idx, projId);
    var expanded = !!_expandedIssues[n.id];
    var acked = !!_redAcks[n.id];
    var levelLbl = LEVEL_LABELS[n.level] || n.level;
    var locateBtn = n.locateSection
      ? '<button class="btn btn-sm btn-secondary" type="button" onclick="ARGP_AI.locateIssue(\'' + n.id + '\')">定位原文</button>' +
        '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_AI.returnToEdit(\'' + (n.locateSection || 'bg') + '\')">返回修改</button>'
      : '';
    var redAckBlock = '';
    if (n.level === 'red') {
      redAckBlock = acked
        ? '<div class="qc-ack-done"><span class="qc-ack-check">✓</span> 已于 <span class="mono">' + _redAcks[n.id] + '</span> 确认知悉</div>'
        : '<button class="btn btn-sm qc-ack-btn" type="button" onclick="ARGP_AI.ackRedIssue(\'' + n.id + '\')">已知悉，继续提交</button>';
    }
    return '<div class="qc-issue-card qc-' + n.level + (expanded ? ' expanded' : '') + '" id="qc-card-' + n.id + '">' +
      '<div class="qc-issue-hd">' +
        '<span class="qc-level-badge qc-lb-' + n.level + '">' + levelLbl + '</span>' +
        '<div class="qc-issue-title">' + n.title + '</div>' +
      '</div>' +
      '<div class="qc-issue-body">' +
        '<p class="qc-issue-desc">' + n.desc + '</p>' +
        (locateBtn ? '<div class="qc-issue-actions">' + locateBtn + '</div>' : '') +
        redAckBlock +
        '<button type="button" class="qc-expand-btn" onclick="ARGP_AI.toggleAiCheckIssue(\'' + n.id + '\')">' +
          (expanded ? '收起 AI 判断依据 ▲' : '查看 AI 判断依据 ▼') +
        '</button>' +
        (expanded
          ? '<div class="qc-issue-detail">' +
              '<div class="qc-detail-grid">' +
                '<div class="qc-detail-item"><div class="qc-detail-lbl">方法说明</div><div class="qc-detail-val">' + n.detail.method + '</div></div>' +
                '<div class="qc-detail-item"><div class="qc-detail-lbl">证据摘要</div><div class="qc-detail-val">' + n.detail.evidence + '</div></div>' +
                '<div class="qc-detail-item qc-detail-half"><div class="qc-detail-lbl">置信度</div><div class="qc-detail-val mono">' + n.detail.confidence + '</div></div>' +
                '<div class="qc-detail-item qc-detail-half"><div class="qc-detail-lbl">局限性</div><div class="qc-detail-val">' + n.detail.limitations + '</div></div>' +
              '</div></div>'
          : '') +
      '</div></div>';
  }

  function renderAiCheckPage() {
    var root = document.getElementById('ai-check-root');
    if (!root) return;
    var projId = _currentProjId;
    var p = getProject(projId);
    var report = getQualityReport(projId);
    if (!report || !hasQualityReport(p)) {
      root.innerHTML =
        '<div class="ai-cap-empty">' +
          '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">暂无质量检测报告</div>' +
          '<p class="text-xs text-muted" style="line-height:1.6;margin-bottom:14px;">请先在项目申请中完成材料填写，再进行 AI 质量自检。</p>' +
          '<button class="btn btn-primary" type="button" onclick="showPage(\'proj-new\')">前往项目申请</button>' +
        '</div>';
      return;
    }
    var title = p ? p.title : report.title;
    var totalCls = scoreTotalClass(report.total);
    var dimsHtml = report.dims.map(function (d) {
      return '<div class="score-cell"><div class="score-val ' + d.cls + '">' + d.val + '</div><div class="score-name">' + d.name + '</div></div>';
    }).join('');
    var cardsHtml = report.issues.map(function (iss, idx) {
      return renderIssueCard(iss, idx, projId);
    }).join('');
    var canSubmit = canSubmitFromAiCheck();
    var redCount = report.redCount || report.issues.filter(function (i) { return i.level === 'red'; }).length;
    var submitHint = redCount > 0 && !canSubmit
      ? '<p class="qc-submit-hint">请先对全部 <strong>' + redCount + '</strong> 项红色问题点击「已知悉，继续提交」后再提交导师审核。</p>'
      : '';
    var rerunBtn = canRerunQuality(p)
      ? '<button class="btn btn-sm btn-secondary" type="button" onclick="runAiCheck()">重新自检</button>'
      : '';
    root.innerHTML =
      '<div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:12px;">' +
        '<div>' +
          '<div class="page-title">AI 质量自检</div>' +
          '<div class="page-sub">Academic Agent · 提交导师前质量报告 · AI 生成 · 仅供参考</div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<button class="btn btn-sm btn-ghost" type="button" onclick="showPage(\'proj-new\')">← 返回项目申请</button>' +
          rerunBtn +
        '</div></div>' +
      '<div class="report-card">' +
        '<div class="report-hd">' +
          '<div><div class="report-hd-title">AI 学术质量自检报告</div>' +
          '<div class="report-hd-sub">' + title + ' · ' + projId + '</div></div>' +
          '<div style="margin-left:auto;text-align:right;">' +
            '<div class="ai-quality-total ' + totalCls + '" style="color:#fff;">' + report.total + '</div>' +
            '<div style="font-size:11px;color:var(--blue-200);">综合质量得分</div></div></div>' +
        '<div class="ai-report-summary">' + report.summary + '</div>' +
        '<div class="score-strip">' + dimsHtml + '</div>' +
        '<div class="ai-quality-risk-row" style="padding:14px 20px 0;">' +
          '<span class="badge b-red">' + report.redCount + ' 红色</span>' +
          '<span class="badge b-yellow">' + report.yellowCount + ' 黄色</span>' +
          '<span class="badge b-green">' + report.greenCount + ' 绿色</span></div>' +
        '<div class="qc-issue-list">' +
          '<div class="qc-list-title">问题清单 · 共 ' + report.issues.length + ' 项</div>' +
          cardsHtml +
        '</div>' +
        '<div class="ai-report-meta">' +
          '<span>Academic Agent · ConsistencyService</span>' +
          '<span>检测时间：' + report.checkedAt + '</span>' +
          '<span>AI 生成 · 仅供参考</span></div></div>' +
      submitHint +
      '<div class="qc-submit-bar">' +
        '<button class="btn btn-secondary" type="button" onclick="showPage(\'proj-new\')">返回修改申请书</button>' +
        '<button class="btn btn-primary" id="btn-ai-check-submit" type="button"' +
          (canSubmit ? '' : ' disabled') +
          ' onclick="ARGP_AI.submitFromAiCheck()">确认提交导师审核</button>' +
      '</div>';
  }

  function renderSubmitSuccessPage() {
    var root = document.getElementById('submit-success-root');
    if (!root) return;
    var projId = _currentProjId;
    var p = getProject(projId);
    var title = p ? p.title : '项目申请书';
    var ts = _submitAt || formatNow();
    root.innerHTML =
      '<div class="submit-success-wrap">' +
        '<div class="submit-success-icon">✓</div>' +
        '<div class="submit-success-title">提交成功</div>' +
        '<p class="submit-success-desc">您的项目申请书已正式提交导师审核，Advisor Agent 将向指导教师推送材料摘要与 AI 检测报告。</p>' +
        '<div class="meta-card" style="max-width:480px;margin:24px auto;text-align:left;">' +
          '<div class="meta-row"><span class="meta-k">项目</span><span class="meta-v">' + title + '</span></div>' +
          '<div class="meta-row"><span class="meta-k">编号</span><span class="meta-v mono">' + projId + '</span></div>' +
          '<div class="meta-row"><span class="meta-k">提交时间</span><span class="meta-v mono text-xs">' + ts + '</span></div>' +
          '<div class="meta-row"><span class="meta-k">状态</span><span class="meta-v"><span class="my-proj-status st-submitted">待导师审核</span></span></div>' +
        '</div>' +
        '<div class="btn-group" style="justify-content:center;border-top:none;padding-top:0;">' +
          '<button class="btn btn-secondary" type="button" onclick="showPage(\'my-proj\')">返回我的项目</button>' +
          '<button class="btn btn-primary" type="button" onclick="showPage(\'proj-detail\')">查看项目详情</button>' +
        '</div></div>';
  }

  function toggleAiCheckIssue(issueId) {
    _expandedIssues[issueId] = !_expandedIssues[issueId];
    renderAiCheckPage();
  }

  function ackRedIssue(issueId) {
    _redAcks[issueId] = formatNow();
    if (typeof showToast === 'function') {
      showToast('已记录知悉确认 · ' + _redAcks[issueId], 'success');
    }
    renderAiCheckPage();
  }

  function getSectionLabel(sectionId) {
    var map = { bg: '研究背景与意义', goal: '研究目标与内容', innov: '创新点与预期成果' };
    return map[sectionId] || sectionId;
  }

  function returnToEdit(sectionId) {
    sectionId = sectionId || 'bg';
    if (typeof showPage === 'function') showPage('proj-new');
    setTimeout(function () {
      initApplyPage();
      if (typeof goApplyStep === 'function') goApplyStep(2, true);
      var el = document.getElementById('apply-text-' + sectionId);
      if (el) {
        el.focus();
        el.classList.add('locate-flash');
        setTimeout(function () { el.classList.remove('locate-flash'); }, 2000);
      }
      if (typeof showToast === 'function') {
        showToast('已跳转至「' + getSectionLabel(sectionId) + '」，请修改后重新自检', 'info');
      }
    }, 80);
  }

  function locateIssue(issueId) {
    var report = getQualityReport(_currentProjId);
    if (!report) return;
    var sectionId = 'bg';
    report.issues.forEach(function (iss, idx) {
      var n = normalizeIssue(iss, idx, _currentProjId);
      if (n.id === issueId && n.locateSection) sectionId = n.locateSection;
    });
    if (typeof showPage === 'function') showPage('proj-new');
    setTimeout(function () {
      initApplyPage();
      if (typeof goApplyStep === 'function') goApplyStep(2, true);
      var el = document.getElementById('apply-text-' + sectionId);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('locate-flash');
        setTimeout(function () { el.classList.remove('locate-flash'); }, 2000);
      }
      if (typeof showToast === 'function') {
        showToast('已定位至「' + getSectionLabel(sectionId) + '」相关段落', 'info');
      }
    }, 80);
  }

  function submitFromAiCheck() {
    if (!canSubmitFromAiCheck()) {
      if (typeof showToast === 'function') showToast('请先确认全部红色风险问题', 'warn');
      return;
    }
    _submitAt = formatNow();
    if (typeof showPage === 'function') showPage('submit-success');
    renderSubmitSuccessPage();
  }

  function getApplyProjId() {
    if (window.ARGP_MOCK && window.ARGP_MOCK.getCurrentDetailId) {
      var detailId = window.ARGP_MOCK.getCurrentDetailId();
      if (detailId) return detailId;
    }
    return _currentProjId || DEFAULT_PROJ;
  }

  function renderApplySuggestPanel() {
    var container = document.getElementById('apply-ai-suggest-panel');
    if (!container) return;
    var assist = getWritingAssist(getApplyProjId());
    if (!assist) {
      container.innerHTML =
        '<div class="ai-suggest-hd">AI 建议结果</div>' +
        '<div class="ai-suggest-body">暂无写作数据</div>';
      return;
    }
    if (!_applyWritingAction) {
      container.innerHTML =
        '<div class="ai-suggest-hd">AI 建议结果</div>' +
        '<div class="ai-suggest-body" style="opacity:0.75;">在左侧申请书正文中点击「优化表达」「补充引用」或「逻辑检查」，将在此显示 Academic Agent 的建议。</div>' +
        '<div class="ai-suggest-meta">AI 生成 · 仅供参考</div>';
      return;
    }
    var section = assist.sections.filter(function (s) { return s.id === _applyWritingSection; })[0];
    var sectionLabel = section ? section.label : '';
    var action = _applyWritingAction;
    var suggest = assist.suggestions[action] || assist.suggestions.logic;
    container.innerHTML =
      '<div class="ai-suggest-hd">AI 建议结果 <span class="text-xs" style="opacity:0.85;">· ' +
        (WRITING_ACTIONS[action] || '') +
        (sectionLabel ? ' · ' + sectionLabel : '') +
      '</span></div>' +
      '<div class="ai-suggest-body">' + suggest + '</div>' +
      '<div class="ai-suggest-meta">最近更新：' + assist.lastAt + ' · AI 生成 · 仅供参考</div>';
  }

  function initApplyPage() {
    var projId = getApplyProjId();
    _currentProjId = projId;
    var assist = getWritingAssist(projId);
    if (assist && assist.sections) {
      assist.sections.forEach(function (s) {
        var el = document.getElementById('apply-text-' + s.id);
        if (el && s.text) el.value = s.text;
      });
    }
    renderApplySuggestPanel();
  }

  function runApplyWritingAction(sectionId, action) {
    _applyWritingSection = sectionId;
    _applyWritingAction = action;
    _writingSection = sectionId;
    _writingAction = action;
    if (typeof showToast === 'function') {
      showToast('Academic Agent 已生成' + (WRITING_ACTIONS[action] || '') + '建议', 'info');
    }
    renderApplySuggestPanel();
    var panel = document.getElementById('apply-step-ai');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function fillProjectSelect() {
    var sel = document.getElementById('ai-proj-select');
    if (!sel || !window.ARGP_MOCK) return;
    sel.innerHTML = window.ARGP_MOCK.STUDENT_PROJECTS.map(function (p) {
      return '<option value="' + p.id + '"' + (p.id === _currentProjId ? ' selected' : '') + '>' + p.title + '（' + p.id + '）</option>';
    }).join('');
  }

  function renderWritingTab() {
    var panel = document.getElementById('ai-tab-writing');
    if (!panel) return;
    var assist = getWritingAssist(_currentProjId);
    var p = getProject(_currentProjId);
    if (!assist) {
      panel.innerHTML = '<div class="ai-cap-empty">暂无写作数据</div>';
      return;
    }
    var section = assist.sections.filter(function (s) { return s.id === _writingSection; })[0] || assist.sections[0];
    var action = _writingAction || assist.lastAction || 'logic';
    var suggest = assist.suggestions[action] || assist.suggestions.logic;
    var lockedNote = assist.locked
      ? '<div class="readonly-hint" style="margin-bottom:14px;">材料已锁定，仅可查看历史 AI 建议。如需修改请联系指导导师或查看退件说明。</div>'
      : (p && p.returnSource === 'secretary'
        ? '<div class="readonly-hint" style="margin-bottom:14px;background:var(--danger-bg);border-left:3px solid #b91c1c;color:#7f1d1d;">秘书处已退件，请修改材料后重新提交导师审核。</div>'
        : (p && p.returnSource === 'mentor'
          ? '<div class="readonly-hint" style="margin-bottom:14px;background:var(--warn-bg);border-left:3px solid #b45309;color:#78350f;">导师已退回修改，请按批注意见完善后重新提交。</div>'
          : ''));
    var sectionOpts = assist.sections.map(function (s) {
      return '<button type="button" class="ai-section-btn' + (s.id === section.id ? ' active' : '') + '" onclick="ARGP_AI.selectWritingSection(\'' + s.id + '\')">' + s.label + '</button>';
    }).join('');
    panel.innerHTML =
      lockedNote +
      '<div class="ai-writing-layout">' +
        '<div class="ai-writing-main">' +
          '<div class="ai-section-tabs">' + sectionOpts + '</div>' +
          '<label class="form-label">' + section.label + '</label>' +
          '<textarea class="form-textarea readonly-field" readonly style="min-height:140px;">' + (section.text || '') + '</textarea>' +
          '<div class="ai-assist-bar" style="margin-top:12px;">' +
            '<span class="ai-assist-label">Academic Agent · AI辅助写作</span>' +
            '<div class="ai-assist-btns">' +
              '<button class="aab" type="button" onclick="ARGP_AI.runWritingAction(\'optimize\')">优化表达</button>' +
              '<button class="aab" type="button" onclick="ARGP_AI.runWritingAction(\'cite\')">补充引用</button>' +
              '<button class="aab" type="button" onclick="ARGP_AI.runWritingAction(\'logic\')">逻辑检查</button>' +
            '</div></div>' +
          '<div style="margin-top:14px;">' +
            '<button class="btn btn-secondary" type="button" onclick="showPage(\'proj-new\')">' + (assist.locked ? '查看项目申请' : '前往项目申请继续编辑') + '</button>' +
          '</div></div>' +
        '<div class="ai-suggest-panel">' +
          '<div class="ai-suggest-hd">AI 建议结果 <span class="text-xs text-muted">· ' + (WRITING_ACTIONS[action] || '') + '</span></div>' +
          '<div class="ai-suggest-body">' + suggest + '</div>' +
          '<div class="ai-suggest-meta">最近更新：' + assist.lastAt + ' · AI 生成 · 仅供参考</div>' +
        '</div></div>';
  }

  function renderQualityTab() {
    var panel = document.getElementById('ai-tab-quality');
    if (!panel) return;
    var p = getProject(_currentProjId);
    var report = getQualityReport(_currentProjId);
    if (!hasQualityReport(p)) {
      panel.innerHTML =
        '<div class="ai-cap-empty">' +
          '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">暂无质量检测报告</div>' +
          '<p class="text-xs text-muted" style="line-height:1.6;margin-bottom:14px;">请先在项目申请中完成材料填写，再进行 AI 质量自检。</p>' +
          '<button class="btn btn-primary" type="button" onclick="showPage(\'proj-new\')">前往项目申请</button>' +
        '</div>';
      return;
    }
    var rerunBtn = canRerunQuality(p)
      ? '<button class="btn btn-sm btn-secondary" type="button" onclick="runAiCheck(true)">重新自检</button>'
      : '<span class="text-xs text-muted">历史报告（材料已提交，不可重新自检）</span>';
    if (_qualityDetail) {
      var submitBlock = '';
      if (canRerunQuality(p)) {
        submitBlock =
          '<div style="margin-top:16px;padding:12px 14px;background:var(--danger-bg);border-radius:var(--radius);border:1px solid #fca5a5;">' +
            '<label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;cursor:pointer;color:#991b1b;line-height:1.55;">' +
              '<input type="checkbox" id="risk-ack" onchange="updateSubmitBtn()" style="margin-top:3px;flex-shrink:0;">' +
              '<span>本人已阅读并知悉上述 <strong>红色风险</strong> 问题，确认继续提交导师审核</span>' +
            '</label></div>' +
          '<div class="btn-group" style="border-top:none;padding-top:14px;margin-top:0;">' +
            '<button class="btn btn-secondary" type="button" onclick="showPage(\'proj-new\')">返回修改</button>' +
            '<button class="btn btn-primary" id="btn-submit-mentor" disabled type="button" onclick="submitToMentor()">知悉风险，正式提交导师审核</button>' +
          '</div>';
      }
      panel.innerHTML =
        '<div style="margin-bottom:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
          '<button class="btn btn-sm btn-ghost" type="button" onclick="ARGP_AI.showQualityList()">← 返回摘要</button>' +
          rerunBtn +
        '</div>' +
        renderQualityReportHtml(report, _currentProjId) +
        submitBlock;
      return;
    }
    panel.innerHTML =
      '<div style="margin-bottom:14px;display:flex;justify-content:flex-end;">' + rerunBtn + '</div>' +
      renderQualitySummaryHtml(report, _currentProjId) +
      '<div style="margin-top:14px;">' +
        '<button class="btn btn-primary" type="button" onclick="ARGP_AI.showQualityDetail()">查看完整报告</button>' +
      '</div>';
  }

  function renderDefenseTab() {
    var panel = document.getElementById('ai-tab-defense');
    if (!panel) return;
    var p = getProject(_currentProjId);
    var def = getDefenseAssist(_currentProjId);
    if (!hasDefenseAssist(p) || !def) {
      panel.innerHTML =
        '<div class="ai-cap-empty">' +
          '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">尚未进入答辩环节</div>' +
          '<p class="text-xs text-muted" style="line-height:1.6;">当项目进入专家评审或答辩阶段后，将在此提供答辩安排、预测问题与准备清单。</p>' +
        '</div>';
      return;
    }
    var qHtml = def.questions.map(function (q, i) {
      return '<div class="ai-defense-q"><span class="ai-defense-q-num">' + (i + 1) + '</span><span>' + q + '</span></div>';
    }).join('');
    var cHtml = def.checklist.map(function (item, i) {
      return '<label class="ai-defense-check-item"><input type="checkbox"> <span>' + item + '</span></label>';
    }).join('');
    panel.innerHTML =
      '<div class="meta-card" style="margin-bottom:16px;">' +
        '<div class="meta-title">答辩安排</div>' +
        '<div class="meta-row"><span class="meta-k">时间</span><span class="meta-v text-xs">' + def.time + '</span></div>' +
        '<div class="meta-row"><span class="meta-k">地点</span><span class="meta-v text-xs">' + def.room + '</span></div>' +
        '<div class="meta-row"><span class="meta-k">时长</span><span class="meta-v text-xs">' + def.duration + '</span></div>' +
      '</div>' +
      '<div class="ai-block" style="margin-bottom:16px;">' +
        '<div class="ai-block-hd"><div class="ai-icon"><svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M8 1L1 5v5.5C1 13.5 4.5 15.5 8 16c3.5-.5 7-2.5 7-5.5V5L8 1z"/></svg></div>' +
        '<div class="ai-block-title">答辩一页摘要</div><span class="ai-tag" style="margin-left:auto;">AI 生成 · 仅供参考</span></div>' +
        '<div class="ai-grid-3">' +
          '<div class="ai-cell"><div class="ai-cell-lbl">项目摘要</div>' + def.summary + '</div>' +
          '<div class="ai-cell"><div class="ai-cell-lbl">核心创新点</div>' + def.innovation + '</div>' +
          '<div class="ai-cell"><div class="ai-cell-lbl">评审关注</div>' + def.reviewHint + '</div>' +
        '</div></div>' +
      '<div class="form-card" style="margin-bottom:16px;">' +
        '<div class="form-section-title">预测答辩问题</div>' + qHtml + '</div>' +
      '<div class="form-card">' +
        '<div class="form-section-title">答辩准备清单</div>' +
        '<div class="ai-defense-checklist">' + cHtml + '</div></div>';
  }

  function renderTabPanels() {
    renderWritingTab();
    renderQualityTab();
    renderDefenseTab();
  }

  function setTabUI(tab) {
    _currentTab = tab;
    ['writing', 'quality', 'defense'].forEach(function (t) {
      var panel = document.getElementById('ai-tab-' + t);
      if (panel) panel.style.display = t === tab ? '' : 'none';
    });
    document.querySelectorAll('#ai-hub-tabs .tab-item').forEach(function (el) {
      var isActive = el.getAttribute('data-ai-tab') === tab;
      el.classList.toggle('active', isActive);
    });
  }

  function render(opts) {
    opts = opts || {};
    if (opts.projId) _currentProjId = opts.projId;
    if (opts.tab) _currentTab = opts.tab;
    if (typeof opts.qualityDetail === 'boolean') _qualityDetail = opts.qualityDetail;
    fillProjectSelect();
    setTabUI(_currentTab);
    renderTabPanels();
  }

  function onProjectChange(projId) {
    _currentProjId = projId;
    _qualityDetail = false;
    _writingSection = 'bg';
    _writingAction = null;
    render();
  }

  function selectWritingSection(sectionId) {
    _writingSection = sectionId;
    renderWritingTab();
  }

  function runWritingAction(action) {
    _writingAction = action;
    if (typeof showToast === 'function') {
      showToast('Academic Agent 已生成' + (WRITING_ACTIONS[action] || '') + '建议', 'info');
    }
    renderWritingTab();
  }

  function showQualityDetail() {
    _qualityDetail = true;
    renderQualityTab();
  }

  function showQualityList() {
    _qualityDetail = false;
    renderQualityTab();
  }

  function openAssistant(tab, projId, qualityDetail) {
    if (projId) _currentProjId = projId;
    if (tab) _currentTab = tab;
    _qualityDetail = !!qualityDetail;
    if (typeof window.showPage === 'function') {
      window.showPage('ai-assistant');
    }
    render({ projId: _currentProjId, tab: _currentTab, qualityDetail: _qualityDetail });
  }

  window.ARGP_AI = {
    DEFAULT_PROJ: DEFAULT_PROJ,
    getQualityReport: getQualityReport,
    canRerunQuality: canRerunQuality,
    hasQualityReport: hasQualityReport,
    getWritingAssist: getWritingAssist,
    hasDefenseAssist: hasDefenseAssist,
    getDefenseAssist: getDefenseAssist,
    render: render,
    onProjectChange: onProjectChange,
    selectWritingSection: selectWritingSection,
    runWritingAction: runWritingAction,
    runApplyWritingAction: runApplyWritingAction,
    initApplyPage: initApplyPage,
    renderApplySuggestPanel: renderApplySuggestPanel,
    getApplyProjId: getApplyProjId,
    renderAiCheckPage: renderAiCheckPage,
    renderSubmitSuccessPage: renderSubmitSuccessPage,
    toggleAiCheckIssue: toggleAiCheckIssue,
    ackRedIssue: ackRedIssue,
    locateIssue: locateIssue,
    returnToEdit: returnToEdit,
    submitFromAiCheck: submitFromAiCheck,
    resetAiCheckState: resetAiCheckState,
    canSubmitFromAiCheck: canSubmitFromAiCheck,
    showQualityDetail: showQualityDetail,
    showQualityList: showQualityList,
    openAssistant: openAssistant,
    getCurrentProjId: function () { return _currentProjId; },
    setCurrentProjId: function (id) { _currentProjId = id; }
  };
})();

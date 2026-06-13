/* ARGP Demo — 导师工作台 Mock 数据与交互 */
(function () {
  var MENTOR_NAME = '张明远 教授';

  var MENTOR_STATUS = {
    pending:  { label: '待审核', badge: 'b-guidance', rowBg: '#fffbeb' },
    revising: { label: '修改中', badge: 'b-draft', rowBg: '' },
    approved: { label: '已通过', badge: 'b-submitted', rowBg: '' }
  };

  var MENTOR_PROJECTS = [
    {
      id: 'PROJ-2026-0087',
      title: '强化学习在机器人路径规划中的应用研究',
      type: '国创计划',
      student: '李明',
      grade: '研二',
      mentorStatus: 'pending',
      signed: false,
      workflowStage: '',
      aiScore: 82,
      aiIssue: '1处逻辑矛盾',
      aiIssueCls: 'text-danger',
      submitted: '今天 09:30',
      sortOrder: 1
    },
    {
      id: 'PROJ-2026-0102',
      title: '基于自然语言处理的学术摘要生成',
      type: '校级项目',
      student: '周琳',
      grade: '研一',
      mentorStatus: 'pending',
      signed: false,
      workflowStage: '',
      aiScore: 67,
      aiIssue: '创新性不足',
      aiIssueCls: 'text-danger',
      submitted: '昨天 16:20',
      sortOrder: 2
    },
    {
      id: 'PROJ-2026-0095',
      title: '基于强化学习的智能调度算法',
      type: '校级项目',
      student: '韩雪',
      grade: '研二',
      mentorStatus: 'revising',
      signed: false,
      workflowStage: '',
      aiScore: 76,
      aiIssue: '待完善实验部分',
      aiIssueCls: 'text-muted',
      submitted: '2026-03-11',
      sortOrder: 3
    },
    {
      id: 'PROJ-2026-0031',
      title: '多模态情感分析系统设计',
      type: '国创计划',
      student: '赵磊',
      grade: '研二',
      mentorStatus: 'revising',
      signed: false,
      workflowStage: '',
      aiScore: 78,
      aiIssue: '附修改意见 2 条',
      aiIssueCls: 'text-muted',
      submitted: '2026-02-25',
      sortOrder: 4
    },
    {
      id: 'PROJ-2026-0063',
      title: '基于Transformer的中文医学文本理解',
      type: '校级项目',
      student: '王芳',
      grade: '研三',
      mentorStatus: 'approved',
      signed: true,
      workflowStage: '待评审',
      aiScore: 91,
      aiIssue: '已签字确认',
      aiIssueCls: 'text-green',
      submitted: '2026-03-01',
      sortOrder: 5
    },
    {
      id: 'PROJ-2026-0045',
      title: '联邦学习框架下的数据隐私保护',
      type: '国创计划',
      student: '陈浩',
      grade: '研三',
      mentorStatus: 'approved',
      signed: true,
      workflowStage: '待答辩',
      aiScore: 88,
      aiIssue: '无重大问题',
      aiIssueCls: 'text-green',
      submitted: '2026-03-05',
      sortOrder: 6
    },
    {
      id: 'PROJ-2026-0091',
      title: '大语言模型微调与对齐研究',
      type: '国创计划',
      student: '郑凯',
      grade: '研三',
      mentorStatus: 'approved',
      signed: true,
      workflowStage: '待评审',
      aiScore: 85,
      aiIssue: '进展良好',
      aiIssueCls: 'text-green',
      submitted: '2026-03-09',
      sortOrder: 7
    },
    {
      id: 'PROJ-2026-0029',
      title: '量子计算密码学应用研究',
      type: '国创计划',
      student: '孙杰',
      grade: '研三',
      mentorStatus: 'approved',
      signed: true,
      workflowStage: '已公示',
      aiScore: 93,
      aiIssue: '无重大问题',
      aiIssueCls: 'text-green',
      submitted: '2026-02-20',
      sortOrder: 8
    }
  ];

  var MENTOR_REVIEW_META = {
    'PROJ-2026-0087': {
      student: '李明',
      grade: '研究生二年级',
      submitted: '今天 09:30',
      version: 'v3',
      aiScore: 82,
      round: '第 1 轮',
      advisorSummary: {
        issues: '第3章假设H2与绪论第2段表述逻辑矛盾；研究方案中技术路线图与文字描述有出入',
        highlights: '创新点明确具体；文献综述覆盖近3年主要进展；研究方法可行性描述较充分'
      },
      versionChangeSummary: '研究背景补充路径重规划延迟定量数据（>200ms）；第三章假设 H2 改为可量化表述并统一与绪论立场；研究目标与创新点章节内容显著扩充，表述更规范。',
      aiSummary: '综合得分 82 分（黄色预警）。识别 1 处红色风险（参考文献不当引用）、2 处黄色预警（逻辑矛盾、引用格式）。重复率 4.2%，通过学术诚信检测。',
      defaultOpinion: '申请书整体质量较好，研究方向具有创新价值。主要修改点：\n1. 第3章假设H2与绪论第2段存在明显逻辑矛盾，请统一表述立场；\n2. 研究背景部分需补充定量数据；\n3. 技术路线图与文字描述存在出入，建议对照修改。\n\n修改完成后可重新提交审核。'
    }
  };

  var HERITAGE_REPORTS = {
    'PROJ-2026-0087': {
      title: '知识传承分析报告',
      subtitle: '强化学习在机器人路径规划中的应用研究',
      segments: [
        {
          id: 'hs-0',
          type: 'orange',
          label: '传承',
          text: '近年来，随着深度强化学习技术的快速发展，智能机器人在复杂动态环境中的自主导航能力得到了显著提升。',
          source: '传承自导师论文 Zhang et al. (2023) "DRL in Robotic Navigation", §2.1'
        },
        {
          id: 'hs-1',
          type: 'orange',
          label: '传承',
          text: '构建基于近端策略优化（PPO）的机器人路径规划框架',
          source: '传承自导师论文 Zhang et al. (2021) "PPO for Mobile Robots", §3.2'
        },
        {
          id: 'hs-2',
          type: 'blue',
          label: '引入',
          text: '设计课程学习驱动的分阶段训练策略',
          source: '引入外部文献 Bengio et al. (2009) "Curriculum Learning", ICML'
        },
        {
          id: 'hs-3',
          type: 'blue',
          label: '引入',
          text: '在ROS仿真环境及真实机器人平台上验证方法有效性',
          source: '引入外部文献 Quigley et al. (2009) ROS 技术框架'
        },
        {
          id: 'hs-4',
          type: 'green',
          label: '原创',
          text: '提出多目标奖励函数动态平衡机制',
          source: '本项目原创观点，知识图谱中尚无相似工作'
        },
        {
          id: 'hs-5',
          type: 'green',
          label: '原创',
          text: '融合环境感知的奖励函数体系',
          source: '本项目原创设计，与导师前期工作在奖励塑形策略上存在显著差异'
        }
      ],
      stats: { orange: 2, blue: 2, green: 2 }
    }
  };

  var HERITAGE_KG_SVG =
    '<div class="kg-wrap">' +
      '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">' +
        '<circle cx="160" cy="100" r="22" fill="#26a69a" opacity="0.95"/>' +
        '<text x="160" y="104" text-anchor="middle" fill="white" font-size="9" font-family="\'Noto Sans SC\',sans-serif">本项目</text>' +
        '<circle cx="72" cy="48" r="17" fill="#ea580c" opacity="0.9"/>' +
        '<text x="72" y="51" text-anchor="middle" fill="white" font-size="7">导师23</text>' +
        '<circle cx="248" cy="48" r="17" fill="#42a5f5" opacity="0.9"/>' +
        '<text x="248" y="51" text-anchor="middle" fill="white" font-size="7">Bengio</text>' +
        '<circle cx="72" cy="152" r="16" fill="#fb923c" opacity="0.85"/>' +
        '<text x="72" y="155" text-anchor="middle" fill="white" font-size="7">导师21</text>' +
        '<circle cx="248" cy="152" r="16" fill="#34d399" opacity="0.9"/>' +
        '<text x="248" y="155" text-anchor="middle" fill="white" font-size="7">原创</text>' +
        '<line x1="142" y1="84" x2="88" y2="58" stroke="#fdba74" stroke-width="1.5"/>' +
        '<line x1="178" y1="84" x2="232" y2="58" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="4,3"/>' +
        '<line x1="142" y1="116" x2="88" y2="140" stroke="#fdba74" stroke-width="1.2" stroke-dasharray="3,3"/>' +
        '<line x1="178" y1="116" x2="232" y2="140" stroke="#6ee7b7" stroke-width="1.5"/>' +
        '<text x="108" y="64" fill="#fdba74" font-size="8">传承</text>' +
        '<text x="208" y="64" fill="#bfdbfe" font-size="8">引入</text>' +
        '<text x="208" y="148" fill="#a7f3d0" font-size="8">原创</text>' +
      '</svg></div>';

  var AI_ANNOT_SUGGESTIONS = {
    'p-bg-1': [
      '建议补充定量数据（如路径重规划延迟 > 200ms），避免"局限性"的主观表述',
      '可引用 Schulman et al. (2017) 等近3年综述强化研究动机',
      '注意与第三章研究假设的表述立场保持一致'
    ],
    'p-goal': [
      '研究目标建议采用可量化指标（成功率、路径长度等）表述',
      '技术路线可补充与现有 PPO 基线方法的对比说明',
      'ROS 仿真与真实平台验证的衔接步骤可再细化'
    ],
    'p-h2': [
      '假设 H2 建议给出可检验的量化阈值（如成功率 < 70%）',
      '需与绪论中对现有方法评价的表述统一，避免逻辑矛盾',
      '可补充该假设的实验验证方案概要'
    ],
    'p-innov': [
      '创新点建议与导师前期工作进行差异化对比说明',
      '预期成果（论文、开源）建议补充可考核的时间节点',
      '多目标奖励函数的设计依据可引用 1–2 篇核心文献'
    ]
  };

  var HERITAGE_TYPE_LABELS = { orange: '传承', blue: '引入', green: '原创' };
  var HERITAGE_TYPE_NAMES = { orange: '传承自导师论文', blue: '引入外部文献创新', green: '原创观点' };

  var _currentMentorProjId = 'PROJ-2026-0087';
  var _currentVersionId = 'v3';
  var _compareVersionId = null;
  var _annotateMode = false;
  var _heritageOverrides = {};
  var _heritagePending = {};
  var _heritageCorrections = {};
  var VERSION_ANNOTATIONS = {
    'PROJ-2026-0087': {
      v1: [
        {
          paraId: 'p-bg-1',
          text: '研究背景过于简略，请参照学院模板扩充至 800 字以上，并补充国内外研究现状',
          author: '张明远',
          time: '2026-03-10 14:30',
          cls: ''
        },
        {
          paraId: 'p-innov',
          text: '创新点章节待补充，请明确与现有工作的差异化贡献',
          author: '张明远',
          time: '2026-03-10 14:32',
          cls: 'a-red'
        }
      ],
      v2: [
        {
          paraId: 'p-bg-1',
          text: '请在此处补充具体的定量数据支撑"局限性"的说法，避免主观判断',
          author: '张明远',
          time: '2026-03-12 17:00',
          cls: ''
        },
        {
          paraId: 'p-h2',
          text: '与绪论第2段矛盾！绪论说"表现优秀"，这里说"无法处理"——请修改，统一表述',
          author: '张明远',
          time: '2026-03-12 17:05',
          cls: 'a-red'
        }
      ]
    }
  };

  var _mentorAnnotations = {
    'PROJ-2026-0087': [
      {
        id: 'ma-1',
        paraId: 'p-bg-1',
        quote: '传统路径规划算法在静态已知地图上表现良好，但在动态障碍物频繁出现的真实场景中存在明显局限性',
        text: '请在此处补充具体的定量数据支撑"局限性"的说法，避免主观判断',
        author: '张明远',
        time: '2026-03-14 10:20',
        cls: ''
      },
      {
        id: 'ma-2',
        paraId: 'p-h2',
        quote: 'H2：现有深度强化学习方法在高度动态障碍环境下避障成功率不足 70%',
        text: '与绪论第2段矛盾！绪论说"表现优秀"，这里说"无法处理"——请修改，统一表述',
        author: '张明远',
        time: '2026-03-14 10:25',
        cls: 'a-red'
      }
    ]
  };

  function getMentorMeta(projId) {
    return MENTOR_REVIEW_META[projId] || MENTOR_REVIEW_META['PROJ-2026-0087'];
  }

  function getHeritageReport(projId) {
    return HERITAGE_REPORTS[projId] || HERITAGE_REPORTS['PROJ-2026-0087'];
  }

  function getHeritageCorrections(projId) {
    if (!_heritageCorrections[projId]) _heritageCorrections[projId] = [];
    return _heritageCorrections[projId];
  }

  function getSegmentEffectiveType(projId, seg) {
    var segId = seg.id || seg.text;
    var pending = _heritagePending[projId];
    if (pending && pending[segId]) return pending[segId];
    var overrides = _heritageOverrides[projId];
    if (overrides && overrides[segId]) return overrides[segId];
    return seg.type;
  }

  function getHeritagePending(projId) {
    if (!_heritagePending[projId]) _heritagePending[projId] = {};
    return _heritagePending[projId];
  }

  function countHeritagePending(projId) {
    var pending = _heritagePending[projId];
    if (!pending) return 0;
    return Object.keys(pending).length;
  }

  function getCurrentVersionRecord(projId) {
    var versions = window.ARGP_MOCK ? window.ARGP_MOCK.getVersionHistory(projId) : [];
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].current) return versions[i];
    }
    return versions[0] || null;
  }

  function htmlToPlainText(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function tokenizeWords(text) {
    return text.split(/(\s+|，|。|；|、|：|（|）|\.|,|;|:|\(|\))/).filter(function (t) { return t.length; });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function computeDiffOps(oldTokens, newTokens) {
    var m = oldTokens.length;
    var n = newTokens.length;
    var dp = [];
    var i, j;
    for (i = 0; i <= m; i++) {
      dp[i] = [];
      for (j = 0; j <= n; j++) dp[i][j] = 0;
    }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        if (oldTokens[i - 1] === newTokens[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    var ops = [];
    i = m;
    j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldTokens[i - 1] === newTokens[j - 1]) {
        ops.unshift({ type: 'equal', text: oldTokens[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        ops.unshift({ type: 'insert', text: newTokens[j - 1] });
        j--;
      } else {
        ops.unshift({ type: 'delete', text: oldTokens[i - 1] });
        i--;
      }
    }
    return ops;
  }

  function diffToSideHtml(ops, side) {
    var html = '';
    ops.forEach(function (op) {
      var t = escapeHtml(op.text);
      if (op.type === 'equal') {
        html += t;
      } else if (side === 'old' && op.type === 'delete') {
        html += '<span class="diff-del">' + t + '</span>';
      } else if (side === 'new' && op.type === 'insert') {
        html += '<span class="diff-ins">' + t + '</span>';
      }
    });
    return html;
  }

  function diffParagraphText(oldText, newText, side) {
    var ops = computeDiffOps(tokenizeWords(oldText || ''), tokenizeWords(newText || ''));
    return diffToSideHtml(ops, side);
  }

  function annotationRecordToHtml(ann) {
    return '<div class="annotation mentor-annot' + (ann.cls ? ' ' + ann.cls : '') + '">' +
      '<div class="annot-hd"><span class="annot-author">' + ann.author + '</span>' +
      '<span class="annot-time mono">' + ann.time + '</span></div>' +
      '<div class="annot-body">' + ann.text + '</div></div>';
  }

  function getVersionAnnotations(projId, versionId) {
    var list = [];
    var byProj = VERSION_ANNOTATIONS[projId];
    if (byProj && byProj[versionId]) {
      list = byProj[versionId].slice();
    }
    var currentV = getCurrentVersionRecord(projId);
    if (currentV && versionId === currentV.id) {
      getAnnotations(projId).forEach(function (a) {
        var dup = list.some(function (x) { return x.paraId === a.paraId && x.text === a.text; });
        if (!dup) list.push(a);
      });
    }
    return list;
  }

  function extractDocSections(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var sections = [];
    var current = null;
    var paraIds = ['p-bg-1', 'p-goal', 'p-h2', 'p-innov'];
    var pIndex = 0;
    Array.prototype.forEach.call(div.children, function (el) {
      if (el.tagName === 'H3') {
        current = { title: el.outerHTML, titleText: (el.textContent || '').trim(), items: [] };
        sections.push(current);
      } else if (current) {
        if (el.classList && el.classList.contains('annotation')) {
          current.items.push({ kind: 'annot', html: el.outerHTML, isMentor: el.classList.contains('mentor-annot') || (el.textContent || '').indexOf('导师批注') >= 0 });
        } else if (el.tagName === 'P') {
          current.items.push({
            kind: 'p',
            text: (el.textContent || '').trim(),
            paraId: paraIds[pIndex] || 'p-' + pIndex
          });
          pIndex++;
        }
      }
    });
    return sections;
  }

  function mergeAnnotationsIntoSections(sections, annots) {
    annots.forEach(function (ann) {
      if (!ann.paraId) return;
      var inserted = false;
      sections.forEach(function (sec) {
        if (inserted) return;
        for (var i = 0; i < sec.items.length; i++) {
          var it = sec.items[i];
          if (it.kind !== 'p' || it.paraId !== ann.paraId) continue;
          var next = sec.items[i + 1];
          if (next && next.kind === 'annot') {
            inserted = true;
            return;
          }
          sec.items.splice(i + 1, 0, { kind: 'annot', html: annotationRecordToHtml(ann), isMentor: true });
          inserted = true;
          return;
        }
      });
    });
  }

  function findSectionByTitle(sections, titleText) {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].titleText === titleText) return sections[i];
    }
    return null;
  }

  function renderSectionPane(sideSections, otherSections, side) {
    var html = '';
    sideSections.forEach(function (sec) {
      html += sec.title;
      var otherSec = findSectionByTitle(otherSections, sec.titleText);
      var otherItems = otherSec ? otherSec.items : [];
      var pi = 0;
      var oi = 0;
      while (pi < sec.items.length || oi < otherItems.length) {
        var item = sec.items[pi];
        var oItem = otherItems[oi];
        if (item && item.kind === 'annot') {
          html += item.html;
          pi++;
          if (oItem && oItem.kind === 'annot') oi++;
        } else if (oItem && oItem.kind === 'annot' && (!item || item.kind !== 'annot')) {
          oi++;
        } else if (item && item.kind === 'p') {
          var oldT = side === 'old' ? item.text : (oItem && oItem.kind === 'p' ? oItem.text : '');
          var newT = side === 'new' ? item.text : (oItem && oItem.kind === 'p' ? oItem.text : '');
          html += '<p>' + diffParagraphText(oldT, newT, side) + '</p>';
          pi++;
          if (oItem && oItem.kind === 'p') oi++;
        } else if (oItem && oItem.kind === 'p') {
          if (side === 'old') {
            html += '<p>' + diffParagraphText(oItem.text, '', 'old') + '</p>';
          } else {
            html += '<p>' + diffParagraphText('', oItem.text, 'new') + '</p>';
          }
          oi++;
        } else {
          break;
        }
      }
    });
    return html;
  }

  function getPreviousVersionRecord(projId) {
    var versions = window.ARGP_MOCK ? window.ARGP_MOCK.getVersionHistory(projId) : [];
    var current = getCurrentVersionRecord(projId);
    if (!current) return null;
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].id === current.id && i + 1 < versions.length) {
        return versions[i + 1];
      }
    }
    return null;
  }

  function computeVersionChangeStats(oldSections, newSections) {
    var added = 0;
    var deleted = 0;
    var modified = 0;
    var modifiedAreas = [];
    var oldMap = {};
    var newMap = {};
    var titles = [];
    var seen = {};
    oldSections.forEach(function (s) {
      oldMap[s.titleText] = s;
      if (!seen[s.titleText]) { seen[s.titleText] = 1; titles.push(s.titleText); }
    });
    newSections.forEach(function (s) {
      newMap[s.titleText] = s;
      if (!seen[s.titleText]) { seen[s.titleText] = 1; titles.push(s.titleText); }
    });
    titles.forEach(function (title) {
      var oldSec = oldMap[title];
      var newSec = newMap[title];
      var shortTitle = title.replace(/^第?[一二三四五六七八九十]+、/, '').slice(0, 12);
      if (!oldSec && newSec) {
        newSec.items.forEach(function (it) {
          if (it.kind === 'p') {
            added++;
            if (modifiedAreas.indexOf(shortTitle) < 0) modifiedAreas.push(shortTitle);
          }
        });
        return;
      }
      if (oldSec && !newSec) {
        oldSec.items.forEach(function (it) {
          if (it.kind === 'p') deleted++;
        });
        return;
      }
      if (!oldSec || !newSec) return;
      var oldPs = oldSec.items.filter(function (x) { return x.kind === 'p'; });
      var newPs = newSec.items.filter(function (x) { return x.kind === 'p'; });
      var maxLen = Math.max(oldPs.length, newPs.length);
      var idx;
      for (idx = 0; idx < maxLen; idx++) {
        var op = oldPs[idx];
        var np = newPs[idx];
        if (!op && np) added++;
        else if (op && !np) deleted++;
        else if (op && np && op.text !== np.text) {
          modified++;
          if (modifiedAreas.indexOf(shortTitle) < 0) modifiedAreas.push(shortTitle);
        }
      }
    });
    return { added: added, deleted: deleted, modified: modified, modifiedAreas: modifiedAreas };
  }

  function buildDefaultChangeSummary(stats, prevId, currId) {
    var total = stats.added + stats.deleted + stats.modified;
    if (!total) return '相较 ' + prevId + ' 未检测到正文段落变更。';
    var bits = [];
    if (stats.modifiedAreas.length) {
      bits.push('主要修改集中在「' + stats.modifiedAreas.slice(0, 3).join('」「') + '」');
    }
    if (stats.modified) bits.push(stats.modified + ' 处段落修改');
    if (stats.added) bits.push(stats.added + ' 处段落新增');
    if (stats.deleted) bits.push(stats.deleted + ' 处段落删除');
    return bits.join('，') + '。';
  }

  function getVersionChangeInfo(projId) {
    var prev = getPreviousVersionRecord(projId);
    var curr = getCurrentVersionRecord(projId);
    if (!prev || !curr) return null;
    var oldSections = extractDocSections(prev.content);
    var newSections = extractDocSections(curr.content);
    var stats = computeVersionChangeStats(oldSections, newSections);
    var meta = getMentorMeta(projId);
    var aiSummary = meta.versionChangeSummary || buildDefaultChangeSummary(stats, prev.id, curr.id);
    return { prevVersion: prev, currVersion: curr, stats: stats, aiSummary: aiSummary };
  }

  function renderVersionChangeCardHtml(projId) {
    var info = getVersionChangeInfo(projId);
    if (!info) {
      return '<div class="mentor-ver-change-card is-empty">' +
        '<div class="mvc-hd"><span class="mvc-title">相较上一版变更</span></div>' +
        '<p class="mvc-summary">当前为首个提交版本，暂无可对比的上一版。</p></div>';
    }
    var prev = info.prevVersion;
    var curr = info.currVersion;
    var st = info.stats;
    var isActive = _compareVersionId === prev.id;
    var statsHtml = '';
    if (st.added) statsHtml += '<span class="mvc-stat mvc-add">+' + st.added + ' 新增段落</span>';
    if (st.deleted) statsHtml += '<span class="mvc-stat mvc-del">-' + st.deleted + ' 删除段落</span>';
    if (st.modified) statsHtml += '<span class="mvc-stat mvc-mod">~' + st.modified + ' 修改段落</span>';
    if (!st.added && !st.deleted && !st.modified) {
      statsHtml += '<span class="mvc-stat mvc-none">无段落变更</span>';
    }
    return '<button type="button" class="mentor-ver-change-card' + (isActive ? ' is-active' : '') + '" ' +
      'onclick="ARGP_MENTOR.openVersionCompareFromSummary()" title="点击查看 ' + prev.id + ' ↔ ' + curr.id + ' 版本对比">' +
      '<div class="mvc-hd">' +
        '<span class="mvc-title">相较上一版变更 · AI 概括</span>' +
        '<span class="mvc-ver mono">' + prev.id + ' → ' + curr.id + '</span></div>' +
      '<div class="mvc-stats">' + statsHtml + '</div>' +
      '<p class="mvc-summary">' + escapeHtml(info.aiSummary) + '</p>' +
      '<div class="mvc-foot">' + (isActive ? '点击返回当前版本 ←' : '点击查看版本对比 →') + '</div>' +
      '</button>';
  }

  function openVersionCompareFromSummary() {
    var prev = getPreviousVersionRecord(_currentMentorProjId);
    if (!prev) {
      if (typeof showToast === 'function') showToast('暂无可对比的上一版本', 'info');
      return;
    }
    if (_compareVersionId === prev.id) {
      var currentV = getCurrentVersionRecord(_currentMentorProjId);
      if (currentV) switchVersion(currentV.id);
      return;
    }
    switchVersion(prev.id);
  }

  function buildVersionDiffHtml(projId, compareVersionId) {
    var versions = window.ARGP_MOCK ? window.ARGP_MOCK.getVersionHistory(projId) : [];
    var currentV = getCurrentVersionRecord(projId);
    var compareV = versions.filter(function (v) { return v.id === compareVersionId; })[0];
    if (!currentV || !compareV) {
      return '<p class="text-muted">无法加载版本对比</p>';
    }
    var oldSections = extractDocSections(compareV.content);
    var newSections = extractDocSections(currentV.content);
    mergeAnnotationsIntoSections(oldSections, getVersionAnnotations(projId, compareV.id));
    mergeAnnotationsIntoSections(newSections, getVersionAnnotations(projId, currentV.id));
    return (
      '<div class="mentor-diff-legend">' +
        '<span><span class="diff-del" style="padding:1px 6px;text-decoration:none;">红色</span> 删除内容</span>' +
        '<span><span class="diff-ins" style="padding:1px 6px;">绿色</span> 新增内容</span>' +
        '<span class="text-muted" style="margin-left:auto;">导师批注保持原格式，不参与对比</span></div>' +
      '<div class="mentor-diff-layout">' +
        '<div class="mentor-diff-pane">' +
          '<div class="mentor-diff-label">对比版本 · ' + compareV.id + '</div>' +
          '<div class="mentor-diff-content">' + renderSectionPane(oldSections, newSections, 'old') + '</div></div>' +
        '<div class="mentor-diff-pane">' +
          '<div class="mentor-diff-label">当前版本 · ' + currentV.id + '</div>' +
          '<div class="mentor-diff-content">' + renderSectionPane(newSections, oldSections, 'new') + '</div></div></div>'
    );
  }

  function renderVersionDiffView(projId) {
    var body = document.getElementById('mentor-doc-body');
    if (!body || !_compareVersionId) return;
    body.innerHTML = buildVersionDiffHtml(projId, _compareVersionId);
    body.classList.remove('annot-mode');
  }

  function getAnnotations(projId) {
    if (!_mentorAnnotations[projId]) _mentorAnnotations[projId] = [];
    return _mentorAnnotations[projId];
  }

  function countByStatus() {
    var c = { pending: 0, revising: 0, approved: 0, all: MENTOR_PROJECTS.length };
    MENTOR_PROJECTS.forEach(function (p) {
      if (c[p.mentorStatus] != null) c[p.mentorStatus]++;
    });
    return c;
  }

  function sortedProjects(filter) {
    var list = MENTOR_PROJECTS.slice();
    if (filter && filter !== 'all') {
      list = list.filter(function (p) { return p.mentorStatus === filter; });
    }
    if (filter === 'all' || !filter) {
      var order = { pending: 0, revising: 1, approved: 2 };
      list.sort(function (a, b) {
        var oa = order[a.mentorStatus] != null ? order[a.mentorStatus] : 9;
        var ob = order[b.mentorStatus] != null ? order[b.mentorStatus] : 9;
        if (oa !== ob) return oa - ob;
        return a.sortOrder - b.sortOrder;
      });
    } else {
      list.sort(function (a, b) { return a.sortOrder - b.sortOrder; });
    }
    return list;
  }

  function renderMentorListTabs() {
    var tabs = document.getElementById('mentor-desk-tabs');
    if (!tabs) return;
    var c = countByStatus();
    tabs.innerHTML =
      '<div class="tab-item active" data-filter="all" onclick="activeTab(this)">所有项目 (' + c.all + ')</div>' +
      '<div class="tab-item" data-filter="pending" onclick="activeTab(this)">待审核 (' + c.pending + ')</div>' +
      '<div class="tab-item" data-filter="revising" onclick="activeTab(this)">修改中 (' + c.revising + ')</div>' +
      '<div class="tab-item" data-filter="approved" onclick="activeTab(this)">已通过 (' + c.approved + ')</div>';
  }

  function renderMentorListRows(filter) {
    var tbody = document.getElementById('mentor-desk-tbody');
    if (!tbody) return;
    filter = filter || 'all';
    var list = sortedProjects(filter);
    if (!list.length) {
      tbody.innerHTML = '<tr class="tab-empty-row"><td colspan="7" class="tab-empty-cell">该分类下暂无项目</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (p) {
      var st = MENTOR_STATUS[p.mentorStatus] || MENTOR_STATUS.pending;
      var rowBg = (filter === 'all' && p.mentorStatus === 'pending') ? ' style="background:#fffbeb;"' : '';
      var scoreCls = p.aiScore >= 85 ? 'text-green' : p.aiScore >= 70 ? 'text-warn' : 'text-danger';
      var btnLabel = p.mentorStatus === 'pending' ? '立即审阅' : '查看';
      var btnCls = p.mentorStatus === 'pending' ? 'btn-primary' : 'btn-secondary';
      var statusCell = '<span class="badge ' + st.badge + '">' + st.label + '</span>';
      if (p.mentorStatus === 'approved' && p.workflowStage) {
        statusCell += '<div class="text-xs text-primary" style="margin-top:4px;font-weight:500;">' + p.workflowStage + '</div>';
      }
      var issueCell = p.mentorStatus === 'approved' && p.workflowStage
        ? '<span class="text-xs text-muted">导师审核已完成</span>'
        : '<span class="text-xs ' + (p.aiIssueCls || 'text-muted') + '">' + p.aiIssue + '</span>';
      return '<tr data-tab="' + p.mentorStatus + '"' + rowBg + '>' +
        '<td><div class="td-name" onclick="ARGP_MENTOR.openReview(\'' + p.id + '\')">' + p.title + '</div>' +
        '<div class="td-id">' + p.id + ' · ' + p.type + '</div></td>' +
        '<td>' + p.student + ' <span class="text-xs text-muted">' + p.grade + '</span></td>' +
        '<td>' + statusCell + '</td>' +
        '<td><span class="mono ' + scoreCls + '" style="font-weight:500;">' + p.aiScore + '分</span></td>' +
        '<td>' + issueCell + '</td>' +
        '<td class="text-xs text-muted">' + p.submitted + '</td>' +
        '<td><button class="btn btn-sm ' + btnCls + '" onclick="ARGP_MENTOR.openReview(\'' + p.id + '\')">' + btnLabel + '</button></td></tr>';
    }).join('');
  }

  function renderMentorList() {
    renderMentorListTabs();
    renderMentorListRows('all');
    var c = countByStatus();
    var sub = document.getElementById('mentor-desk-sub');
    if (sub) sub.textContent = MENTOR_NAME + ' · 共指导 ' + c.all + ' 个项目';
    var statPending = document.getElementById('mentor-stat-pending');
    var statTotal = document.getElementById('mentor-stat-total');
    if (statPending) statPending.textContent = String(c.pending);
    if (statTotal) statTotal.textContent = String(c.all);
    if (window.ARGP_UI && window.ARGP_UI.initTabGroups) {
      var page = document.getElementById('page-mentor-list');
      if (page) window.ARGP_UI.initTabGroups(page);
    }
  }

  function onMentorTabFilter(el) {
    if (!el) return;
    var filter = el.getAttribute('data-filter') || 'all';
    renderMentorListRows(filter);
  }

  function renderDocWithAnnotations(projId) {
    var body = document.getElementById('mentor-doc-body');
    if (!body) return;
    if (_compareVersionId) {
      cancelInlineDraft();
      renderVersionDiffView(projId);
      return;
    }
    var versions = window.ARGP_MOCK ? window.ARGP_MOCK.getVersionHistory(projId) : [];
    var v = versions.filter(function (x) { return x.id === _currentVersionId; })[0];
    if (!v && versions.length) {
      v = versions.filter(function (x) { return x.current; })[0] || versions[0];
      _currentVersionId = v.id;
    }
    if (v) {
      body.innerHTML = v.content;
      body.querySelectorAll('.annotation').forEach(function (el) { el.remove(); });
      body.querySelectorAll('.hl-yellow, .hl-red').forEach(function (el) {
        var parent = el.parentNode;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
      });
    } else {
      body.innerHTML = '<p>暂无申请书正文</p>';
    }

    body.querySelectorAll('[data-para-id]').forEach(function (el) {
      el.removeAttribute('data-para-id');
    });
    var paras = body.querySelectorAll('p');
    var paraIds = ['p-bg-1', 'p-goal', 'p-h2', 'p-innov'];
    paras.forEach(function (p, i) {
      if (paraIds[i]) {
        p.setAttribute('data-para-id', paraIds[i]);
        p.setAttribute('data-annotatable', 'true');
      }
    });

    getAnnotations(projId).forEach(function (ann) {
      applyQuoteHighlight(body, ann);
      insertAnnotationBlock(body, ann);
    });
  }

  function getAnnotationById(annId) {
    var list = getAnnotations(_currentMentorProjId);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === annId) return list[i];
    }
    return null;
  }

  function markClassForAnn(ann) {
    return 'hl-annot-mark' + (ann.cls === 'a-red' ? ' hl-annot-red' : '');
  }

  function applyQuoteHighlight(body, ann) {
    if (!ann.quote) return;
    var para = body.querySelector('[data-para-id="' + ann.paraId + '"]');
    if (!para) return;
    if (para.querySelector('[data-annot-id="' + ann.id + '"]')) {
      syncMarkEmphasis(ann);
      return;
    }
    var html = para.innerHTML;
    var idx = html.indexOf(ann.quote);
    if (idx === -1) return;
    var before = html.slice(0, idx);
    var after = html.slice(idx + ann.quote.length);
    para.innerHTML = before +
      '<span class="' + markClassForAnn(ann) + '" data-annot-id="' + ann.id + '">' + ann.quote + '</span>' +
      after;
  }

  function syncMarkEmphasis(ann) {
    var mark = document.querySelector('#mentor-doc-body [data-annot-id="' + ann.id + '"].hl-annot-mark');
    if (!mark) return;
    mark.classList.toggle('hl-annot-red', ann.cls === 'a-red');
  }

  function buildAnnotationHtml(ann, editing) {
    var redActive = ann.cls === 'a-red' ? ' is-active' : '';
    var toolbar = editing
      ? '<button type="button" class="annot-tool-btn annot-tool-save" onclick="ARGP_MENTOR.saveAnnotationEdit(\'' + ann.id + '\')">保存</button>' +
        '<button type="button" class="annot-tool-btn" onclick="ARGP_MENTOR.cancelAnnotationEdit(\'' + ann.id + '\')">取消</button>'
      : '<button type="button" class="annot-tool-btn" onclick="ARGP_MENTOR.startEditAnnotation(\'' + ann.id + '\')">编辑</button>' +
        '<button type="button" class="annot-tool-btn annot-tool-red' + redActive + '" onclick="ARGP_MENTOR.toggleAnnotationEmphasis(\'' + ann.id + '\')" title="红色强调注意">标红</button>' +
        '<button type="button" class="annot-del" onclick="ARGP_MENTOR.deleteAnnotation(\'' + ann.id + '\')" title="删除批注">×</button>';
    var bodyCls = editing ? ' annot-body is-editing' : ' annot-body';
    var bodyAttr = editing ? ' contenteditable="true"' : '';
    return '<div class="annot-hd">' +
      '<span class="annot-author">' + ann.author + '</span>' +
      '<span class="annot-time mono">' + ann.time + (ann.editedAt ? ' · 已编辑' : '') + '</span>' +
      '<div class="annot-toolbar">' + toolbar + '</div></div>' +
      '<div class="' + bodyCls.trim() + '"' + bodyAttr + '>' + ann.text + '</div>';
  }

  function refreshAnnotationBlock(ann, editing) {
    var block = document.querySelector('.mentor-annot[data-annot-id="' + ann.id + '"]');
    if (!block) return;
    block.className = 'annotation mentor-annot' + (ann.cls ? ' ' + ann.cls : '') + (editing ? ' is-editing' : '');
    block.innerHTML = buildAnnotationHtml(ann, editing);
    if (editing) {
      var body = block.querySelector('.annot-body');
      if (body) body.focus();
    }
  }

  function insertAnnotationBlock(body, ann) {
    var para = body.querySelector('[data-para-id="' + ann.paraId + '"]');
    if (!para) return;
    var existing = document.querySelector('.mentor-annot[data-annot-id="' + ann.id + '"]');
    if (existing) {
      refreshAnnotationBlock(ann, false);
      return;
    }
    var div = document.createElement('div');
    div.className = 'annotation mentor-annot' + (ann.cls ? ' ' + ann.cls : '');
    div.setAttribute('data-annot-id', ann.id);
    div.innerHTML = buildAnnotationHtml(ann, false);
    para.parentNode.insertBefore(div, para.nextSibling);
  }

  function startEditAnnotation(annId) {
    var ann = getAnnotationById(annId);
    if (!ann) return;
    var block = document.querySelector('.mentor-annot[data-annot-id="' + annId + '"]');
    if (block) block.dataset.editOrig = ann.text;
    refreshAnnotationBlock(ann, true);
  }

  function saveAnnotationEdit(annId) {
    var ann = getAnnotationById(annId);
    var block = document.querySelector('.mentor-annot[data-annot-id="' + annId + '"]');
    if (!ann || !block) return;
    var body = block.querySelector('.annot-body');
    var text = body ? (body.textContent || '').trim() : '';
    if (!text) {
      if (typeof showToast === 'function') showToast('批注内容不能为空', 'warn');
      return;
    }
    ann.text = text;
    ann.editedAt = formatNow();
    refreshAnnotationBlock(ann, false);
    if (typeof showToast === 'function') showToast('批注已更新', 'success');
  }

  function cancelAnnotationEdit(annId) {
    var ann = getAnnotationById(annId);
    if (!ann) return;
    var block = document.querySelector('.mentor-annot[data-annot-id="' + annId + '"]');
    if (block && block.dataset.editOrig != null) {
      ann.text = block.dataset.editOrig;
    }
    refreshAnnotationBlock(ann, false);
  }

  function toggleAnnotationEmphasis(annId) {
    var ann = getAnnotationById(annId);
    if (!ann) return;
    ann.cls = ann.cls === 'a-red' ? '' : 'a-red';
    syncMarkEmphasis(ann);
    refreshAnnotationBlock(ann, false);
    if (typeof showToast === 'function') {
      showToast(ann.cls === 'a-red' ? '已标红强调' : '已恢复默认批注样式', 'info');
    }
  }

  function renderVersionSwitcher(projId) {
    var el = document.getElementById('mentor-version-switch');
    if (!el) return;
    var versions = window.ARGP_MOCK ? window.ARGP_MOCK.getVersionHistory(projId) : [];
    if (!versions.length) {
      el.innerHTML = '<span class="text-xs text-muted">无历史版本</span>';
      return;
    }
    var currentV = getCurrentVersionRecord(projId);
    var currentId = currentV ? currentV.id : _currentVersionId;
    el.innerHTML = versions.map(function (v) {
      var isCurrent = v.id === currentId;
      var active = '';
      if (isCurrent && !_compareVersionId) active = ' active';
      else if (!isCurrent && _compareVersionId === v.id) active = ' active';
      var lock = v.locked ? ' 🔒' : '';
      var suffix = isCurrent ? '' : ' ⇄';
      return '<button type="button" class="mentor-ver-btn' + active + '" title="' +
        (isCurrent ? '查看当前版本' : '与当前版本对比') + '" onclick="ARGP_MENTOR.switchVersion(\'' + v.id + '\')">' +
        v.id + lock + suffix + '</button>';
    }).join('');
  }

  function renderMentorReview() {
    var projId = _currentMentorProjId;
    var p = MENTOR_PROJECTS.filter(function (x) { return x.id === projId; })[0];
    var meta = getMentorMeta(projId);
    var st = p ? (MENTOR_STATUS[p.mentorStatus] || MENTOR_STATUS.pending) : MENTOR_STATUS.pending;

    var titleEl = document.getElementById('mentor-review-title');
    var idEl = document.getElementById('mentor-review-id');
    var badgeEl = document.getElementById('mentor-review-badge');
    if (titleEl) titleEl.textContent = p ? p.title : '导师审阅工作台';
    if (idEl) idEl.textContent = projId;
    if (badgeEl) {
      badgeEl.textContent = st.label;
      badgeEl.className = 'badge ' + st.badge;
    }

    var metaPanel = document.getElementById('mentor-meta-panel');
    if (metaPanel) {
      metaPanel.innerHTML =
        '<div class="meta-row"><span class="meta-k">申请人</span><span class="meta-v">' + meta.student + '</span></div>' +
        '<div class="meta-row"><span class="meta-k">年级</span><span class="meta-v">' + meta.grade + '</span></div>' +
        '<div class="meta-row"><span class="meta-k">提交时间</span><span class="meta-v text-xs">' + meta.submitted + '</span></div>' +
        '<div class="meta-row"><span class="meta-k">版本视图</span><span class="meta-v text-xs">' +
          (_compareVersionId
            ? '<span class="mono">对比 ' + _compareVersionId + ' ↔ ' + _currentVersionId + '</span>'
            : '<span class="mono">' + _currentVersionId + '（当前）</span>') +
        '</span></div>' +
        '<div class="meta-row"><span class="meta-k">AI质量分</span><span class="meta-v mono text-warn">' + meta.aiScore + '分</span></div>' +
        '<div class="meta-row"><span class="meta-k">审阅轮次</span><span class="meta-v">' + meta.round + '</span></div>';
    }

    var advisorEl = document.getElementById('mentor-advisor-summary');
    if (advisorEl) {
      advisorEl.innerHTML =
        '<div class="ai-cell"><div class="ai-cell-lbl">关键问题</div>' + meta.advisorSummary.issues + '</div>' +
        '<div class="ai-cell"><div class="ai-cell-lbl">质量亮点</div>' + meta.advisorSummary.highlights + '</div>' +
        renderVersionChangeCardHtml(projId);
    }

    var aiSumEl = document.getElementById('mentor-ai-check-summary');
    if (aiSumEl) aiSumEl.textContent = meta.aiSummary;

    var opinionEl = document.getElementById('mentor-opinion-text');
    if (opinionEl && !opinionEl.dataset.touched) opinionEl.value = meta.defaultOpinion;

    renderVersionSwitcher(projId);
    renderDocWithAnnotations(projId);
    updateAnnotModeUI();
    updateSignUi();
  }

  function openReview(projId) {
    if (projId) _currentMentorProjId = projId;
    _currentVersionId = 'v3';
    _compareVersionId = null;
    _annotateMode = false;
    var opinionEl = document.getElementById('mentor-opinion-text');
    if (opinionEl) delete opinionEl.dataset.touched;
    if (typeof showPage === 'function') showPage('mentor-review');
    renderMentorReview();
  }

  function switchVersion(versionId) {
    var currentV = getCurrentVersionRecord(_currentMentorProjId);
    var currentId = currentV ? currentV.id : _currentVersionId;
    if (versionId === currentId) {
      _compareVersionId = null;
      _currentVersionId = versionId;
      if (typeof showToast === 'function') showToast('已返回当前版本视图', 'info');
    } else {
      _compareVersionId = versionId;
      _currentVersionId = currentId;
      _annotateMode = false;
      cancelInlineDraft();
      if (typeof showToast === 'function') showToast('已开启与 ' + versionId + ' 的版本对比', 'info');
    }
    renderMentorReview();
  }

  function toggleAnnotMode() {
    if (_compareVersionId) {
      if (typeof showToast === 'function') showToast('版本对比模式下请返回当前版本后再批注', 'warn');
      return;
    }
    _annotateMode = !_annotateMode;
    updateAnnotModeUI();
    if (typeof showToast === 'function') {
      showToast(_annotateMode ? '批注模式：选中文字划线后输入批注，可使用 AI 建议' : '已退出批注模式', 'info');
    }
    if (!_annotateMode) cancelInlineDraft();
  }

  function updateAnnotModeUI() {
    var btn = document.getElementById('mentor-btn-annot');
    var body = document.getElementById('mentor-doc-body');
    if (btn) {
      btn.classList.toggle('active', _annotateMode);
      btn.disabled = !!_compareVersionId;
      btn.title = _compareVersionId ? '版本对比模式下不可用' : '';
    }
    if (body && !_compareVersionId) body.classList.toggle('annot-mode', _annotateMode);
  }

  function formatNow() {
    var d = new Date();
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function findParaId(node) {
    var el = node;
    while (el && el !== document.body) {
      if (el.getAttribute && el.getAttribute('data-para-id')) return el.getAttribute('data-para-id');
      el = el.parentNode;
    }
    return 'p-bg-1';
  }

  function getActiveComposePanel() {
    return document.querySelector('#mentor-doc-body .annot-compose-panel');
  }

  function unwrapTempMark(mark) {
    if (!mark || !mark.parentNode) return;
    var parent = mark.parentNode;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
  }

  function cancelInlineDraft() {
    var panel = getActiveComposePanel();
    if (!panel) return;
    var mark = panel.getAttribute('data-mark-id')
      ? document.querySelector('#mentor-doc-body [data-temp-mark="' + panel.getAttribute('data-mark-id') + '"]')
      : null;
    if (mark) unwrapTempMark(mark);
    panel.remove();
  }

  function closeAnnotCompose() {
    cancelInlineDraft();
  }

  function confirmInlineDraft() {
    var panel = getActiveComposePanel();
    if (!panel) return;
    var draftEl = panel.querySelector('.annot-inline-draft');
    finalizeInlineDraft(draftEl);
  }

  function finalizeInlineDraft(draftEl) {
    var panel = getActiveComposePanel();
    if (!panel) return;
    if (!draftEl) draftEl = panel.querySelector('.annot-inline-draft');
    if (!draftEl) return;
    var text = (draftEl.textContent || '').trim();
    var markId = panel.getAttribute('data-mark-id');
    var mark = markId
      ? document.querySelector('#mentor-doc-body [data-temp-mark="' + markId + '"]')
      : null;
    if (!mark) {
      panel.remove();
      return;
    }
    if (!text) {
      cancelInlineDraft();
      return;
    }
    var paraId = panel.getAttribute('data-para-id') || findParaId(mark);
    var quote = mark.textContent || '';
    var annId = 'ma-' + Date.now();
    mark.setAttribute('data-annot-id', annId);
    mark.removeAttribute('data-temp-mark');
    panel.remove();

    var ann = {
      id: annId,
      paraId: paraId,
      quote: quote,
      text: text,
      author: '张明远',
      time: formatNow(),
      cls: ''
    };
    getAnnotations(_currentMentorProjId).push(ann);
    applyQuoteHighlight(document.getElementById('mentor-doc-body'), ann);
    var body = document.getElementById('mentor-doc-body');
    if (body) insertAnnotationBlock(body, ann);
    if (typeof showToast === 'function') showToast('批注已添加', 'success');
  }

  function showAiAnnotSuggestions() {
    var panel = getActiveComposePanel();
    if (!panel) return;
    var box = panel.querySelector('.annot-ai-suggestions');
    var aiBtn = panel.querySelector('.annot-compose-ai');
    if (!box) return;
    if (box.style.display !== 'none' && box.innerHTML.trim()) {
      box.style.display = 'none';
      if (aiBtn) aiBtn.classList.remove('is-open');
      return;
    }
    var paraId = panel.getAttribute('data-para-id') || 'p-bg-1';
    var list = AI_ANNOT_SUGGESTIONS[paraId] || AI_ANNOT_SUGGESTIONS['p-bg-1'];
    var picks = list.slice(0, 3);
    box.style.display = '';
    box.innerHTML =
      '<div class="annot-ai-suggest-hd">Advisor Agent · 为本段生成 ' + picks.length + ' 条批注建议 <span class="text-xs text-muted">· AI 生成</span></div>' +
      picks.map(function (s, i) {
        return '<div class="annot-ai-suggest-item" role="button" tabindex="0" onclick="ARGP_MENTOR.applyAiAnnotSuggestion(' + i + ')">' + s + '</div>';
      }).join('');
    panel._aiSuggestions = picks;
    if (aiBtn) aiBtn.classList.add('is-open');
    if (typeof showToast === 'function') showToast('已生成 ' + picks.length + ' 条 AI 批注建议', 'info');
  }

  function applyAiAnnotSuggestion(index) {
    var panel = getActiveComposePanel();
    if (!panel || !panel._aiSuggestions) return;
    var draft = panel.querySelector('.annot-inline-draft');
    if (!draft || !panel._aiSuggestions[index]) return;
    draft.textContent = panel._aiSuggestions[index];
    draft.focus();
  }

  function bindInlineDraftEvents(draftEl, panel) {
    draftEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        confirmInlineDraft();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        cancelInlineDraft();
      }
    });
    panel.querySelectorAll('.annot-compose-toolbar button').forEach(function (btn) {
      btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
    });
  }

  function onDocMouseUp(e) {
    if (!_annotateMode || _compareVersionId) return;
    if (e.target && e.target.closest && e.target.closest('.annot-inline-draft')) return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    var range = sel.getRangeAt(0);
    var body = document.getElementById('mentor-doc-body');
    if (!body || !body.contains(range.commonAncestorContainer)) return;
    var anc = range.commonAncestorContainer;
    if (anc.nodeType === 3) anc = anc.parentElement;
    if (anc && anc.closest && (anc.closest('.annot-inline-draft') || anc.closest('.annot-compose-panel'))) return;

    cancelInlineDraft();

    var para = anc && anc.closest ? anc.closest('[data-para-id]') : null;
    var paraId = para ? para.getAttribute('data-para-id') : findParaId(range.commonAncestorContainer);
    var markId = 'mk-' + Date.now();

    var mark = document.createElement('span');
    mark.className = 'hl-annot-mark';
    mark.setAttribute('data-temp-mark', markId);
    try {
      range.surroundContents(mark);
    } catch (err) {
      sel.removeAllRanges();
      if (typeof showToast === 'function') showToast('请在同一段落内选择文字', 'warn');
      return;
    }

    var panel = document.createElement('div');
    panel.className = 'annot-compose-panel';
    panel.setAttribute('data-para-id', paraId);
    panel.setAttribute('data-mark-id', markId);
    panel.innerHTML =
      '<span class="annot-inline-draft" contenteditable="true" spellcheck="false"></span>' +
      '<div class="annot-compose-toolbar">' +
        '<button type="button" class="annot-compose-btn annot-compose-ai" onclick="ARGP_MENTOR.showAiAnnotSuggestions()">AI 建议</button>' +
        '<button type="button" class="annot-compose-btn annot-compose-confirm" onclick="ARGP_MENTOR.confirmInlineDraft()">确认</button>' +
        '<button type="button" class="annot-compose-btn annot-compose-close" onclick="ARGP_MENTOR.closeAnnotCompose()">关闭</button>' +
      '</div>' +
      '<div class="annot-ai-suggestions" style="display:none;"></div>';

    if (para && para.parentNode) {
      var insertAfter = para;
      while (insertAfter.nextSibling && insertAfter.nextSibling.classList &&
        insertAfter.nextSibling.classList.contains('mentor-annot')) {
        insertAfter = insertAfter.nextSibling;
      }
      insertAfter.parentNode.insertBefore(panel, insertAfter.nextSibling);
    }

    sel.removeAllRanges();
    var draft = panel.querySelector('.annot-inline-draft');
    bindInlineDraftEvents(draft, panel);
    draft.focus();
  }

  function deleteAnnotation(annId) {
    var list = getAnnotations(_currentMentorProjId);
    _mentorAnnotations[_currentMentorProjId] = list.filter(function (a) { return a.id !== annId; });
    renderDocWithAnnotations(_currentMentorProjId);
    if (typeof showToast === 'function') showToast('批注已删除', 'info');
  }

  function renderHeritageSegmentHtml(seg, idx, projId) {
    var segId = seg.id || 'hs-' + idx;
    var effective = getSegmentEffectiveType(projId, seg);
    var colorBtns = ['orange', 'blue', 'green'].map(function (t) {
      return '<button type="button" class="heritage-color-btn hcb-' + t + (effective === t ? ' active' : '') +
        '" onclick="ARGP_MENTOR.setHeritageSegmentType(\'' + segId + '\',\'' + t + '\')">' +
        HERITAGE_TYPE_LABELS[t] + '</button>';
    }).join('');
    return '<div class="heritage-seg heritage-' + effective + '" id="heritage-seg-' + segId + '">' +
      '<div class="heritage-seg-hd">' +
        '<span class="heritage-type-badge hb-' + effective + '">' + HERITAGE_TYPE_LABELS[effective] + '</span>' +
        '<span class="heritage-type-name">' + HERITAGE_TYPE_NAMES[effective] + '</span>' +
        '<div class="heritage-seg-actions">' + colorBtns + '</div></div>' +
      '<div class="heritage-seg-text">' + seg.text + '</div>' +
      '<div class="heritage-seg-source"><span class="heritage-src-lbl">来源标注</span>' + seg.source + '</div></div>';
  }

  function countHeritageStats(projId, segments) {
    var c = { orange: 0, blue: 0, green: 0 };
    segments.forEach(function (seg) {
      var t = getSegmentEffectiveType(projId, seg);
      if (c[t] != null) c[t]++;
    });
    return c;
  }

  function renderHeritagePendingBar(projId) {
    var n = countHeritagePending(projId);
    if (!n) return '';
    return '<div class="heritage-pending-bar" id="heritage-pending-bar">' +
      '<div class="pending-text">待确认修正 <strong>' + n + '</strong> 处标注颜色，确认后将上传至模型改进记录</div>' +
      '<button type="button" class="btn btn-sm btn-primary" onclick="ARGP_MENTOR.confirmHeritageCorrections()">确认上传修正记录</button>' +
      '</div>';
  }

  function renderHeritageCorrectionsHtml(projId) {
    var list = getHeritageCorrections(projId);
    if (!list.length) {
      return '<div class="heritage-corrections">' +
        '<div class="heritage-corrections-title">导师修正记录 <span class="text-xs text-muted">· 用于模型改进</span></div>' +
        '<p class="text-xs text-muted" style="margin:0;line-height:1.6;">暂无已上传记录。修改标注颜色后请点击底部「确认上传修正记录」。</p></div>';
    }
    var items = list.slice().reverse().map(function (c) {
      return '<div class="heritage-correction-item">' +
        '<span class="mono text-xs">' + c.time + '</span> · ' +
        '「' + c.text + '」' +
        ' <span class="hs-' + c.from + '" style="padding:1px 6px;border-radius:3px;font-size:10px;">' + HERITAGE_TYPE_LABELS[c.from] + '</span>' +
        ' → <span class="hs-' + c.to + '" style="padding:1px 6px;border-radius:3px;font-size:10px;">' + HERITAGE_TYPE_LABELS[c.to] + '</span>' +
        '</div>';
    }).join('');
    return '<div class="heritage-corrections">' +
      '<div class="heritage-corrections-title">导师修正记录 <span class="text-xs text-muted">· 已上传 · 用于模型改进 · 共 ' + list.length + ' 条</span></div>' +
      items + '</div>';
  }

  function renderHeritageModalBody() {
    var content = document.getElementById('heritage-modal-body');
    if (!content) return;
    var projId = _currentMentorProjId;
    var report = getHeritageReport(projId);
    var stats = countHeritageStats(projId, report.segments);
    var segsHtml = report.segments.map(function (seg, i) {
      return renderHeritageSegmentHtml(seg, i, projId);
    }).join('');
    content.innerHTML =
      '<div class="heritage-modal-hd">' +
        '<div><div class="heritage-modal-title">' + report.title + '</div>' +
        '<div class="heritage-modal-sub">' + report.subtitle + ' · ' + projId + '</div></div>' +
        '<button type="button" class="heritage-modal-close" onclick="ARGP_MENTOR.closeHeritageModal()">×</button></div>' +
      '<div class="heritage-legend">' +
        '<span class="heritage-legend-item"><i class="hb-dot hb-orange"></i>橙色 · 传承自导师论文</span>' +
        '<span class="heritage-legend-item"><i class="hb-dot hb-blue"></i>蓝色 · 引入外部文献创新</span>' +
        '<span class="heritage-legend-item"><i class="hb-dot hb-green"></i>绿色 · 原创观点</span></div>' +
      '<div class="heritage-stats">' +
        '<span class="heritage-stat hs-orange">传承 ' + stats.orange + ' 处</span>' +
        '<span class="heritage-stat hs-blue">引入 ' + stats.blue + ' 处</span>' +
        '<span class="heritage-stat hs-green">原创 ' + stats.green + ' 处</span></div>' +
      '<div class="heritage-seg-list">' + segsHtml + '</div>' +
      renderHeritagePendingBar(projId) +
      renderHeritageCorrectionsHtml(projId) +
      '<div class="heritage-kg-section">' +
        '<div class="heritage-kg-title">知识传承图谱</div>' +
        HERITAGE_KG_SVG +
        '<div class="heritage-kg-caption">知识传承图谱 · AI 生成 · 仅供参考</div></div>' +
      '<div class="heritage-modal-ft">Knowledge Graph Agent · AI 生成 · 仅供参考 · 检测时间 2026-03-14</div>';
  }

  function getSegmentConfirmedType(projId, seg) {
    var segId = seg.id || seg.text;
    var overrides = _heritageOverrides[projId];
    if (overrides && overrides[segId]) return overrides[segId];
    return seg.type;
  }

  function setHeritageSegmentType(segId, newType) {
    var projId = _currentMentorProjId;
    var report = getHeritageReport(projId);
    var seg = null;
    report.segments.forEach(function (s, i) {
      var id = s.id || 'hs-' + i;
      if (id === segId) seg = s;
    });
    if (!seg) return;
    var confirmedType = getSegmentConfirmedType(projId, seg);
    var pending = getHeritagePending(projId);
    if (newType === confirmedType) {
      delete pending[segId];
    } else {
      pending[segId] = newType;
    }
    renderHeritageModalBody();
    if (typeof showToast === 'function') {
      showToast(countHeritagePending(projId) ? '已暂存修正，请确认上传' : '已恢复为已确认标注', 'info');
    }
  }

  function confirmHeritageCorrections() {
    var projId = _currentMentorProjId;
    var pending = getHeritagePending(projId);
    var keys = Object.keys(pending);
    if (!keys.length) {
      if (typeof showToast === 'function') showToast('暂无待确认的修正', 'warn');
      return;
    }
    if (!_heritageOverrides[projId]) _heritageOverrides[projId] = {};
    var report = getHeritageReport(projId);
    keys.forEach(function (segId) {
      var seg = null;
      report.segments.forEach(function (s, i) {
        if ((s.id || 'hs-' + i) === segId) seg = s;
      });
      if (!seg) return;
      var fromType = getSegmentConfirmedType(projId, seg);
      var toType = pending[segId];
      if (fromType === toType) return;
      _heritageOverrides[projId][segId] = toType;
      getHeritageCorrections(projId).push({
        segId: segId,
        text: seg.text.length > 36 ? seg.text.slice(0, 36) + '…' : seg.text,
        from: fromType,
        to: toType,
        original: seg.type,
        time: formatNow(),
        mentor: '张明远'
      });
    });
    _heritagePending[projId] = {};
    renderHeritageModalBody();
    if (typeof showToast === 'function') showToast('修正记录已上传，将用于模型改进', 'success');
  }

  function openHeritageModal() {
    var modal = document.getElementById('heritage-modal');
    if (!modal) return;
    renderHeritageModalBody();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeHeritageModal() {
    var modal = document.getElementById('heritage-modal');
    if (modal) modal.classList.remove('open');
    if (!document.getElementById('sign-confirm-modal') || !document.getElementById('sign-confirm-modal').classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  function getMentorProject(projId) {
    projId = projId || _currentMentorProjId;
    for (var i = 0; i < MENTOR_PROJECTS.length; i++) {
      if (MENTOR_PROJECTS[i].id === projId) return MENTOR_PROJECTS[i];
    }
    return null;
  }

  function isProjectSigned(projId) {
    var p = getMentorProject(projId);
    return !!(p && p.signed);
  }

  function updateSignUi() {
    var p = getMentorProject(_currentMentorProjId);
    var area = document.getElementById('mentor-sign-area');
    var approveBtn = document.getElementById('mentor-btn-approve');
    var actions = document.getElementById('mentor-review-actions');
    if (!p) return;

    if (area) {
      if (p.signed) {
        area.innerHTML =
          '<div style="font-size:13px;color:var(--success);font-weight:600;">✓ 已完成电子签名</div>' +
          '<div style="font-size:11.5px;color:var(--text-3);margin-top:4px;">' + MENTOR_NAME + ' · ' + (p.signedAt || formatNow()) + '</div>' +
          '<div style="font-size:11.5px;color:var(--text-3);margin-top:2px;">签名后审核意见将推送至学生端</div>';
        area.style.borderColor = 'var(--success)';
        area.style.background = 'var(--success-bg)';
      } else {
        area.innerHTML =
          '<div style="font-size:13px;color:var(--text-2);">导师电子签字确认</div>' +
          '<div style="font-size:11.5px;color:var(--text-3);margin-top:3px;">审核通过前须先完成电子签名（选择「同意通过」不会自动签名）</div>' +
          '<button class="btn btn-success" type="button" style="margin-top:10px;padding:6px 16px;font-size:13px;" onclick="ARGP_MENTOR.openSignConfirm()">点击电子签字</button>';
        area.style.borderColor = '';
        area.style.background = 'var(--bg)';
      }
    }

    if (actions) {
      actions.style.display = p.mentorStatus === 'pending' ? '' : 'none';
    }
    if (approveBtn) {
      approveBtn.classList.toggle('is-awaiting-sign', !p.signed);
      approveBtn.title = p.signed ? '' : '请先完成电子签名';
    }
  }

  function openSignConfirm() {
    var p = getMentorProject(_currentMentorProjId);
    if (p && p.signed) {
      if (typeof showToast === 'function') showToast('已完成电子签名，无需重复签名', 'info');
      return;
    }
    var modal = document.getElementById('sign-confirm-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSignConfirm() {
    var modal = document.getElementById('sign-confirm-modal');
    if (modal) modal.classList.remove('open');
    if (!document.getElementById('approve-submit-modal') || !document.getElementById('approve-submit-modal').classList.contains('open')) {
      if (!document.getElementById('heritage-modal') || !document.getElementById('heritage-modal').classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  function confirmSign() {
    var p = getMentorProject(_currentMentorProjId);
    closeSignConfirm();
    if (!p) return;
    p.signed = true;
    p.signedAt = formatNow();
    updateSignUi();
    if (typeof showToast === 'function') showToast('电子签名已完成，可进行审核通过', 'success');
  }

  function requestApprove() {
    var p = getMentorProject(_currentMentorProjId);
    if (!p || p.mentorStatus !== 'pending') return;
    if (!p.signed) {
      if (typeof showToast === 'function') showToast('请先进行电子签名', 'warn');
      return;
    }
    var sel = document.getElementById('mentor-opinion-select');
    if (sel && sel.value === '不同意，退回') {
      if (typeof showToast === 'function') showToast('当前评价为退回，请使用「退回修改」', 'warn');
      return;
    }
    openApproveConfirm();
  }

  function openApproveConfirm() {
    var modal = document.getElementById('approve-submit-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeApproveConfirm() {
    var modal = document.getElementById('approve-submit-modal');
    if (modal) modal.classList.remove('open');
    if (!document.getElementById('sign-confirm-modal') || !document.getElementById('sign-confirm-modal').classList.contains('open')) {
      if (!document.getElementById('heritage-modal') || !document.getElementById('heritage-modal').classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }
  }

  function confirmApprove() {
    closeApproveConfirm();
    doApprove();
  }

  function doApprove() {
    var projId = _currentMentorProjId;
    var mp = getMentorProject(projId);
    if (!mp || !mp.signed) {
      if (typeof showToast === 'function') showToast('请先进行电子签名', 'warn');
      return;
    }
    mp.mentorStatus = 'approved';
    mp.workflowStage = '待秘书处受理';
    mp.aiIssue = '已签字确认';
    mp.aiIssueCls = 'text-green';
    if (window.ARGP_MOCK && window.ARGP_MOCK.syncAfterMentorApprove) {
      window.ARGP_MOCK.syncAfterMentorApprove(projId, mp);
    }
    renderMentorList();
    updateSignUi();
    if (typeof showToast === 'function') showToast('审核通过，材料已进入秘书处受理队列', 'success');
    setTimeout(function () {
      if (typeof showPage === 'function') showPage('mentor-list');
    }, 1200);
  }

  function rejectToStudent() {
    var projId = _currentMentorProjId;
    var mp = MENTOR_PROJECTS.filter(function (x) { return x.id === projId; })[0];
    if (mp) {
      mp.mentorStatus = 'revising';
      mp.aiIssue = '附修改意见';
      mp.aiIssueCls = 'text-warn';
    }
    if (window.ARGP_MOCK && window.ARGP_MOCK.syncAfterMentorReject) {
      window.ARGP_MOCK.syncAfterMentorReject(projId);
    }
    if (window.ARGP_MESSAGES && window.ARGP_MESSAGES.pushMentorReturnNotice) {
      window.ARGP_MESSAGES.pushMentorReturnNotice(projId, mp ? mp.title : projId);
    }
    renderMentorList();
    if (typeof showToast === 'function') showToast('已退回学生修改，通知已发送', 'warn');
    setTimeout(function () {
      if (typeof showPage === 'function') showPage('mentor-list');
    }, 1200);
  }

  function initMentorAnnotEvents() {
    var body = document.getElementById('mentor-doc-body');
    if (body && !body.dataset.annotInit) {
      body.dataset.annotInit = '1';
      body.addEventListener('mouseup', onDocMouseUp);
    }
    if (!document.body.dataset.mentorModalInit) {
      document.body.dataset.mentorModalInit = '1';
      var modal = document.getElementById('heritage-modal');
      if (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === modal) closeHeritageModal();
        });
      }
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (getActiveComposePanel()) {
          cancelInlineDraft();
          return;
        }
        var editing = document.querySelector('.mentor-annot.is-editing');
        if (editing) {
          cancelAnnotationEdit(editing.getAttribute('data-annot-id'));
          return;
        }
        if (document.getElementById('approve-submit-modal') && document.getElementById('approve-submit-modal').classList.contains('open')) {
          closeApproveConfirm();
          return;
        }
        if (document.getElementById('sign-confirm-modal') && document.getElementById('sign-confirm-modal').classList.contains('open')) {
          closeSignConfirm();
          return;
        }
        closeHeritageModal();
      });
      var approveModal = document.getElementById('approve-submit-modal');
      if (approveModal) {
        approveModal.addEventListener('click', function (e) {
          if (e.target === approveModal) closeApproveConfirm();
        });
      }
      var signModal = document.getElementById('sign-confirm-modal');
      if (signModal) {
        signModal.addEventListener('click', function (e) {
          if (e.target === signModal) closeSignConfirm();
        });
      }
    }
  }

  window.ARGP_MENTOR = {
    MENTOR_PROJECTS: MENTOR_PROJECTS,
    renderMentorList: renderMentorList,
    renderMentorListRows: renderMentorListRows,
    onMentorTabFilter: onMentorTabFilter,
    openReview: openReview,
    renderMentorReview: renderMentorReview,
    switchVersion: switchVersion,
    openVersionCompareFromSummary: openVersionCompareFromSummary,
    toggleAnnotMode: toggleAnnotMode,
    deleteAnnotation: deleteAnnotation,
    openHeritageModal: openHeritageModal,
    closeHeritageModal: closeHeritageModal,
    openSignConfirm: openSignConfirm,
    closeSignConfirm: closeSignConfirm,
    confirmSign: confirmSign,
    requestApprove: requestApprove,
    openApproveConfirm: openApproveConfirm,
    closeApproveConfirm: closeApproveConfirm,
    confirmApprove: confirmApprove,
    doApprove: doApprove,
    rejectToStudent: rejectToStudent,
    startEditAnnotation: startEditAnnotation,
    saveAnnotationEdit: saveAnnotationEdit,
    cancelAnnotationEdit: cancelAnnotationEdit,
    toggleAnnotationEmphasis: toggleAnnotationEmphasis,
    showAiAnnotSuggestions: showAiAnnotSuggestions,
    applyAiAnnotSuggestion: applyAiAnnotSuggestion,
    closeAnnotCompose: closeAnnotCompose,
    confirmInlineDraft: confirmInlineDraft,
    setHeritageSegmentType: setHeritageSegmentType,
    confirmHeritageCorrections: confirmHeritageCorrections,
    initMentorAnnotEvents: initMentorAnnotEvents,
    buildVersionDiffHtml: buildVersionDiffHtml,
    getCurrentProjId: function () { return _currentMentorProjId; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    initMentorAnnotEvents();
  });
})();

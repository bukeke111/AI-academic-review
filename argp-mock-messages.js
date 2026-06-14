/* ARGP Demo — 消息中心统一 Mock 数据 */
(function () {
  var CATEGORIES = {
    sys: {
      label: '系统通知',
      hint: '平台维护与版本更新',
      dot: '#8c8c8c',
      accent: '#595959',
      bg: '#f5f5f5',
      iconBg: '#f0f0f0'
    },
    flow: {
      label: '流程通知',
      hint: '答辩、评审与流程催办',
      dot: '#1677ff',
      accent: '#1677ff',
      bg: '#e6f4ff',
      iconBg: '#e6f4ff'
    },
    pub: {
      label: '公示公告',
      hint: '批次结果与优秀成果公示',
      dot: '#059669',
      accent: '#059669',
      bg: '#f6ffed',
      iconBg: '#f6ffed'
    },
    obj: {
      label: '异议处理',
      hint: '异议受理与处理进度',
      dot: '#dc2626',
      accent: '#cf1322',
      bg: '#fff2f0',
      iconBg: '#fff2f0'
    }
  };

  var MESSAGES = [
    {
      id: 'flow-defense',
      category: 'flow',
      tag: '流程通知',
      title: '答辩安排通知 · 联邦学习隐私保护',
      desc: '2026-03-22 14:30 · 第三会议室，请提前准备答辩材料。',
      time: '今天',
      unread: true,
      roles: ['student'],
      href: 'index.html'
    },
    {
      id: 'flow-mentor-submit',
      category: 'flow',
      tag: '流程通知',
      title: '学生提交审阅 · 强化学习路径规划',
      desc: '李同学已提交，请尽快审阅并签字确认。',
      time: '今天',
      unread: true,
      roles: ['teacher'],
      teacherCaps: ['mentor'],
      href: 'index.html#mentor'
    },
    {
      id: 'flow-expert-invite',
      category: 'flow',
      tag: '评审邀请',
      title: '新的评审邀请 · 待确认',
      desc: '您收到一项评审邀请：强化学习在机器人路径规划中的应用研究（PROJ-2026-0087）。请在 2026-03-25 前响应是否接受。',
      time: '今天',
      unread: true,
      roles: ['teacher'],
      teacherCaps: ['expert', 'chair'],
      href: 'review.html#expert-invite-PROJ-2026-0087'
    },
    {
      id: 'flow-expert-assign',
      category: 'flow',
      tag: '流程通知',
      title: '专家评审任务 · 多模态情感分析',
      desc: '您已接受邀请，请在 2026-03-20 前完成线上评审并提交意见。',
      time: '今天',
      unread: true,
      roles: ['teacher'],
      teacherCaps: ['expert', 'chair'],
      href: 'review.html#expert'
    },
    {
      id: 'flow-expert-deadline',
      category: 'flow',
      tag: '催办提醒',
      title: '评审截止提醒 · 多模态情感分析',
      desc: '距截止还剩 3 天，请尽快完成评审。',
      time: '昨天',
      unread: true,
      roles: ['teacher'],
      teacherCaps: ['expert'],
      href: 'review.html#expert'
    },
    {
      id: 'flow-sec-reject-0099',
      category: 'flow',
      tag: '秘书处退件',
      title: '材料退件通知 · 边缘计算任务调度优化',
      desc: '材料不完整：缺少导师签字、技术路线图与实验方案。请修改后重新提交导师审核。',
      time: '3天前',
      unread: true,
      roles: ['student'],
      href: 'index.html',
      projId: 'PROJ-2026-0099'
    },
    {
      id: 'flow-mentor-done',
      category: 'flow',
      tag: '流程通知',
      title: '导师审核完成 · 《强化学习路径规划》',
      desc: '张明远教授已完成审核并签字，附修改意见 3 条。',
      time: '昨天',
      unread: false,
      roles: ['student'],
      href: 'index.html'
    },
    {
      id: 'flow-vote',
      category: 'flow',
      tag: '流程通知',
      title: '投票提醒 · 智能合约形式化验证方法',
      desc: '该项目答辩已完成，请在 24 小时内完成投票。',
      time: '2天前',
      unread: false,
      roles: ['teacher'],
      teacherCaps: ['expert', 'chair'],
      href: 'review.html#defense'
    },
    {
      id: 'flow-result-fail',
      category: 'flow',
      tag: '流程通知',
      title: '评审结果通知 · 医学影像分割研究未通过',
      desc: 'PROJ-2026-0078 综合评定为不予立项。如对程序性问题有异议，可在 7 个工作日内于项目详情页提交申诉。',
      time: '1天前',
      unread: true,
      roles: ['student'],
      href: 'index.html',
      projId: 'PROJ-2026-0078',
      focusDispute: true,
      actionLabel: '提交申诉'
    },
    {
      id: 'pub-batch',
      category: 'pub',
      tag: '公示公告',
      title: '项目结果公示 · 2026年春季第二批次',
      desc: '本批次共 38 项目参评，公示期 7 天（2026-03-17 至 2026-03-24）。',
      time: '2天前',
      unread: false,
      roles: ['student', 'teacher', 'secretary'],
      href: 'index.html',
      actionFn: "showPage('proj-pub')",
      actionLabel: '查看公示'
    },
    {
      id: 'pub-excellent',
      category: 'pub',
      tag: '公示公告',
      title: '优秀成果公示 · 量子计算密码学应用探索',
      desc: '该项目在本批次评审中获得最高分（93分），被推荐申报校级优秀科研成果奖。',
      time: '5天前',
      unread: false,
      roles: ['student', 'teacher', 'secretary'],
      href: 'index.html',
      pubProjId: 'PROJ-2026-0029',
      actionLabel: '查看详情'
    },
    {
      id: 'obj-pending',
      category: 'obj',
      tag: '异议',
      title: '量子计算项目立项等级异议待处理',
      desc: '需在 2026-03-22 前处理，关联项目 PROJ-2026-0029。',
      time: '3天前',
      unread: true,
      roles: ['secretary'],
      href: 'review.html#pub-detail'
    },
    {
      id: 'obj-processing',
      category: 'obj',
      tag: '异议',
      title: '对《多模态情感分析》立项等级的异议',
      desc: '关联项目 PROJ-2026-0031 · 公示结果：院级立项，处理中。',
      time: '5天前',
      unread: false,
      roles: ['secretary'],
      href: 'review.html#pub-detail'
    },
    {
      id: 'sys-version',
      category: 'sys',
      tag: '系统通知',
      title: '平台版本更新 · v1.2.3',
      desc: '新增答辩准备包自动生成功能；优化 AI 预审速度（平均提升 32%）。',
      time: '3天前',
      unread: false,
      roles: ['student', 'teacher', 'secretary'],
      href: '#'
    },
    {
      id: 'sys-maintenance',
      category: 'sys',
      tag: '系统通知',
      title: '平台维护公告',
      desc: '2026-03-18 凌晨 02:00-04:00 进行系统升级维护，期间平台暂停服务。',
      time: '5天前',
      unread: false,
      roles: ['student', 'teacher', 'secretary'],
      href: '#'
    }
  ];

  function getAuth() {
    return window.ARGP_AUTH || null;
  }

  function isVisibleToUser(msg) {
    var auth = getAuth();
    if (!auth || !auth.getRole) return true;
    var role = auth.getRole();
    if (!msg.roles || msg.roles.indexOf(role) === -1) return false;
    if (role === 'teacher' && msg.teacherCaps) {
      var cap = auth.getTeacherCap ? auth.getTeacherCap() : null;
      if (msg.teacherCaps.indexOf(cap) === -1) return false;
    }
    return true;
  }

  function getMessages(opts) {
    opts = opts || {};
    var list = MESSAGES.filter(isVisibleToUser);
    if (opts.category) {
      list = list.filter(function (m) { return m.category === opts.category; });
    }
    if (opts.unreadOnly) {
      list = list.filter(function (m) { return m.unread; });
    }
    if (opts.limit) {
      list = list.slice(0, opts.limit);
    }
    return list;
  }

  function getUnreadCount() {
    return getMessages({ unreadOnly: true }).length;
  }

  function getCategoryUnread(category) {
    return getMessages({ category: category, unreadOnly: true }).length;
  }

  function getVisibleCategories() {
    var auth = getAuth();
    var role = auth && auth.getRole ? auth.getRole() : null;
    var cats = ['sys', 'flow', 'pub'];
    if (role === 'secretary') cats.push('obj');
    return cats.filter(function (cat) {
      return getMessages({ category: cat }).length > 0;
    });
  }

  function refreshMessageUI() {
    if (window.ARGP_UI) {
      if (window.ARGP_UI.refreshFeed) window.ARGP_UI.refreshFeed();
      if (window.ARGP_UI.refreshMsgBadge) window.ARGP_UI.refreshMsgBadge();
    }
  }

  function pushMessage(msg) {
    MESSAGES.unshift(Object.assign({
      time: '刚刚',
      unread: true
    }, msg));
    refreshMessageUI();
  }

  function pushSecretaryRejectNotice(projId, title, summary) {
    var excerpt = (summary || '').replace(/\s+/g, ' ').trim();
    if (excerpt.length > 120) excerpt = excerpt.slice(0, 120) + '…';
    pushMessage({
      id: 'flow-sec-reject-' + projId + '-' + Date.now(),
      category: 'flow',
      tag: '秘书处退件',
      title: '材料退件通知 · ' + title,
      desc: excerpt || '秘书处已退回您的申请材料，请查看退件说明并修改后重新提交。',
      roles: ['student'],
      href: 'index.html',
      projId: projId
    });
  }

  function pushMentorReturnNotice(projId, title) {
    pushMessage({
      id: 'flow-mentor-return-' + projId + '-' + Date.now(),
      category: 'flow',
      tag: '导师退回',
      title: '导师退回修改 · ' + title,
      desc: '导师已退回材料并附修改意见，请修改后重新提交导师审核。',
      roles: ['student'],
      href: 'index.html',
      projId: projId
    });
  }

  window.ARGP_MESSAGES = {
    CATEGORIES: CATEGORIES,
    MESSAGES: MESSAGES,
    getMessages: getMessages,
    getUnreadCount: getUnreadCount,
    getCategoryUnread: getCategoryUnread,
    getVisibleCategories: getVisibleCategories,
    isVisibleToUser: isVisibleToUser,
    pushMessage: pushMessage,
    pushSecretaryRejectNotice: pushSecretaryRejectNotice,
    pushMentorReturnNotice: pushMentorReturnNotice
  };
})();

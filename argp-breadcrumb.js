/* ARGP 统一面包屑导航 */
(function () {
  var ICON = '<svg class="bc-ico" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1zm2 3v1h6V5H5zm0 2v1h4V7H5z"/></svg>';

  var ROUTES = {
    index: {
      home: [
        { label: '工作台', page: 'home' },
        { label: '首页' }
      ],
      'my-proj': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '我的项目' }
      ],
      'proj-list': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '项目列表' }
      ],
      'proj-new': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '项目申请' }
      ],
      'proj-pub': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '立项项目公示' }
      ],
      'proj-detail': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '我的项目', page: 'my-proj' },
        { label: '项目详情' }
      ],
      'proj-appeal': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '我的项目', page: 'my-proj' },
        { label: '评审结果申诉' }
      ],
      'ai-assistant': [
        { label: '工作台', page: 'home' },
        { label: 'AI 服务' },
        { label: 'AI 助手' }
      ],
      'ai-check': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '项目申请', page: 'proj-new' },
        { label: 'AI 质量自检' }
      ],
      'submit-success': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '项目申请', page: 'proj-new' },
        { label: 'AI 质量自检', page: 'ai-check' },
        { label: '提交成功' }
      ],
      'mentor-list': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '导师工作台' }
      ],
      'mentor-review': [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '导师工作台', page: 'mentor-list' },
        { label: '项目审阅' }
      ]
    },
    review: {
      secretary: [
        { label: '评审管理' },
        { label: '秘书受理台' }
      ],
      'sec-detail': [
        { label: '评审管理' },
        { label: '秘书受理台', page: 'secretary' },
        { label: '受理详情' }
      ],
      'sec-progress': [
        { label: '评审管理' },
        { label: '进度监控' }
      ],
      'sec-disputes': [
        { label: '评审管理' },
        { label: '异议与申诉' }
      ],
      'expert-list': [
        { label: '评审管理' },
        { label: '专家评审' }
      ],
      'expert-invite': [
        { label: '评审管理' },
        { label: '专家评审', page: 'expert-list' },
        { label: '邀请响应' }
      ],
      'expert-review': [
        { label: '评审管理' },
        { label: '专家评审', page: 'expert-list' },
        { label: '线上评审' }
      ],
      'defense-list': [
        { label: '评审管理' },
        { label: '答辩评审' }
      ],
      'defense-detail': [
        { label: '评审管理' },
        { label: '答辩评审', page: 'defense-list' },
        { label: '答辩详情' }
      ],
      'defense-prep': [
        { label: '评审管理' },
        { label: '答辩评审', page: 'defense-list' },
        { label: '答辩准备包' }
      ],
      'defense-score': [
        { label: '评审管理' },
        { label: '答辩评审', page: 'defense-list' },
        { label: '答辩评分' }
      ],
      vote: [
        { label: '评审管理' },
        { label: '答辩评审', page: 'defense-list' },
        { label: '现场投票' }
      ],
      chair: [
        { label: '评审管理' },
        { label: '评审组长台' }
      ],
      'chair-proj-detail': [
        { label: '评审管理' },
        { label: '评审组长台', page: 'chair' },
        { label: '项目详情' }
      ],
      'gov-review': [
        { label: '评审管理' },
        { label: '治理分析' }
      ],
      'pub-detail': [
        { label: '评审管理' },
        { label: '治理分析', page: 'gov-review' },
        { label: '公示详情' }
      ]
    },
    governance: {
      'gov-review': [
        { label: '评审管理', href: 'review.html#gov-review' },
        { label: '治理分析' }
      ],
      'pub-detail': [
        { label: '评审管理', href: 'review.html#gov-review' },
        { label: '公示详情' }
      ]
    }
  };

  function getApp() {
    return document.body.getAttribute('data-argp-app') || 'index';
  }

  function crumbContent(c, isLast) {
    var inner = ICON + '<span>' + c.label + '</span>';
    if (!isLast && c.page) {
      return '<a href="#" class="bc-link" data-page="' + c.page + '">' + inner + '</a>';
    }
    if (!isLast && c.href) {
      return '<a href="' + c.href + '" class="bc-link">' + inner + '</a>';
    }
    return '<span class="bc-text">' + inner + '</span>';
  }

  window.updateBreadcrumb = function (pageId) {
    var nav = document.getElementById('page-breadcrumb');
    if (!nav) return;

    var appRoutes = ROUTES[getApp()] || {};
    var crumbs = appRoutes[pageId];
    if (!crumbs) {
      crumbs = [{ label: pageId || '当前页面' }];
    }

    if (pageId === 'proj-detail' && window.ARGP_MOCK && window.ARGP_MOCK.getDetailSource &&
        window.ARGP_MOCK.getDetailSource() === 'pub') {
      crumbs = [
        { label: '工作台', page: 'home' },
        { label: '项目中心' },
        { label: '立项项目公示', page: 'proj-pub' },
        { label: '公示项目详情' }
      ];
    }

    var html = '<ol class="bc-list">';
    crumbs.forEach(function (c, i) {
      var isLast = i === crumbs.length - 1;
      if (i > 0) {
        html += '<li class="bc-sep" aria-hidden="true">&gt;</li>';
      }
      html += '<li class="bc-item' + (isLast ? ' bc-current' : '') + '">';
      html += crumbContent(c, isLast);
      html += '</li>';
    });
    html += '</ol>';
    nav.innerHTML = html;

    nav.querySelectorAll('.bc-link[data-page]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var pid = a.getAttribute('data-page');
        if (pid === 'msg-center' && window.ARGP_UI && window.ARGP_UI.openMsgDrawer) {
          window.ARGP_UI.openMsgDrawer();
          return;
        }
        if (typeof window.showPage === 'function') {
          window.showPage(pid);
        }
      });
    });
  };
})();

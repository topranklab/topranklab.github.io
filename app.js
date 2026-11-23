/* ==========================================================================
   상위노출랩 — 공통 스크립트
   index.html · about.html · shopping.html · marketing.html · cases.html 공용
   ========================================================================== */
(function () {
  'use strict';

  var KAKAO_URL = 'https://open.kakao.com/o/sjZETlYi';

  /* ---------- 1. 상단 띠배너 닫기 ---------- */
  var promo = document.getElementById('promoBar');
  var promoClose = document.getElementById('promoClose');
  if (promo && promoClose) {
    try {
      if (sessionStorage.getItem('trl_promo_closed') === '1') promo.classList.add('hidden');
    } catch (e) {}
    promoClose.addEventListener('click', function () {
      promo.classList.add('hidden');
      try { sessionStorage.setItem('trl_promo_closed', '1'); } catch (e) {}
    });
  }

  /* ---------- 2. 모바일 메뉴 ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.textContent = open ? '✕' : '☰';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 3. 스크롤 등장 애니메이션 ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 4. 8대 솔루션 필터 ---------- */
  var tabs = document.querySelectorAll('.sol-tab');
  var solCards = document.querySelectorAll('.sol-card');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var cat = tab.dataset.cat;
      solCards.forEach(function (c) {
        if (cat === 'all' || c.dataset.cat === cat) c.classList.remove('hidden');
        else c.classList.add('hidden');
      });
    });
  });

  /* ---------- 5. 솔루션 상세 모달 ---------- */
  var solData = {
    store: {
      tag: '주력 실행',
      title: '스마트스토어 상위노출 최적화',
      desc: '네이버 쇼핑 검색 로직의 적합도·인기도·신뢰도 지표를 기준으로 1페이지 안착 구조를 설계합니다.',
      items: ['카테고리·메인·세부 키워드 정밀 발굴', '상품명·태그·속성값 SEO 구조 정비', '경쟁사 대비 유입·전환 병목 진단 및 개선'],
      page: 'shopping.html'
    },
    coupang: {
      tag: '오픈마켓',
      title: '쿠팡 마케팅 · 노출 최적화',
      desc: '로켓·윙 판매 상품의 검색 노출과 클릭률·구매 전환율을 체계적으로 끌어올립니다.',
      items: ['아이템위너 및 검색 키워드 구조 점검', '쿠팡 광고(로켓그로스·검색광고) 효율 개선', '상세페이지 후킹 포인트 및 리뷰 전략'],
      page: 'shopping.html#coupang'
    },
    reward: {
      tag: '유입 솔루션',
      title: '리워드 · 오퍼월 솔루션',
      desc: '실사용자 참여 기반의 체험형 유입을 통해 상품의 반응도와 체류 지표를 안정적으로 높입니다.',
      items: ['제휴 오퍼월 매체 맞춤 캠페인 세팅', '일별 유입량 분산 및 안정적 순위 관리', '스마트스토어·쿠팡·플레이스 연계 운영'],
      page: 'shopping.html#reward'
    },
    place: {
      tag: '로컬 마케팅',
      title: '네이버 플레이스 상위노출',
      desc: '매장·병원·카페 등 오프라인 비즈니스의 지도 검색 노출과 방문 예약을 높입니다.',
      items: ['대표 키워드·메뉴·소식 SEO 세팅', '저장하기·알림받기·방문자 리뷰 활성화', '지역 타겟 블로그 체험단 연계'],
      page: 'marketing.html#place'
    },
    review: {
      tag: '리얼 후기',
      title: '블로그 · 인스타 체험단',
      desc: '실사용자가 남기는 고퀄리티 후기로 검색 결과 신뢰도와 구매 전환율을 높입니다.',
      items: ['제품·업종에 맞는 블로거/인스타그래머 매칭', '키워드 노출을 고려한 포스팅 가이드 제공', '2차 활용 가능한 후기 사진·영상 확보'],
      page: 'marketing.html#review'
    },
    short: {
      tag: '영상 확산',
      title: '숏폼 마케팅 (쇼츠 · 틱톡 · 릴스)',
      desc: '15초 안에 시선을 사로잡는 숏폼 콘텐츠로 자연 유입과 브랜드 인지도를 동시에 확보합니다.',
      items: ['구매를 부르는 후킹 대본·자막·편집', '유튜브 쇼츠·틱톡·인스타 릴스·네이버 클립 동시 배포', '상품 링크 유입 동선 설계'],
      page: 'marketing.html#short'
    },
    powerlink: {
      tag: '검색광고',
      title: '파워링크 · 퍼포먼스 광고',
      desc: '불필요한 클릭 비용을 줄이고 실제 전환이 나오는 고효율 키워드 중심으로 운영합니다.',
      items: ['네이버 파워링크·쇼핑검색광고 세팅', '구글·메타(인스타/페이스북) 리타겟팅', 'ROAS 중심 입찰·소재 A/B 테스트'],
      page: 'marketing.html#ads'
    },
    press: {
      tag: '신뢰 · 브랜딩',
      title: '언론송출 · 브랜드 홈페이지',
      desc: '공식 보도자료 송출과 전문 브랜드 웹사이트 구축으로 고객 신뢰도를 완성합니다.',
      items: ['주요 언론사 보도자료 송출 및 포털 검색 반영', '모바일 최적화된 대행사/브랜드 홈페이지 제작', '오픈카톡·전화 즉시 전환 동선 구축'],
      page: 'marketing.html#web'
    }
  };

  var modal = document.getElementById('solModal');
  if (modal) {
    var modalClose = document.getElementById('modalClose');
    var openModal = function (key) {
      var d = solData[key];
      if (!d) return;
      document.getElementById('modalTag').textContent = d.tag;
      document.getElementById('modalTitle').textContent = d.title;
      document.getElementById('modalDesc').textContent = d.desc;
      document.getElementById('modalList').innerHTML = d.items.map(function (i) { return '<li>' + i + '</li>'; }).join('');
      var pageLink = document.getElementById('modalPageLink');
      if (pageLink) {
        pageLink.href = d.page;
        pageLink.querySelector('span').textContent = d.title.split(' ')[0] + ' 상세 페이지 보기';
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    var closeModal = function () {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
    solCards.forEach(function (c) {
      c.addEventListener('click', function () { openModal(c.dataset.key); });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(c.dataset.key); }
      });
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* ---------- 6. 관심 분야 칩 ---------- */
  document.querySelectorAll('.topic-chip').forEach(function (chip) {
    chip.addEventListener('click', function () { chip.classList.toggle('selected'); });
  });

  /* ---------- 7. 상담 신청 폼 → 요약 복사 + 오픈카톡 ---------- */
  var consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var brand = (document.getElementById('brandName') || {}).value || '';
      var url = (document.getElementById('storeUrl') || {}).value || '';
      var phone = (document.getElementById('userPhone') || {}).value || '';
      brand = brand.trim(); url = url.trim(); phone = phone.trim() || '미입력';
      var topics = [].map.call(document.querySelectorAll('.topic-chip.selected'), function (c) { return c.textContent.trim(); }).join(', ') || '전체 상담';
      var msg = '[상위노출랩 무료 진단 신청]\n• 스토어/브랜드: ' + (brand || '미입력') +
                '\n• 링크/키워드: ' + (url || '미입력') +
                '\n• 연락처: ' + phone +
                '\n• 관심 분야: ' + topics +
                '\n• 혜택: 상담만 받아도 상품 찜 무료 제공(선착순 5명)';
      var notice = document.getElementById('formNotice');
      copyText(msg).then(function (ok) {
        notice.textContent = ok
          ? '신청 내용이 복사되었어요! 오픈카톡 방에 붙여넣기(Ctrl+V) 해주세요.'
          : '오픈카톡 방에서 아래 내용을 함께 알려주세요: ' + brand + ' / ' + url;
      });
      window.open(KAKAO_URL, '_blank', 'noopener');
    });
  }

  /* ---------- 8. FAQ ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var s = i.querySelector('.faq-q span');
        if (s) s.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        var s2 = q.querySelector('span');
        if (s2) s2.textContent = '−';
      }
    });
  });

  /* ---------- 9. 원클릭 스토어 고민 체크 ---------- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  document.querySelectorAll('[data-dx]').forEach(function (root) {
    var chips = root.querySelectorAll('.dx-chip');
    var panels = root.querySelectorAll('.dx-panel');
    var empty = root.querySelector('.dx-empty');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.dataset.dxKey;
        chips.forEach(function (c) {
          c.classList.toggle('active', c === chip);
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          p.classList.toggle('active', p.dataset.dxPanel === key);
        });
        if (empty) empty.style.display = 'none';
        var active = root.querySelector('.dx-panel.active');
        if (active && active.scrollIntoView && window.innerWidth < 769) {
          active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

    root.querySelectorAll('[data-dx-send]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = btn.closest('.dx-panel');
        if (!panel) return;
        var label = panel.dataset.dxLabel || '';
        var points = [].map.call(panel.querySelectorAll('.dx-points li'), function (li, i) {
          return (i + 1) + ') ' + li.textContent.replace(/\s+/g, ' ').trim();
        }).join('\n');
        var msg = '[상위노출랩 원클릭 무료 진단]\n• 가장 급한 고민: ' + label +
                  '\n\n[진단 포인트]\n' + points +
                  '\n\n• 혜택: 상담만 받아도 상품 찜 무료 제공(선착순 5명)';
        var notice = panel.querySelector('.dx-notice');
        copyText(msg).then(function (ok) {
          if (notice) {
            notice.textContent = ok
              ? '선택한 고민이 복사되었어요. 오픈카톡 방에 붙여넣기(Ctrl+V) 해주세요!'
              : '오픈카톡 방에 "' + label + '" 이라고만 남겨주셔도 바로 안내드려요.';
          }
        });
        window.open(KAKAO_URL, '_blank', 'noopener');
      });
    });
  });
})();

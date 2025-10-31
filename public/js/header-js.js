// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  //定義
  const drawerIcon = document.querySelector(".p-drawer__icon");
  const drawer = document.querySelector(".p-drawer");
  const drawerNavItem = document.querySelectorAll('.p-drawer__body a[href^="#"]');
  const headerHeight = document.querySelector(".l-header").offsetHeight;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  const mainContent = document.querySelector(".padding-adju"); // p-fv要素を取得

  // p-fv要素が存在するか確認
  if (mainContent) {
    // 画面幅が1024px以上のときに適用する追加のパディング
    const desktopPadding = 20;
    const currentWindowWidth = window.innerWidth;

    let totalPadding = headerHeight;

    // 1024px以上の場合だけ20pxをプラスする
    if (currentWindowWidth >= 1024) {
      totalPadding = headerHeight + desktopPadding;
    }

    // padding-top を設定
    mainContent.style.paddingTop = totalPadding + "px";
  }
  //メニューを開くアニメーション
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
    }
  };

  //メニューを閉じるアニメーション
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      isMenuOpen = false;
    }
  };

  //メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  //リサイズ処理
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  //メニュー外クリック処理
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  };

  //ヘッダーアイコン クリック時
  drawerIcon.addEventListener("click", toggleMenu);
  //画面幅リサイズ時
  window.addEventListener("resize", handleResize);
  //メニュー外クリック時
  document.addEventListener("click", clickOuter);
  //ページ内リンクナビメニュー クリック時
  drawerNavItem.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});
//該当箇所までスクロール

//該当箇所までスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = targetId === "#" || targetId === "" ? document.documentElement : document.querySelector(targetId);

    if (!targetElement) return;

    const startPosition = window.scrollY;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;

    const duration = 300;
    let startTime = null;

    function step(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress;

      const newScroll = startPosition + distance * ease;

      window.scrollTo(0, newScroll);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  });
});

window.addEventListener("scroll", function () {
  var header = document.querySelector(".l-header");
  // スクロール位置を取得
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
  // 少しスクロールしたらクラスをつける
  if (scrollTop > 0) {
    header.classList.add("js-scroll");
  } else {
    header.classList.remove("js-scroll");
  }
});

const cardSwiper = new Swiper(".card__swiper", {
  // swiperの名前
  // 切り替えのモーション
  speed: 1000, // 表示切り替えのスピード
  effect: "slide", // 切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  //  8枚以上ない場合はfalseにすること
  loop: true,

  // 自動スライドについて
  autoplay: {
    delay: 4000, // 何秒ごとにスライドを動かすか
  },

  // 表示について
  centeredSlides: true, // 中央寄せにしない
  slidesPerView: "1.5",
  spaceBetween: 14,
  breakpoints: {
    // スライドの表示枚数：500px以上の場合
    1024: {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 24,
    },
  },

  // ページネーション
  pagination: {
    el: ".swiper-pagination", // paginationのclass
    clickable: true, // クリックでの切り替えを有効に
    type: "bullets", // paginationのタイプ (※2)
  },
});

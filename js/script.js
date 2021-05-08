/* Задания на урок:

1) Реализовать функционал, что-бы модальное окно появлялось через 5 сек. И когда пользователь долистает до конца.

*/

window.addEventListener('DOMContentLoaded', function () {
  // Tabs
  const content = document.querySelectorAll('.tabcontent'),
    parentTabs = document.querySelector('.tabheader__items'),
    tabs = parentTabs.querySelectorAll('.tabheader__item');

  const hideContent = () => {
    content.forEach((item) => {
      item.style.display = 'none';
    });

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showContent = (i = 0) => {
    content[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  };

  hideContent();
  showContent(0);

  parentTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideContent();
          showContent(i);
        }
      });
    }
  });

  // Timer
  const deadLine = '2021-05-31';

  const getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - new Date(),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((total / (1000 * 60) % 60)),
      seconds = Math.floor((total / 1000) % 60);

    return {
      'total': total,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const total = getTimeRemaining(endtime);

      days.innerHTML = getZero(total.days);
      hours.innerHTML = getZero(total.hours);
      minutes.innerHTML = getZero(total.minutes);
      seconds.innerHTML = getZero(total.seconds);

      if (total.total <= 0) {
        clearInterval(timeInterval);

        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
      }
    }
  };
  setClock('.timer', deadLine);

  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modalClose = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal');

  const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Когда модальное окно открыта, скролл будет отключён.
    clearInterval(modalTimer); // Если пользователь откроет модальное окно, то через 5 сек не будет открываться.
  };

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Когда модальное окно закрыта, скролл будет включён.
  };

  modalTrigger.forEach((item) => {
    item.addEventListener('click', openModal);
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) { // При нажатии на подложку закроется модальное окно.
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') { // При нажатии на Escape закроется модальное окно.
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 5000);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
    }
  });
});
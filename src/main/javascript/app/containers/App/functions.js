export function resizeEvent(header, nav) {
  if (window.innerWidth > 768) {
    if (classList(nav, 'contains', 'navigation-mobile')) {
      classList(nav, 'remove', 'navigation-mobile');
      classList(nav, 'remove', 'navigation-mobile-collapse');
      document.body.classList.remove('hide-scroll');
    }

    if (!classList(header, 'contains', 'header-clicked')) {
      if (window.innerWidth < 992) {
        classList(header, 'add', 'header-collapse');
        classList(nav, 'add', 'navigation-collapse');
      } else {
        classList(header, 'remove', 'header-collapse');
        classList(nav, 'remove', 'navigation-collapse');
      }
    }
  } else {
    classList(nav, 'add', 'navigation-mobile');
  }
}

export function navCollapse(header, nav) {
  if (window.innerWidth < 768) {
    classList(header, 'remove', 'header-collapse');
    classList(header, 'remove', 'header-clicked');

    classList(nav, 'remove', 'navigation-collapse');
    classList(nav, 'toggle', 'navigation-mobile-collapse');
    document.body.classList.toggle('hide-scroll');
  } else if (!classList(header, 'contains', 'header-clicked')) {
    classList(header, 'add', 'header-collapse');
    classList(header, 'add', 'header-clicked');
    classList(nav, 'add', 'navigation-collapse');
  } else {
    classList(header, 'remove', 'header-collapse');
    classList(header, 'remove', 'header-clicked');
    classList(nav, 'remove', 'navigation-collapse');
  }
}

function classList(el, action, className) {
  if (el) {
    return el.classList[action](className);
  }
  return false;
}

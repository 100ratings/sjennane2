(function () {
  const DROPDOWN_ITEM_HEIGHT = 30;
  const DROPDOWN_HEIGHT = DROPDOWN_ITEM_HEIGHT * 7;
  const registry = {};

  init();

  function init() {
    const selects = document.getElementsByTagName('select');
    for (let i = 0; i < selects.length; i++) {
      if (/dropdown/.test(selects[i].className)) {
        new DropDown(selects[i]);
      }
    }
  }

  function DropDown(select) {
    let selectbox = select.parentNode;
    while (!/selectBox/.test(selectbox.className) && selectbox) {
      selectbox = selectbox.parentNode;
    }
    if (!selectbox) {
      return;
    }

    addEvent.call(selectbox, 'click', open);

    const options = select.getElementsByTagName('option');
    // first option (with no value) is a placeholder..
    select.parentNode.appendChild(document.createTextNode(options[0].innerHTML));

    const dropdown = document.createElement('div');
    selectbox.appendChild(dropdown);
    dropdown.selectbox = selectbox;
    dropdown.hiddenContentHeight = (options.length - 1 - 5) * DROPDOWN_ITEM_HEIGHT;
    dropdown.className = 'dropdown';
    addEvent.call(dropdown, 'scroll', adjust_scrollbar_handle);

    for (let i = 1; i < options.length; i++) {
      const link = document.createElement('a');
      link.innerHTML = options[i].innerHTML;
      link.href = select.form.action.concat('?', select.name, '=', encodeURIComponent(options[i].value));
      dropdown.appendChild(link);
    }

    const scrollbar = document.createElement('div');
    selectbox.appendChild(scrollbar);
    scrollbar.className = 'dropdown-scrollbar';

    const handle = dropdown.scrollbarHandle = document.createElement('b');
    handle.dropdown = dropdown;
    addEvent.call(handle, 'mousedown', start_drag);
    addEvent.call(handle, 'touchstart', start_drag);
    scrollbar.appendChild(handle);

    select.parentNode.removeChild(select);
  }

  function start_drag(e) {
    const y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;

    registry.dragging = this;
    registry.priorTop = this.style.top ? parseInt(this.style.top.replace('px')) : 0;
    registry.offsetY = y;

    addEvent.call(document, 'mousemove', drag);
    addEvent.call(document, 'touchmove', drag);
    addEvent.call(document, 'mouseup', stop_drag);
    addEvent.call(document, 'touchstop', stop_drag);
  }

  function drag(e) {
    cancelEvent(e);

    const y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;

    let top = registry.priorTop + y - registry.offsetY;
    if (top < 0) {
      top = 0;
    } else if (top > DROPDOWN_HEIGHT) {
      top = DROPDOWN_HEIGHT;
    }

    const ratio = top / DROPDOWN_HEIGHT;
    if (registry.dragging) {
      registry.dragging.style.top = `${top}px`;
      registry.dragging.dropdown.scrollTop = registry.dragging.dropdown.hiddenContentHeight * ratio;
    }
  }

  function stop_drag(e) {
    removeEvent.call(document, 'mousemove', drag);
    removeEvent.call(document, 'touchmove', drag);
    registry.dragging = null;
  }

  function open() {
    if (!/open/.test(this.className)) {
      this.className += ' open';
      addEvent.call(document, 'mousedown', blur);
      addEvent.call(document, 'touchstart', blur);
      registry.opened = this;
    }
  }

  function blur(e) {
    let target = e.srcElement || e.originalTarget;
    while (target) {
      if (target == registry.opened) {
        return;
      }
      target = target.parentNode;
    }
    close.call(registry.opened);
  }

  function close(e) {
    if (/open/.test(this.className)) {
      this.className = this.className.replace(' open', '');
      registry.opened = null;
      removeEvent.call(document, 'mousedown', blur);
      removeEvent.call(document, 'touchstart', blur);
    }
  }

  function adjust_scrollbar_handle() {
    if (registry.dragging) {
      return;
    }
    let { top } = this.getBoundingClientRect();
    top -= this.childNodes[0].getBoundingClientRect().top;
    top /= this.hiddenContentHeight;
    this.scrollbarHandle.style.top = `${Math.round(top * DROPDOWN_HEIGHT)}px`;
  }

  function addEvent(type, callback) {
    if (this.addEventListener) {
      this.addEventListener(type, callback);
    } else {
      const self = this;
      this.attachEvent('on'.concat(type), (e) => callback.call(self, e));
    }
  }

  function removeEvent(type, callback) {
    if (this.removeEventListener) {
      this.removeEventListener(type, callback, false);
    } else if (this.detachEvent) {
      this.detachEvent(`on${type}`, callback);
    } else {
      element[`on${type}`] = null;
    }
  }

  function cancelEvent(event) {
    if (!event) {
      return;
    }
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}());

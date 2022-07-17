function createRefreshKey(group) {
  return "__refreshable-" + group;
}

function refreshable(component, refresh, group = "default") {
  const key = createRefreshKey(group);
  component.$element.classList.add(key);
  component.$element[key] = Object.apply(refresh, component);
}

function refresh(group = "default") {
  const key = createRefreshKey(group);
  document.querySelectorAll("." + key).forEach($element => {
    $element[key]();
  });
}


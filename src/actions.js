const actions = [
  'LOAD_DONE',
  'DO_LAYOUT',
  'LAYOUT_DONE',
  'REDRAW',
  'CLEAR',
  'EXPORT_DONE',
  'TOGGLE_CONTROLS',
  'ADD_NODE',
  'REMOVE_NODE',
  'SELECT_NODE',
  'DESELECT_NODE',
  // 'TARGET_NODE',
  // 'UNTARGET_NODE'
];

export default actions.reduce((prev, cur) => {
  prev[cur] = cur;
  return prev;
}, {});

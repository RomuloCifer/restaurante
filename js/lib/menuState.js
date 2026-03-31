export const MENU_FILTER_DEFAULTS = {
  category: 'todos',
  intensity: 'todos',
  priceTier: 'todos'
};

export function createMenuState(){
  return {
    filters: { ...MENU_FILTER_DEFAULTS }
  };
}

export function resetMenuFilters(state){
  state.filters = { ...MENU_FILTER_DEFAULTS };
}

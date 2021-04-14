import { setCurrentItem } from '../models/slices/menuSlice';
import { toggleExpanded } from '../models/slices/sidebarSlice';
import { RootState } from '../models/store';

const toggleSidebar = () => (dispatch: any) => {
  dispatch(toggleExpanded());
}

const setCurrentMenuItem = (id: number) => (dispatch: any) => {
  dispatch(setCurrentItem(id));
}

const loadCurrentMenuItem = () => (dispatch: any, getState: any) => {
  const path = window.location.pathname;
  const state: RootState = getState();
  const currentItem = state.menu.items.filter((item) => item.path === path)[0]
  const itemId = currentItem ? currentItem.id : 0;

  dispatch(setCurrentItem(itemId));
}

export { toggleSidebar, setCurrentMenuItem, loadCurrentMenuItem }
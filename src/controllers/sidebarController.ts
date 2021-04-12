import { toggleExpanded } from '../models/slices/sidebarSlice';

const toggleSidebar = () => (dispatch: any) => {
  dispatch(toggleExpanded());
}

export { toggleSidebar }
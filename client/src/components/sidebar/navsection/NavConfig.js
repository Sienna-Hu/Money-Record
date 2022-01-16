import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '个人账本',
    value: 0,
    icon: getIcon(peopleFill)
  },
  {
    title: '待收款',
    value: 1,
    icon: getIcon(personAddFill)
  }
];

export default sidebarConfig;

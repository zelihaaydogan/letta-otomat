// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';
import AssignmentIcon from '@mui/icons-material/Assignment';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_inventory'),
  reports: getIcon('ic_report'),
  automat: getIcon('ic_automat'),
  automatDefinitions: getIcon('ic_automat'),
  sales: getIcon('ic_sales'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Genel',
    items: [
      { title: 'Özet Ekranı', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      {
        title: 'Otomatlar',
        path: PATH_DASHBOARD.automat.root,
        icon: ICONS.automat,
        children: [
          { title: 'Otomatlar', path: PATH_DASHBOARD.automat.list },
          { title: 'Otomat Tanımları', path: PATH_DASHBOARD.automat.definitions },
        ],
      },
      // { title: 'Otomatlar', path: PATH_DASHBOARD.general.analytic, icon: ICONS.automat },
      // { title: 'Otomat Tanımları', path: PATH_DASHBOARD.general.automatDefinitions, icon: ICONS.automatDefinitions },
      { title: 'Satışlar', path: PATH_DASHBOARD.general.sales, icon: ICONS.sales },
      {
        title: 'Raporlar',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.reports,
        children: [
          { title: 'Alarmlar', path: PATH_DASHBOARD.user.list },
          { title: 'Tamamlanmış operasyonlar', path: PATH_DASHBOARD.user.profile },
          { title: 'Otomat olayları', path: PATH_DASHBOARD.user.cards },
          { title: 'Arayüz İşlemleri', path: PATH_DASHBOARD.user.account },
          // { title: 'create', path: PATH_DASHBOARD.user.new },

          // { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      { title: 'Kullanıcılar', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },

      { title: 'Sistem ayarları', path: PATH_DASHBOARD.general.booking, icon: ICONS.user },
      { title: 'Envanter', path: PATH_DASHBOARD.general.inventory, icon: ICONS.menuItem },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     // E-COMMERCE
  //     // {
  //     //   title: 'Sistem ayarları',
  //     //   path: PATH_DASHBOARD.eCommerce.root,
  //     //   icon: ICONS.booking,
  //     //   children: [
  //     //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //     //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //     //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //     //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //     //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //     //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //     //   ],
  //     // },
  //     // INVOICE
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     // { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },

  // // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.menuItem,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.menuItem,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     { title: 'item_caption', path: '#caption', icon: ICONS.menuItem, caption: 'description' },
  //   ],
  // },
];

export default navConfig;

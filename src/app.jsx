import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { history, Link, setLocale } from 'umi';
import defaultSettings from '../config/defaultSettings';
import PageLoading from './components/PageLoading';
import NoPermissionPage from './pages/403';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({ initialState, setInitialState }) => {
  if (!localStorage.getItem('umi_locale')) setLocale('vi-VN');
  return {
    headerTitleRender: () => {
      return (
        <a href="https://mobiedu.vn" target="_blank" style={{ marginLeft: 14 }}>
          <img src="/logo/logo.svg" alt="" style={{ height: 30, objectFit: 'contain' }} />
        </a>
      );
    },
    // onMenuHeaderClick: () => history.push('/'),
    onMenuHeaderClick: () => window.open('https://mobiedu.vn'),
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: "mobiEdu",
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // unAccessible: <div>Không có quyền truy cập trang.</div>
    unAccessible: <NoPermissionPage />,
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    itemRender: (route, params, routes) => {
      const pathLevel2Arr = [
        '/support/guide',
        '/support/faq',
        '/web_setting/header_footer',
        '/web_setting/banner_popup',
      ];
      const routeLevel2 = routes.find((r) => pathLevel2Arr.includes(r.path));
      let checkLink = false;
      let indexLink = 1;
      if (routeLevel2) {
        checkLink = routes.indexOf(route) === 2;
        indexLink = 2;
      } else {
        checkLink = routes.indexOf(route) === 1;
        indexLink = 1;
      }
      const content = checkLink ? (
        <Link to={routes[indexLink].path}>{route.breadcrumbName}</Link>
      ) : (
        <span>{route.breadcrumbName}</span>
      );
      return content;
    },
    siderWidth: 260,
    ...initialState?.settings,
  };
};

import { DashboardOutlined, BankOutlined,DollarCircleOutlined,ProfileOutlined,DribbbleOutlined    } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "charity",
    path: `${APP_PREFIX_PATH}/charity`,
    title: "Employee",
    icon: BankOutlined,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "sponsor",
    path: `${APP_PREFIX_PATH}/sponsor`,
    title: "Sponsor",
    icon: DollarCircleOutlined ,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "feed",
    path: `${APP_PREFIX_PATH}/feed`,
    title: "Feed",
    icon: ProfileOutlined  ,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "tournament",
    path: `${APP_PREFIX_PATH}/tournament`,
    title: "Statistics",
    icon: DribbbleOutlined   ,
    breadcrumb: false,
    submenu: [],
  },

  



];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;

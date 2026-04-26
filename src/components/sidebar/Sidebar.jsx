import { useEffect, useState } from "react";
import { Layout, Menu, Button, Typography, Divider } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  FolderAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { self } from "../../http/api/api.https";
import { useAuthStore } from "../../store/Auth/AuthStore";
import "./sidebar.css";
const { Sider } = Layout;
const { Text } = Typography;
import { useNavigate } from "react-router";
import ChatOptions from "../user/User";
export default function Sidebar({ setCollapse }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();
  const { refetch, data, isSuccess } = useQuery({
    queryKey: ["self"],
    queryFn: self,
    enabled: false,
  });
  const navigate = useNavigate();
  const items = [
    {
      key: "new-chat",
      icon: <EditOutlined />,
      label: "New chat",
    },
    {
      key: "search",
      icon: <SearchOutlined />,
      label: "Search chats",
    },
    // {
    //   key: "project",
    //   icon: <FolderAddOutlined />,
    //   label: "New project",
    // },
    // {
    //   key: "aws",
    //   icon: <FolderAddOutlined />,
    //   label: "AWS learn",
    // },
    // {
    //   key: "homework",
    //   icon: <FolderAddOutlined />,
    //   label: "Homework",
    // },
    {
      key: "investing",
      icon: <DollarOutlined />,
      label: "Investing",
    },
  ];

  const recentItems = [
    "Chat System DB Design",
    "Backend Developer Email",
    "Payment Request",
  ];
  const handleCollapse = () => {
    setCollapsed(!collapsed);
    setCollapse(!collapsed);
  };
  const handleTeamInfo = (isExisted) => {
    if (!isExisted) {
      navigate("/login");
    }
  };

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Sider
      width={320}
      collapsedWidth={76}
      collapsed={collapsed}
      className="fixed left-0 top-0 z-[100] h-screen border-r border-white/10 bg-[#171717]"
    >
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-5 flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-semibold text-white">Chat</div>
          )}

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleCollapse}
            className="text-white hover:!bg-white/10 hover:!text-white"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <Menu
            mode="vertical"
            items={items}
            className="custom-sidebar-menu border-none bg-transparent"
            defaultSelectedKeys={["new-chat"]}
          />

          {!collapsed && (
            <>
              <Divider className="my-4 border-white/10" />

              <Text className="mb-3 block px-3 text-sm text-zinc-400">
                Recents
              </Text>

              <div className="space-y-1">
                {recentItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
                  >
                    <button
                      
                      key={index}
                      className="w-full px-3 py-2 text-left text-sm text-zinc-100 transition flex justify-between items-center"
                    >
                      {item}
                    </button>
                    <ChatOptions />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {!collapsed && (
          <div className="shrink-0 border-t border-white/10 bg-[#171717] pt-3">
            <div className="w-full rounded-xl bg-[#222] p-3">
              {user?.data?.fullName || data?.data?.user?.fullName ? (
                <>
                  <div className="truncate text-sm font-medium text-white">
                    {user?.data?.fullName ||
                      data?.data?.user?.fullName ||
                      "N/A"}
                  </div>
                  <div className="text-xs text-zinc-400">Business</div>
                </>
              ) : (
                <>
                  <div className="truncate text-sm font-medium text-white">
                    Get responses tailored to you
                  </div>
                  <div className="text-xs text-zinc-400">
                    Log in to get answers based on saved chats, plus create
                    images and upload files.
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() =>
                handleTeamInfo(
                  user?.data?.fullName || data?.data?.user?.fullName,
                )
              }
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              {user?.data?.fullName || data?.data?.user?.fullName ? (
                <>
                  <TeamOutlined />
                  Invite team members
                </>
              ) : (
                "Log in"
              )}
            </button>
          </div>
        )}
      </div>
    </Sider>
  );
}

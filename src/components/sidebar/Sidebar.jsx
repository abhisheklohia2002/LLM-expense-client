import { useEffect, useState } from "react";
import { Layout, Menu, Button, Typography, Divider } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTab, deleteTab, getTab, self, updateTab } from "../../http/api/api.https";
import { useAuthStore, usechatWindow } from "../../store/Auth/AuthStore";
import "./sidebar.css";
const { Sider } = Layout;
const { Text } = Typography;
import { useNavigate } from "react-router";
import ChatOptions from "../user/User";
export default function Sidebar({ setCollapse }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user,setUser } = useAuthStore();
  const {chatWindow}  = usechatWindow()
  const { refetch, data, isSuccess } = useQuery({
    queryKey: ["self"],
    queryFn: self,
    enabled: false,
  });
  const [renameChatId, setRenameChatId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const navigate = useNavigate();
  const [recentTabChat, setRecentTabChat] = useState([]);
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
    {
      key: "investing",
      icon: <DollarOutlined />,
      label: "Investing",
    },
  ];
  const { mutate: createTabMutate, isPending } = useMutation({
    mutationKey: "chatCreate",
    mutationFn: createTab,
    onSuccess: (data) => {
      refetchChat();
    },
    onError: (error) => {
      console.log("Chat Tab failed", error);
    },
  });

  const { mutate: updateTabMutate, isPending: updatePending } = useMutation({
    mutationKey: ["chatUpdate"],
    mutationFn: ({ id, title }) => updateTab(id, { title }),
    onSuccess: () => {
      refetchChat();
    },
    onError: (error) => {
      console.log("Chat Tab update failed", error);
    },
  });

  const { mutate: deleteTabMutate, isPending: deletePending } = useMutation({
    mutationKey: ["chatDelete"],
    mutationFn: ({ id }) => deleteTab(id),
    onSuccess: () => {
      refetchChat();
    },
    onError: (error) => {
      console.log("Chat Tab update failed", error);
    },
  });

  const {
    refetch: refetchChat,
    data: chatGet,
    isSuccess: isSuccessGet,
  } = useQuery({
    queryKey: ["chatGet", user?.data?._id || data?.data?.user?._id],
    queryFn: () => getTab(user?.data?._id || data?.data?.user?._id),
    enabled: !!(user?.data?._id || data?.data?.user?._id),
  });
  useEffect(() => {
    if (isSuccessGet && chatGet) {
      const chat = chatGet?.data?.chat.reverse() || [];
      setRecentTabChat(chat);
    }
  }, [isSuccessGet, chatGet]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    setCollapse(!collapsed);
  };
  const handleTeamInfo = (isExisted) => {
    if (!isExisted) {
      navigate("/login");
    }
  };

  const newChat = () => {
    const userId = user?.data?._id || data?.data?.user?._id;

    if (!userId) {
      navigate("/login");
      return;
    }

    const title = "New Chat";

    setRecentTabChat((prev) => [title, ...prev]);

    createTabMutate({
      userId,
      title,
    });
  };
  const handleMenuOptions = (e) => {
    const isMenuOptions = e.key;
    switch (isMenuOptions) {
      case "new-chat":
        newChat();
        return;
      default:
        return;
    }
  };

  const handleMenuItems = (key, item) => {
    if (key === "rename") {
      setRenameChatId(item._id);
      setRenameValue(item.title);
    } else if (key === "trash") {
      deleteTabMutate({
        id: item._id,
      });
    }
  };


  useEffect(() => {
  if (isSuccess && data?.data) {
    setUser(data.data);
  }
}, [isSuccess, data, setUser]);

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
            <div className="text-xl font-semibold text-white">BudgetBrain AI</div>
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
            mode="inline"
            items={items}
            className="custom-sidebar-menu border-none bg-transparent"
            defaultSelectedKeys={["new-chat"]}
            onClick={(e) => handleMenuOptions(e)}
          />

          {!collapsed && (
            <>
              <Divider className="my-4 border-white/10" />

              <Text className="mb-3 block px-3 text-sm text-zinc-400">
                Recents
              </Text>

              <div className="space-y-1">
                {recentTabChat?.map((item) => (
                  <div
                    key={item._id}
                    className="relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
                  >
                    {renameChatId === item._id ? (
                      <input
                        value={renameValue}
                        autoFocus
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => setRenameChatId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateTabMutate({
                              id: item._id,
                              title: renameValue,
                            });

                            setRenameChatId(null);
                          }

                          if (e.key === "Escape") {
                            setRenameChatId(null);
                          }
                        }}
                        className="w-full rounded bg-[#2a2a2a] px-3 py-2 text-sm text-white outline-none"
                      />
                    ) : (
                      <button className="w-full px-3 py-2 text-left text-sm text-zinc-100 transition">
                        {item.title}
                      </button>
                    )}

                    <ChatOptions
                      isRename={true}
                      handleMenuItems={(key) => handleMenuItems(key, item)}
                    />
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
                  <div className="text-xs text-zinc-400">
                    {user?.data?.role || data?.data?.user?.role || "N/A"}
                  </div>
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

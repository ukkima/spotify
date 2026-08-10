import { setupAxiosInterceptors } from "@/lib/axios";
import { useAuth } from "@clerk/react";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const cleanUpInterceptor = setupAxiosInterceptors(getToken);

    const initAuth = async () => {
      try {
        const token = await getToken();

        if (token) {
          await checkAdminStatus();
          if (userId) initSocket(userId);
        }
      } catch (error) {
        console.log("Error in authProvider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      cleanUpInterceptor();
      disconnectSocket();
    };
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

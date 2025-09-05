import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, isSignedIn } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:8080/api/auth/login", {
        clerkUserId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        fullName: user.fullName,
      })
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.error("❌ Backend login error:", err))
      .finally(() => setLoading(false));
  }, [isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ currentUser, loading, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

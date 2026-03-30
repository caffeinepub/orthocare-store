import { Navigate } from "@tanstack/react-router";

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const raw = localStorage.getItem("orthocare_admin_session");
  let loggedIn = false;
  try {
    if (raw) {
      const session = JSON.parse(raw);
      loggedIn = session.loggedIn === true;
    }
  } catch {
    loggedIn = false;
  }

  if (!loggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}

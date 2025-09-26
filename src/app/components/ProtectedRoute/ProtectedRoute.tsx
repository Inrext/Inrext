// "use client";
// import React, { useContext, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// // import { AuthContext } from "../../content/AuthContext";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   roles?: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles = [] }) => {
//   // const authContext = useContext(AuthContext);
//   // const user = authContext?.user;
//   // const isAuthenticated = authContext?.isAuthenticated;
//   // const isLoading = authContext?.isLoading;
//   // const logout = authContext?.logout;
//   // Force current user to be super_admin for all checks
//   // if (user && user.role !== "super_admin") {
//   //   user.role = "super_admin";
//   // }

//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         if (payload.exp * 1000 < Date.now()) {
//           if (logout) logout();
//         }
//       } catch {
//         if (logout) logout();
//       }
//     }
//   }, [pathname, logout]);

//   useEffect(() => {
//     if (!isLoading) {
//       if (!isAuthenticated) {
//         router.replace("/");
//       } else if (roles.length > 0 && user && !roles.includes(user.role)) {
//         router.replace("/unauthorized");
//       }
//     }
//   }, [isAuthenticated, isLoading, user, roles, router, pathname]);

//   if (isLoading || !isAuthenticated) {
//     return <div>Loading...</div>;
//   }

//   if (roles.length > 0 && user && !roles.includes(user.role)) {
//     return null;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
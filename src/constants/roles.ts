export const PERMISSIONS = {
    ADMIN: ["create", "edit", "delete", "view"],
    EDITOR: ["create", "edit", "view"],
    USER: ["view"],
    GUEST: [],
} as const;
  
export type Role = keyof typeof PERMISSIONS;
// export type Permission = (typeof PERMISSIONS)[Role][number];
export type Permission = "create" | "edit" | "delete" | "view"
  
// Function to check if a role has permission
export const hasPermission = (role: Role, action: Permission) => PERMISSIONS[role].includes(action);

// example
// import { hasPermission, Role } from "@/constants/roles";

// const userRole: Role = "EDITOR";
// if (hasPermission(userRole, "delete2")) {
//   console.log("You can delete");
// } else {
//   console.log("Permission denied");
// }
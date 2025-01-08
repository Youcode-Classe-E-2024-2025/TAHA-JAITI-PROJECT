import { userRole } from "./userUtil";

export const authMiddleware = (ctx, next) => {
    const user = userRole();
};
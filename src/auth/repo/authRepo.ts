import { useModeStore } from "../../store/modeStore";

import { demoAuthRepo } from "./demoAuthRepo";
import { adminAuthRepo } from "./adminAuthRepo";

export const authRepository = {
  useMe() {
    const mode = useModeStore((state) => state.mode);

    const demo = demoAuthRepo.useMe(mode === "demo");

    const admin = adminAuthRepo.useMe(mode === "admin");

    return mode === "demo" ? demo : admin;
  },

  useLogin() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoAuthRepo.useLogin();

    const adminMutation = adminAuthRepo.useLogin();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useRegister() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoAuthRepo.useRegister();

    const adminMutation = adminAuthRepo.useRegister();

    return mode === "demo" ? demoMutation : adminMutation;
  },
};

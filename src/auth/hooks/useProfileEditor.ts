// auth/hooks/useProfileEditor.ts
import { useAuth } from "./useAuth";
import { useModeStore } from "../../store/modeStore";
import { useDemoProfileStore } from "../store/demoProfileStore";

export function useProfileEditor() {
  const mode = useModeStore((state) => state.mode);
  const isDemo = mode === "demo";

  const demoSetAvatar = useDemoProfileStore((state) => state.setAvatar);
  const demoSetName = useDemoProfileStore((state) => state.setName);

  // Admin-mode avatar updates already have a real backend + repo hook.
  const { updateAvatar: updateAvatarMutation } = useAuth();

  const updateAvatar = async (avatarUrl: string) => {
    if (isDemo) {
      demoSetAvatar(avatarUrl);
      return;
    }
    await updateAvatarMutation.mutateAsync(avatarUrl);
  };

  // TODO: once `authRepository.useUpdateName` exists
  // replace the else-branch below with:
  //   const updateNameMutation = useAuth().updateName;
  //   await updateNameMutation.mutateAsync(name);
  const updateName = async (name: string) => {
    if (isDemo) {
      demoSetName(name);
      return;
    }
    throw new Error(
      "Updating your name isn't available yet for signed-in accounts.",
    );
  };

  return {
    updateAvatar,
    updateName,
    isUpdatingAvatar: !isDemo && updateAvatarMutation.isPending,
    isUpdatingName: false, // → `!isDemo && updateNameMutation.isPending` once wired
  };
}

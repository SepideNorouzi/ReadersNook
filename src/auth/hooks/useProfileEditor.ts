import { useAuth } from "./useAuth";

export function useProfileEditor() {
  const {
    updateAvatar: updateAvatarMutation,
    updateName: updateNameMutation,
  } = useAuth();

  const updateAvatar = async (avatarUrl: string) => {
    await updateAvatarMutation.mutateAsync(avatarUrl);
  };

  const updateName = async (name: string) => {
    await updateNameMutation.mutateAsync(name);
  };

  return {
    updateAvatar,
    updateName,
    isUpdatingAvatar: updateAvatarMutation.isPending,
    isUpdatingName: updateNameMutation.isPending,
  };
}

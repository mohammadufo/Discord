import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Modal =
  | 'CreateServer'
  | 'InvitePeople'
  | 'UpdateServer'
  | 'CreateChannel'
  | 'ManageMembers'
  | 'DeleteChannel'
  | 'UpdateChannel'
  | 'DeleteServer'
  | 'ServerJoin'
  | 'UpdateMessage'
  | 'LeaveServer'

interface GeneralStore {
  activeModal: Modal | null
  setActiveModal: (modal: Modal | null) => void
  drawerOpen: boolean
  toggleDrawer: () => void
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
      drawerOpen: false,
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
    }),
    {
      name: 'general-store',
    }
  )
)

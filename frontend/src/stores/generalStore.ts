import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChannelType } from '../gql/graphql'

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
  drawerOpen: boolean
  activeModal: Modal | null
  chanelTypeForCreateChannelModal: ChannelType | undefined

  toggleDrawer: () => void
  setActiveModal: (modal: Modal | null) => void
  setChannelTypeForCreateChannelModal: (type: ChannelType | undefined) => void
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      drawerOpen: true,
      chanelTypeForCreateChannelModal: ChannelType.Text,

      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      setChannelTypeForCreateChannelModal: (channeltype) =>
        set(() => ({ chanelTypeForCreateChannelModal: channeltype })),
    }),
    {
      name: 'general-store',
    }
  )
)

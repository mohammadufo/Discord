import { ScrollArea } from '@mantine/core'
import ServerHeader from './ServerHeader'
import classes from './ServerSidebar.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useServer } from '../../hooks/graphql/server/useServer'

function ServerSidebar() {
  const navigate = useNavigate()

  const { serverId, memberId, channelId } = useParams()
  const { textChannels, audioChannels, videoChannels, server, role, members } =
    useServer()

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length) {
      navigate(`/servers/${serverId}/channels/TEXT/${textChannels[0]?.id}`)
    }
  })

  if (!server || !role) return null

  return (
    <nav className={classes.nav}>
      <ServerHeader server={server!} memberRole={role} />
      {/* ServerSearch */}
      <ScrollArea></ScrollArea>
    </nav>
  )
}

export default ServerSidebar

import { Flex, Menu, Text, rem } from '@mantine/core'
import {
  IconArrowAutofitDown,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react'

function ServerHeader() {
  return (
    <div>
      <Menu shadow="md" width={rem(300)}>
        <Menu.Target>
          <Flex
            p="md"
            justify={'space-between'}
            align="center"
            w="100%"
            style={{ cursor: 'pointer' }}
          >
            <IconArrowAutofitDown />
          </Flex>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => {}} rightSection={<IconPlus />}>
            Invite People
          </Menu.Item>

          <Menu.Item onClick={() => {}} rightSection={<IconSettings />}>
            Update Server
          </Menu.Item>

          <Menu.Item onClick={() => {}} rightSection={<IconUsers />}>
            Manage Members
          </Menu.Item>

          <Menu.Item onClick={() => {}} rightSection={<IconPlus />}>
            Create Channel
          </Menu.Item>

          <Menu.Item
            onClick={() => {}}
            color="red"
            rightSection={<IconTrash />}
          >
            <Text>Delete Server</Text>
          </Menu.Item>

          <Menu.Item onClick={() => {}} color="red" rightSection={<IconX />}>
            <Text>Leave Server</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default ServerHeader

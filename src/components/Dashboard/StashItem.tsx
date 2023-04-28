import "./stash-item.styles.scss";

import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Button, Card, Grid, Text, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { deleteStash } from "../../utils/firebase/portals/firebase_stash_portal";
import { useSelector } from "react-redux";

export default function StashItem({details}: any) {

  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state: any) => state.user.userData);
  
  const deleteStashHandler = async () => {
    close()
    setTimeout(() => {
      deleteStash(user.uid, details.name)
    }, 100)
  }

  return (
    <div className="stash-item">
      <Card>
        <Grid>
          <Grid.Col style={{ display: 'flex', alignItems: 'center' }} span={8}>
            <Text fz="sm" fw="bold">{details.name}</Text>
          </Grid.Col>
          <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Flex align="center" gap='xs'>
                {/* <Text fz="xs">{details.total}</Text> */}
                <Text fz="xs">990,232.23</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>

      <Flex className="stash-action-buttons" gap="5px">
        <Button onClick={open} className="delete-button" color="red.3" compact><IconTrash size='1rem'/></Button>
        <Button className="delete-button" color="dark.2" compact><IconPencil size='1rem'/></Button>
      </Flex>

      <Modal padding='xl' opened={opened} onClose={close} title="Delete stash" >
        <Flex justify='space-between' align='center'>
          <Text fz="sm">{`This will delete ${details.name} forever. Are you sure?`}</Text>
          <Button onClick={deleteStashHandler} color="red.5" compact>YES</Button>
        </Flex>
      </Modal>

    </div>
  )
}
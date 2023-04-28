import "./stash-item.styles.scss";

import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Button, Card, Grid, Text, Flex, Modal, Input, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { deleteStash, editStash } from "../../utils/firebase/portals/firebase_stash_portal";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function StashItem({stashItem}: any) {

  const [isDeleteStashOpened, setIsDeleteStashOpened] = useState(false);
  const [isEditStashOpened, setIsEditStashOpened] = useState(false);
  const [editStashNameValue, setEditStashNameValue] = useState(stashItem.name);
  const user = useSelector((state: any) => state.user.userData);
  
  const deleteStashHandler = () => {
    toggleDeleteStashOpened();
    setTimeout(() => {
      deleteStash(user.uid, stashItem.id)
    }, 100)
  }

  const onStashNameValueHandler = (e: any) => {
    setEditStashNameValue(e.target.value)
  }

  const editStashHandler = () => {
    toggleEditStashOpened();
    setTimeout(() => {
      editStash(user.uid, editStashNameValue, stashItem.id)
    }, 100)
  }

  const toggleDeleteStashOpened = () => {
    setIsDeleteStashOpened(!isDeleteStashOpened);
  }

  const toggleEditStashOpened = () => {
    setIsEditStashOpened(!isEditStashOpened);
  }


  return (
    <div className="stash-item">
      <Card>
        <Grid>
          <Grid.Col style={{ display: 'flex', alignItems: 'center' }} span={8}>
            <Text fz="sm" fw="bold">{stashItem.name}</Text>
          </Grid.Col>
          <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Flex align="center" gap='xs'>
                {/* <Text fz="xs">{stashItem.total}</Text> */}
                <Text fz="xs">990,232.23</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>

      <Flex className="stash-action-buttons" gap="5px">
        <Button onClick={toggleDeleteStashOpened} className="delete-button" color="red.3" compact><IconTrash size='1rem'/></Button>
        <Button onClick={toggleEditStashOpened} className="delete-button" color="dark.2" compact><IconPencil size='1rem'/></Button>
      </Flex>

      <Modal padding='xl' opened={isDeleteStashOpened} onClose={toggleDeleteStashOpened} title="Delete stash" >
        <Text fz="sm">{`This will delete ${stashItem.name} forever. Are you sure?`}</Text>
        <Space h="sm"/>
        <Button onClick={deleteStashHandler} color="red.5">YES</Button>
      </Modal>

      <Modal padding='xl' opened={isEditStashOpened} onClose={toggleEditStashOpened} title="Edit stash name" >
        <Flex justify='space-between' align='center' gap="20px">
          <Input onChange={onStashNameValueHandler} value={editStashNameValue} placeholder='New stash name' w='100%'/>
          <Button onClick={editStashHandler} leftIcon={<IconPencil size="1rem"/>} color="green.5">SAVE</Button>
        </Flex>
      </Modal>


    </div>
  )
}
import { Button, Modal, Grid, Space, Text, Input, Loader, Card } from "@mantine/core";
import {IconPlus} from "@tabler/icons-react"
import StashItem from "./StashItem"
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { createStash, onStashUpdate } from "../../utils/firebase/portals/firebase_stash_portal";
import { useSelector } from "react-redux";

export default function StashList(){

  const [currentStashes, setCurrentStashes] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [stashName, setStashName] = useState('');
  const user = useSelector((state: any) => state.user.userData);
  const [isAddingStash, setIsAddingStash] = useState(false);

  useEffect(() => {
    if(user.uid){
      const unsubscribe = onStashUpdate(user.uid, (retrievedStashes: any) => {
        setCurrentStashes([])
        retrievedStashes.forEach((doc: any) => {
          const currentStashData = {
            id: doc.id,
            name: doc.id, 
            total: 0
          };
          setCurrentStashes((previousStashes: any) => [...previousStashes, currentStashData])
        })
      })
      return unsubscribe;
    }
  }, [user])

  const setStashNameHandler = (event: any) => {
    setStashName(event.target.value)
  }

  const createStashHandler = async () => {  
    setIsAddingStash(true);
    await createStash(user.uid, stashName);
    setIsAddingStash(false);
    setStashName('');
    close();
  }

  return (
    <>
      <Grid style={{ marginTop: '0' }} gutter='25px' align="center" justify="flex-end">
        <Grid.Col span={8}>
          <Text fz="sm">Your stashes</Text>
        </Grid.Col>
        <Grid.Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={4}>
          <Button onClick={open} fz="xs" compact><IconPlus size=".9rem"/> <Space w='5px'/>Create stash</Button>
        </Grid.Col>
        

        <Grid.Col span={12}>
          <Grid>
            {
              currentStashes.length ? currentStashes.map((item: any) => 
                <Grid.Col key={item.id} span={12}>
                  <StashItem  details={item}/>
                </Grid.Col>
              ) : 
              <Grid.Col span={12}>
                <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Loader size="15px" color="gray" /> <Space w="10px" /> <Text color="gray" fz='xs'>Loading Stashes...</Text>
                </Card>
              </Grid.Col>
            }
          </Grid>
        </Grid.Col>

      </Grid>
      <Modal padding='xl' opened={opened} onClose={close} title="Create a new stash">
        <Grid>
          <Grid.Col span={8}>
            <Input onChange={setStashNameHandler} placeholder="Enter stash name"/>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button leftIcon={isAddingStash ? <Loader size="15px" color="white" /> : <IconPlus size="15px"/>} onClick={createStashHandler} fullWidth>Create</Button>
          </Grid.Col>
        </Grid>  
      </Modal>
    </>
  )
}
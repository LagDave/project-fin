import { Button, Modal, Grid, Space, Text, Input } from "@mantine/core";
import {IconPlus} from "@tabler/icons-react"
import StashItem from "./StashItem"
import { useDisclosure } from '@mantine/hooks';

export default function StashList(){

  const stashes = [
    {id: 1, name: 'UnionBank', total: '963.64 PHP'},
    {id: 2, name: 'Stocks', total: '922.23 PHP'},
    {id: 3, name: 'BDO', total: '81,234.34 PHP'},
    {id: 4, name: 'CIMB Bank', total: '23,238.98 PHP'},
  ]
  const [opened, { open, close }] = useDisclosure(false);

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
              stashes.map((item) => 
                <Grid.Col key={item.id} span={12}>
                  <StashItem  details={item}/>
                </Grid.Col>
              )
            }
          </Grid>
        </Grid.Col>

      </Grid>
      <Modal padding='xl' opened={opened} onClose={close} title="Create a new stash">
        <Grid>
          <Grid.Col span={9}>
            <Input placeholder="Enter stash name"/>
          </Grid.Col>
          <Grid.Col span={3}>
            <Button fullWidth>Create</Button>
          </Grid.Col>
        </Grid>  
      </Modal>
    </>
  )
}
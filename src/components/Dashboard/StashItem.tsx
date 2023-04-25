import { IconPencil, IconTrash } from "@tabler/icons-react";
import "./stash-item.styles.scss";

import { Button, Card, Grid, Text, Flex } from "@mantine/core";

export default function StashItem({details}: any) {
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
        <Button className="delete-button" color="red.3" compact><IconTrash size='1rem'/></Button>
        <Button className="delete-button" color="dark.2" compact><IconPencil size='1rem'/></Button>
      </Flex>
      
    </div>
  )
}
import { Card, Grid, Text } from "@mantine/core";

export default function StashItem({details}: any) {
  return (
    <Card>
      <Grid>
        <Grid.Col span={8}>
          <Text fz="sm" fw="bold">{details.name}</Text>
        </Grid.Col>
        <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Text fz="xs">{details.total}</Text>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
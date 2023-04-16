import { Footer, Text } from "@mantine/core"

export default function AppFooter() {
  return (
    <Footer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} height={60} p="md">
      <Text fz="xs" ta="center">© 2023 The Stashify Company</Text>
    </Footer>
  )
}
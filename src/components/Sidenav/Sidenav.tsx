import { Navbar } from "@mantine/core"
import { useState } from "react";

export default function Sidenav() {
  const [opened, setOpened] = useState(false);

  return  (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      
    </Navbar>
  )
}
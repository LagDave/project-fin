import { 
  Flex,
  Text,
  Button,
  Space,
  Box,
  Header,
  MediaQuery,
  Burger,
} from "@mantine/core"
import { useState } from "react";
import { useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react';
import { signOutFromApp } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/slices/userSlice";
import { useNavigate } from "react-router";

export default function AppHeader() {

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOutHandler = () => {
    signOutFromApp().then(result => {
      dispatch(setUser({}))
      navigate('/login', {replace: true})
    })
  }

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Flex
          align="center"
          gap="5px"
        >
          <Text fz="md" fw="bold">STASHIFY</Text>
          <Text fz="xs">your intuitive savings tracker</Text>
        </Flex> 
        <Box sx={(theme) => ({
          marginLeft: 'auto',
          display: 'flex'
        })}>
          <Button onClick={logOutHandler} leftIcon={<IconLogout size="1.1rem" />} color="gray">Logout</Button>
          <Space w="sm"/>
          <Button 
            variant="outline"
            color={dark ? 'orange' : 'gray'}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </Button>
        </Box>

      </div>
    </Header>
  )
}
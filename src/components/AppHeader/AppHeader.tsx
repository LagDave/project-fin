import { 
  Flex,
  Text,
  Button,
  Space,
  Box,
  Header,
  Container,
  MediaQuery
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

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const user = useSelector((state: any) => state.user.userData);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOutHandler = () => {
    signOutFromApp().then(result => {
      dispatch(setUser({}))
      navigate('/login', {replace: true})
    })
  }

  return (
    <Header height={{ base: 70}} p="md">
      <Container size="xl">
          <Flex>
            <Flex
              align="center"
              gap="5px"
            >
              <Text  fz="md" fw="bold">STASHIFY</Text>
              <MediaQuery query="(max-width: 480px)" styles={{ display: 'none' }}>
                <Text fz="xs">your intuitive savings tracker</Text>
              </MediaQuery>
            </Flex> 
            <Box sx={() => ({
              marginLeft: 'auto',
              display: 'flex'
            })}>

              {
                (isLoggedIn) &&  <Button onClick={logOutHandler} leftIcon={<IconLogout size="1.1rem" />} color="gray">Logout</Button>
              }
              <Space w="sm"/>
              <Button 
                variant="outline"
                color={dark ? 'orange' : 'gray'}
                onClick={() => toggleColorScheme()}
              >
                {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
              </Button>
            </Box>
          </Flex>
      </Container>
    </Header>
  )
}
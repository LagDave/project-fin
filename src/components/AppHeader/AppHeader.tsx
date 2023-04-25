import { 
  Flex,
  Text,
  Button,
  Space,
  Box,
  Header,
  Container,
  MediaQuery,
  Anchor
} from "@mantine/core"
import { useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { IconSun, IconMoonStars, IconDashboard, IconLogout, IconLogin } from '@tabler/icons-react';
import { signOutFromApp } from "../../utils/firebase/firebase_main_portal";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/slices/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    <Header style={{ display: 'flex', width: '100%', alignItems: 'center' }} height={{ base: 70}} p="md">
      <Container style={{ width: '100%' }} size="xl">
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
              display: 'flex',
              alignItems: 'center'
            })}>

              {
                (isLoggedIn) ?  
                <>
                  <Link to="/dashboard">
                    <Anchor color="grey" fz="sm" style={{ display: 'flex', alignItems: 'center' }}>
                      <IconDashboard size="1rem" /> <Space w='5px' /> Dashboard
                    </Anchor>
                  </Link>
                  <Space w="lg"/>
                  <Anchor color="grey" fz="sm" style={{ display: 'flex', alignItems: 'center' }} onClick={logOutHandler}>
                    <IconLogout size="1rem" /> <Space w='5px' /> Log out
                  </Anchor>
                </>

                :

                <>
                  <Link to="/login">
                    <Anchor color="grey" fz="sm" style={{ display: 'flex', alignItems: 'center' }}>
                      <IconLogin size="1rem" /> <Space w='5px' /> Login
                    </Anchor>
                  </Link>
                </>
              }
              {/* <Button 
                variant="outline"
                color={dark ? 'orange' : 'gray'}
                onClick={() => toggleColorScheme()}
              >
                {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
              </Button> */}
            </Box>
          </Flex>
      </Container>
    </Header>
  )
}
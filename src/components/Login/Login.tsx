import { Text, Card, Button, Space, Container, Flex } from "@mantine/core"
import { loginWithGoogle, onAuthStateChangedListener, signOutFromApp } from "../../utils/firebase"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../utils/slices/userSlice"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const user = useSelector((state: any) => state.user.userData) 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handlers
    const loginWithGoogleHandler = () => {
      loginWithGoogle().then(result => {
        dispatch(setUser({
          uid: result.user.uid,
          email: result.user.email,
        }))
        navigate('/dashboard', {replace: true})
      })
    }
    
    const logOutHandler = () => {
      signOutFromApp().then(result => {
        dispatch(setUser({}))
        navigate('/login', {replace: true})
      })
    }

    const redirectToDashboard = () => {
      navigate('/dashboard');
    }
  

  return (
    <Container size="xs">
      <Card shadow="sm" padding="50px" radius="md" withBorder>
        <Flex
          direction="column"
          align="center"
        >
          <Text ta="center" fz="xl" fw="bold">Let's get stashin'!</Text>
          <Space h="md" />

          {
            (user && user.uid) ? (
              <Flex 
                gap="xs"
                align="center"
              >
                <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onClick={redirectToDashboard}>Let's go</Button>
                <Text fz="xs">or</Text>
                <Button  variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} color="dark" onClick={logOutHandler}>Log out</Button>
              </Flex>
            )
            :
            (
              <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={loginWithGoogleHandler}>Login with Google</Button>
            )
          }
          
        </Flex>
      </Card>
    </Container>
  )
}
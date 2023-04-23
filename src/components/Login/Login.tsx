import { Text, Card, Button, Space, Container, Flex } from "@mantine/core"
import { loginWithGoogle, onAuthStateChangedListener, signOutFromApp } from "../../utils/firebase"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../utils/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { IconBrandGoogle } from '@tabler/icons-react';

export default function Login() {

  const user = useSelector((state: any) => state.user.userData) 
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // route guard - prevent logged in users from accessing login page
  useEffect(() => {
    console.log(isLoggedIn)
    if(user && user.uid && isLoggedIn){
      navigate('/dashboard');
    }
  }, [user])

  // handlers
    const loginWithGoogleHandler = () => {
      loginWithGoogle().then(result => {
        localStorage.setItem('isLoggedIn', 'true');
        dispatch(setUser({
          uid: result.user.uid,
          email: result.user.email,
        }))
      })
    }

  return (
    <Container size="xs">
      <Card shadow="sm" padding="50px" radius="md" withBorder>
        <Flex
          direction="column"
          align="center"
        >
          <Text ta="center" fz="sm">The door to financial freedom</Text>
          <Space h="md" />
          <Button leftIcon={<IconBrandGoogle size="1.1rem"/>} onClick={loginWithGoogleHandler}>Login with Google</Button>
        </Flex>
      </Card>
    </Container>
  )
}
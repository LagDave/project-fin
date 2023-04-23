import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import StashList from "./StashList"
import { Grid } from "@mantine/core"

export default function Dashboard (){

  const user = useSelector((state: any) => state.user.userData)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
      if(!user || !user.uid && !isLoggedIn){
        navigate('/login');
      }
  }, [user])

  return (
    <Grid>
      <Grid.Col span={4}>
        <StashList/>
      </Grid.Col>
    </Grid>
  )
}
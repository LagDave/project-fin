import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function Dashboard (){

  const user = useSelector((state: any) => state.user.userData)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user || !user.uid){
      navigate('/login');
    }
  }, [])

  return (
    <h1>Dashboard Test</h1>
  )
}
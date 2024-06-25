import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { UserButton, useUser } from "@clerk/clerk-react"


const Header = () => {
    const {user,isSignedIn} = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-sm">
        <img src="/logo.svg"/>
        {isSignedIn?
            <div className="flex gap-4">
                <Link to={'/dashboard'}><Button variant={'outline'}>Dashboard</Button></Link>
                <UserButton/>
            </div>
            : 
            <Link to={'/auth/sign-in'}>
        
        <Button>Get Started</Button>
        </Link>

        }
        
    </div>
  )
}

export default Header
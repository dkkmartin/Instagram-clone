import LoginButton from "@/components/loginButton"
import { Link, Image } from "@nextui-org/react"


export default function Login() {
    return (
        <section className='flex items-center
        flex-col justify-evenly h-full '>
            <div>
                <Link className="bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-solid border-white border-2 p-2 rounded-full text-white" href={'privacy'}>Back</Link>
            </div>

            <div className='w-full flex flex-col items-center'>
                <Image src="/appIcon.png" alt="App Icon" width={150} height={100} />
            </div>


            <div className="flex flex-col justify-center items-center">
                <LoginButton>brugernavn</LoginButton>
                <LoginButton>adgangskode</LoginButton>
                <LoginButton>log på</LoginButton>
                <p>Har du glemt din adgangskode?</p>
            </div>
        </section>
    )
}
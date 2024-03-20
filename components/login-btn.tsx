'use client';
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                Sigin in as {session.user?.email}<br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            Not signed in<br />
        <button onClick={()=>signIn()}>Sign In</button>
        </>
    )
}
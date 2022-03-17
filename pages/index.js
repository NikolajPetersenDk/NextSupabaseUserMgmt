// This is the page where our components will be shown

import { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import Auth from "../components/Auth"
import Account from "../components/Account"

export default function Home() {
  // This is THE session used in Account() component
  const [session, setSession] = useState(null);

  useEffect(() => {
    // .session() Returns the session data, if there is an active session
    setSession(supabase.auth.session())

    // .onAuthStateChange() Receives a notification everytime an auth event happens
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div 
      className="container"
      style={{ padding: '50px 0 100px 0' }}
    >
      { !session ? 
        <Auth /> : 
        <Account key={session.user.id} session={session} /> 
      }
    </div>
  )
}

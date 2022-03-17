// This is a React component for sign-up/ login
// It'll use magic links for login, since no password is required

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
   const [loading, setLoading] = useState(false)
   const [email, setEmail] = useState("")

   const handleLogin = async (email) => {
      // try defines a code block to run
      try {
         setLoading(true)

         // Here 'error' is set to be what is returned - will be used as a custom error message
         const { error } = await supabase.auth.signIn({ email })

         // throw defines a custom error
         if (error) throw error

         alert('Check your email for the login link!')
      }

      // catch defines a code block to handle any error
      catch (error) {
         alert(error.error_description || error.message)
      }

      // finally defines a code block to run regardless of the result
      finally {
         // no matter what, the loading stops
         setLoading(false)
      }
   }


   return (
      <div className="row flex flex-center">
         <div className="col-6 form-widget">
            <h1 className="header">Supabase + Next.js</h1>
            <p className="description">Sign in via magic link with your email below</p>

            <div>
               <input
                  className="inputField"
                  type="email"
                  placeholder="Your Email"
                  value={email} // From state - defines default value
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>

            <div>
               <button
                  onClick={(e) => {
                     e.preventDefault()
                     handleLogin(email)
                  }}
                  className="button block"
                  disabled={loading}
               >
                  {/* IF we're still loading - the page says 'loading' */}
                  <span>{loading ? 'Loading' : 'Send magic link' }</span>
               </button>
            </div>
         </div>
      </div>
   )
}
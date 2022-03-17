/* 
This will be the account page
Where users can edit their profile details
The page will show a picture, email, username and website
*/

import { useState, useEffect } from "react";

// { supabase } is a const we created in /utils/supabaseClient
import { supabase } from "../utils/supabaseClient";
import Avatar from "./Avatar";

// { session } is a prop, that is passed when Account() is called
export default function Account({ session }) {
   const [loading, setLoading] = useState(true);
   const [username, setUsername] = useState(null);
   const [website, setWebsite] = useState(null);
   const [avatar_url, setAvatar_url] = useState(null);

   // useEffect calls the getProfile() function, right below.
   useEffect(() => {
      getProfile()
   }, [session])

   async function getProfile() {
      try {
         setLoading(true)

         /* .auth allows you to create and manage user sessions
            to access secure data that is hidden behind security policies
            .user() return user data, if a user is logged in */
         const user = supabase.auth.user()

         /* "let { data, error, status } = await supabase" uses
            destructuring. THis line is equal to:
               let supabase = {
                  data: value,
                  error: error message,
                  status: status message
               }

               let data = supabase.data
               let error = supabase.error
               let status = supabase.status
         */
         /* This gets data from our 'profiles' table in the DB
            - supabase is the client we created in 'supabaseClient.js'
            - .from(table) Specifies which table to fetch data from
            - .select(columns, head, count) Perfoms vertical ↓ filtering
               with SELECT. Here 'username', 'website' and 'avatar_url' are all columns
            - .eq(column, value) Finds all rows whose value on the stated 
               'column' matches the specified 'value'. That are equal - eq.
            - .single() Retrieves only one row from the result. Result 
               must be one row, else it results in an error 
         */
         let { data, error, status } = await supabase
            .from('profiles')
            .select('username, website, avatar_url')
            .eq('id', user.id)
            .single()

         if (error && status !== 406)   {
            throw error
         }

         if (data) {
            setUsername(data.username)
            setWebsite(data.website)
            setAvatar_url(data.avatar_url)
         }
      // End of try
      }
      catch (error) {
         alert(error.message)
      }
      finally {
         setLoading(false)
      }
   // End of getProfile()
   }

   
   async function updateProfile({ username, website, avatar_url }) {
      try {
         setLoading(true)
         const user = supabase.auth.user()

         const updates = {
            id: user.id,
            username: username, 
            website,    // website: website
            avatar_url,
            updated_at: new Date()
         }

         let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', //Don't return the value after inserting
         })

         if (error) {
            throw error
         }
      }
      catch (error) {
         alert(error.message)
      }
      finally {
         setLoading(false)
      }
   // End of updateProfile()
   }


   return( 
      <div className="form-widget">

         <Avatar 
            url={avatar_url}
            size={150}
            onUpload={(url) => {
               setAvatar_url(url)
               updateProfile({ username, website, avatar_url: url })
            }}
         />

         {/* Input field for email */}
         <div>
            <label htmlFor="email">Email</label>
            <input 
               id="email" 
               type="text" 
               value={session.user.email} 
               disabled 
            />
         </div>

         {/* Input field for username */}
         <div>
            <label htmlFor="username">Name</label>
            <input 
               type="text"
               id="username" 
               value={username || ''}   
               onChange={(e) => setUsername(e.target.value)}
            />
         </div>

         {/* Input field for Website */}
         <div>
            <label htmlFor="website">Website</label>
            <input 
               type="website" 
               id="website" 
               value={website || ''}
               onChange={(e) => setWebsite(e.target.value)}
            />
         </div>

         {/* Update Button */}
         <div>
            <button 
               className="button block primary"
               onClick={() => updateProfile({ username, website, avatar_url})}
               disabled={loading}   // Disabled if "loading" is true
            >
               {loading ? 'Loading...' : 'Update'}
            </button>
         </div>

         {/* Sign out button */}
         <div>
            <button 
               className="button block"
               onClick={() => supabase.auth.signOut()}
            >
               Sign Out
            </button>
         </div>

      </div>
   // End of return
   )
// End of Account()
}
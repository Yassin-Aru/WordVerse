"use client";

import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, getSession, getProviders, useSession} from 'next-auth/react';

function Nav() {

  const {data: session} = useSession()

  const [providers, setProviders] = useState(null);
  // Drop Down Menu
  const [toggleDropDown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response); 
    }

    //Calling the setProviders
    setUpProviders();
  }, []);


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 flex-center'>
          <Image 
            src="/assets/images/logo.svg"
            alt="WordVere Logo"
            width={47}
            height={47}
            className='object-contain'
          />
          <p className='logo_text'>WordVerse</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <>
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-post" className='black_btn'>
                Create Post
              </Link>

              {/* Sign Out Btn */}
              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              {/* User Profile Image */}
              <Link href="/profile">
                <Image 
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt="profile"
                />
              </Link>
            </div>
          </>
        ): (
          <>
             {providers &&
                Object.values(providers).map((provider) => {
                  return(
                    <button 
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                      >
                        Sign In 
                      </button>
                  )
                })
             }
          </>
        ) 
        }
      </div>
      {/* Mobile Navigtion */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className='rounded-full'
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropDown && (
               <div className='dropdown'>
                  <Link
                    href="/profile"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My profile
                  </Link>
                  <Link
                    href="/create-post"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'>
                      Sign Out
                    </button>
               </div>
            ) 
            }
          </div>
        ):(
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                (
                  <button 
                    type='button'
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id)
                    }
                    className='black_btn'
                    >
                      Sign In 
                    </button>
                )
              })
            }
          </>
        )      
        }
      </div>
    </nav>
  )
}

export default Nav
import { Disclosure } from '@headlessui/react'
import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useEffect, useState } from 'react'
import { IMenuItem } from '../../models/IMenuItem'
import { fetchMenu } from '../../services/menu'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IMenu1Props {
  signOut: () => void;
}

const navigation: IMenuItem[] = [
  { Name: 'Your Picks', Href: 'event', Current: false },
  { Name: 'Dashboard', Href: 'dashboard', Current: false },
]

const Menu1: React.FC<IMenu1Props> = React.memo((props) => {
  let activePage = '';
  if (window.location.href.indexOf('dashboard') > -1)
    activePage = 'dashboard'
  else if (window.location.href.indexOf('event') > -1)
    activePage = 'event'
  // const [navigation, setNavigation] = useState<IMenuItem[]>([])
  // useEffect(() => {
  //   async function fetchData() {
  //     const menuItems: IMenuItem[] = await fetchMenu()
  //     return menuItems
  //   }
  //   fetchData().then(data => setNavigation(data))
  // }, [])

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="http://big12pickem.com/img/b12pkm.png"
                    alt="pickem"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="http://big12pickem.com/img/b12pkm.png"
                    alt="pickem"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.Name}
                        href={item.Href}
                        className={classNames(
                          item.Href === activePage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.Href === activePage ? 'page' : undefined}
                      >
                        {item.Name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" title="Sign Out" onClick={props.signOut}>
                  <span className="sr-only">View notifications</span>
                  <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.Name}
                  href={item.Href}
                  className={classNames(
                    item.Href === activePage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.Href === activePage ? 'page' : undefined}
                >
                  {item.Name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
})

export { Menu1 }

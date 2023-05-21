import { useState, useEffect } from 'react'
import { IMenuItem } from '../../models/IMenuItem'
import { fetchMenu } from '../../services/menu'

export function useNavigation(userId: string) {
  const [navigation, setNavigation] = useState<IMenuItem[]>([])
  useEffect(() => {
    async function fetchData() {
      const menuItems: IMenuItem[] = await fetchMenu()
      return menuItems
    }
    fetchData().then(data => setNavigation(data))
  }, [])
  return {
    navigation
  }
}
import type { Profile, Socials, NavLink } from '@/types/data'

import profileData from './profile.json'
import socialsData from './socials.json'
import navigationData from './navigation.json'

export const profile = profileData as Profile
export const socials = socialsData as Socials
export const navigation = navigationData as NavLink[]

export { profileData, socialsData, navigationData }

import {
  Star, GraduationCap, Award, TrendingUp, FileText, Users, BookOpen,
  BarChart3, Network, Lightbulb, Mail, Github, Linkedin, Youtube,
  Instagram, Home, User, FolderGit2, Compass, MessageSquare,
} from 'lucide-react'

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  star: Star,
  'graduation-cap': GraduationCap,
  award: Award,
  'trending-up': TrendingUp,
  'file-text': FileText,
  users: Users,
  'book-open': BookOpen,
  'bar-chart-3': BarChart3,
  network: Network,
  lightbulb: Lightbulb,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  home: Home,
  user: User,
  'folder-git-2': FolderGit2,
  compass: Compass,
  'message-square': MessageSquare,
}

export function getIcon(name: string): React.ComponentType<{ className?: string }> {
  return iconMap[name] || Star
}

export interface Script {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
  fontSize: number
  scrollSpeed: number
  backgroundColor: string
  textColor: string
  fontFamily: string
  mirrored: boolean
}

export interface PrompterSettings {
  fontSize: number
  scrollSpeed: number
  backgroundColor: string
  textColor: string
  fontFamily: string
  mirrored: boolean
}

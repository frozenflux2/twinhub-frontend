export type NavbarPosition = "fixed" | "relative" | "absolute";
// export const hideSidebarPath = ["/index", "/login", "/signup"]
export interface personaProps {
    name: string
    prompt: string
    profile_pic_url: string
    id: string | number
    audio_greetings?: string
    audio_profile?: string
    greetings?: string
    is_premium?: boolean
    is_ready?: boolean
    telegram_id?: string
}
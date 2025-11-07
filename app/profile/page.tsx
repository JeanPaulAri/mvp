import { Header } from "@/components/header"
import { UserProfile } from "@/components/user-profile"
import { RecentPurchases } from "@/components/recent-purchases"
import { UserCatalog } from "@/components/user-catalog"
import { MusicPlayer } from "@/components/music-player"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background starfield">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-32 pt-20">
        <UserProfile />
        <RecentPurchases />
        <UserCatalog />
      </main>
      <MusicPlayer />
    </div>
  )
}

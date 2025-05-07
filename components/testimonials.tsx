import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "RadiantPlayer123",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Valorant Player",
      content:
        "Bu hile gerçekten harika! Vanguard tarafından tespit edilmeden aylardır kullanıyorum. Aimbot özelliği çok doğal görünüyor ve kimse şüphelenmiyor bile.",
      rating: 5,
    },
    {
      id: 2,
      name: "HeadshotKing",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Pro Gamer",
      content:
        "SHIELD SOFTWARE'in Valorant hilesi piyasadaki en iyisi. Özellikle ESP özellikleri rakipleri duvarların arkasından görmemi sağlıyor ve hiç ban yemedim.",
      rating: 5,
    },
    {
      id: 3,
      name: "StealthAimer",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Competitive Player",
      content:
        "Daha önce birçok hile denedim ve hepsinde ban yedim. SHIELD SOFTWARE'in hilesi ise tamamen tespit edilemez. Müşteri desteği de çok iyi.",
      rating: 5,
    },
    {
      id: 4,
      name: "ValorantMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Streamer",
      content:
        "Bu hileyi kullanmaya başladıktan sonra rankım hızla yükseldi. Özellikle silent aim özelliği çok doğal görünüyor ve kimse anlamıyor bile.",
      rating: 5,
    },
    {
      id: 5,
      name: "AceShooter",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tournament Player",
      content:
        "SHIELD SOFTWARE'in Valorant hilesi sayesinde turnuvalarda bile kullanabiliyorum. Bypass sistemi mükemmel çalışıyor ve hiç tespit edilmedim.",
      rating: 5,
    },
    {
      id: 6,
      name: "ImmortalGamer",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Content Creator",
      content:
        "Lifetime satın aldım ve kesinlikle değdi. Sürekli güncelleniyor ve Vanguard güncellemelerinden sonra bile çalışmaya devam ediyor.",
      rating: 5,
    },
  ]

  return (
    <section className="w-full py-12 bg-black/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-500 px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Kullanıcılarımız Ne Diyor?</h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SHIELD SOFTWARE ürünlerini kullanan oyuncuların deneyimleri
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden border border-gray-800 bg-black/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-300">{testimonial.content}</p>
                </div>
                <div className="mt-4 flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

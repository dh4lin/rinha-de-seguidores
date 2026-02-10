"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Shield, Swords } from "lucide-react"
import type { RankedUserWithPosition } from "@/lib/ranking-data"
import { cn } from "@/lib/utils"

const podiumConfig = [
  {
    order: "order-1 sm:order-2",
    height: "h-44 sm:h-52",
    avatarSize: "h-20 w-20 sm:h-24 sm:w-24",
    ringColor: "ring-4 ring-[hsl(45,95%,55%)]",
    icon: Crown,
    iconColor: "text-[hsl(45,95%,55%)]",
    bgGlow: "shadow-[0_0_40px_-5px_hsl(45,95%,55%,0.3)]",
    badgeBg: "bg-[hsl(45,95%,55%)] text-[hsl(220,20%,7%)]",
    medalLabel: "OURO",
  },
  {
    order: "order-2 sm:order-1",
    height: "h-32 sm:h-40",
    avatarSize: "h-16 w-16 sm:h-20 sm:w-20",
    ringColor: "ring-4 ring-[hsl(210,15%,70%)]",
    icon: Medal,
    iconColor: "text-[hsl(210,15%,70%)]",
    bgGlow: "shadow-[0_0_30px_-5px_hsl(210,15%,70%,0.2)]",
    badgeBg: "bg-[hsl(210,15%,70%)] text-[hsl(220,20%,7%)]",
    medalLabel: "PRATA",
  },
  {
    order: "order-3",
    height: "h-28 sm:h-36",
    avatarSize: "h-14 w-14 sm:h-18 sm:w-18",
    ringColor: "ring-4 ring-[hsl(25,70%,50%)]",
    icon: Shield,
    iconColor: "text-[hsl(25,70%,50%)]",
    bgGlow: "shadow-[0_0_30px_-5px_hsl(25,70%,50%,0.2)]",
    badgeBg: "bg-[hsl(25,70%,50%)] text-[hsl(220,20%,7%)]",
    medalLabel: "BRONZE",
  },
]

export function RankingPodium({
  topThree,
}: {
  topThree: RankedUserWithPosition[]
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-center font-display text-lg font-bold text-foreground sm:text-xl">
        Top 3 - Podio
      </h2>
      <div className="flex items-end justify-center gap-3 sm:gap-6">
        {topThree.map((user, index) => {
          const config = podiumConfig[index]
          const Icon = config.icon
          return (
            <div
              key={user.username}
              className={cn(
                "flex flex-col items-center",
                config.order,
                "animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Medal icon */}
              <Icon
                className={cn(
                  "mb-2 h-5 w-5 sm:h-6 sm:w-6",
                  config.iconColor,
                )}
              />

              {/* Avatar */}
              <div className="relative mb-3">
                <Avatar className={cn(config.avatarSize, config.ringColor)}>
                  <AvatarImage
                    src={user.avatarUrl || "/placeholder.svg"}
                    alt={user.displayName}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="bg-secondary text-sm font-bold text-secondary-foreground">
                    {user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    config.badgeBg,
                  )}
                >
                  #{user.position}
                </div>
              </div>

              {/* Info */}
              <p className="mb-0.5 max-w-[100px] truncate text-center text-xs font-semibold text-foreground sm:max-w-[120px] sm:text-sm">
                {user.displayName}
              </p>
              <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">
                {user.username}
              </p>

              {/* Podium bar */}
              <div
                className={cn(
                  "mt-3 flex w-24 flex-col items-center justify-center gap-1 rounded-t-lg border border-b-0 border-border sm:w-32",
                  config.height,
                  config.bgGlow,
                  "bg-secondary/80",
                )}
              >
                <Badge
                  className={cn("text-[10px] font-bold", config.badgeBg)}
                >
                  {config.medalLabel}
                </Badge>
                <div className="flex items-center gap-1">
                  <Swords className="h-4 w-4 text-primary" />
                  <p className="font-display text-lg font-bold text-foreground sm:text-2xl">
                    {user.victories}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {user.victories === 1 ? "vitoria" : "vitorias"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

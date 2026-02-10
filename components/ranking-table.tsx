"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, Search, ArrowUpDown, Swords } from "lucide-react"
import type { RankedUserWithPosition } from "@/lib/ranking-data"
import { cn } from "@/lib/utils"

function PositionBadge({ position }: { position: number }) {
  const styles: Record<number, string> = {
    1: "bg-[hsl(45,95%,55%)] text-[hsl(220,20%,7%)]",
    2: "bg-[hsl(210,15%,70%)] text-[hsl(220,20%,7%)]",
    3: "bg-[hsl(25,70%,50%)] text-[hsl(220,20%,7%)]",
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
        styles[position] || "bg-secondary text-secondary-foreground",
      )}
    >
      {position}
    </span>
  )
}

type SortField = "position" | "victories"

export function RankingTable({
  users,
}: {
  users: RankedUserWithPosition[]
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("position")
  const [sortAsc, setSortAsc] = useState(true)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(field === "position")
    }
  }

  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const modifier = sortAsc ? 1 : -1
      if (sortField === "position")
        return (a.position - b.position) * modifier
      return (b.victories - a.victories) * modifier
    })

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar participante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Badge
          variant="outline"
          className="hidden text-xs text-muted-foreground sm:inline-flex"
        >
          {filteredUsers.length} resultado
          {filteredUsers.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-16 text-center">
                <button
                  type="button"
                  onClick={() => handleSort("position")}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  #
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Usuario
              </TableHead>
              <TableHead className="text-center">
                <button
                  type="button"
                  onClick={() => handleSort("victories")}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Vitorias
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, i) => (
              <TableRow
                key={user.username}
                className={cn(
                  "border-border transition-colors hover:bg-secondary/50",
                  "animate-fade-in-up",
                )}
                style={{ animationDelay: `${Math.min(i * 40, 600)}ms` }}
              >
                <TableCell className="text-center">
                  <PositionBadge position={user.position} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-border">
                      <AvatarImage
                        src={user.avatarUrl || "/placeholder.svg"}
                        alt={user.displayName}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="bg-secondary text-xs font-bold text-secondary-foreground">
                        {user.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.displayName}
                        </p>
                        {user.isVerified && (
                          <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
                    <Swords className="h-3.5 w-3.5 text-primary" />
                    <span className="font-display text-sm font-bold text-foreground">
                      {user.victories}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-muted-foreground"
                >
                  Nenhum participante encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

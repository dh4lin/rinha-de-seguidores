import { Instagram, Trophy } from "lucide-react"

export function RankingHeader() {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary)) 35px, hsl(var(--primary)) 36px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Ranking RDS
              </h1>
              <p className="text-xs text-muted-foreground">
                Ranking de Vitorias
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
            <Instagram className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">
              @rinha_de_seguidores
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { CheckCircle2, Plus } from "lucide-react";
import { getSummary } from "../http/get-summary.ts";
import { InOrbitIcon } from "./in-orbit-icon.tsx";
import { Button } from "./ui/button.tsx";
import { DialogTrigger } from "./ui/dialog.tsx";
import { Progress, ProgressIndicator } from "./ui/progress-bar.tsx";
import { Separator } from "./ui/separator.tsx";
import { PendingGoals } from "./pending-goals.tsx";

dayjs.locale(ptBR);

export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  const fristDayofWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span>
            {fristDayofWeek} a {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex gap-2 items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>
        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format("dddd");
          const formattedDate = dayjs(date).format("D[ de ]MMMM");

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium space-x-1">
                <span className="capitalize">{weekDay}</span>
                <span className="text-zinc-400 text-xs">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map((goals) => {
                  const time = dayjs(goals.completedAt).format("HH:mm");

                  return (
                    <li key={goals.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-xs text-zinc-400 space-x-1">
                        Você completou “
                        <span className="text-zinc-100">{goals.title}</span>” às
                        <span className="text-zinc-100">{time}h</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

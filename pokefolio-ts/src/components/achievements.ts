import type { Position } from "../types/position";
import { t } from "../utils/i18n";
import showSnackbar from "./snackbar";

type Achievement = {
  title: string;
  descriptionId: string;
  unlocked: boolean;
  condition: () => boolean;
};

export class AchievementManager {
  private static instance: AchievementManager;
  public achievements: Achievement[];

  public stairClimbs: number = 0;
  public foundPokeballs: Set<Position> = new Set();
  public foundElecthor: boolean = false;

  private constructor() {
    this.achievements = [
      {
        title: "Did you try Backwards Long Jump ?",
        descriptionId: "bljAchievement",
        unlocked: false,
        condition: () => {
          return this.stairClimbs >= 8;
        }
      },
      {
        title: "Gotta Catch'em All !",
        descriptionId: "catchAchievement",
        unlocked: false,
        condition: () => {
          return this.foundPokeballs.size == 3;
        }
      },
      {
        title: "7.8/10 : Too much water",
        descriptionId: "waterAchievement",
        unlocked: false,
        condition: () => {
          return this.foundElecthor;
        }
      },
    ];
  }

  public static getInstance(): AchievementManager {
    if (!AchievementManager.instance) {
      AchievementManager.instance = new AchievementManager();
    }
    return AchievementManager.instance;
  }

  public checkAchievements(): void {
    this.achievements.forEach((achievement) => {
      if (!achievement.unlocked && achievement.condition()) {
        achievement.unlocked = true;
        showSnackbar(t("achievementUnlocked")[0]);
      }
    });
  }

  public updateAchievementsUI(): void {
    const achievementsList = document.getElementById("achievements-list")!;
    achievementsList.innerHTML = this.achievements.map((achievement) => {
      return `
        <div class="p-4 rounded-lg ${achievement.unlocked ? 'bg-green-500' : 'bg-gray-500'}">
          <h3 class="text-3xl font-bold">${achievement.title}</h3>
          <p class="mt-2 text-xl">
            ${t(achievement.descriptionId)[0]}
            ${achievement.title === "Gotta Catch'em All !" ? ` (${this.foundPokeballs.size}/3)` : ''}
          </p>
        </div>
      `;
    }).join('');
  }

}

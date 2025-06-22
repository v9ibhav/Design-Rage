import { GameResult } from '../types/game';

export function shareResults(result: GameResult): void {
  const text = `🎮 Just survived Brief Rage! 

🏆 Designer Title: ${result.title}
📊 Final Stats:
• Stress: ${Math.round(result.finalStress)}%
• Reputation: ${Math.round(result.finalReputation)}%
• Score: ${Math.round(result.totalScore)}

Think you can handle the client chaos better? Try Brief Rage!
#BriefRage #DesignLife #GameDev`;

  if (navigator.share) {
    navigator.share({
      title: 'Brief Rage Results',
      text: text,
      url: window.location.href
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Unable to share. Please copy manually:\n\n' + text);
    });
  }
}

export function exportResults(result: GameResult): void {
  const data = {
    gameTitle: 'Brief Rage',
    designerTitle: result.title,
    finalStress: result.finalStress,
    finalReputation: result.finalReputation,
    totalScore: result.totalScore,
    completionTime: result.completionTime,
    exportTime: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `brief-rage-results-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateShareCard(result: GameResult): string {
  // Generate a simple text-based share card
  return `
╔═══════════════════════════════╗
║           BRIEF RAGE          ║
║        SURVIVAL REPORT        ║
╠═══════════════════════════════╣
║                               ║
║ 🏆 ${result.title.padEnd(24)} ║
║                               ║
║ 📊 FINAL STATS:               ║
║ • Stress: ${Math.round(result.finalStress).toString().padEnd(18)}% ║
║ • Reputation: ${Math.round(result.finalReputation).toString().padEnd(12)}% ║
║ • Score: ${Math.round(result.totalScore).toString().padEnd(17)} ║
║                               ║
║ 📅 ${result.completionTime.padEnd(24)} ║
║                               ║
╚═══════════════════════════════╝
  `.trim();
}
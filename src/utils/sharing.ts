import { GameResult } from '../types/game';

async function generateResultImage(result: GameResult): Promise<Blob> {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1200;
  canvas.height = 630;

  if (!ctx) throw new Error('Could not get canvas context');

  // Set background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#1f2937');
  gradient.addColorStop(1, '#111827');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add logo/title
  ctx.font = 'bold 60px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ec4899';
  ctx.textAlign = 'center';
  ctx.fillText('Design Rage', canvas.width / 2, 100);

  // Add result details
  ctx.font = 'bold 48px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#f3f4f6';
  ctx.fillText(`Designer Title: ${result.title}`, canvas.width / 2, 200);

  ctx.font = '36px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#9ca3af';

  // Add stats with colored indicators
  ctx.textAlign = 'left';
  const startX = canvas.width / 2 - 200;

  // Stress stat
  ctx.fillStyle = '#ef4444';
  ctx.fillText(`Stress: ${Math.round(result.finalStress)}%`, startX, 300);

  // Reputation stat
  ctx.fillStyle = '#22c55e';
  ctx.fillText(`Reputation: ${Math.round(result.finalReputation)}%`, startX, 360);

  // Score
  ctx.fillStyle = '#3b82f6';
  ctx.fillText(`Score: ${Math.round(result.totalScore)}`, startX, 420);

  // Add footer
  ctx.font = '24px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#6b7280';
  ctx.textAlign = 'center';
  ctx.fillText('Think you can handle the client chaos better?', canvas.width / 2, 540);
  ctx.fillText('Play Design Rage now!', canvas.width / 2, 580);

  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, 'image/png');
  });
}

export function generateShareCard(result: GameResult): string {
  // Generate a simple text-based share card
  return `
╔═══════════════════════════════╗
║          DESIGN RAGE         ║
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

export async function shareResults(result: GameResult): Promise<void> {
  const text = `🎮 Just survived Design Rage!
Stress: ${Math.round(result.finalStress)}%
Reputation: ${Math.round(result.finalReputation)}%
Score: ${Math.round(result.totalScore)}
Think you can handle the client chaos better? Try Design Rage!
#DesignRage #DesignLife #GameDev`;

  try {
    // Generate the image
    const imageBlob = await generateResultImage(result);
    const imageFile = new File([imageBlob], 'design-rage-result.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
      // Share with image if supported
      await navigator.share({
        title: 'Design Rage Results',
        text: text,
        files: [imageFile],
        url: window.location.href
      });
    } else if (navigator.share) {
      // Fallback to regular share if image sharing not supported
      await navigator.share({
        title: 'Design Rage Results',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without share API
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(imageBlob);
      downloadLink.download = 'design-rage-result.png';
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    }
  } catch (error) {
    console.error('Error sharing results:', error);
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    } catch (clipboardError) {
      console.error('Error copying to clipboard:', clipboardError);
      alert('Could not share results. Please try again.');
    }
  }
}

export async function exportResults(result: GameResult): Promise<void> {
  try {
    const imageBlob = await generateResultImage(result);
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(imageBlob);
    downloadLink.download = `design-rage-result-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error('Error exporting results:', error);
    alert('Could not export results. Please try again.');
  }
}

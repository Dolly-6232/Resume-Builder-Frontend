export class RewardedManager {
  static showRewardedAd = async (onRewardEarned?: () => void) => {
    // Implement rewarded ad logic here
    console.log('Rewarded ad will be shown');
    if (onRewardEarned) {
      onRewardEarned();
    }
  };
}

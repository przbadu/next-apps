import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeAgo = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = createdAt.getTime() - now.getTime();

  const seconds = Math.floor(Math.abs(timeDifference) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return timeDifference > 0 ? `${years} year${years > 1 ? 's' : ''} from now` : `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return timeDifference > 0 ? `${months} month${months > 1 ? 's' : ''} from now` : `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return timeDifference > 0 ? `${weeks} week${weeks > 1 ? 's' : ''} from now` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return timeDifference > 0 ? `${days} day${days > 1 ? 's' : ''} from now` : `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return timeDifference > 0 ? `${hours} hour${hours > 1 ? 's' : ''} from now` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return timeDifference > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} from now` : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return timeDifference > 0 ? `${seconds} second${seconds > 1 ? 's' : ''} from now` : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}

export const humanizeNumber = (number: number): string => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    // For numbers between 1,000 and 999,999, return in the format "Xk"
    return (number / 1000).toFixed(1) + 'k';
  } else if (number < 1000000000) {
    // For numbers between 1,000,000 and 999,999,999, return in the format "X.M"
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    // For larger numbers, return in the format "X.B"
    return (number / 1000000000).toFixed(1) + 'B';
  }
};

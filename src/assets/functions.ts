// random string generator (if second arg, it ads text at the end)
export function generateRandomString(length: number, text?: string): string {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let random: string = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    random += characters.charAt(randomIndex);
  }
  if (text) {
    return random + text
  }
  return random;
}



